import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api/auth";

export const dynamic = 'force-dynamic';

export async function GET() {
  return withAuth(async ({ user, admin }) => {
    const [recipesRes, weightRes, moodRes, publicProgramsRes, assignedProgramsRes] = await Promise.all([
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
        .from("workout_programs")
        .select("id", { count: "exact", head: true })
        .eq("is_public", true),
      admin
        .from("program_assignments")
        .select("program_id", { count: "exact", head: true })
        .eq("user_id", user.id),
    ]);

    // Total available programs = public + assigned (with dedup handled on the page)
    const publicCount = publicProgramsRes.count ?? 0;
    const assignedCount = assignedProgramsRes.count ?? 0;
    const programCount = Math.max(publicCount, assignedCount);

    return NextResponse.json({
      recipes: recipesRes.count ?? 0,
      weightLogs: weightRes.count ?? 0,
      moodEntries: moodRes.count ?? 0,
      workoutsCompleted: programCount,
    }, {
      headers: { "Cache-Control": "private, no-cache" },
    });
  });
}
