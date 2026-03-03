import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest, nonce?: string) {
  // Helper: create NextResponse with optional nonce in request headers
  function nextResponse() {
    if (nonce) {
      const headers = new Headers(request.headers);
      headers.set("x-nonce", nonce);
      return NextResponse.next({ request: { headers } });
    }
    return NextResponse.next({ request });
  }

  let supabaseResponse = nextResponse();

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = nextResponse();
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Redirect unauthenticated users away from /portal
    if (!user && request.nextUrl.pathname.startsWith("/portal")) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      url.searchParams.set("login", "required");
      return NextResponse.redirect(url);
    }

    // Redirect non-coaches away from /portal/coach
    if (user && request.nextUrl.pathname.startsWith("/portal/coach")) {
      // Use admin client (service role) to bypass RLS for role check
      const admin = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      const { data: profile } = await admin
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role !== "coach") {
        const url = request.nextUrl.clone();
        url.pathname = "/portal";
        return NextResponse.redirect(url);
      }
    }

    return supabaseResponse;
  } catch (error) {
    console.error("Middleware auth error:", error);
    return supabaseResponse;
  }
}
