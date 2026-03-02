"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import type { WorkoutProgram } from "@/lib/supabase/database.types";

interface ProgramWithCount extends WorkoutProgram {
  assignment_count: number;
}

const DIFFICULTY_COLORS = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-yellow-100 text-yellow-700",
  advanced: "bg-red-100 text-red-700",
};

const DIFFICULTY_LABELS = {
  beginner: { fr: "Débutant", en: "Beginner" },
  intermediate: { fr: "Intermédiaire", en: "Intermediate" },
  advanced: { fr: "Avancé", en: "Advanced" },
};

export default function CoachProgramsPage() {
  const { t, locale } = useLanguage();
  const [programs, setPrograms] = useState<ProgramWithCount[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPrograms = useCallback(async () => {
    try {
      const res = await fetch("/api/portal/coach/programs");
      if (res.ok) {
        const json = await res.json();
        setPrograms(json.programs || []);
      }
    } catch (err) {
      console.error("Coach programs fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  const handleDelete = async (id: string) => {
    const msg = locale === "fr"
      ? "Supprimer ce programme ? Cette action est irréversible."
      : "Delete this program? This action is irreversible.";
    if (!confirm(msg)) return;

    try {
      const res = await fetch(`/api/portal/coach/programs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPrograms((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Delete program error:", err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex justify-between">
          <div className="h-8 bg-gray-200 rounded w-64 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-40 animate-pulse" />
        </div>
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-1/2 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-heading font-heading">
          {t("portal.coach.programs.title")}
        </h2>
        <Link
          href="/portal/coach/programs/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity no-underline"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          {t("portal.coach.programs.new")}
        </Link>
      </div>

      {programs.length === 0 ? (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl p-8 text-center">
          <svg className="w-16 h-16 mx-auto text-green-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h3 className="text-lg font-semibold text-heading mb-2">
            {locale === "fr" ? "Pas encore de programmes" : "No programs yet"}
          </h3>
          <p className="text-gray-500">
            {locale === "fr"
              ? "Créez votre premier programme d'entraînement."
              : "Create your first workout program."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {programs.map((program) => {
            const title = locale === "fr" ? program.title_fr : program.title_en || program.title_fr;
            const description = locale === "fr" ? program.description_fr : program.description_en || program.description_fr;
            const difficulty = program.difficulty as keyof typeof DIFFICULTY_COLORS;

            return (
              <div
                key={program.id}
                className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${DIFFICULTY_COLORS[difficulty]}`}>
                        {DIFFICULTY_LABELS[difficulty]?.[locale] || difficulty}
                      </span>
                      <span className="text-xs text-gray-400">
                        {program.duration_weeks} {t("portal.workouts.weeks")}
                      </span>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        program.is_public
                          ? "bg-blue-50 text-blue-600"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {program.is_public ? t("portal.coach.programs.public") : t("portal.coach.programs.private")}
                      </span>
                      {program.assignment_count > 0 && (
                        <span className="text-xs text-gray-400">
                          {program.assignment_count} {t("portal.coach.programs.assignments")}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-heading">{title}</h3>
                    {description && (
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1">{description}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                      href={`/portal/coach/programs/${program.id}`}
                      className="px-3 py-1.5 text-sm font-medium text-brand-blue hover:bg-blue-50 rounded-lg transition-colors no-underline"
                    >
                      {t("portal.coach.programs.edit")}
                    </Link>
                    <button
                      onClick={() => handleDelete(program.id)}
                      className="px-3 py-1.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      {t("portal.coach.programs.delete")}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
