import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api/auth";

export async function GET() {
  return withAuth(async ({ user, admin }) => {
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
  });
}
