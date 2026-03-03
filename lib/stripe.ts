import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error(
        "Missing STRIPE_SECRET_KEY environment variable. Set it in .env.local or your hosting provider."
      );
    }
    _stripe = new Stripe(key, { typescript: true });
  }
  return _stripe;
}
