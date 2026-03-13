"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { useAuth } from "@/lib/supabase/AuthContext";
import SubscriptionGate from "@/components/portal/SubscriptionGate";
import RecipeCard from "@/components/portal/RecipeCard";
import RecipeForm from "@/components/portal/RecipeForm";
import type { Recipe } from "@/lib/supabase/database.types";

type MealFilter = "all" | "breakfast" | "lunch" | "snack" | "dinner";

export default function RecipesPage() {
  const { t, locale } = useLanguage();
  const { profile } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [userId, setUserId] = useState<string | null>(null);
  const [filter, setFilter] = useState<MealFilter>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const seeded = useRef(false);

  const fetchRecipes = useCallback(async () => {
    try {
      const res = await fetch("/api/portal/recipes");
      const json = await res.json();

      if (!res.ok) {
        console.error("Recipes fetch error:", json.error);
        return;
      }

      setRecipes((json.data as Recipe[]) || []);
      setFavoriteIds(new Set(json.favoriteIds || []));
      setUserId(json.userId || null);

      return {
        recipes: (json.data as Recipe[]) || [],
        favoriteIds: (json.favoriteIds as string[]) || [],
      };
    } catch (err) {
      console.error("Recipes page error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    async function init() {
      const result = await fetchRecipes();

      // Seed healthy recipes (API handles deduplication by title)
      if (result && !seeded.current) {
        seeded.current = true;
        try {
          const seedRes = await fetch("/api/portal/seed-recipes", { method: "POST" });
          const seedJson = await seedRes.json();
          if (seedRes.ok && !seedJson.alreadyExists) {
            await fetchRecipes();
          }
        } catch (err) {
          console.error("Seed error:", err);
        }
      }
    }

    init();
  }, [fetchRecipes]);

  const handleRecipeAdded = () => {
    fetchRecipes();
  };

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return recipes.filter((r) => {
      if (filter !== "all" && r.category !== filter) return false;
      if (query) {
        const title = locale === "fr" ? r.title_fr : (r.title_en || r.title_fr);
        return (
          title.toLowerCase().includes(query) ||
          r.category.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [recipes, filter, search, locale]);

  const mealFilters: { key: MealFilter; labelFr: string; labelEn: string }[] = [
    { key: "all", labelFr: "Toutes", labelEn: "All" },
    { key: "breakfast", labelFr: "Petit déjeuner", labelEn: "Breakfast" },
    { key: "lunch", labelFr: "Déjeuner", labelEn: "Lunch" },
    { key: "snack", labelFr: "Encas", labelEn: "Snack" },
    { key: "dinner", labelFr: "Dîner", labelEn: "Dinner" },
  ];

  const emptyTitle = () => {
    if (search) return locale === "fr" ? "Aucune recette trouvée" : "No recipes found";
    return locale === "fr" ? "Pas encore de recettes !" : "No recipes yet!";
  };

  const emptyDescription = () => {
    if (search) return locale === "fr" ? "Essayez avec d'autres mots-clés." : "Try different keywords.";
    if (filter !== "all") {
      const filterLabel = mealFilters.find((f) => f.key === filter);
      const name = locale === "fr" ? filterLabel?.labelFr : filterLabel?.labelEn;
      return locale === "fr"
        ? `Aucune recette dans la catégorie "${name}".`
        : `No recipes in the "${name}" category.`;
    }
    return locale === "fr"
      ? "Ajoutez votre première recette pour commencer à construire votre collection."
      : "Add your first recipe to start building your collection.";
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse">
              <div className="h-40 bg-gray-200 rounded-lg mb-3" />
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <SubscriptionGate>
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {mealFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f.key
                  ? "bg-brand-blue text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {locale === "fr" ? f.labelFr : f.labelEn}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {showForm ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            )}
          </svg>
          {showForm
            ? (locale === "fr" ? "Fermer" : "Close")
            : t("portal.recipes.new")}
        </button>
      </div>

      {/* Inline form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <h3 className="font-semibold text-heading mb-4">
            {t("portal.recipes.new")}
          </h3>
          <RecipeForm
            userRole={profile?.role || "user"}
            onAdded={handleRecipeAdded}
            inline
          />
        </div>
      )}

      <div className="mb-6">
        <input
          type="text"
          placeholder={t("portal.recipes.search")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-gray-800"
        />
      </div>

      {/* Salt awareness notice */}
      <div className="flex items-start gap-3 px-4 py-3 mb-6 bg-amber-50/70 border border-amber-200/60 rounded-lg">
        <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
        <p className="text-sm text-amber-800 leading-relaxed">
          {locale === "fr"
            ? "L'OMS recommande moins de 5 g de sel par jour. Pensez à goûter vos plats avant de saler et privilégiez les herbes, épices et jus de citron pour relever vos recettes."
            : "The WHO recommends less than 5 g of salt per day. Taste your dishes before adding salt and favor herbs, spices, and lemon juice to enhance your recipes."}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-100 rounded-xl p-8 text-center">
          <svg className="w-16 h-16 mx-auto text-orange-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 className="text-lg font-semibold text-heading mb-2">
            {emptyTitle()}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            {emptyDescription()}
          </p>
          {!search && filter === "all" && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              {locale === "fr" ? "Créer ma première recette" : "Create my first recipe"}
            </button>
          )}
          {filter !== "all" && (
            <button
              onClick={() => setFilter("all")}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              {locale === "fr" ? "Voir toutes les recettes" : "Browse all recipes"}
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorited={favoriteIds.has(recipe.id)}
              userId={userId}
            />
          ))}
        </div>
      )}
    </div>
    </SubscriptionGate>
  );
}
