import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "https://coach-bluewave.com",
  "https://www.coach-bluewave.com",
  "https://coaching-and-sport.vercel.app",
  "http://localhost:3000",
];

/**
 * Validates the request origin matches an allowed domain.
 * Returns null if valid, or an error response if invalid.
 */
export function validateOrigin(request: NextRequest): NextResponse | null {
  const origin = request.headers.get("origin");

  // Allow requests with no origin (server-side, Stripe webhooks, etc.)
  if (!origin) return null;

  if (!ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json(
      { error: "Forbidden — invalid origin" },
      { status: 403 }
    );
  }

  return null;
}
