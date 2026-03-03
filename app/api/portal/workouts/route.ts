import { NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export async function GET() {
  // Inline auth (bypassing withAuth to diagnose the display issue)
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized", detail: authError?.message || "No session" },
        { status: 401 }
      );
    }

    const admin = createAdminClient();

    // Fetch public programs
    const { data: publicPrograms, error: publicError } = await admin
      .from("workout_programs")
      .select("*")
      .eq("is_public", true)
      .order("created_at", { ascending: false });

    if (publicError) {
      console.error("Fetch public programs error:", publicError);
    }

    // Fetch programs assigned to this user
    const { data: assignments, error: assignError } = await admin
      .from("program_assignments")
      .select("program_id, message, assigned_at, workout_programs(*)")
      .eq("user_id", user.id);

    if (assignError) {
      console.error("Fetch assignments error:", assignError);
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const assignedPrograms = (assignments || [])
      .filter((a: any) => a.workout_programs)
      .map((a: any) => ({
        ...a.workout_programs,
        assignment_message: a.message,
        assigned_at: a.assigned_at,
      }));
    /* eslint-enable @typescript-eslint/no-explicit-any */

    // Deduplicate: assigned programs that are also public
    const assignedIds = new Set(assignedPrograms.map((p) => p.id as string));
    const publicOnly = (publicPrograms || []).filter((p) => !assignedIds.has(p.id));

    // Check user role
    const { data: profile } = await admin
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    return NextResponse.json({
      publicPrograms: publicOnly,
      assignedPrograms,
      isCoach: profile?.role === "coach",
    }, {
      headers: { "Cache-Control": "private, no-cache" },
    });
  } catch (e) {
    console.error("Workouts GET error:", e);
    return NextResponse.json(
      { error: "Internal server error", detail: String(e) },
      { status: 500 }
    );
  }
}
