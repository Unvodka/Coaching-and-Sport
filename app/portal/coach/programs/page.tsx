"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import type { WorkoutProgram } from "@/lib/supabase/database.types";

interface SimpleUser {
  id: string;
  full_name: string | null;
  email: string;
  role: string;
}

interface ProgramWithAssignments extends WorkoutProgram {
  assignment_count: number;
  assigned_user_ids: string[];
}

const DIFFICULTY_COLORS = {
  none: "bg-gray-100 text-gray-500",
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-yellow-100 text-yellow-700",
  advanced: "bg-red-100 text-red-700",
};

const DIFFICULTY_LABELS = {
  none: { fr: "Aucun", en: "None" },
  beginner: { fr: "Débutant", en: "Beginner" },
  intermediate: { fr: "Intermédiaire", en: "Intermediate" },
  advanced: { fr: "Avancé", en: "Advanced" },
};

type FilterValue = "all" | "unassigned" | string;

export default function CoachProgramsPage() {
  const { t, locale } = useLanguage();
  const [programs, setPrograms] = useState<ProgramWithAssignments[]>([]);
  const [users, setUsers] = useState<SimpleUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<FilterValue>("all");

  const fetchData = useCallback(async () => {
    try {
      const [programsRes, usersRes] = await Promise.all([
        fetch("/api/portal/coach/programs"),
        fetch("/api/portal/coach/users"),
      ]);

      if (programsRes.ok) {
        const json = await programsRes.json();
        setPrograms(json.programs || []);
      }
      if (usersRes.ok) {
        const json = await usersRes.json();
        // Filter out coaches, keep only regular users
        setUsers((json.users || []).filter((u: SimpleUser) => u.role !== "coach"));
      }
    } catch (err) {
      console.error("Coach programs fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  // Filter programs based on selected user
  const filteredPrograms = programs.filter((p) => {
    if (selectedUser === "all") return true;
    if (selectedUser === "unassigned") return p.assigned_user_ids.length === 0;
    return p.assigned_user_ids.includes(selectedUser);
  });

  // Build user options: only users who have at least one assigned program
  const usersWithPrograms = users.filter((u) =>
    programs.some((p) => p.assigned_user_ids.includes(u.id))
  );

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex justify-between">
          <div className="h-8 bg-gray-200 rounded w-64 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-40 animate-pulse" />
        </div>
        <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
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
      {/* Header */}
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

      {/* User filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedUser("all")}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              selectedUser === "all"
                ? "bg-brand-blue text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {locale === "fr" ? "Tous" : "All"} ({programs.length})
          </button>
          <button
            onClick={() => setSelectedUser("unassigned")}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              selectedUser === "unassigned"
                ? "bg-brand-blue text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {locale === "fr" ? "Non assignés" : "Unassigned"} ({programs.filter((p) => p.assigned_user_ids.length === 0).length})
          </button>
          {usersWithPrograms.map((user) => {
            const count = programs.filter((p) => p.assigned_user_ids.includes(user.id)).length;
            return (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  selectedUser === user.id
                    ? "bg-brand-blue text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {user.full_name || user.email} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Programs list */}
      {filteredPrograms.length === 0 ? (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl p-8 text-center">
          <svg className="w-16 h-16 mx-auto text-green-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h3 className="text-lg font-semibold text-heading mb-2">
            {selectedUser === "all"
              ? (locale === "fr" ? "Pas encore de programmes" : "No programs yet")
              : (locale === "fr" ? "Aucun programme pour ce filtre" : "No programs for this filter")}
          </h3>
          {selectedUser === "all" && (
            <p className="text-gray-500">
              {locale === "fr"
                ? "Créez votre premier programme d'entraînement."
                : "Create your first workout program."}
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPrograms.map((program) => {
            const title = locale === "fr" ? program.title_fr : program.title_en || program.title_fr;
            const description = locale === "fr" ? program.description_fr : program.description_en || program.description_fr;
            const difficulty = program.difficulty as keyof typeof DIFFICULTY_COLORS;

            // Get assigned user names
            const assignedNames = program.assigned_user_ids
              .map((uid) => {
                const u = users.find((user) => user.id === uid);
                return u ? (u.full_name || u.email) : null;
              })
              .filter(Boolean);

            return (
              <div
                key={program.id}
                className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
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
                    </div>
                    <h3 className="font-semibold text-heading">{title}</h3>
                    {description && (
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1">{description}</p>
                    )}
                    {assignedNames.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                        <span className="text-xs text-gray-500">
                          {assignedNames.join(", ")}
                        </span>
                      </div>
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
