import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { validateOrigin } from "@/lib/api/csrf";
import { rateLimit } from "@/lib/api/rate-limit";

// Allowed prices in cents — must match lib/constants.ts packs
const ALLOWED_PRICES: Record<number, string[]> = {
  6000: ["Séance Découverte", "Discovery Session", "Séance à l'unité", "Single Session"],
  7900: ["Coaching en Ligne", "Online Coaching"],
  14900: ["Coaching Premium", "Premium Coaching"],
  24900: ["Pack 5 Séances", "5-Session Pack"],
  49900: ["Pack 10 Séances", "10-Session Pack", "Transformation", "Transformation"],
  84900: ["Pack 20 Séances", "20-Session Pack"],
};

export async function POST(request: NextRequest) {
  // CSRF protection
  const originError = validateOrigin(request);
  if (originError) return originError;

  // Rate limit: 5 checkout attempts per minute per IP
  const rateLimitError = rateLimit(
    request.headers.get("x-forwarded-for"),
    "checkout",
    { limit: 5, windowSeconds: 60 }
  );
  if (rateLimitError) return rateLimitError;

  try {
    const { title, priceInCents } = await request.json();

    if (!title || !priceInCents) {
      return NextResponse.json(
        { error: "Titre et prix requis" },
        { status: 400 }
      );
    }

    // Validate price is an allowed value
    const allowedTitles = ALLOWED_PRICES[priceInCents];
    if (!allowedTitles) {
      return NextResponse.json(
        { error: "Prix invalide" },
        { status: 400 }
      );
    }

    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: title,
              description: `Coach-Bluewave - ${title}`,
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session de paiement" },
      { status: 500 }
    );
  }
}
