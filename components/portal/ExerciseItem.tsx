"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { useAuth } from "@/lib/supabase/AuthContext";
import { createClient } from "@/lib/supabase/client";
import type { WorkoutExercise } from "@/lib/supabase/database.types";

interface ExerciseItemProps {
  exercise: WorkoutExercise;
  programId: string;
  isCompleted: boolean;
  onToggle: () => void;
}

export default function ExerciseItem({
  exercise,
  programId,
  isCompleted,
  onToggle,
}: ExerciseItemProps) {
  const { locale, t } = useLanguage();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const name = locale === "fr" ? exercise.name_fr : (exercise.name_en || exercise.name_fr);

  const handleToggle = async () => {
    if (!user) return;
    setLoading(true);
    const supabase = createClient();

    if (isCompleted) {
      await supabase
        .from("user_workout_progress")
        .delete()
        .eq("user_id", user.id)
        .eq("exercise_id", exercise.id);
    } else {
      await supabase.from("user_workout_progress").insert({
        user_id: user.id,
        program_id: programId,
        exercise_id: exercise.id,
      });
    }

    setLoading(false);
    onToggle();
  };

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
        isCompleted
          ? "bg-green-50 border-green-200"
          : "bg-white border-gray-100"
      }`}
    >
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
          isCompleted
            ? "bg-green-500 border-green-500"
            : "border-gray-300 hover:border-brand-blue"
        }`}
      >
        {isCompleted && (
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`font-medium ${
            isCompleted ? "text-gray-400 line-through" : "text-heading"
          }`}
        >
          {name}
        </p>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500 flex-shrink-0">
        <span>
          {exercise.sets} {t("portal.workouts.sets")}
        </span>
        <span>
          {exercise.reps} {t("portal.workouts.reps")}
        </span>
        <span>
          {exercise.rest_seconds}s {t("portal.workouts.rest")}
        </span>
      </div>
    </div>
  );
}
