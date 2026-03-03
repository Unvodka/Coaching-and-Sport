"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import ExerciseItem from "@/components/portal/ExerciseItem";
import ProgressTracker from "@/components/portal/ProgressTracker";
import type {
  WorkoutProgram,
  WorkoutExercise,
} from "@/lib/supabase/database.types";

interface WorkoutDetailClientProps {
  program: WorkoutProgram;
  exercises: WorkoutExercise[];
  initialCompletedIds: string[];
  programId: string;
}

export default function WorkoutDetailClient({
  program,
  exercises,
  initialCompletedIds,
  programId,
}: WorkoutDetailClientProps) {
  const { locale } = useLanguage();
  const [completedIds, setCompletedIds] = useState<Set<string>>(
    new Set(initialCompletedIds)
  );

  const refreshProgress = useCallback(async () => {
    try {
      const res = await fetch(`/api/portal/workouts/${programId}/progress`);
      if (res.ok) {
        const json = await res.json();
        setCompletedIds(new Set(json.completedIds || []));
      }
    } catch (err) {
      console.error("Failed to refresh progress:", err);
    }
  }, [programId]);

  const title =
    locale === "fr" ? program.title_fr : program.title_en || program.title_fr;
  const description =
    locale === "fr"
      ? program.description_fr
      : program.description_en || program.description_fr;

  const isCustom =
    exercises.length === 1 && exercises[0].name_fr === "__custom__";

  const dayGroups = isCustom
    ? {}
    : exercises.reduce<Record<number, WorkoutExercise[]>>((acc, ex) => {
        const day = ex.day_number;
        if (!acc[day]) acc[day] = [];
        acc[day].push(ex);
        return acc;
      }, {});

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

      {isCustom ? (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
            {exercises[0].description_fr}
          </p>
        </div>
      ) : (
        <>
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
                    onToggle={refreshProgress}
                  />
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
