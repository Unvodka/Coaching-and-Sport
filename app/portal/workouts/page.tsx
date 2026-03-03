"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import WorkoutProgramCard from "@/components/portal/WorkoutProgramCard";
import type { WorkoutProgram } from "@/lib/supabase/database.types";

export default function WorkoutsPage() {
  const { t, locale } = useLanguage();
  const [publicPrograms, setPublicPrograms] = useState<WorkoutProgram[]>([]);
  const [assignedPrograms, setAssignedPrograms] = useState<WorkoutProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCoach, setIsCoach] = useState(false);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const res = await fetch("/api/portal/workouts", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          setPublicPrograms(json.publicPrograms || []);
          setAssignedPrograms(json.assignedPrograms || []);
          setIsCoach(json.isCoach || false);
        }
      } catch (err) {
        console.error("Workouts page error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPrograms();
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

  const hasAssigned = assignedPrograms.length > 0;
  const hasPublic = publicPrograms.length > 0;
  const hasAny = hasAssigned || hasPublic;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div />
        {isCoach && (
          <Link
            href="/portal/coach/programs"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity no-underline"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            {locale === "fr" ? "Gérer les programmes" : "Manage Programs"}
          </Link>
        )}
      </div>

      {!hasAny ? (
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
        <>
          {/* Assigned programs section */}
          {hasAssigned && (
            <div>
              <h3 className="text-lg font-semibold text-heading mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t("portal.coach.assignedToYou")}
              </h3>
              <div className="space-y-4">
                {assignedPrograms.map((program) => (
                  <WorkoutProgramCard key={program.id} program={program} />
                ))}
              </div>
            </div>
          )}

          {/* Public programs */}
          {hasPublic && (
            <div>
              {hasAssigned && (
                <h3 className="text-lg font-semibold text-heading mb-3">
                  {locale === "fr" ? "Tous les programmes" : "All Programs"}
                </h3>
              )}
              <div className="space-y-4">
                {publicPrograms.map((program) => (
                  <WorkoutProgramCard key={program.id} program={program} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
