"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/lib/supabase/AuthContext";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { createClient } from "@/lib/supabase/client";
import ExerciseItem from "@/components/portal/ExerciseItem";
import ProgressTracker from "@/components/portal/ProgressTracker";
import type {
  WorkoutProgram,
  WorkoutExercise,
} from "@/lib/supabase/database.types";

export default function WorkoutDetailPage() {
  const params = useParams();
  const programId = params.id as string;
  const { user } = useAuth();
  const { locale } = useLanguage();

  const [program, setProgram] = useState<WorkoutProgram | null>(null);
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user) return;
    const supabase = createClient();

    const [programRes, exercisesRes, progressRes] = await Promise.all([
      supabase.from("workout_programs").select("*").eq("id", programId).single(),
      supabase
        .from("workout_exercises")
        .select("*")
        .eq("program_id", programId)
        .order("day_number")
        .order("order_index"),
      supabase
        .from("user_workout_progress")
        .select("exercise_id")
        .eq("user_id", user.id)
        .eq("program_id", programId),
    ]);

    setProgram(programRes.data as WorkoutProgram | null);
    setExercises((exercisesRes.data as WorkoutExercise[]) || []);
    setCompletedIds(
      new Set((progressRes.data || []).map((p) => p.exercise_id))
    );
    setLoading(false);
  }, [user, programId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-32 bg-gray-200 rounded" />
      </div>
    );
  }

  if (!program) {
    return (
      <div className="text-center py-12 text-gray-500">
        {locale === "fr" ? "Programme introuvable" : "Program not found"}
      </div>
    );
  }

  const title = locale === "fr" ? program.title_fr : (program.title_en || program.title_fr);
  const description = locale === "fr" ? program.description_fr : (program.description_en || program.description_fr);

  // Group exercises by day
  const dayGroups = exercises.reduce<Record<number, WorkoutExercise[]>>(
    (acc, ex) => {
      const day = ex.day_number;
      if (!acc[day]) acc[day] = [];
      acc[day].push(ex);
      return acc;
    },
    {}
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-heading font-heading">
          {title}
        </h2>
        {description && (
          <p className="text-gray-500 mt-2">{description}</p>
        )}
      </div>

      <ProgressTracker
        completed={completedIds.size}
        total={exercises.length}
      />

      {Object.entries(dayGroups).map(([day, dayExercises]) => (
        <div key={day}>
          <h3 className="font-semibold text-heading mb-3">
            {locale === "fr" ? `Jour ${day}` : `Day ${day}`}
          </h3>
          <div className="space-y-3">
            {dayExercises.map((exercise) => (
              <ExerciseItem
                key={exercise.id}
                exercise={exercise}
                programId={programId}
                isCompleted={completedIds.has(exercise.id)}
                onToggle={fetchData}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
