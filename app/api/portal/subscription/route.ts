import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  return withAuth(async ({ user, admin }) => {
    // Fetch active/most recent subscription
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

    // Fetch payment history
    const { data: payments, error: payError } = await admin
      .from("subscription_payments")
      .select("*")
      .eq("user_id", user.id)
      .order("paid_at", { ascending: false })
      .limit(24);

    if (payError) {
      return NextResponse.json({ error: payError.message }, { status: 500 });
    }

    return NextResponse.json({ subscription, payments: payments ?? [] });
  });
}
