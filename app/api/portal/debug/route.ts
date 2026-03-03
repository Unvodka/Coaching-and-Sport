import { NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";

/**
 * Diagnostic endpoint — hit /api/portal/debug in the browser to see:
 * 1. Whether auth works (cookies → getUser)
 * 2. Whether admin client works (service role key)
 * 3. What programs exist in the database
 * 4. What assignments exist
 * 5. User's profile/role
 */
export async function GET() {
  const result: Record<string, unknown> = { timestamp: new Date().toISOString() };

  // Step 1: Check auth via cookie-based client
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    result.auth = {
      success: !!user,
      userId: user?.id || null,
      email: user?.email || null,
      error: authError?.message || null,
    };
  } catch (e) {
    result.auth = { success: false, error: String(e) };
  }

  // Step 2: Check admin client + fetch programs
  try {
    const admin = createAdminClient();

    // Check env vars presence (not values)
    result.env = {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      serviceRoleKeyLength: process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0,
    };

    // Fetch ALL programs
    const { data: programs, error: programsError } = await admin
      .from("workout_programs")
      .select("id, title_fr, is_public, coach_id, created_at")
      .order("created_at", { ascending: false })
      .limit(20);

    result.programs = {
      count: programs?.length || 0,
      data: programs || [],
      error: programsError?.message || null,
    };

    // Fetch ALL assignments
    const { data: assignments, error: assignError } = await admin
      .from("program_assignments")
      .select("program_id, user_id, assigned_by")
      .limit(50);

    result.assignments = {
      count: assignments?.length || 0,
      data: assignments || [],
      error: assignError?.message || null,
    };

    // Fetch user's profile if authenticated
    if (result.auth && (result.auth as Record<string, unknown>).userId) {
      const userId = (result.auth as Record<string, unknown>).userId as string;
      const { data: profile, error: profileError } = await admin
        .from("profiles")
        .select("id, role, full_name, email")
        .eq("id", userId)
        .single();

      result.profile = {
        data: profile || null,
        error: profileError?.message || null,
      };
    }
  } catch (e) {
    result.adminError = String(e);
  }

  return NextResponse.json(result, {
    headers: { "Cache-Control": "no-store" },
  });
}
