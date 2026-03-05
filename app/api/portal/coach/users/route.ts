import { NextResponse } from "next/server";
import { withCoach } from "@/lib/api/auth";

export const dynamic = 'force-dynamic';

export async function GET() {
  return withCoach(async ({ admin }) => {
    // Fetch all profiles
    const { data: profiles, error } = await admin
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Coach users list error:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    // Fetch counts for each user
    const userIds = (profiles || []).map((p) => p.id);

    const [weightCounts, moodCounts, assignmentCounts] = await Promise.all([
      admin
        .from("weight_logs")
        .select("user_id", { count: "exact", head: false })
        .in("user_id", userIds),
      admin
        .from("mood_entries")
        .select("user_id", { count: "exact", head: false })
        .in("user_id", userIds),
      admin
        .from("program_assignments")
        .select("user_id", { count: "exact", head: false })
        .in("user_id", userIds),
    ]);

    // Build count maps
    const countMap = (rows: { user_id: string }[] | null) => {
      const map: Record<string, number> = {};
      (rows || []).forEach((r) => {
        map[r.user_id] = (map[r.user_id] || 0) + 1;
      });
      return map;
    };

    const weightMap = countMap(weightCounts.data as { user_id: string }[] | null);
    const moodMap = countMap(moodCounts.data as { user_id: string }[] | null);
    const assignmentMap = countMap(assignmentCounts.data as { user_id: string }[] | null);

    const users = (profiles || []).map((p) => ({
      ...p,
      weight_count: weightMap[p.id] || 0,
      mood_count: moodMap[p.id] || 0,
      assignment_count: assignmentMap[p.id] || 0,
    }));

    return NextResponse.json({ users }, {
      headers: { "Cache-Control": "private, max-age=15" },
    });
  });
}
