"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";
import RecipeForm from "@/components/portal/RecipeForm";

export default function NewRecipePage() {
  const { t } = useLanguage();

  return (
    <div>
      <h2 className="text-2xl font-bold text-heading font-heading mb-6">
        {t("portal.recipes.new")}
      </h2>
      <RecipeForm />
    </div>
  );
}
