import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api/auth";
import { getStripe } from "@/lib/stripe";
import { rateLimit } from "@/lib/api/rate-limit";

export async function POST(request: NextRequest) {
  const rateLimitError = rateLimit(
    request.headers.get("x-forwarded-for"),
    "cancel-sub",
    { limit: 3, windowSeconds: 60 }
  );
  if (rateLimitError) return rateLimitError;

  return withAuth(async ({ user, admin }) => {
    const { subscriptionId } = await request.json();

    if (!subscriptionId) {
      return NextResponse.json({ error: "subscriptionId requis" }, { status: 400 });
    }

    // Verify subscription belongs to this user
    const { data: sub, error: fetchError } = await admin
      .from("subscriptions")
      .select("*")
      .eq("id", subscriptionId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (fetchError || !sub) {
      return NextResponse.json({ error: "Abonnement introuvable" }, { status: 404 });
    }

    if (sub.status === "canceled") {
      return NextResponse.json({ error: "Abonnement déjà annulé" }, { status: 400 });
    }

    // Check minimum commitment
    const createdAt = new Date(sub.created_at);
    const now = new Date();
    const monthsElapsed = (now.getFullYear() - createdAt.getFullYear()) * 12
      + (now.getMonth() - createdAt.getMonth());

    if (monthsElapsed < sub.minimum_months) {
      const remaining = sub.minimum_months - monthsElapsed;
      return NextResponse.json({
        error: `Engagement minimum non atteint. Annulation possible dans ${remaining} mois.`,
        canCancelAt: new Date(
          createdAt.getFullYear(),
          createdAt.getMonth() + sub.minimum_months,
          createdAt.getDate()
        ).toISOString(),
      }, { status: 403 });
    }

    // Cancel at period end via Stripe
    await getStripe().subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    // Update local DB
    await admin.from("subscriptions").update({
      cancel_at_period_end: true,
      updated_at: new Date().toISOString(),
    }).eq("id", subscriptionId);

    return NextResponse.json({ success: true });
  });
}
