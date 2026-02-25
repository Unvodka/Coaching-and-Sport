"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { createClient } from "@/lib/supabase/client";
import MoodForm from "@/components/portal/MoodForm";

export default function NewJournalEntryPage() {
  const { t, locale } = useLanguage();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        const supabase = createClient();
        // Try getSession first (fast, local)
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.id) {
          setUserId(session.user.id);
          setLoading(false);
          return;
        }
        // Fallback to getUser (network call)
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.id) setUserId(user.id);
      } catch (err) {
        console.error("Auth error:", err);
      } finally {
        setLoading(false);
      }
    }
    getUser();
    // Safety timeout
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse mb-6" />
        <div className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-3" />
          <div className="h-10 bg-gray-200 rounded w-full" />
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <p className="text-red-600">
          {locale === "fr" ? "Erreur de connexion. Essayez de vous reconnecter." : "Connection error. Try signing in again."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-heading font-heading mb-6">
        {t("portal.journal.new")}
      </h2>
      <MoodForm userId={userId} />
    </div>
  );
}
