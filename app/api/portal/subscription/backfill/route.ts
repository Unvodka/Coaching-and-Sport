import { NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";
import Stripe from "stripe";

function safeDateISO(ts: unknown): string | null {
  if (!ts || typeof ts !== "number" || isNaN(ts)) return null;
  try { return new Date(ts * 1000).toISOString(); } catch { return null; }
}

function getPeriod(sub: Stripe.Subscription): { start: number | null; end: number | null } {
  const s = sub as unknown as Record<string, unknown>;
  const start = typeof s.current_period_start === "number" ? s.current_period_start : null;
  const end = typeof s.current_period_end === "number" ? s.current_period_end : null;
  return { start, end };
}

function getInvoiceSubId(invoice: Stripe.Invoice): string | null {
  const inv = invoice as unknown as Record<string, unknown>;
  const sub = inv.subscription;
  if (typeof sub === "string" && sub.length > 0) return sub;
  if (sub && typeof sub === "object" && "id" in sub) return (sub as { id: string }).id;
  return null;
}

export async function POST() {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const admin = createAdminClient();

    const { data: profile, error: profileError } = await admin
      .from("profiles")
      .select("email")
      .eq("id", user.id)
      .single();

    if (profileError) {
      return NextResponse.json({ error: `Erreur profil: ${profileError.message}` }, { status: 500 });
    }
    if (!profile?.email) {
      return NextResponse.json({ error: "Email introuvable dans le profil" }, { status: 404 });
    }

    const stripe = getStripe();
    const customers = await stripe.customers.list({ email: profile.email, limit: 5 });

    if (customers.data.length === 0) {
      return NextResponse.json({
        message: `Aucun client Stripe trouvé pour: ${profile.email}`,
        subscriptions: 0,
        payments: 0,
      });
    }

    let subsImported = 0;
    let paymentsImported = 0;

    for (const customer of customers.data) {
      // ── Import subscriptions ──────────────────────────────────────────────
      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        limit: 10,
        status: "all",
      });

      for (const sub of subscriptions.data) {
        const meta = sub.metadata || {};
        const period = getPeriod(sub);
        // Resolve product name: prefer metadata, then price nickname, then fetch product name
        let programTitle = meta.program_title || sub.items.data[0]?.price?.nickname || "";
        if (!programTitle) {
          const productId = sub.items.data[0]?.price?.product;
          if (productId && typeof productId === "string") {
            try {
              const product = await stripe.products.retrieve(productId);
              programTitle = product.name || "Abonnement";
            } catch { programTitle = "Abonnement"; }
          } else { programTitle = "Abonnement"; }
        }
        const minimumMonths = parseInt(meta.minimum_commitment_months ?? "1");

        // If period dates are null, try to get them from the latest invoice
        let periodStart = period.start;
        let periodEnd = period.end;
        if (!periodStart || !periodEnd) {
          try {
            const latestInvoices = await stripe.invoices.list({ subscription: sub.id, limit: 1 });
            const inv = latestInvoices.data[0];
            if (inv) {
              const invRaw = inv as unknown as Record<string, unknown>;
              if (!periodStart && typeof invRaw.period_start === "number") periodStart = invRaw.period_start;
              if (!periodEnd && typeof invRaw.period_end === "number") periodEnd = invRaw.period_end;
            }
          } catch { /* ignore */ }
        }

        const { error: subError } = await admin.from("subscriptions").upsert({
          id: sub.id,
          user_id: user.id,
          stripe_customer_id: customer.id,
          status: sub.status,
          program_title: programTitle,
          amount_cents: sub.items.data[0]?.price?.unit_amount ?? 0,
          currency: sub.currency,
          interval: sub.items.data[0]?.price?.recurring?.interval ?? "month",
          minimum_months: minimumMonths,
          current_period_start: safeDateISO(periodStart),
          current_period_end: safeDateISO(periodEnd),
          cancel_at_period_end: sub.cancel_at_period_end,
          canceled_at: safeDateISO(sub.canceled_at ?? null),
          updated_at: new Date().toISOString(),
        }, { onConflict: "id" });

        if (subError) {
          return NextResponse.json({ error: `Erreur subscription: ${subError.message}` }, { status: 500 });
        }
        subsImported++;

        // Stamp user_id on Stripe metadata for future webhooks
        if (!meta.user_id) {
          await stripe.subscriptions.update(sub.id, {
            metadata: { ...meta, user_id: user.id, program_title: programTitle },
          });
        }
      }

      // ── Import invoices by customer (catches all, even if sub link is odd) ─
      const invoices = await stripe.invoices.list({
        customer: customer.id,
        limit: 50,
      });

      for (const invoice of invoices.data) {
        if (invoice.status === "draft") continue;

        // Find matching subscription in our DB
        const subId = getInvoiceSubId(invoice);

        // Only import if we have a matching subscription for this user
        if (subId) {
          const { data: existingSub } = await admin
            .from("subscriptions")
            .select("id")
            .eq("id", subId)
            .eq("user_id", user.id)
            .maybeSingle();

          if (!existingSub) continue;
        } else {
          continue; // skip invoices not tied to a subscription
        }

        const paidAt = invoice.status_transitions?.paid_at;
        const amountCents = invoice.amount_paid > 0
          ? invoice.amount_paid
          : invoice.amount_due;

        const invoiceStatus = invoice.status === "paid" ? "paid"
          : invoice.status === "open" ? "open"
          : "failed";

        const { error: invError } = await admin.from("subscription_payments").upsert({
          id: invoice.id,
          subscription_id: subId,
          user_id: user.id,
          amount_cents: amountCents,
          currency: invoice.currency,
          status: invoiceStatus,
          invoice_url: invoice.hosted_invoice_url ?? null,
          invoice_pdf: invoice.invoice_pdf ?? null,
          paid_at: paidAt ? new Date(paidAt * 1000).toISOString()
            : (invoice.status === "paid" ? new Date().toISOString() : null),
        }, { onConflict: "id" });

        if (invError) {
          return NextResponse.json({ error: `Erreur payment: ${invError.message}` }, { status: 500 });
        }
        paymentsImported++;
      }
    }

    return NextResponse.json({
      message: `Import terminé : ${subsImported} abonnement(s), ${paymentsImported} paiement(s).`,
      subscriptions: subsImported,
      payments: paymentsImported,
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    console.error("Backfill error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
