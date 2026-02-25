"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { useAuth } from "@/lib/supabase/AuthContext";
import { createClient } from "@/lib/supabase/client";
import RecipeCard from "@/components/portal/RecipeCard";
import type { Recipe } from "@/lib/supabase/database.types";

type Tab = "all" | "mine" | "favorites";

export default function RecipesPage() {
  const { t, locale } = useLanguage();
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [tab, setTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipes() {
      if (!user) return;
      const supabase = createClient();

      const [recipesRes, favsRes] = await Promise.all([
        supabase
          .from("recipes")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("recipe_favorites")
          .select("recipe_id")
          .eq("user_id", user.id),
      ]);

      setRecipes((recipesRes.data as Recipe[]) || []);
      setFavoriteIds(
        new Set((favsRes.data || []).map((f) => f.recipe_id))
      );
      setLoading(false);
    }

    fetchRecipes();
  }, [user]);

  const filtered = recipes.filter((r) => {
    if (tab === "mine" && r.author_id !== user?.id) return false;
    if (tab === "favorites" && !favoriteIds.has(r.id)) return false;
    if (search) {
      const query = search.toLowerCase();
      const title = locale === "fr" ? r.title_fr : (r.title_en || r.title_fr);
      return (
        title.toLowerCase().includes(query) ||
        r.category.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const tabs: { key: Tab; label: string }[] = [
    { key: "all", label: t("portal.recipes.all") },
    { key: "mine", label: t("portal.recipes.myRecipes") },
    { key: "favorites", label: t("portal.recipes.favorites") },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === t.key
                  ? "bg-brand-blue text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <Link
          href="/portal/recipes/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity no-underline"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          {t("portal.recipes.new")}
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder={t("portal.recipes.search")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-gray-800"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse"
            >
              <div className="h-40 bg-gray-200" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-16" />
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p>{locale === "fr" ? "Aucune recette trouvée" : "No recipes found"}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorited={favoriteIds.has(recipe.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
