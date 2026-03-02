import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api/auth";

export async function GET() {
  return withAuth(async ({ user, admin }) => {
    const [recipesRes, weightRes, moodRes, progressRes] = await Promise.all([
      admin
        .from("recipes")
        .select("id", { count: "exact", head: true })
        .or(`is_public.eq.true,author_id.eq.${user.id}`),
      admin
        .from("weight_logs")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id),
      admin
        .from("mood_entries")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id),
      admin
        .from("user_workout_progress")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id),
    ]);

    return NextResponse.json({
      recipes: recipesRes.count ?? 0,
      weightLogs: weightRes.count ?? 0,
      moodEntries: moodRes.count ?? 0,
      workoutsCompleted: progressRes.count ?? 0,
    });
  });
}
