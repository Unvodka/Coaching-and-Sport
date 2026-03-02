import { NextRequest, NextResponse } from "next/server";
import { withCoach } from "@/lib/api/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;

  return withCoach(async ({ admin }) => {
    // Fetch profile
    const { data: profile, error: profileError } = await admin
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch assigned programs with program details
    const { data: assignments } = await admin
      .from("program_assignments")
      .select("*, workout_programs(*)")
      .eq("user_id", userId)
      .order("assigned_at", { ascending: false });

    // Fetch recent weight logs
    const { data: weightLogs } = await admin
      .from("weight_logs")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false })
      .limit(10);

    // Fetch recent mood entries
    const { data: moodEntries } = await admin
      .from("mood_entries")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false })
      .limit(10);

    // Fetch all programs (for assignment dropdown)
    const { data: allPrograms } = await admin
      .from("workout_programs")
      .select("id, title_fr, title_en, difficulty")
      .order("created_at", { ascending: false });

    return NextResponse.json({
      profile,
      assignments: assignments || [],
      weightLogs: weightLogs || [],
      moodEntries: moodEntries || [],
      allPrograms: allPrograms || [],
    });
  });
}
