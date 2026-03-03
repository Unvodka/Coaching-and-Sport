import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(async ({ user, admin }) => {
    const programId = params.id;

    const { data } = await admin
      .from("user_workout_progress")
      .select("exercise_id")
      .eq("user_id", user.id)
      .eq("program_id", programId);

    return NextResponse.json({
      completedIds: (data || []).map((p: { exercise_id: string }) => p.exercise_id),
    });
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(async ({ user, admin }) => {
    const programId = params.id;
    const { exerciseId, completed } = await request.json();

    if (!exerciseId) {
      return NextResponse.json({ error: "exerciseId required" }, { status: 400 });
    }

    if (completed) {
      await admin
        .from("user_workout_progress")
        .delete()
        .eq("user_id", user.id)
        .eq("exercise_id", exerciseId);
    } else {
      await admin.from("user_workout_progress").insert({
        user_id: user.id,
        program_id: programId,
        exercise_id: exerciseId,
      });
    }

    return NextResponse.json({ success: true });
  });
}
