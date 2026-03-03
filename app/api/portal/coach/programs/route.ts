import { NextRequest, NextResponse } from "next/server";
import { withCoach } from "@/lib/api/auth";
import { validateOrigin } from "@/lib/api/csrf";
import { rateLimit } from "@/lib/api/rate-limit";

export async function GET() {
  return withCoach(async ({ admin }) => {
    const { data: programs, error } = await admin
      .from("workout_programs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Coach programs list error:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

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

    const result = (programs || []).map((p) => ({
      ...p,
      assignment_count: (assignmentMap[p.id] || []).length,
      assigned_user_ids: assignmentMap[p.id] || [],
    }));

    return NextResponse.json({ programs: result }, {
      headers: { "Cache-Control": "private, no-cache" },
    });
  });
}

export async function POST(request: NextRequest) {
  const originError = validateOrigin(request);
  if (originError) return originError;

  const limited = rateLimit(request.headers.get("x-forwarded-for"), "coach-programs-create", { limit: 10 });
  if (limited) return limited;

  return withCoach(async ({ user, admin }) => {
    const body = await request.json();
    const {
      title_fr, title_en, description_fr, description_en,
      difficulty, duration_weeks, is_public, exercises,
    } = body;

    // Validation
    if (!title_fr || typeof title_fr !== "string" || title_fr.trim().length === 0) {
      return NextResponse.json({ error: "Title (FR) is required" }, { status: 400 });
    }
    if (title_fr.length > 255 || (title_en && title_en.length > 255)) {
      return NextResponse.json({ error: "Title too long" }, { status: 400 });
    }
    if (!["none", "beginner", "intermediate", "advanced"].includes(difficulty)) {
      return NextResponse.json({ error: "Invalid difficulty" }, { status: 400 });
    }
    const weeks = Number(duration_weeks);
    if (!Number.isInteger(weeks) || weeks < 1 || weeks > 52) {
      return NextResponse.json({ error: "Invalid duration" }, { status: 400 });
    }

    // Create program
    const { data: program, error: programError } = await admin
      .from("workout_programs")
      .insert({
        coach_id: user.id,
        title_fr: title_fr.trim(),
        title_en: (title_en || "").trim(),
        description_fr: (description_fr || "").trim(),
        description_en: (description_en || "").trim(),
        difficulty,
        duration_weeks: weeks,
        is_public: !!is_public,
      })
      .select("id")
      .single();

    if (programError || !program) {
      console.error("Create program error:", programError);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    // Insert exercises
    if (Array.isArray(exercises) && exercises.length > 0) {
      const exerciseData = exercises
        .filter((ex: { name_fr?: string }) => ex.name_fr && ex.name_fr.trim())
        .map((ex: { name_fr: string; name_en?: string; sets?: number; reps?: string; duration_seconds?: number | null; rest_seconds?: number; day_number?: number; specificity?: string }, i: number) => ({
          program_id: program.id,
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
        const { error: exError } = await admin.from("workout_exercises").insert(exerciseData);
        if (exError) console.error("Insert exercises error:", exError);
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
          program_id: program.id,
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

    return NextResponse.json({ id: program.id }, { status: 201 });
  });
}
