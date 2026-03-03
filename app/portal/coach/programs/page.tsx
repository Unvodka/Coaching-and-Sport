import { redirect } from "next/navigation";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import CoachProgramsClient from "./CoachProgramsClient";

export const dynamic = "force-dynamic";

export default async function CoachProgramsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/?login=required");
  }

  const admin = createAdminClient();

  // Verify coach role
  const { data: profile } = await admin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "coach") {
    redirect("/portal");
  }

  // Fetch all programs
  const { data: programs } = await admin
    .from("workout_programs")
    .select("*")
    .order("created_at", { ascending: false });

  // Fetch assignments
  const programIds = (programs || []).map((p) => p.id);
  let assignments: { program_id: string; user_id: string }[] = [];
  if (programIds.length > 0) {
    const { data } = await admin
      .from("program_assignments")
      .select("program_id, user_id")
      .in("program_id", programIds);
    assignments = data || [];
  }

  const assignmentMap: Record<string, string[]> = {};
  assignments.forEach((a) => {
    if (!assignmentMap[a.program_id]) assignmentMap[a.program_id] = [];
    assignmentMap[a.program_id].push(a.user_id);
  });

  const programsWithAssignments = (programs || []).map((p) => ({
    ...p,
    assignment_count: (assignmentMap[p.id] || []).length,
    assigned_user_ids: assignmentMap[p.id] || [],
  }));

  // Fetch users (non-coaches)
  const { data: allUsers } = await admin
    .from("profiles")
    .select("id, full_name, email, role")
    .order("full_name");

  const users = (allUsers || []).filter((u) => u.role !== "coach");

  // Temporary debug info
  const debugInfo = {
    userId: user.id,
    programsCount: programs?.length ?? "null",
    assignmentsCount: assignments.length,
    usersCount: users.length,
    programsWithAssignmentsCount: programsWithAssignments.length,
    timestamp: new Date().toISOString(),
  };

  return (
    <>
      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs font-mono">
        <strong>DEBUG:</strong> {JSON.stringify(debugInfo)}
      </div>
      <CoachProgramsClient
        initialPrograms={programsWithAssignments}
        initialUsers={users}
      />
    </>
  );
}
