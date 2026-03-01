"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/useLanguage";
import FavoriteButton from "./FavoriteButton";
import type { Recipe } from "@/lib/supabase/database.types";

interface RecipeDetailProps {
  recipeId: string;
}

export default function RecipeDetail({ recipeId }: RecipeDetailProps) {
  const { locale, t } = useLanguage();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await fetch(`/api/portal/recipes/${recipeId}`);
        const json = await res.json();

        if (!res.ok) {
          console.error("Recipe detail error:", json.error);
          setLoading(false);
          return;
        }

        setRecipe(json.recipe as Recipe);
        setIsFavorited(json.isFavorited);
        setCurrentUserId(json.userId);
        setUserRole(json.userRole);
      } catch (err) {
        console.error("Recipe detail fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [recipeId]);

  const handleDelete = async () => {
    if (!confirm(locale === "fr" ? "Supprimer cette recette ?" : "Delete this recipe?")) return;
    try {
      await fetch(`/api/portal/recipes/${recipeId}`, { method: "DELETE" });
      router.push("/portal/recipes");
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/2" />
        <div className="h-64 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-12 text-gray-500">
        {locale === "fr" ? "Recette introuvable" : "Recipe not found"}
      </div>
    );
  }

  const title = locale === "fr" ? recipe.title_fr : (recipe.title_en || recipe.title_fr);
  const description = locale === "fr" ? recipe.description_fr : (recipe.description_en || recipe.description_fr);
  const instructions = locale === "fr" ? recipe.instructions_fr : (recipe.instructions_en || recipe.instructions_fr);
  const ingredients = recipe.ingredients as string[];
  const canEdit = currentUserId === recipe.author_id || userRole === "coach";

  return (
    <div className="max-w-3xl mx-auto">
      {recipe.image_url && (
        <div className="relative h-64 rounded-xl overflow-hidden mb-6">
          <Image
            src={recipe.image_url}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <span className="inline-block px-3 py-1 text-sm font-medium bg-orange-100 text-orange-700 rounded-full mb-2">
            {recipe.category}
          </span>
          <h2 className="text-2xl font-bold text-heading font-heading">
            {title}
          </h2>
          {description && (
            <p className="text-gray-500 mt-2">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {currentUserId && (
            <FavoriteButton
              recipeId={recipe.id}
              userId={currentUserId}
              initialFavorited={isFavorited}
            />
          )}
          {canEdit && (
            <>
              <Link
                href={`/portal/recipes/${recipe.id}/edit`}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
                aria-label="Modifier la recette"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </Link>
              <button
                onClick={handleDelete}
                className="p-2 rounded-full hover:bg-red-50 transition-colors text-red-500"
                aria-label="Supprimer la recette"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-heading mb-4">
            {t("portal.recipes.ingredients")}
          </h3>
          <ul className="space-y-2">
            {ingredients.map((ingredient, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-brand-blue mt-0.5">&#8226;</span>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-heading mb-4">
            {t("portal.recipes.instructions")}
          </h3>
          <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
            {instructions}
          </div>
        </div>
      </div>
    </div>
  );
}
