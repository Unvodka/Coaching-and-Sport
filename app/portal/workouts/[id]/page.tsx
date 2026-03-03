import { redirect, notFound } from "next/navigation";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import WorkoutDetailClient from "./WorkoutDetailClient";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { id: string };
}

export default async function WorkoutDetailPage({ params }: PageProps) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/?login=required");
  }

  const admin = createAdminClient();
  const programId = params.id;

  const [programRes, exercisesRes, progressRes] = await Promise.all([
    admin.from("workout_programs").select("*").eq("id", programId).single(),
    admin
      .from("workout_exercises")
      .select("*")
      .eq("program_id", programId)
      .order("day_number")
      .order("order_index"),
    admin
      .from("user_workout_progress")
      .select("exercise_id")
      .eq("user_id", user.id)
      .eq("program_id", programId),
  ]);

  if (!programRes.data) {
    notFound();
  }

  const completedIds = (progressRes.data || []).map(
    (p: { exercise_id: string }) => p.exercise_id
  );

  return (
    <WorkoutDetailClient
      program={programRes.data}
      exercises={exercisesRes.data || []}
      initialCompletedIds={completedIds}
      programId={programId}
    />
  );
}
