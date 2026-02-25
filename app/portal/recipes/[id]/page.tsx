"use client";

import { useParams } from "next/navigation";
import RecipeDetail from "@/components/portal/RecipeDetail";

export default function RecipeDetailPage() {
  const params = useParams();
  const id = params.id as string;

  return <RecipeDetail recipeId={id} />;
}
