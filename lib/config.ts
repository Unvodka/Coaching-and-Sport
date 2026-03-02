// ─── Environment Variable Validation ────────────────────────
// Validates required env vars at startup so errors surface early
// instead of crashing at runtime with cryptic messages.

function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val) {
    throw new Error(
      `Missing required environment variable: ${key}. ` +
        "Check .env.local or your hosting provider's env settings."
    );
  }
  return val;
}

function optionalEnv(key: string, fallback: string): string {
  return process.env[key] || fallback;
}

// ─── Public Config (safe for client & server) ───────────────

export const BASE_URL = optionalEnv(
  "NEXT_PUBLIC_APP_URL",
  "https://coach-bluewave.com"
);

export const SUPABASE_URL = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
export const SUPABASE_ANON_KEY = requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

// ─── Server-Only Config ─────────────────────────────────────
// These will throw at import time if missing on the server,
// but won't be bundled into the client.

export function getServerEnv() {
  return {
    supabaseServiceKey: requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
    stripeSecretKey: requireEnv("STRIPE_SECRET_KEY"),
    stripeWebhookSecret: optionalEnv("STRIPE_WEBHOOK_SECRET", ""),
  };
}

// ─── UUID Validation ────────────────────────────────────────

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isValidUUID(value: string): boolean {
  return UUID_REGEX.test(value);
}
