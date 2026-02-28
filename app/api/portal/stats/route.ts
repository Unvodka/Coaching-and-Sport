import { createClient, createAdminClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const admin = createAdminClient();

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
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
