"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/useLanguage";
import type { WorkoutProgram, WorkoutExercise } from "@/lib/supabase/database.types";

interface SimpleUser {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
}

interface ExerciseInput {
  name_fr: string;
  name_en: string;
  sets: number;
  reps: string;
  duration_seconds: number | null;
  duration_unit: "sec" | "min";
  rest_seconds: number;
  rest_unit: "sec" | "min";
  day_number: number;
  specificity: string;
}

interface WorkoutProgramFormProps {
  program?: WorkoutProgram;
  exercises?: WorkoutExercise[];
  assignedUserIds?: string[];
}

export default function WorkoutProgramForm({ program, exercises: existingExercises, assignedUserIds }: WorkoutProgramFormProps) {
  const router = useRouter();
  const { locale } = useLanguage();
  const isEditing = !!program;

  // Detect custom mode from existing data
  const existingIsCustom = existingExercises?.length === 1 && existingExercises[0].name_fr === "__custom__";

  const [title_fr, setTitleFr] = useState(program?.title_fr || "");
  const [title_en, setTitleEn] = useState(program?.title_en || "");
  const [description_fr, setDescriptionFr] = useState(program?.description_fr || "");
  const [description_en, setDescriptionEn] = useState(program?.description_en || "");
  const [difficulty, setDifficulty] = useState<string>(program?.difficulty || "intermediate");
  const [duration_weeks, setDurationWeeks] = useState(program?.duration_weeks || 4);
  const [is_public, setIsPublic] = useState(program?.is_public ?? true);
  const [isCustom, setIsCustom] = useState(existingIsCustom || false);
  const [customText, setCustomText] = useState(existingIsCustom ? (existingExercises![0].description_fr || "") : "");
  const [exercises, setExercises] = useState<ExerciseInput[]>(
    (existingExercises && !existingIsCustom) ? existingExercises.map((ex) => {
      const restMin = ex.rest_seconds >= 60 && ex.rest_seconds % 60 === 0;
      const dur = ex.duration_seconds;
      const durMin = dur != null && dur >= 60 && dur % 60 === 0;
      return {
        name_fr: ex.name_fr,
        name_en: ex.name_en,
        sets: ex.sets,
        reps: ex.reps,
        duration_seconds: dur != null ? (durMin ? dur / 60 : dur) : null,
        duration_unit: durMin ? "min" as const : "sec" as const,
        rest_seconds: restMin ? ex.rest_seconds / 60 : ex.rest_seconds,
        rest_unit: restMin ? "min" as const : "sec" as const,
        day_number: ex.day_number,
        specificity: ex.description_fr || "",
      };
    }) : [{ name_fr: "", name_en: "", sets: 3, reps: "10", duration_seconds: null, duration_unit: "sec" as const, rest_seconds: 60, rest_unit: "sec" as const, day_number: 1, specificity: "" }]
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // User assignment
  const [allUsers, setAllUsers] = useState<SimpleUser[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(
    new Set(assignedUserIds || [])
  );
  const [userSearch, setUserSearch] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/portal/coach/users");
        if (res.ok) {
          const json = await res.json();
          setAllUsers(
            (json.users || []).filter((u: SimpleUser & { role?: string }) => u.role !== "coach")
          );
        }
      } catch (err) {
        console.error("Fetch users error:", err);
      }
    }
    fetchUsers();
  }, []);

  const filteredUsers = allUsers.filter((u) => {
    if (!userSearch) return true;
    const q = userSearch.toLowerCase();
    return u.full_name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  const toggleUser = (id: string) => {
    setSelectedUserIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedUserIds.size === allUsers.length) {
      setSelectedUserIds(new Set());
    } else {
      setSelectedUserIds(new Set(allUsers.map((u) => u.id)));
    }
  };

  const addExercise = () => {
    setExercises([
      ...exercises,
      { name_fr: "", name_en: "", sets: 3, reps: "10", duration_seconds: null, duration_unit: "sec" as const, rest_seconds: 60, rest_unit: "sec" as const, day_number: 1, specificity: "" },
    ]);
  };

  const removeExercise = (idx: number) => {
    setExercises(exercises.filter((_, i) => i !== idx));
  };

  const updateExercise = (idx: number, field: keyof ExerciseInput, value: string | number | null) => {
    const updated = [...exercises];
    updated[idx] = { ...updated[idx], [field]: value };
    setExercises(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      title_fr,
      title_en,
      description_fr,
      description_en,
      difficulty,
      duration_weeks,
      is_public,
      exercises: isCustom
        ? [{ name_fr: "__custom__", name_en: "", sets: 0, reps: "0", rest_seconds: 0, day_number: 1, duration_seconds: null, specificity: customText }]
        : exercises.map(({ rest_unit, rest_seconds, duration_unit, duration_seconds, ...ex }) => ({
            ...ex,
            rest_seconds: rest_unit === "min" ? rest_seconds * 60 : rest_seconds,
            duration_seconds: duration_seconds != null
              ? (duration_unit === "min" ? duration_seconds * 60 : duration_seconds)
              : null,
            specificity: ex.specificity,
          })),
    };

    try {
      const url = isEditing
        ? `/api/portal/coach/programs/${program.id}`
        : "/api/portal/coach/programs";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resJson = await res.json();

      if (!res.ok) {
        setError(resJson.error || "Error");
        setSaving(false);
        return;
      }

      // Assign to selected users
      const programId = isEditing ? program.id : resJson.id;
      if (selectedUserIds.size > 0) {
        await fetch("/api/portal/coach/assignments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            program_id: programId,
            user_ids: Array.from(selectedUserIds),
          }),
        });
      }

      // Remove assignments for users that were deselected (edit mode only)
      if (isEditing && assignedUserIds) {
        const removed = assignedUserIds.filter((id) => !selectedUserIds.has(id));
        for (const uid of removed) {
          await fetch("/api/portal/coach/assignments", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ program_id: program.id, user_id: uid }),
          });
        }
      }

      router.push("/portal/coach/programs");
      router.refresh();
    } catch {
      setError(locale === "fr" ? "Erreur de connexion" : "Connection error");
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-gray-800";

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {locale === "fr" ? "Titre (FR)" : "Title (FR)"}
          </label>
          <input
            type="text"
            required
            value={title_fr}
            onChange={(e) => setTitleFr(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {locale === "fr" ? "Titre (EN)" : "Title (EN)"}
          </label>
          <input
            type="text"
            value={title_en}
            onChange={(e) => setTitleEn(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {locale === "fr" ? "Description (FR)" : "Description (FR)"}
          </label>
          <textarea
            rows={3}
            value={description_fr}
            onChange={(e) => setDescriptionFr(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {locale === "fr" ? "Description (EN)" : "Description (EN)"}
          </label>
          <textarea
            rows={3}
            value={description_en}
            onChange={(e) => setDescriptionEn(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {locale === "fr" ? "Difficulté" : "Difficulty"}
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className={inputClass}
          >
            <option value="none">{locale === "fr" ? "Aucun" : "None"}</option>
            <option value="beginner">{locale === "fr" ? "Débutant" : "Beginner"}</option>
            <option value="intermediate">{locale === "fr" ? "Intermédiaire" : "Intermediate"}</option>
            <option value="advanced">{locale === "fr" ? "Avancé" : "Advanced"}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {locale === "fr" ? "Durée (semaines)" : "Duration (weeks)"}
          </label>
          <input
            type="number"
            min="1"
            max="52"
            value={duration_weeks}
            onChange={(e) => setDurationWeeks(parseInt(e.target.value))}
            className={inputClass}
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 pb-2.5">
            <input
              type="checkbox"
              checked={is_public}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="w-4 h-4 text-brand-blue rounded focus:ring-brand-blue"
            />
            <span className="text-sm text-gray-700">
              {locale === "fr" ? "Public" : "Public"}
            </span>
          </label>
        </div>
      </div>

      {/* Program type toggle */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-heading">
            {locale === "fr" ? "Contenu du programme" : "Program content"}
          </h3>
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setIsCustom(false)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                !isCustom ? "bg-white text-heading shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {locale === "fr" ? "Structuré" : "Structured"}
            </button>
            <button
              type="button"
              onClick={() => setIsCustom(true)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                isCustom ? "bg-white text-heading shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {locale === "fr" ? "Personnalisé" : "Custom"}
            </button>
          </div>
        </div>

        {isCustom ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {locale === "fr" ? "Programme libre" : "Free-form program"}
            </label>
            <textarea
              rows={10}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder={locale === "fr"
                ? "Décrivez le programme librement...\nEx:\nJour 1 — Haut du corps\n3x12 Développé couché 60kg\n4x10 Rowing barre\n..."
                : "Describe the program freely...\nE.g.:\nDay 1 — Upper body\n3x12 Bench press 60kg\n4x10 Barbell row\n..."}
              className={`${inputClass} font-mono text-sm leading-relaxed`}
            />
          </div>
        ) : (
        <>
        <div className="flex items-center justify-end mb-4">
          <button
            type="button"
            onClick={addExercise}
            className="text-sm text-brand-blue hover:underline"
          >
            + {locale === "fr" ? "Ajouter un exercice" : "Add exercise"}
          </button>
        </div>

        <div className="space-y-4">
          {exercises.map((ex, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">
                  #{idx + 1}
                </span>
                {exercises.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExercise(idx)}
                    className="text-red-400 hover:text-red-600 text-sm"
                  >
                    {locale === "fr" ? "Supprimer" : "Remove"}
                  </button>
                )}
              </div>
              {/* Row 1: Name + Day */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                <div className="md:col-span-3">
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    {locale === "fr" ? "Nom (FR)" : "Name (FR)"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={locale === "fr" ? "Ex: Squat" : "E.g. Squat"}
                    value={ex.name_fr}
                    onChange={(e) => updateExercise(idx, "name_fr", e.target.value)}
                    className={`${inputClass} text-sm`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    {locale === "fr" ? "Jour" : "Day"}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={ex.day_number}
                    onChange={(e) => {
                      const v = e.target.value;
                      updateExercise(idx, "day_number", v === "" ? "" as unknown as number : (parseInt(v) || 1));
                    }}
                    className={`${inputClass} text-sm`}
                  />
                </div>
              </div>
              {/* Row 2: Sets, Reps, Duration, Rest */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    {locale === "fr" ? "Séries" : "Sets"}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={ex.sets}
                    onChange={(e) => {
                      const v = e.target.value;
                      updateExercise(idx, "sets", v === "" ? "" as unknown as number : (parseInt(v) || 1));
                    }}
                    className={`${inputClass} text-sm`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    {locale === "fr" ? "Répétitions" : "Reps"}
                  </label>
                  <input
                    type="text"
                    value={ex.reps}
                    onChange={(e) => updateExercise(idx, "reps", e.target.value)}
                    className={`${inputClass} text-sm`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    {locale === "fr" ? "Durée" : "Duration"}
                  </label>
                  <div className="flex gap-1.5">
                    <input
                      type="number"
                      min="0"
                      placeholder="—"
                      value={ex.duration_seconds ?? ""}
                      onChange={(e) => {
                        const v = e.target.value;
                        updateExercise(idx, "duration_seconds", v === "" ? null : parseInt(v));
                      }}
                      className={`${inputClass} text-sm flex-1 min-w-0`}
                    />
                    <select
                      value={ex.duration_unit}
                      onChange={(e) => updateExercise(idx, "duration_unit", e.target.value)}
                      className="px-2 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none"
                    >
                      <option value="sec">sec</option>
                      <option value="min">min</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    {locale === "fr" ? "Repos" : "Rest"}
                  </label>
                  <div className="flex gap-1.5">
                    <input
                      type="number"
                      min="0"
                      value={ex.rest_seconds}
                      onChange={(e) => {
                        const v = e.target.value;
                        updateExercise(idx, "rest_seconds", v === "" ? "" as unknown as number : (parseInt(v) || 0));
                      }}
                      className={`${inputClass} text-sm flex-1 min-w-0`}
                    />
                    <select
                      value={ex.rest_unit}
                      onChange={(e) => updateExercise(idx, "rest_unit", e.target.value)}
                      className="px-2 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none"
                    >
                      <option value="sec">sec</option>
                      <option value="min">min</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* Row 3: Spécificité */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  {locale === "fr" ? "Spécificité" : "Specifics"}
                </label>
                <input
                  type="text"
                  placeholder={locale === "fr" ? "Ex: S1: 12 reps 20kg, S2: 10 reps 25kg, S3: 8 reps 30kg" : "E.g. S1: 12 reps 20kg, S2: 10 reps 25kg, S3: 8 reps 30kg"}
                  value={ex.specificity}
                  onChange={(e) => updateExercise(idx, "specificity", e.target.value)}
                  className={`${inputClass} text-sm`}
                />
              </div>
            </div>
          ))}
        </div>
        </>
        )}
      </div>

      {/* User Assignment */}
      <div>
        <h3 className="font-semibold text-heading mb-3">
          {locale === "fr" ? "Assigner aux utilisateurs" : "Assign to users"}
        </h3>
        {is_public ? (
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
            <p className="text-sm text-blue-700 flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {locale === "fr"
                ? "Programme public — sera automatiquement assigné à tous les utilisateurs."
                : "Public program — will be automatically assigned to all users."}
            </p>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <input
                type="text"
                placeholder={locale === "fr" ? "Rechercher un utilisateur..." : "Search user..."}
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none text-gray-800"
              />
              <button
                type="button"
                onClick={toggleAll}
                className="px-3 py-2 text-xs font-medium text-brand-blue hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap"
              >
                {selectedUserIds.size === allUsers.length
                  ? (locale === "fr" ? "Tout décocher" : "Deselect all")
                  : (locale === "fr" ? "Tout sélectionner" : "Select all")}
              </button>
            </div>
            {allUsers.length === 0 ? (
              <p className="text-sm text-gray-400 py-2">
                {locale === "fr" ? "Chargement des utilisateurs..." : "Loading users..."}
              </p>
            ) : filteredUsers.length === 0 ? (
              <p className="text-sm text-gray-400 py-2">
                {locale === "fr" ? "Aucun résultat" : "No results"}
              </p>
            ) : (
              <div className="max-h-60 overflow-y-auto space-y-1">
                {filteredUsers.map((user) => (
                  <label
                    key={user.id}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      selectedUserIds.has(user.id) ? "bg-blue-50" : "hover:bg-gray-100"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedUserIds.has(user.id)}
                      onChange={() => toggleUser(user.id)}
                      className="w-4 h-4 text-brand-blue rounded focus:ring-brand-blue"
                    />
                    {user.avatar_url ? (
                      <Image
                        src={user.avatar_url}
                        alt=""
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-brand-blue flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {(user.full_name || user.email).charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {user.full_name || user.email}
                      </p>
                      {user.full_name && (
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            )}
            {selectedUserIds.size > 0 && (
              <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
                {selectedUserIds.size} {locale === "fr" ? "utilisateur(s) sélectionné(s)" : "user(s) selected"}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving
            ? "..."
            : isEditing
            ? locale === "fr"
              ? "Enregistrer"
              : "Save"
            : locale === "fr"
            ? "Créer le programme"
            : "Create Program"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          {locale === "fr" ? "Annuler" : "Cancel"}
        </button>
      </div>
    </form>
  );
}
