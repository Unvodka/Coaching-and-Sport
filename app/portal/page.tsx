"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/supabase/AuthContext";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { createClient } from "@/lib/supabase/client";
import DashboardCard from "@/components/portal/DashboardCard";

interface DashboardStats {
  recipes: number;
  weightLogs: number;
  moodEntries: number;
  workoutsCompleted: number;
}

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const { t, locale } = useLanguage();
  const [stats, setStats] = useState<DashboardStats>({
    recipes: 0,
    weightLogs: 0,
    moodEntries: 0,
    workoutsCompleted: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (!user) return;
      const supabase = createClient();

      const [recipesRes, weightRes, moodRes, progressRes] = await Promise.all([
        supabase
          .from("recipes")
          .select("id", { count: "exact", head: true })
          .eq("author_id", user.id),
        supabase
          .from("weight_logs")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id),
        supabase
          .from("mood_entries")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id),
        supabase
          .from("user_workout_progress")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id),
      ]);

      setStats({
        recipes: recipesRes.count ?? 0,
        weightLogs: weightRes.count ?? 0,
        moodEntries: moodRes.count ?? 0,
        workoutsCompleted: progressRes.count ?? 0,
      });
      setLoading(false);
    }

    fetchStats();
  }, [user]);

  const greeting = profile?.full_name
    ? `${t("portal.welcome")} ${profile.full_name}`
    : t("portal.welcome");

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-heading font-heading">
          {greeting}
        </h2>
        <p className="text-gray-500 mt-1">{t("portal.dashboardSubtitle")}</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-20 mb-3" />
              <div className="h-8 bg-gray-200 rounded w-12 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-24" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title={t("portal.recipes")}
            value={stats.recipes}
            subtitle={locale === "fr" ? "recettes créées" : "recipes created"}
            href="/portal/recipes"
            color="bg-orange-100 text-orange-600"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
          />
          <DashboardCard
            title={t("portal.weight")}
            value={stats.weightLogs}
            subtitle={locale === "fr" ? "pesées enregistrées" : "entries recorded"}
            href="/portal/weight"
            color="bg-blue-100 text-blue-600"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            }
          />
          <DashboardCard
            title={t("portal.journal")}
            value={stats.moodEntries}
            subtitle={locale === "fr" ? "entrées journal" : "journal entries"}
            href="/portal/journal"
            color="bg-purple-100 text-purple-600"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <DashboardCard
            title={t("portal.workouts")}
            value={stats.workoutsCompleted}
            subtitle={locale === "fr" ? "exercices complétés" : "exercises completed"}
            href="/portal/workouts"
            color="bg-green-100 text-green-600"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />
        </div>
      )}
    </div>
  );
}
