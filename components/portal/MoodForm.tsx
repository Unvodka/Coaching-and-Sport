"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { createClient } from "@/lib/supabase/client";
import WellnessTip from "@/components/portal/WellnessTip";

const MOOD_EMOJIS = ["😢", "😟", "😕", "😐", "🙂", "😊", "😄", "😁", "🤩", "🥳"];
const TAG_SUGGESTIONS = [
  "sport", "nutrition", "sommeil", "stress", "motivation",
  "fatigue", "énergie", "progrès", "repos", "méditation",
];

export default function MoodForm() {
  const router = useRouter();
  const { t, locale } = useLanguage();

  const [moodScore, setMoodScore] = useState(5);
  const [energyLevel, setEnergyLevel] = useState(5);
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSaving(false); return; }

    await supabase.from("mood_entries").insert({
      user_id: user.id,
      mood_score: moodScore,
      energy_level: energyLevel,
      notes: notes || null,
      tags,
      date,
    });

    setSubmitted(true);
  };

  // After submission, show the wellness tip
  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <div className="text-5xl mb-3">{MOOD_EMOJIS[moodScore - 1]}</div>
          <h3 className="text-lg font-semibold text-heading mb-1">
            {locale === "fr"
              ? "Entrée enregistrée avec succès !"
              : "Entry saved successfully!"}
          </h3>
          <p className="text-gray-500 text-sm">
            {locale === "fr"
              ? `Humeur : ${moodScore}/10 · Énergie : ${energyLevel}/10`
              : `Mood: ${moodScore}/10 · Energy: ${energyLevel}/10`}
          </p>
        </div>

        <WellnessTip moodScore={moodScore} energyLevel={energyLevel} />

        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              router.push("/portal/journal");
              router.refresh();
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            {locale === "fr" ? "Retour au journal" : "Back to journal"}
          </button>
          <button
            onClick={() => {
              setSubmitted(false);
              setMoodScore(5);
              setEnergyLevel(5);
              setNotes("");
              setTags([]);
              setDate(new Date().toISOString().split("T")[0]);
            }}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            {locale === "fr" ? "Nouvelle entrée" : "New entry"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
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
          rows={4}
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
            : t("portal.recipes.save")}
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
