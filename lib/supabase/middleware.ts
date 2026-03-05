import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest, nonce?: string) {
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

    const path = request.nextUrl.pathname;

    // Logged-in users visiting the homepage → send them straight to portal.
    // This is the correct place for this redirect: server-side in middleware,
    // before the page renders. Avoids any client-side loop.
    if (user && path === "/") {
      const url = request.nextUrl.clone();
      url.pathname = "/portal";
      url.search = ""; // strip any ?login=required or ?auth_error params
      return NextResponse.redirect(url);
    }

    // Unauthenticated users trying to access portal → back to homepage
    if (!user && path.startsWith("/portal")) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      url.search = "";
      return NextResponse.redirect(url);
    }

    // Non-coaches trying to access /portal/coach → back to portal
    if (user && path.startsWith("/portal/coach")) {
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
