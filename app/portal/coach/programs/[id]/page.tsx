"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLanguage } from "@/lib/i18n/useLanguage";
import WorkoutProgramForm from "@/components/portal/WorkoutProgramForm";
import type { WorkoutProgram, WorkoutExercise } from "@/lib/supabase/database.types";

export default function EditCoachProgramPage() {
  const params = useParams();
  const id = params.id as string;
  const { locale } = useLanguage();
  const [program, setProgram] = useState<WorkoutProgram | null>(null);
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [assignedUserIds, setAssignedUserIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProgram() {
      try {
        const res = await fetch(`/api/portal/coach/programs/${id}`);
        if (res.ok) {
          const json = await res.json();
          setProgram(json.program);
          setExercises(json.exercises || []);
          setAssignedUserIds(json.assignedUserIds || []);
        }
      } catch (err) {
        console.error("Edit program fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProgram();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-48" />
        <div className="h-12 bg-gray-200 rounded" />
        <div className="h-12 bg-gray-200 rounded" />
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

  return (
    <div>
      <h2 className="text-2xl font-bold text-heading font-heading mb-6">
        {locale === "fr" ? "Modifier le programme" : "Edit Program"}
      </h2>
      <WorkoutProgramForm program={program} exercises={exercises} assignedUserIds={assignedUserIds} />
    </div>
  );
}
