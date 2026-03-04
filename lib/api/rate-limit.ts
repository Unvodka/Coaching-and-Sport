import { NextResponse } from "next/server";

/**
 * In-memory rate limiter.
 *
 * ⚠️  IMPORTANT — Serverless limitation:
 * On Vercel (and similar serverless platforms), each function invocation may run
 * on a separate instance. This in-memory store is NOT shared across instances,
 * so the rate limit is per-instance, not globally enforced.
 *
 * This still provides meaningful protection against:
 *  - Rapid bursts from the same client hitting the same warm instance
 *  - Accidental repeated submissions in the browser
 *
 * For stronger, globally-enforced rate limiting, integrate a Redis-based
 * solution such as Upstash Rate Limit (@upstash/ratelimit + @upstash/redis).
 * See: https://upstash.com/docs/redis/sdks/ratelimit/overview
 */

interface RateEntry {
  count: number;
  resetAt: number;
}

// Module-level store — shared within a single warm serverless instance
const store = new Map<string, RateEntry>();

// Prune expired entries every 5 minutes to avoid unbounded memory growth
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
  /** Max requests allowed in the window. Default: 10 */
  limit?: number;
  /** Window duration in seconds. Default: 60 */
  windowSeconds?: number;
}

/**
 * Rate limit by IP + route key.
 * Returns null if the request is allowed, or a 429 NextResponse if it should be blocked.
 *
 * Usage:
 *   const rateLimitError = rateLimit(request.headers.get("x-forwarded-for"), "checkout", { limit: 5 });
 *   if (rateLimitError) return rateLimitError;
 */
export function rateLimit(
  ip: string | null,
  routeKey: string,
  options: RateLimitOptions = {}
): NextResponse | null {
  const { limit = 10, windowSeconds = 60 } = options;

  cleanup();

  // Normalize IP: x-forwarded-for can contain multiple IPs (proxies), take the first
  const clientIp = ip ? ip.split(",")[0].trim() : "unknown";
  const key = `${routeKey}:${clientIp}`;
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
      { error: "Trop de requêtes. Veuillez réessayer dans quelques instants." },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(limit),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.floor(entry.resetAt / 1000)),
        },
      }
    );
  }

  return null;
}
