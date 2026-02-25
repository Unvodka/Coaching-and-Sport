"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { useAuth } from "@/lib/supabase/AuthContext";
import { createClient } from "@/lib/supabase/client";
import RecipeForm from "@/components/portal/RecipeForm";
import type { Recipe } from "@/lib/supabase/database.types";

export default function EditRecipePage() {
  const params = useParams();
  const id = params.id as string;
  const { locale } = useLanguage();
  const { user: authUser, profile } = useAuth();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("recipes")
          .select("*")
          .eq("id", id)
          .single();
        setRecipe(data as Recipe | null);
      } catch (err) {
        console.error("Edit recipe page error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-48" />
        <div className="h-12 bg-gray-200 rounded" />
        <div className="h-12 bg-gray-200 rounded" />
        <div className="h-32 bg-gray-200 rounded" />
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

  return (
    <div>
      <h2 className="text-2xl font-bold text-heading font-heading mb-6">
        {locale === "fr" ? "Modifier la recette" : "Edit Recipe"}
      </h2>
      <RecipeForm recipe={recipe} userId={authUser?.id} userRole={profile?.role || "user"} />
    </div>
  );
}
