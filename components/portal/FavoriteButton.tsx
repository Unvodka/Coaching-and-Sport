"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface FavoriteButtonProps {
  recipeId: string;
  userId: string;
  initialFavorited: boolean;
}

export default function FavoriteButton({
  recipeId,
  userId,
  initialFavorited,
}: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    setLoading(true);
    const supabase = createClient();

    if (favorited) {
      await supabase
        .from("recipe_favorites")
        .delete()
        .eq("user_id", userId)
        .eq("recipe_id", recipeId);
      setFavorited(false);
    } else {
      await supabase
        .from("recipe_favorites")
        .insert({ user_id: userId, recipe_id: recipeId });
      setFavorited(true);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle();
      }}
      disabled={loading}
      className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        className={`w-5 h-5 transition-colors ${
          favorited ? "fill-red-500 text-red-500" : "fill-none text-gray-400"
        }`}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
