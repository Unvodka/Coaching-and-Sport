"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";
import { useAuth } from "@/lib/supabase/AuthContext";
import MoodForm from "@/components/portal/MoodForm";

export default function NewJournalEntryPage() {
  const { t } = useLanguage();
  const { user: authUser } = useAuth();

  return (
    <div>
      <h2 className="text-2xl font-bold text-heading font-heading mb-6">
        {t("portal.journal.new")}
      </h2>
      <MoodForm userId={authUser?.id} />
    </div>
  );
}
