"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import type { WorkoutProgram } from "@/lib/supabase/database.types";

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

interface WorkoutProgramCardProps {
  program: WorkoutProgram;
}

export default function WorkoutProgramCard({ program }: WorkoutProgramCardProps) {
  const { locale, t } = useLanguage();

  const title = locale === "fr" ? program.title_fr : (program.title_en || program.title_fr);
  const description = locale === "fr" ? program.description_fr : (program.description_en || program.description_fr);
  const difficulty = program.difficulty as keyof typeof DIFFICULTY_COLORS;

  return (
    <Link
      href={`/portal/workouts/${program.id}`}
      className="block bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow no-underline"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded-full ${DIFFICULTY_COLORS[difficulty]}`}
            >
              {DIFFICULTY_LABELS[difficulty]?.[locale] || difficulty}
            </span>
            <span className="text-xs text-gray-400">
              {program.duration_weeks} {t("portal.workouts.weeks")}
            </span>
          </div>
          <h3 className="font-semibold text-heading truncate">{title}</h3>
          {description && (
            <p className="text-sm text-gray-500 line-clamp-2 mt-1">
              {description}
            </p>
          )}
        </div>
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
