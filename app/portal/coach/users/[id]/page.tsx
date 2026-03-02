"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/useLanguage";
import type { Profile, WorkoutProgram, WeightLog, MoodEntry } from "@/lib/supabase/database.types";

interface Assignment {
  id: string;
  program_id: string;
  user_id: string;
  assigned_by: string;
  assigned_at: string;
  message: string | null;
  workout_programs: WorkoutProgram;
}

interface ProgramOption {
  id: string;
  title_fr: string;
  title_en: string;
  difficulty: string;
}

export default function CoachUserDetailPage() {
  const params = useParams();
  const userId = params.id as string;
  const { t, locale } = useLanguage();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([]);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [allPrograms, setAllPrograms] = useState<ProgramOption[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAssignForm, setShowAssignForm] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState("");
  const [assignMessage, setAssignMessage] = useState("");
  const [assigning, setAssigning] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/portal/coach/users/${userId}`);
      if (res.ok) {
        const json = await res.json();
        setProfile(json.profile);
        setAssignments(json.assignments || []);
        setWeightLogs(json.weightLogs || []);
        setMoodEntries(json.moodEntries || []);
        setAllPrograms(json.allPrograms || []);
      }
    } catch (err) {
      console.error("Coach user detail error:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const assignedProgramIds = new Set(assignments.map((a) => a.program_id));
  const availablePrograms = allPrograms.filter((p) => !assignedProgramIds.has(p.id));

  const handleAssign = async () => {
    if (!selectedProgramId) return;
    setAssigning(true);
    try {
      const res = await fetch("/api/portal/coach/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          program_id: selectedProgramId,
          user_ids: [userId],
          message: assignMessage || null,
        }),
      });
      if (res.ok) {
        setShowAssignForm(false);
        setSelectedProgramId("");
        setAssignMessage("");
        await fetchData();
      }
    } catch (err) {
      console.error("Assignment error:", err);
    } finally {
      setAssigning(false);
    }
  };

  const handleRemoveAssignment = async (programId: string) => {
    try {
      await fetch("/api/portal/coach/assignments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ program_id: programId, user_id: userId }),
      });
      await fetchData();
    } catch (err) {
      console.error("Remove assignment error:", err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32" />
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-200 rounded w-48" />
              <div className="h-4 bg-gray-200 rounded w-64" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12 text-gray-500">
        {locale === "fr" ? "Utilisateur introuvable" : "User not found"}
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-gray-800";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        href="/portal/coach/users"
        className="text-sm text-brand-blue hover:underline no-underline"
      >
        {locale === "fr" ? "← Retour aux utilisateurs" : "← Back to users"}
      </Link>

      {/* Profile card */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-4">
          {profile.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={profile.full_name || ""}
              width={64}
              height={64}
              className="rounded-full"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-brand-blue flex items-center justify-center text-white text-2xl font-bold">
              {(profile.full_name || profile.email).charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold text-heading">
              {profile.full_name || profile.email}
            </h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                profile.role === "coach"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600"
              }`}>
                {profile.role}
              </span>
              <span className="text-xs text-gray-400">
                {t("portal.coach.users.joined")} {new Date(profile.created_at).toLocaleDateString(locale)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-2xl font-bold text-heading">{assignments.length}</p>
          <p className="text-xs text-gray-500">{t("portal.coach.users.assignedPrograms")}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-2xl font-bold text-heading">{weightLogs.length}</p>
          <p className="text-xs text-gray-500">{t("portal.coach.users.weightEntries")}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-2xl font-bold text-heading">{moodEntries.length}</p>
          <p className="text-xs text-gray-500">{t("portal.coach.users.moodEntries")}</p>
        </div>
      </div>

      {/* Assigned programs */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-heading">{t("portal.coach.users.assignedPrograms")}</h3>
          <button
            onClick={() => setShowAssignForm(!showAssignForm)}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            {t("portal.coach.users.assignProgram")}
          </button>
        </div>

        {/* Assign form */}
        {showAssignForm && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-3">
            {availablePrograms.length === 0 ? (
              <p className="text-sm text-gray-500">
                {locale === "fr" ? "Tous les programmes sont déjà assignés." : "All programs are already assigned."}
              </p>
            ) : (
              <>
                <select
                  value={selectedProgramId}
                  onChange={(e) => setSelectedProgramId(e.target.value)}
                  className={inputClass}
                >
                  <option value="">
                    {locale === "fr" ? "Choisir un programme..." : "Choose a program..."}
                  </option>
                  {availablePrograms.map((p) => (
                    <option key={p.id} value={p.id}>
                      {locale === "fr" ? p.title_fr : p.title_en || p.title_fr} ({p.difficulty})
                    </option>
                  ))}
                </select>
                <textarea
                  placeholder={t("portal.coach.users.message")}
                  value={assignMessage}
                  onChange={(e) => setAssignMessage(e.target.value)}
                  rows={2}
                  className={inputClass}
                />
                <button
                  onClick={handleAssign}
                  disabled={!selectedProgramId || assigning}
                  className="px-4 py-2 bg-brand-blue text-white rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {assigning ? "..." : t("portal.coach.users.assign")}
                </button>
              </>
            )}
          </div>
        )}

        {assignments.length === 0 ? (
          <p className="text-sm text-gray-500">
            {locale === "fr" ? "Aucun programme assigné." : "No programs assigned."}
          </p>
        ) : (
          <div className="space-y-2">
            {assignments.map((a) => {
              const prog = a.workout_programs;
              const title = locale === "fr" ? prog.title_fr : prog.title_en || prog.title_fr;
              return (
                <div
                  key={a.id}
                  className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                >
                  <div>
                    <p className="font-medium text-heading text-sm">{title}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(a.assigned_at).toLocaleDateString(locale)}
                      {a.message && ` — ${a.message}`}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveAssignment(a.program_id)}
                    className="text-xs text-red-500 hover:text-red-700 font-medium"
                  >
                    {t("portal.coach.users.removeAssignment")}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recent weight logs */}
      {weightLogs.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-heading mb-3">
            {locale === "fr" ? "Dernières pesées" : "Recent Weight Logs"}
          </h3>
          <div className="space-y-1">
            {weightLogs.map((w) => (
              <div key={w.id} className="flex justify-between text-sm py-1.5 border-b border-gray-50 last:border-0">
                <span className="text-gray-600">{new Date(w.date).toLocaleDateString(locale)}</span>
                <span className="font-medium text-heading">{w.weight_kg} kg</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent mood entries */}
      {moodEntries.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-heading mb-3">
            {locale === "fr" ? "Dernières entrées journal" : "Recent Journal Entries"}
          </h3>
          <div className="space-y-1">
            {moodEntries.map((m) => (
              <div key={m.id} className="flex justify-between text-sm py-1.5 border-b border-gray-50 last:border-0">
                <span className="text-gray-600">{new Date(m.date).toLocaleDateString(locale)}</span>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500">
                    {locale === "fr" ? "Humeur" : "Mood"}: {m.mood_score}/10
                  </span>
                  <span className="text-gray-500">
                    {locale === "fr" ? "Énergie" : "Energy"}: {m.energy_level}/10
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
