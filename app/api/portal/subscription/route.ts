import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api/auth";
import { getStripe } from "@/lib/stripe";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

function getInvoiceSubId(invoice: Stripe.Invoice): string | null {
  const inv = invoice as unknown as Record<string, unknown>;
  const sub = inv.subscription;
  if (typeof sub === "string" && sub.length > 0) return sub;
  if (sub && typeof sub === "object" && "id" in sub) return (sub as { id: string }).id;
  return null;
}

export async function GET() {
  return withAuth(async ({ user, admin }) => {
    // Fetch subscription from Supabase
    const { data: subscription, error: subError } = await admin
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (subError) {
      return NextResponse.json({ error: subError.message }, { status: 500 });
    }

    // Fetch payments from Supabase
    let { data: payments } = await admin
      .from("subscription_payments")
      .select("*")
      .eq("user_id", user.id)
      .order("paid_at", { ascending: false })
      .limit(24);

    // If subscription exists but no payments — auto-sync from Stripe
    if (subscription && (!payments || payments.length === 0)) {
      try {
        const stripe = getStripe();
        const invoices = await stripe.invoices.list({
          customer: subscription.stripe_customer_id,
          limit: 50,
        });

        for (const invoice of invoices.data) {
          if (invoice.status === "draft") continue;
          const subId = getInvoiceSubId(invoice);
          if (!subId || subId !== subscription.id) continue;

          const paidAt = invoice.status_transitions?.paid_at;
          const amountCents = invoice.amount_paid > 0 ? invoice.amount_paid : invoice.amount_due;
          const invoiceStatus = invoice.status === "paid" ? "paid"
            : invoice.status === "open" ? "open" : "failed";

          await admin.from("subscription_payments").upsert({
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
        }

        // Re-fetch after sync
        const { data: freshPayments } = await admin
          .from("subscription_payments")
          .select("*")
          .eq("user_id", user.id)
          .order("paid_at", { ascending: false })
          .limit(24);

        payments = freshPayments;
      } catch (err) {
        console.error("Auto-sync payments failed:", err);
      }
    }

    return NextResponse.json({ subscription, payments: payments ?? [] });
  });
}
