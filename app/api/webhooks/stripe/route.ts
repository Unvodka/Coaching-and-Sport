import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { sendPaymentConfirmation } from "@/lib/email";
import { createAdminClient } from "@/lib/supabase/server";
import Stripe from "stripe";

// Helper to safely extract period timestamps from Stripe subscription
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

function getInvoiceSubscriptionId(invoice: Stripe.Invoice): string | null {
  const inv = invoice as unknown as Record<string, unknown>;
  return (inv.subscription as string) ?? null;
}

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET environment variable");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  const admin = createAdminClient();

  switch (event.type) {
    // ── New subscription created via checkout ──────────────────────────────
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const amount = session.amount_total || 0;
      const customerEmail = session.customer_email || session.customer_details?.email;

      let productTitle = "Coach-Bluewave";
      try {
        const lineItems = await getStripe().checkout.sessions.listLineItems(session.id, { limit: 1 });
        if (lineItems.data.length > 0) productTitle = lineItems.data[0].description || productTitle;
      } catch (err) {
        console.error("Failed to retrieve line items:", err);
      }

      // Persist subscription to Supabase if this is a subscription checkout
      if (session.mode === "subscription" && session.subscription) {
        try {
          const sub = await getStripe().subscriptions.retrieve(session.subscription as string);
          const meta = sub.metadata || {};
          const userId = meta.user_id;

          if (userId) {
            await admin.from("subscriptions").upsert({
              id: sub.id,
              user_id: userId,
              stripe_customer_id: sub.customer as string,
              status: sub.status,
              program_title: meta.program_title || productTitle,
              amount_cents: sub.items.data[0]?.price?.unit_amount ?? 0,
              currency: sub.currency,
              interval: sub.items.data[0]?.price?.recurring?.interval ?? "month",
              minimum_months: parseInt(meta.minimum_commitment_months ?? "1"),
              current_period_start: safeDateISO(getPeriod(sub).start),
              current_period_end: safeDateISO(getPeriod(sub).end),
              cancel_at_period_end: sub.cancel_at_period_end,
              updated_at: new Date().toISOString(),
            }, { onConflict: "id" });
            console.log(`✅ Subscription saved: ${sub.id} for user ${userId}`);
          }
        } catch (err) {
          console.error("Failed to save subscription:", err);
        }
      }

      if (customerEmail) {
        try {
          await sendPaymentConfirmation({ customerEmail, amount, productTitle });
        } catch (err) {
          console.error("Failed to send confirmation emails:", err);
        }
      }
      break;
    }

    // ── Recurring payment succeeded ────────────────────────────────────────
    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      const invoiceSubId = getInvoiceSubscriptionId(invoice);
      if (!invoiceSubId) break;

      try {
        const sub = await getStripe().subscriptions.retrieve(invoiceSubId);
        const userId = sub.metadata?.user_id;
        if (!userId) break;

        // Update subscription period
        await admin.from("subscriptions").upsert({
          id: sub.id,
          user_id: userId,
          stripe_customer_id: sub.customer as string,
          status: sub.status,
          program_title: sub.metadata?.program_title ?? "Abonnement",
          amount_cents: sub.items.data[0]?.price?.unit_amount ?? 0,
          currency: sub.currency,
          interval: sub.items.data[0]?.price?.recurring?.interval ?? "month",
          minimum_months: parseInt(sub.metadata?.minimum_commitment_months ?? "1"),
          current_period_start: safeDateISO(getPeriod(sub).start),
          current_period_end: safeDateISO(getPeriod(sub).end),
          cancel_at_period_end: sub.cancel_at_period_end,
          updated_at: new Date().toISOString(),
        }, { onConflict: "id" });

        // Save payment record
        await admin.from("subscription_payments").upsert({
          id: invoice.id,
          subscription_id: sub.id,
          user_id: userId,
          amount_cents: invoice.amount_paid,
          currency: invoice.currency,
          status: "paid",
          invoice_url: invoice.hosted_invoice_url ?? null,
          invoice_pdf: invoice.invoice_pdf ?? null,
          paid_at: invoice.status_transitions?.paid_at
            ? new Date(invoice.status_transitions.paid_at * 1000).toISOString()
            : new Date().toISOString(),
        }, { onConflict: "id" });

        console.log(`✅ Payment recorded: ${invoice.id}`);
      } catch (err) {
        console.error("Failed to record payment:", err);
      }
      break;
    }

    // ── Payment failed ─────────────────────────────────────────────────────
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const invoiceSubId = getInvoiceSubscriptionId(invoice);
      if (!invoiceSubId) break;

      try {
        const sub = await getStripe().subscriptions.retrieve(invoiceSubId);
        const userId = sub.metadata?.user_id;
        if (!userId) break;

        await admin.from("subscription_payments").upsert({
          id: invoice.id,
          subscription_id: sub.id,
          user_id: userId,
          amount_cents: invoice.amount_due,
          currency: invoice.currency,
          status: "failed",
          invoice_url: invoice.hosted_invoice_url ?? null,
          invoice_pdf: invoice.invoice_pdf ?? null,
          paid_at: null,
        }, { onConflict: "id" });

        await admin.from("subscriptions")
          .update({ status: "past_due", updated_at: new Date().toISOString() })
          .eq("id", sub.id);
      } catch (err) {
        console.error("Failed to record failed payment:", err);
      }
      break;
    }

    // ── Subscription updated (e.g. cancel scheduled) ───────────────────────
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const userId = sub.metadata?.user_id;
      if (!userId) break;

      try {
        await admin.from("subscriptions").update({
          status: sub.status,
          cancel_at_period_end: sub.cancel_at_period_end,
          canceled_at: safeDateISO(sub.canceled_at ?? null),
          current_period_start: safeDateISO(getPeriod(sub).start),
          current_period_end: safeDateISO(getPeriod(sub).end),
          updated_at: new Date().toISOString(),
        }).eq("id", sub.id);
      } catch (err) {
        console.error("Failed to update subscription:", err);
      }
      break;
    }

    // ── Subscription canceled ──────────────────────────────────────────────
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      try {
        await admin.from("subscriptions").update({
          status: "canceled",
          canceled_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }).eq("id", sub.id);
        console.log(`❌ Subscription canceled: ${sub.id}`);
      } catch (err) {
        console.error("Failed to update canceled subscription:", err);
      }
      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`⏰ Checkout session expired: ${session.id}`);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
