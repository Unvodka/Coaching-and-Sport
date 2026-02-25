"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { createClient } from "@/lib/supabase/client";
import type { Recipe } from "@/lib/supabase/database.types";

const CATEGORIES = [
  "general",
  "breakfast",
  "lunch",
  "dinner",
  "snack",
  "smoothie",
  "dessert",
  "salad",
  "soup",
];

interface RecipeFormProps {
  recipe?: Recipe;
  userId?: string;
  userRole?: string;
}

export default function RecipeForm({ recipe, userId: propUserId, userRole }: RecipeFormProps) {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const isCoach = userRole === "coach";

  const [formData, setFormData] = useState({
    title_fr: recipe?.title_fr || "",
    title_en: recipe?.title_en || "",
    description_fr: recipe?.description_fr || "",
    description_en: recipe?.description_en || "",
    ingredients: recipe?.ingredients
      ? (recipe.ingredients as string[]).join("\n")
      : "",
    instructions_fr: recipe?.instructions_fr || "",
    instructions_en: recipe?.instructions_en || "",
    image_url: recipe?.image_url || "",
    category: recipe?.category || "general",
    is_public: recipe?.is_public || false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    const supabase = createClient();

    // Use prop userId if available, otherwise try to get it from session/user
    let currentUserId = propUserId;
    if (!currentUserId) {
      const { data: { session } } = await supabase.auth.getSession();
      currentUserId = session?.user?.id;
    }
    if (!currentUserId) {
      const { data: { user } } = await supabase.auth.getUser();
      currentUserId = user?.id;
    }
    if (!currentUserId) {
      setError(locale === "fr" ? "Vous devez être connecté" : "You must be logged in");
      setSaving(false);
      return;
    }

    const ingredientsList = formData.ingredients
      .split("\n")
      .map((i) => i.trim())
      .filter(Boolean);

    const data = {
      title_fr: formData.title_fr,
      title_en: formData.title_en,
      description_fr: formData.description_fr,
      description_en: formData.description_en,
      ingredients: ingredientsList,
      instructions_fr: formData.instructions_fr,
      instructions_en: formData.instructions_en,
      image_url: formData.image_url || null,
      category: formData.category,
      is_public: isCoach ? formData.is_public : false,
    };

    if (recipe) {
      const { error: updateError } = await supabase
        .from("recipes")
        .update(data)
        .eq("id", recipe.id);
      if (updateError) {
        setError(updateError.message);
        setSaving(false);
        return;
      }
    } else {
      const { error: insertError } = await supabase
        .from("recipes")
        .insert({ ...data, author_id: currentUserId });
      if (insertError) {
        setError(insertError.message);
        setSaving(false);
        return;
      }
    }

    router.push("/portal/recipes");
    router.refresh();
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-gray-800";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>
            {t("portal.recipes.titleFr")}
          </label>
          <input
            type="text"
            required
            value={formData.title_fr}
            onChange={(e) =>
              setFormData({ ...formData, title_fr: e.target.value })
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            {t("portal.recipes.titleEn")}
          </label>
          <input
            type="text"
            value={formData.title_en}
            onChange={(e) =>
              setFormData({ ...formData, title_en: e.target.value })
            }
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>
            {t("portal.recipes.descriptionFr")}
          </label>
          <textarea
            rows={3}
            value={formData.description_fr}
            onChange={(e) =>
              setFormData({ ...formData, description_fr: e.target.value })
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            {t("portal.recipes.descriptionEn")}
          </label>
          <textarea
            rows={3}
            value={formData.description_en}
            onChange={(e) =>
              setFormData({ ...formData, description_en: e.target.value })
            }
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>
          {t("portal.recipes.ingredients")}
        </label>
        <textarea
          rows={6}
          required
          placeholder={
            locale === "fr"
              ? "Un ingrédient par ligne..."
              : "One ingredient per line..."
          }
          value={formData.ingredients}
          onChange={(e) =>
            setFormData({ ...formData, ingredients: e.target.value })
          }
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>
            {t("portal.recipes.instructionsFr")}
          </label>
          <textarea
            rows={6}
            required
            value={formData.instructions_fr}
            onChange={(e) =>
              setFormData({ ...formData, instructions_fr: e.target.value })
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            {t("portal.recipes.instructionsEn")}
          </label>
          <textarea
            rows={6}
            value={formData.instructions_en}
            onChange={(e) =>
              setFormData({ ...formData, instructions_en: e.target.value })
            }
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>
            {t("portal.recipes.imageUrl")}
          </label>
          <input
            type="url"
            value={formData.image_url}
            onChange={(e) =>
              setFormData({ ...formData, image_url: e.target.value })
            }
            placeholder="https://..."
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            {t("portal.recipes.category")}
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className={inputClass}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isCoach && (
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="is_public"
            checked={formData.is_public}
            onChange={(e) =>
              setFormData({ ...formData, is_public: e.target.checked })
            }
            className="w-4 h-4 text-brand-blue rounded focus:ring-brand-blue"
          />
          <label htmlFor="is_public" className="text-sm text-gray-700">
            {t("portal.recipes.makePublic")}
          </label>
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving
            ? locale === "fr"
              ? "Enregistrement..."
              : "Saving..."
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
