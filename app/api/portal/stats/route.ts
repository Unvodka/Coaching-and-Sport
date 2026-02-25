import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [recipesRes, weightRes, moodRes, progressRes] = await Promise.all([
      supabase
        .from("recipes")
        .select("id", { count: "exact", head: true })
        .eq("author_id", user.id),
      supabase
        .from("weight_logs")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id),
      supabase
        .from("mood_entries")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id),
      supabase
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
