"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/useLanguage";
import WellnessProgram from "@/components/portal/WellnessProgram";

const MOOD_EMOJIS = ["😢", "😟", "😕", "😐", "🙂", "😊", "😄", "😁", "🤩", "🥳"];
const TAG_SUGGESTIONS = [
  "sport", "nutrition", "sommeil", "stress", "motivation",
  "fatigue", "énergie", "progrès", "repos", "méditation",
];

interface MoodFormProps {
  userId?: string;
  onAdded?: () => void;
  inline?: boolean;
}

export default function MoodForm({ onAdded, inline }: MoodFormProps) {
  const router = useRouter();
  const { t, locale } = useLanguage();

  const [moodScore, setMoodScore] = useState(5);
  const [energyLevel, setEnergyLevel] = useState(5);
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showProgram, setShowProgram] = useState(false);
  const [submittedMood, setSubmittedMood] = useState(5);
  const [submittedEnergy, setSubmittedEnergy] = useState(5);

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const resetForm = () => {
    setMoodScore(5);
    setEnergyLevel(5);
    setNotes("");
    setTags([]);
    setDate(new Date().toISOString().split("T")[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    setShowProgram(false);

    try {
      const res = await fetch("/api/portal/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood_score: moodScore,
          energy_level: energyLevel,
          notes: notes || null,
          tags,
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
        setSubmittedMood(moodScore);
        setSubmittedEnergy(energyLevel);
        resetForm();
        setSuccess(true);
        setShowProgram(true);
        setSaving(false);
        onAdded();
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
    <div className={inline ? "space-y-6" : "max-w-2xl mx-auto space-y-8"}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg flex items-center gap-2">
            <span className="text-lg">{MOOD_EMOJIS[submittedMood - 1]}</span>
            <span>
              {locale === "fr"
                ? `Entrée enregistrée ! Humeur ${submittedMood}/10 · Énergie ${submittedEnergy}/10`
                : `Entry saved! Mood ${submittedMood}/10 · Energy ${submittedEnergy}/10`}
            </span>
          </div>
        )}

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("portal.weight.date")}
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-gray-800"
          />
        </div>

        {/* Mood Score */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
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
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{locale === "fr" ? "Très bas" : "Very low"}</span>
            <span>{locale === "fr" ? "Excellent" : "Excellent"}</span>
          </div>
        </div>

        {/* Energy Level */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
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
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{locale === "fr" ? "Épuisé" : "Exhausted"}</span>
            <span>{locale === "fr" ? "Plein d'énergie" : "Full of energy"}</span>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t("portal.journal.tags")}
          </label>
          <div className="flex flex-wrap gap-2">
            {TAG_SUGGESTIONS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  tags.includes(tag)
                    ? "bg-brand-blue text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tag}
              </button>
            ))}
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

      {/* Wellness program recommendation after submission */}
      {showProgram && inline && (
        <WellnessProgram
          moodScore={submittedMood}
          energyLevel={submittedEnergy}
          onDismiss={() => setShowProgram(false)}
        />
      )}
    </div>
  );
}
