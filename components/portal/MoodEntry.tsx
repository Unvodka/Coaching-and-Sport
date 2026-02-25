"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";
import type { MoodEntry as MoodEntryType } from "@/lib/supabase/database.types";

const MOOD_EMOJIS = ["😢", "😟", "😕", "😐", "🙂", "😊", "😄", "😁", "🤩", "🥳"];

interface MoodEntryProps {
  entry: MoodEntryType;
  onDeleted: () => void;
}

export default function MoodEntry({ entry, onDeleted }: MoodEntryProps) {
  const { locale } = useLanguage();

  const handleDelete = async () => {
    if (!confirm(locale === "fr" ? "Supprimer cette entrée ?" : "Delete this entry?")) return;
    try {
      await fetch(`/api/portal/mood?id=${entry.id}`, { method: "DELETE" });
      onDeleted();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <span className="text-3xl">{MOOD_EMOJIS[entry.mood_score - 1]}</span>
          <div>
            <p className="text-sm text-gray-500">
              {new Date(entry.date).toLocaleDateString(
                locale === "fr" ? "fr-FR" : "en-US",
                { day: "numeric", month: "long", year: "numeric" }
              )}
            </p>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-sm text-gray-700">
                {locale === "fr" ? "Humeur" : "Mood"}: <strong>{entry.mood_score}/10</strong>
              </span>
              <span className="text-sm text-gray-700">
                {locale === "fr" ? "Énergie" : "Energy"}: <strong>{entry.energy_level}/10</strong>
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="text-red-400 hover:text-red-600 transition-colors p-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {entry.notes && (
        <p className="text-sm text-gray-600 mt-3 pl-14">{entry.notes}</p>
      )}

      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3 pl-14">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
