import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api/auth";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function GET() {
  return withAuth(async ({ user, admin }) => {
    const { data: profile } = await admin
      .from("profiles")
      .select("email")
      .eq("id", user.id)
      .single();

    const email = profile?.email ?? null;
    if (!email) return NextResponse.json({ error: "No email" });

    const stripe = getStripe();
    const customers = await stripe.customers.list({ email, limit: 5 });

    const result = [];
    for (const c of customers.data) {
      const subs = await stripe.subscriptions.list({ customer: c.id, status: "all", limit: 10 });
      for (const sub of subs.data) {
        const s = sub as unknown as Record<string, unknown>;
        const invoices = await stripe.invoices.list({ subscription: sub.id, limit: 10 });
        result.push({
          sub_id: sub.id,
          status: sub.status,
          current_period_start: s.current_period_start,
          current_period_end: s.current_period_end,
          canceled_at: sub.canceled_at,
          metadata: sub.metadata,
          invoices: invoices.data.map(inv => {
            const inv2 = inv as unknown as Record<string, unknown>;
            return {
              id: inv.id,
              status: inv.status,
              amount_paid: inv.amount_paid,
              amount_due: inv.amount_due,
              subscription: inv2.subscription,
              hosted_invoice_url: inv.hosted_invoice_url,
              paid_at: inv.status_transitions?.paid_at,
            };
          }),
        });
      }
    }

    return NextResponse.json({ email, customers: customers.data.length, subscriptions: result });
  });
}
