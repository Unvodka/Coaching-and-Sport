import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { sendPaymentConfirmation } from "@/lib/email";
import Stripe from "stripe";

// Stripe sends raw body — disable Next.js body parsing
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET environment variable");
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const amount = session.amount_total || 0;
      const customerEmail = session.customer_email || session.customer_details?.email;

      console.log(
        `✅ Payment successful: ${session.id}`,
        `| Amount: ${amount / 100}€`,
        `| Customer: ${customerEmail || "N/A"}`
      );

      // Retrieve line items to get product title
      let productTitle = "Coach-Bluewave";
      try {
        const lineItems = await getStripe().checkout.sessions.listLineItems(session.id, { limit: 1 });
        if (lineItems.data.length > 0) {
          productTitle = lineItems.data[0].description || productTitle;
        }
      } catch (err) {
        console.error("Failed to retrieve line items:", err);
      }

      // Send confirmation emails (non-blocking)
      if (customerEmail) {
        try {
          await sendPaymentConfirmation({
            customerEmail,
            amount,
            productTitle,
          });
          console.log(`📧 Confirmation emails sent for session ${session.id}`);
        } catch (err) {
          console.error("Failed to send confirmation emails:", err);
        }
      }

      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`⏰ Checkout session expired: ${session.id}`);
      break;
    }

    default:
      // Unhandled event type — just acknowledge it
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
