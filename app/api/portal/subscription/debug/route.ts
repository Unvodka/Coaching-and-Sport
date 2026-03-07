import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api/auth";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

// Debug route — returns what email is in the profile and what Stripe customers match
export async function GET() {
  return withAuth(async ({ user, admin }) => {
    const { data: profile } = await admin
      .from("profiles")
      .select("email")
      .eq("id", user.id)
      .single();

    const email = profile?.email ?? null;
    const stripeCustomers: { id: string; email: string | null; subscriptions: number }[] = [];

    if (email) {
      const stripe = getStripe();
      const customers = await stripe.customers.list({ email, limit: 5 });
      for (const c of customers.data) {
        const subs = await stripe.subscriptions.list({ customer: c.id, status: "all", limit: 10 });
        stripeCustomers.push({ id: c.id, email: c.email, subscriptions: subs.data.length });
      }
    }

    return NextResponse.json({ profileEmail: email, stripeCustomers });
  });
}
