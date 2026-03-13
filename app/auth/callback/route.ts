import { NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/portal";

  if (!code) {
    return NextResponse.redirect(`${origin}/?auth_error=true`);
  }

  const supabase = createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("exchangeCodeForSession error:", error.message);
    return NextResponse.redirect(`${origin}/?auth_error=true`);
  }

  // Session exchanged successfully — always redirect to portal.
  // Profile upsert is best-effort: wrap fully so it NEVER blocks the redirect.
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const admin = createAdminClient();
      const { data: existingProfile } = await admin
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (!existingProfile) {
        await admin.from("profiles").insert({
          id: user.id,
          email: user.email || "",
          full_name:
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            "",
          avatar_url:
            user.user_metadata?.avatar_url ||
            user.user_metadata?.picture ||
            null,
        });
        // New user — redirect to programs page so they discover the offers
        return NextResponse.redirect(`${origin}/?welcome=1#offres`);
      }
    }
  } catch (profileError) {
    // Non-fatal — log and continue. The user can still access the portal.
    console.error("Profile upsert error (non-fatal):", profileError);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
