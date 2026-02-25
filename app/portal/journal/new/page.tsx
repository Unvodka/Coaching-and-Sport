"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { createClient } from "@/lib/supabase/client";
import MoodForm from "@/components/portal/MoodForm";

export default function NewJournalEntryPage() {
  const { t } = useLanguage();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function getUser() {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.id) {
          setUserId(session.user.id);
          return;
        }
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.id) setUserId(user.id);
      } catch (err) {
        console.error("Auth error:", err);
      }
    }
    getUser();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-heading font-heading mb-6">
        {t("portal.journal.new")}
      </h2>
      <MoodForm userId={userId || undefined} />
    </div>
  );
}
