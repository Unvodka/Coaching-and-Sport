import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  throw new Error(
    "Missing STRIPE_SECRET_KEY environment variable. Set it in .env.local or your hosting provider."
  );
}

export const stripe = new Stripe(key, {
  typescript: true,
});
