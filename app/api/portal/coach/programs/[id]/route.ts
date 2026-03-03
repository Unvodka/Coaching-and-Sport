import { NextRequest, NextResponse } from "next/server";
import { withCoach } from "@/lib/api/auth";
import { validateOrigin } from "@/lib/api/csrf";
import { rateLimit } from "@/lib/api/rate-limit";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withCoach(async ({ admin }) => {
    const { data: program, error } = await admin
      .from("workout_programs")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error || !program) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    const { data: exercises } = await admin
      .from("workout_exercises")
      .select("*")
      .eq("program_id", params.id)
      .order("day_number")
      .order("order_index");

    const { data: assignments } = await admin
      .from("program_assignments")
      .select("user_id")
      .eq("program_id", params.id);

    const assignedUserIds = (assignments || []).map((a) => a.user_id);

    return NextResponse.json({ program, exercises: exercises || [], assignedUserIds });
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const originError = validateOrigin(request);
  if (originError) return originError;

  const limited = rateLimit(request.headers.get("x-forwarded-for"), "coach-programs-update", { limit: 10 });
  if (limited) return limited;

  return withCoach(async ({ user, admin }) => {
    const body = await request.json();
    const {
      title_fr, title_en, description_fr, description_en,
      difficulty, duration_weeks, is_public, exercises,
    } = body;

    if (!title_fr || title_fr.trim().length === 0) {
      return NextResponse.json({ error: "Title (FR) is required" }, { status: 400 });
    }

    // Update program (only if owned by this coach)
    const { data: updated, error: updateError } = await admin
      .from("workout_programs")
      .update({
        title_fr: title_fr.trim(),
        title_en: (title_en || "").trim(),
        description_fr: (description_fr || "").trim(),
        description_en: (description_en || "").trim(),
        difficulty,
        duration_weeks: Number(duration_weeks) || 4,
        is_public: !!is_public,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .eq("coach_id", user.id)
      .select("id")
      .single();

    if (updateError || !updated) {
      console.error("Update program error:", updateError);
      return NextResponse.json({ error: "Program not found or access denied" }, { status: 404 });
    }

    // Replace exercises: delete old, insert new
    if (Array.isArray(exercises)) {
      await admin.from("workout_exercises").delete().eq("program_id", params.id);

      const exerciseData = exercises
        .filter((ex: { name_fr?: string }) => ex.name_fr && ex.name_fr.trim())
        .map((ex: { name_fr: string; name_en?: string; sets?: number; reps?: string; duration_seconds?: number | null; rest_seconds?: number; day_number?: number; specificity?: string }, i: number) => ({
          program_id: params.id,
          name_fr: ex.name_fr.trim(),
          name_en: (ex.name_en || "").trim(),
          sets: Number(ex.sets) || 3,
          reps: ex.reps || "10",
          duration_seconds: ex.duration_seconds != null ? Number(ex.duration_seconds) : null,
          rest_seconds: Number(ex.rest_seconds) || 60,
          day_number: Number(ex.day_number) || 1,
          description_fr: (ex.specificity || "").trim() || null,
          order_index: i,
        }));

      if (exerciseData.length > 0) {
        await admin.from("workout_exercises").insert(exerciseData);
      }
    }

    // Auto-assign public programs to all users
    if (is_public) {
      const { data: allUsers } = await admin
        .from("profiles")
        .select("id")
        .neq("role", "coach");

      if (allUsers && allUsers.length > 0) {
        const assignmentRows = allUsers.map((u) => ({
          program_id: params.id,
          user_id: u.id,
          assigned_by: user.id,
        }));
        const { error: assignError } = await admin
          .from("program_assignments")
          .upsert(assignmentRows, { onConflict: "program_id,user_id" });
        if (assignError) {
          console.error("Auto-assign public program error:", assignError);
        }
      }
    }

    return NextResponse.json({ success: true });
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const originError = validateOrigin(request);
  if (originError) return originError;

  const limited = rateLimit(request.headers.get("x-forwarded-for"), "coach-programs-delete", { limit: 10 });
  if (limited) return limited;

  return withCoach(async ({ user, admin }) => {
    const { data: deleted, error } = await admin
      .from("workout_programs")
      .delete()
      .eq("id", params.id)
      .eq("coach_id", user.id)
      .select("id")
      .single();

    if (error || !deleted) {
      console.error("Delete program error:", error);
      return NextResponse.json({ error: "Program not found or access denied" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  });
}
