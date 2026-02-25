"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/supabase/AuthContext";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { createClient } from "@/lib/supabase/client";
import WorkoutProgramCard from "@/components/portal/WorkoutProgramCard";
import type { WorkoutProgram } from "@/lib/supabase/database.types";

export default function WorkoutsPage() {
  const { profile } = useAuth();
  const { locale } = useLanguage();
  const [programs, setPrograms] = useState<WorkoutProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const isCoach = profile?.role === "coach";

  useEffect(() => {
    async function fetchPrograms() {
      const supabase = createClient();
      const { data } = await supabase
        .from("workout_programs")
        .select("*")
        .order("created_at", { ascending: false });
      setPrograms((data as WorkoutProgram[]) || []);
      setLoading(false);
    }
    fetchPrograms();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div />
        {isCoach && (
          <Link
            href="/portal/workouts/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity no-underline"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            {locale === "fr" ? "Nouveau programme" : "New Program"}
          </Link>
        )}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-20 mb-3" />
              <div className="h-5 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : programs.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <p>{locale === "fr" ? "Aucun programme disponible" : "No programs available"}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {programs.map((program) => (
            <WorkoutProgramCard key={program.id} program={program} />
          ))}
        </div>
      )}
    </div>
  );
}
