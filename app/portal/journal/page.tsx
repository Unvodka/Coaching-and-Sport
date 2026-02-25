"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/supabase/AuthContext";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { createClient } from "@/lib/supabase/client";
import MoodEntryCard from "@/components/portal/MoodEntry";
import MoodChart from "@/components/portal/MoodChart";
import type { MoodEntry } from "@/lib/supabase/database.types";

export default function JournalPage() {
  const { user } = useAuth();
  const { t, locale } = useLanguage();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = useCallback(async () => {
    if (!user) return;
    const supabase = createClient();
    const { data } = await supabase
      .from("mood_entries")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false });
    setEntries((data as MoodEntry[]) || []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

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

      {!loading && <MoodChart entries={entries} />}

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-32" />
                  <div className="h-3 bg-gray-200 rounded w-48" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>{locale === "fr" ? "Aucune entrée dans le journal" : "No journal entries yet"}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <MoodEntryCard
              key={entry.id}
              entry={entry}
              onDeleted={fetchEntries}
            />
          ))}
        </div>
      )}
    </div>
  );
}
