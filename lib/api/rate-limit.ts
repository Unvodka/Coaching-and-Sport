import { NextResponse } from "next/server";

interface RateEntry {
  count: number;
  resetAt: number;
}

// In-memory store — resets on cold start (fine for Vercel serverless)
const store = new Map<string, RateEntry>();

// Clean up old entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  store.forEach((entry, key) => {
    if (now > entry.resetAt) store.delete(key);
  });
}

interface RateLimitOptions {
  /** Max requests allowed in the window */
  limit?: number;
  /** Window duration in seconds */
  windowSeconds?: number;
}

/**
 * Rate limit by IP address.
 * Returns null if allowed, or a 429 response if rate limited.
 */
export function rateLimit(
  ip: string | null,
  routeKey: string,
  options: RateLimitOptions = {}
): NextResponse | null {
  const { limit = 10, windowSeconds = 60 } = options;

  cleanup();

  const key = `${routeKey}:${ip || "unknown"}`;
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return null;
  }

  entry.count++;

  if (entry.count > limit) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfter) },
      }
    );
  }

  return null;
}
