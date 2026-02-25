"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import FavoriteButton from "./FavoriteButton";
import type { Recipe } from "@/lib/supabase/database.types";

interface RecipeCardProps {
  recipe: Recipe;
  isFavorited: boolean;
  userId?: string | null;
}

export default function RecipeCard({ recipe, isFavorited, userId }: RecipeCardProps) {
  const { locale } = useLanguage();

  const title = locale === "fr" ? recipe.title_fr : (recipe.title_en || recipe.title_fr);
  const description = locale === "fr" ? recipe.description_fr : (recipe.description_en || recipe.description_fr);

  return (
    <Link
      href={`/portal/recipes/${recipe.id}`}
      className="block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow no-underline"
    >
      {recipe.image_url && (
        <div className="h-40 bg-gray-100 overflow-hidden">
          <img
            src={recipe.image_url}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <span className="inline-block px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-700 rounded-full mb-2">
              {recipe.category}
            </span>
            <h3 className="font-semibold text-heading truncate">{title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2 mt-1">
              {description}
            </p>
          </div>
          {userId && (
            <FavoriteButton
              recipeId={recipe.id}
              userId={userId}
              initialFavorited={isFavorited}
            />
          )}
        </div>
      </div>
    </Link>
  );
}
