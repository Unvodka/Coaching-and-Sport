"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { MOOD_EMOJIS } from "@/lib/constants";

interface MoodFormProps {
  onAdded?: () => void;
  inline?: boolean;
  onProgramReady?: (mood: number, energy: number, sleep: number | null, stress: number | null) => void;
}

export default function MoodForm({ onAdded, inline, onProgramReady }: MoodFormProps) {
  const router = useRouter();
  const { t, locale } = useLanguage();

  const [moodScore, setMoodScore] = useState(5);
  const [energyLevel, setEnergyLevel] = useState(5);
  const [sleepQuality, setSleepQuality] = useState(5);
  const [stressLevel, setStressLevel] = useState(5);
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const resetForm = () => {
    setMoodScore(5);
    setEnergyLevel(5);
    setSleepQuality(5);
    setStressLevel(5);
    setNotes("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/portal/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood_score: moodScore,
          energy_level: energyLevel,
          sleep_quality: sleepQuality,
          stress_level: stressLevel,
          notes: notes || null,
          date,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          locale === "fr"
            ? `Erreur: ${data.error || "Une erreur est survenue"}`
            : `Error: ${data.error || "Something went wrong"}`
        );
        setSaving(false);
        return;
      }

      // Inline mode: show success + wellness program, reset form, notify parent
      if (inline && onAdded) {
        const _mood = moodScore;
        const _energy = energyLevel;
        resetForm();
        setSuccess(true);
        setSaving(false);
        onAdded();
        onProgramReady?.(_mood, _energy, sleepQuality, stressLevel);
        setTimeout(() => setSuccess(false), 4000);
      } else {
        // Standalone page mode: redirect back
        router.push("/portal/journal");
        router.refresh();
      }
    } catch (err) {
      console.error("Mood submit error:", err);
      setError(locale === "fr" ? "Erreur de connexion" : "Connection error");
      setSaving(false);
    }
  };

  return (
    <div className={inline ? "space-y-1.5" : "max-w-2xl mx-auto space-y-4"}>
      <form onSubmit={handleSubmit} className="space-y-1.5">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg flex items-center gap-2">
            <span>
              {locale === "fr" ? "Entrée enregistrée !" : "Entry saved!"}
            </span>
          </div>
        )}

        {/* Date */}
        <div className="flex items-center justify-center gap-3">
          <label className="text-sm font-medium text-gray-700 flex-shrink-0">
            {t("portal.weight.date")}
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-gray-800 text-sm"
          />
        </div>
        {/* Mood Score */}
        <div className="bg-white rounded-xl border border-gray-100 px-3 py-2.5">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("portal.journal.mood")} — {MOOD_EMOJIS[moodScore - 1]} {moodScore}/10
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={moodScore}
            onChange={(e) => setMoodScore(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>{locale === "fr" ? "Très bas" : "Very low"}</span>
            <span>{locale === "fr" ? "Excellent" : "Excellent"}</span>
          </div>
        </div>
        {/* Energy Level */}
        <div className="bg-white rounded-xl border border-gray-100 px-3 py-2.5">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("portal.journal.energy")} — {energyLevel}/10
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={energyLevel}
            onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>{locale === "fr" ? "Épuisé" : "Exhausted"}</span>
            <span>{locale === "fr" ? "Plein d'énergie" : "Full of energy"}</span>
          </div>
        </div>
        {/* Sleep Quality */}
        <div className="bg-white rounded-xl border border-gray-100 px-3 py-2.5">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {locale === "fr" ? "Qualité du sommeil" : "Sleep quality"} — {sleepQuality}/10
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={sleepQuality}
            onChange={(e) => setSleepQuality(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>{locale === "fr" ? "Très mauvais" : "Very poor"}</span>
            <span>{locale === "fr" ? "Excellent" : "Excellent"}</span>
          </div>
        </div>
        {/* Stress Level */}
        <div className="bg-white rounded-xl border border-gray-100 px-3 py-2.5">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {locale === "fr" ? "Niveau de stress" : "Stress level"} — {stressLevel}/10
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={stressLevel}
            onChange={(e) => setStressLevel(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>{locale === "fr" ? "Aucun stress" : "No stress"}</span>
            <span>{locale === "fr" ? "Très stressé(e)" : "Very stressed"}</span>
          </div>
        </div>
        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("portal.journal.notes")}
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={
              locale === "fr"
                ? "Comment vous sentez-vous aujourd'hui ?"
                : "How are you feeling today?"
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-gray-800"
          />
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving
              ? "..."
              : inline
              ? (locale === "fr" ? "Ajouter" : "Add")
              : t("portal.recipes.save")}
          </button>
          {!inline && (
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              {locale === "fr" ? "Annuler" : "Cancel"}
            </button>
          )}
        </div>
      </form>

    </div>
  );
}
