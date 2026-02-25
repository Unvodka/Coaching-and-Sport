import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title_fr, title_en, description_fr, description_en,
      ingredients, instructions_fr, instructions_en,
      image_url, category, is_public, recipe_id,
    } = body;

    if (!title_fr) {
      return NextResponse.json({ error: "title_fr is required" }, { status: 400 });
    }

    const data = {
      title_fr,
      title_en: title_en || "",
      description_fr: description_fr || "",
      description_en: description_en || "",
      ingredients: ingredients || [],
      instructions_fr: instructions_fr || "",
      instructions_en: instructions_en || "",
      image_url: image_url || null,
      category: category || "general",
      is_public: is_public || false,
    };

    if (recipe_id) {
      // Update existing recipe
      const { error: updateError } = await supabase
        .from("recipes")
        .update(data)
        .eq("id", recipe_id);
      if (updateError) {
        console.error("Recipe update error:", updateError);
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }
    } else {
      // Create new recipe
      const { error: insertError } = await supabase
        .from("recipes")
        .insert({ ...data, author_id: user.id });
      if (insertError) {
        console.error("Recipe insert error:", insertError);
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Recipe API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
