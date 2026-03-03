import { redirect } from "next/navigation";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import WorkoutsClient from "./WorkoutsClient";

export const dynamic = "force-dynamic";

export default async function WorkoutsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/?login=required");
  }

  const admin = createAdminClient();

  // Fetch public programs
  const { data: publicPrograms, error: publicError } = await admin
    .from("workout_programs")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  // Fetch programs assigned to this user
  const { data: assignments, error: assignError } = await admin
    .from("program_assignments")
    .select("program_id, message, assigned_at, workout_programs(*)")
    .eq("user_id", user.id);

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
  const assignedIds = new Set(assignedPrograms.map((p: { id: string }) => p.id));
  const publicOnly = (publicPrograms || []).filter((p) => !assignedIds.has(p.id));

  // Check user role
  const { data: profile } = await admin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  // Temporary debug info
  const debugInfo = {
    userId: user.id,
    publicProgramsCount: publicPrograms?.length ?? "null",
    publicError: publicError?.message ?? null,
    assignmentsCount: assignments?.length ?? "null",
    assignError: assignError?.message ?? null,
    assignedProgramsCount: assignedPrograms.length,
    publicOnlyCount: publicOnly.length,
    isCoach: profile?.role === "coach",
    timestamp: new Date().toISOString(),
  };

  return (
    <>
      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs font-mono">
        <strong>DEBUG:</strong> {JSON.stringify(debugInfo)}
      </div>
      <WorkoutsClient
        publicPrograms={publicOnly}
        assignedPrograms={assignedPrograms}
        isCoach={profile?.role === "coach"}
      />
    </>
  );
}
