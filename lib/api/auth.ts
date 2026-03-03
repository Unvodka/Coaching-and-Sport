import { NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

interface AuthContext {
  user: User;
  admin: SupabaseClient;
}

interface AuthCoachContext extends AuthContext {
  isCoach: boolean;
}

/**
 * Wraps an API route handler with authentication.
 * Returns 401 if not authenticated, otherwise calls handler with user + admin client.
 */
export async function withAuth(
  handler: (ctx: AuthContext) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("withAuth: auth failed", { authError: authError?.message, hasUser: !!user });
      return NextResponse.json(
        { error: "Unauthorized", detail: authError?.message || "No user session" },
        { status: 401 }
      );
    }

    const admin = createAdminClient();
    return await handler({ user, admin });
  } catch (error) {
    console.error("API auth wrapper error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Like withAuth, but also fetches the user's role.
 * Context includes `isCoach` boolean.
 */
export async function withAuthAndRole(
  handler: (ctx: AuthCoachContext) => Promise<NextResponse>
): Promise<NextResponse> {
  return withAuth(async ({ user, admin }) => {
    const { data: profile, error: profileError } = await admin
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("withAuthAndRole: profile fetch error", { userId: user.id, error: profileError.message });
    }

    const isCoach = profile?.role === "coach";
    return handler({ user, admin, isCoach });
  });
}

/**
 * Requires coach role. Returns 403 if user is not a coach.
 */
export async function withCoach(
  handler: (ctx: AuthContext) => Promise<NextResponse>
): Promise<NextResponse> {
  return withAuthAndRole(async (ctx) => {
    if (!ctx.isCoach) {
      console.error("withCoach: user is not a coach", { userId: ctx.user.id, email: ctx.user.email });
      return NextResponse.json(
        { error: "Forbidden — coach role required", userId: ctx.user.id },
        { status: 403 }
      );
    }
    return handler(ctx);
  });
}
