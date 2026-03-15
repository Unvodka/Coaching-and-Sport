import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

function buildCsp(nonce: string) {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://www.google-analytics.com https://js.stripe.com`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https://images.unsplash.com https://*.supabase.co https://lh3.googleusercontent.com",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://*.supabase.co https://api.emailjs.com https://www.google-analytics.com https://www.googletagmanager.com https://api.stripe.com",
    "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export async function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const path = request.nextUrl.pathname;

  // Run auth session refresh on homepage too — needed so the Supabase
  // session cookie is valid immediately after Google OAuth redirects back.
  // Also run on portal, auth, and API portal routes as before.
  const needsAuth =
    path === "/" ||
    path.startsWith("/portal") ||
    path.startsWith("/auth") ||
    path.startsWith("/api/portal");

  let response: NextResponse;

  if (needsAuth) {
    response = await updateSession(request, nonce);
  } else {
    const headers = new Headers(request.headers);
    headers.set("x-nonce", nonce);
    response = NextResponse.next({ request: { headers } });
  }

  // Set CSP on page responses (skip API routes — they return JSON)
  if (!path.startsWith("/api/")) {
    response.headers.set("Content-Security-Policy", buildCsp(nonce));
  }

  return response;
}

export const config = {
  matcher: [
    // Match all routes except static files
    "/((?!_next/static|_next/image|favicon|images/).*)",
  ],
};
