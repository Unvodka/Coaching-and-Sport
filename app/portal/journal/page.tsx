"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import MoodEntryCard from "@/components/portal/MoodEntry";
const MoodChart = dynamic(() => import("@/components/portal/MoodChart"), { ssr: false });
import WellnessTip from "@/components/portal/WellnessTip";
import type { MoodEntry } from "@/lib/supabase/database.types";

export default function JournalPage() {
  const { t, locale } = useLanguage();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = useCallback(async () => {
    try {
      const res = await fetch("/api/portal/mood");
      const json = await res.json();

      if (!res.ok) {
        console.error("Journal fetch error:", json.error);
        return;
      }

      setEntries(json.data as MoodEntry[]);
    } catch (err) {
      console.error("Journal page error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  // Safety timeout
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-end">
          <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-3" />
          <div className="h-4 bg-gray-200 rounded w-32" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div />
        <Link
          href="/portal/journal/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity no-underline"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          {t("portal.journal.new")}
        </Link>
      </div>

      {entries.length === 0 ? (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-xl p-8 text-center">
          <svg className="w-16 h-16 mx-auto text-purple-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-heading mb-2">
            {locale === "fr"
              ? "Commencez votre journal bien-être !"
              : "Start your wellness journal!"}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            {locale === "fr"
              ? "Enregistrez votre humeur et votre niveau d'énergie chaque jour pour suivre votre bien-être au fil du temps."
              : "Record your mood and energy level each day to track your wellness over time."}
          </p>
          <Link
            href="/portal/journal/new"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-lg font-semibold hover:opacity-90 transition-opacity no-underline"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            {locale === "fr" ? "Ajouter ma première entrée" : "Add my first entry"}
          </Link>
        </div>
      ) : (
        <>
          {/* Wellness tip based on latest entry */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {locale === "fr" ? "Conseil du jour" : "Today's tip"}
            </h3>
            <WellnessTip
              moodScore={entries[0].mood_score}
              energyLevel={entries[0].energy_level}
            />
          </div>

          <MoodChart entries={entries} />

          <div className="space-y-4">
            {entries.map((entry) => (
              <MoodEntryCard
                key={entry.id}
                entry={entry}
                onDeleted={fetchEntries}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
