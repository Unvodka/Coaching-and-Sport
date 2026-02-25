"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";
import WorkoutProgramForm from "@/components/portal/WorkoutProgramForm";

export default function NewWorkoutPage() {
  const { locale } = useLanguage();

  return (
    <div>
      <h2 className="text-2xl font-bold text-heading font-heading mb-6">
        {locale === "fr" ? "Nouveau programme" : "New Program"}
      </h2>
      <WorkoutProgramForm />
    </div>
  );
}
