"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/useLanguage";
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
  const [loading, setLoading] = useState(false);

  const isCustom = exercise.name_fr === "__custom__";
  const name = locale === "fr" ? exercise.name_fr : (exercise.name_en || exercise.name_fr);

  const handleToggle = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/portal/workouts/${programId}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exerciseId: exercise.id,
          completed: isCompleted,
        }),
      });
      if (res.ok) {
        onToggle();
      }
    } catch (err) {
      console.error("Toggle exercise error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (isCustom) {
    return (
      <div className="p-4 rounded-lg border bg-white border-gray-100">
        <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
          {exercise.description_fr}
        </p>
      </div>
    );
  }

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
        {exercise.description_fr && (
          <p className={`text-xs mt-0.5 ${isCompleted ? "text-gray-300" : "text-gray-400"}`}>
            {exercise.description_fr}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 text-sm text-gray-500 flex-shrink-0">
        <span>
          {locale === "fr"
            ? `${exercise.sets} séries de ${exercise.reps} répétitions`
            : `${exercise.sets} sets × ${exercise.reps} reps`}
        </span>
        <span className="text-gray-300">•</span>
        <span>
          {locale === "fr"
            ? `${exercise.rest_seconds} sec de repos`
            : `${exercise.rest_seconds}s rest`}
        </span>
      </div>
    </div>
  );
}
