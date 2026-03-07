import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api/auth";
import { getStripe } from "@/lib/stripe";
import Stripe from "stripe";

function getPeriod(sub: Stripe.Subscription): { start: number; end: number } {
  const s = sub as unknown as Record<string, number>;
  return { start: s.current_period_start, end: s.current_period_end };
}

function getInvoiceSubscriptionId(invoice: Stripe.Invoice): string | null {
  const inv = invoice as unknown as Record<string, unknown>;
  return (inv.subscription as string) ?? null;
}

// One-time backfill: imports existing Stripe subscriptions + invoices for the
// authenticated user into Supabase. Safe to call multiple times (upsert).
export async function POST() {
  return withAuth(async ({ user, admin }) => {
    const { data: profile } = await admin
      .from("profiles")
      .select("email")
      .eq("id", user.id)
      .single();

    if (!profile?.email) {
      return NextResponse.json({ error: "Profil introuvable" }, { status: 404 });
    }

    const stripe = getStripe();
    const customers = await stripe.customers.list({ email: profile.email, limit: 5 });

    if (customers.data.length === 0) {
      return NextResponse.json({ message: "Aucun client Stripe trouvé pour cet email.", imported: 0 });
    }

    let subsImported = 0;
    let paymentsImported = 0;

    for (const customer of customers.data) {
      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        limit: 10,
        status: "all",
      });

      for (const sub of subscriptions.data) {
        const meta = sub.metadata || {};
        const period = getPeriod(sub);
        const programTitle = meta.program_title || sub.items.data[0]?.price?.nickname || "Abonnement";
        const minimumMonths = parseInt(meta.minimum_commitment_months ?? "1");

        await admin.from("subscriptions").upsert({
          id: sub.id,
          user_id: user.id,
          stripe_customer_id: customer.id,
          status: sub.status,
          program_title: programTitle,
          amount_cents: sub.items.data[0]?.price?.unit_amount ?? 0,
          currency: sub.currency,
          interval: sub.items.data[0]?.price?.recurring?.interval ?? "month",
          minimum_months: minimumMonths,
          current_period_start: new Date(period.start * 1000).toISOString(),
          current_period_end: new Date(period.end * 1000).toISOString(),
          cancel_at_period_end: sub.cancel_at_period_end,
          canceled_at: sub.canceled_at ? new Date(sub.canceled_at * 1000).toISOString() : null,
          updated_at: new Date().toISOString(),
        }, { onConflict: "id" });

        subsImported++;

        // Stamp user_id on Stripe metadata for future webhook events
        if (!meta.user_id) {
          await stripe.subscriptions.update(sub.id, {
            metadata: { ...meta, user_id: user.id, program_title: programTitle },
          });
        }

        const invoices = await stripe.invoices.list({ subscription: sub.id, limit: 24 });

        for (const invoice of invoices.data) {
          const subId = getInvoiceSubscriptionId(invoice);
          if (!subId) continue;
          const paidAt = invoice.status_transitions?.paid_at;

          await admin.from("subscription_payments").upsert({
            id: invoice.id,
            subscription_id: subId,
            user_id: user.id,
            amount_cents: invoice.amount_paid,
            currency: invoice.currency,
            status: invoice.status === "paid" ? "paid" : invoice.status === "open" ? "open" : "failed",
            invoice_url: invoice.hosted_invoice_url ?? null,
            invoice_pdf: invoice.invoice_pdf ?? null,
            paid_at: paidAt ? new Date(paidAt * 1000).toISOString() : null,
          }, { onConflict: "id" });

          paymentsImported++;
        }
      }
    }

    return NextResponse.json({
      message: `Import terminé : ${subsImported} abonnement(s), ${paymentsImported} paiement(s).`,
      subscriptions: subsImported,
      payments: paymentsImported,
    });
  });
}
