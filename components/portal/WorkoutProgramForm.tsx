"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { createClient } from "@/lib/supabase/client";

interface ExerciseInput {
  name_fr: string;
  name_en: string;
  sets: number;
  reps: string;
  rest_seconds: number;
  day_number: number;
}

export default function WorkoutProgramForm() {
  const router = useRouter();
  const { locale } = useLanguage();
  const [title_fr, setTitleFr] = useState("");
  const [title_en, setTitleEn] = useState("");
  const [description_fr, setDescriptionFr] = useState("");
  const [description_en, setDescriptionEn] = useState("");
  const [difficulty, setDifficulty] = useState("intermediate");
  const [duration_weeks, setDurationWeeks] = useState(4);
  const [is_public, setIsPublic] = useState(true);
  const [exercises, setExercises] = useState<ExerciseInput[]>([
    { name_fr: "", name_en: "", sets: 3, reps: "10", rest_seconds: 60, day_number: 1 },
  ]);
  const [saving, setSaving] = useState(false);

  const addExercise = () => {
    setExercises([
      ...exercises,
      { name_fr: "", name_en: "", sets: 3, reps: "10", rest_seconds: 60, day_number: 1 },
    ]);
  };

  const removeExercise = (idx: number) => {
    setExercises(exercises.filter((_, i) => i !== idx));
  };

  const updateExercise = (idx: number, field: keyof ExerciseInput, value: string | number) => {
    const updated = [...exercises];
    updated[idx] = { ...updated[idx], [field]: value };
    setExercises(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSaving(false); return; }

    const { data: program, error: programError } = await supabase
      .from("workout_programs")
      .insert({
        coach_id: user.id,
        title_fr,
        title_en,
        description_fr,
        description_en,
        difficulty,
        duration_weeks,
        is_public,
      })
      .select("id")
      .single();

    if (programError || !program) {
      setSaving(false);
      return;
    }

    const exerciseData = exercises
      .filter((ex) => ex.name_fr.trim())
      .map((ex, i) => ({
        program_id: program.id,
        name_fr: ex.name_fr,
        name_en: ex.name_en,
        sets: ex.sets,
        reps: ex.reps,
        rest_seconds: ex.rest_seconds,
        day_number: ex.day_number,
        order_index: i,
      }));

    if (exerciseData.length > 0) {
      await supabase.from("workout_exercises").insert(exerciseData);
    }

    router.push("/portal/workouts");
    router.refresh();
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-gray-800";

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
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

      {/* Exercises */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-heading">
            {locale === "fr" ? "Exercices" : "Exercises"}
          </h3>
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
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                <div className="col-span-2">
                  <input
                    type="text"
                    required
                    placeholder={locale === "fr" ? "Nom (FR)" : "Name (FR)"}
                    value={ex.name_fr}
                    onChange={(e) => updateExercise(idx, "name_fr", e.target.value)}
                    className={`${inputClass} text-sm`}
                  />
                </div>
                <input
                  type="number"
                  min="1"
                  placeholder="Séries"
                  value={ex.sets}
                  onChange={(e) => updateExercise(idx, "sets", parseInt(e.target.value) || 1)}
                  className={`${inputClass} text-sm`}
                />
                <input
                  type="text"
                  placeholder="Reps"
                  value={ex.reps}
                  onChange={(e) => updateExercise(idx, "reps", e.target.value)}
                  className={`${inputClass} text-sm`}
                />
                <input
                  type="number"
                  min="0"
                  placeholder="Repos (s)"
                  value={ex.rest_seconds}
                  onChange={(e) => updateExercise(idx, "rest_seconds", parseInt(e.target.value) || 0)}
                  className={`${inputClass} text-sm`}
                />
                <input
                  type="number"
                  min="1"
                  placeholder="Jour"
                  value={ex.day_number}
                  onChange={(e) => updateExercise(idx, "day_number", parseInt(e.target.value) || 1)}
                  className={`${inputClass} text-sm`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving
            ? "..."
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
