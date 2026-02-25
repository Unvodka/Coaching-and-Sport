"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { createClient } from "@/lib/supabase/client";
import WorkoutProgramCard from "@/components/portal/WorkoutProgramCard";
import type { WorkoutProgram } from "@/lib/supabase/database.types";

export default function WorkoutsPage() {
  const { locale } = useLanguage();
  const [programs, setPrograms] = useState<WorkoutProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCoach, setIsCoach] = useState(false);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();
          if (profile?.role === "coach") setIsCoach(true);
        }
        const { data, error } = await supabase
          .from("workout_programs")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) console.error("Workouts fetch error:", error);
        setPrograms((data as WorkoutProgram[]) || []);
      } catch (err) {
        console.error("Workouts page error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPrograms();
  }, []);

  // Safety timeout
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-end">
          <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-1/2 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      </div>
    );
  }

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

      {programs.length === 0 ? (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl p-8 text-center">
          <svg className="w-16 h-16 mx-auto text-green-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h3 className="text-lg font-semibold text-heading mb-2">
            {locale === "fr"
              ? "Pas encore de programmes"
              : "No programs yet"}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {locale === "fr"
              ? "Les programmes d'entraînement apparaîtront ici une fois créés par votre coach."
              : "Workout programs will appear here once created by your coach."}
          </p>
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
