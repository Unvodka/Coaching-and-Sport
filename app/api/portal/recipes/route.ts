import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api/auth";
import { validateOrigin } from "@/lib/api/csrf";
import { rateLimit } from "@/lib/api/rate-limit";

const VALID_CATEGORIES = ["general", "breakfast", "lunch", "dinner", "snack", "smoothie", "dessert", "drink"];

export async function GET() {
  return withAuth(async ({ user, admin }) => {
    const [recipesRes, favsRes] = await Promise.all([
      admin
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false }),
      admin
        .from("recipe_favorites")
        .select("recipe_id")
        .eq("user_id", user.id),
    ]);

    if (recipesRes.error) {
      console.error("Recipes fetch error:", recipesRes.error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    const favoriteIds = (favsRes.data || []).map((f: { recipe_id: string }) => f.recipe_id);

    return NextResponse.json({
      data: recipesRes.data || [],
      favoriteIds,
      userId: user.id,
    }, {
      headers: { "Cache-Control": "private, max-age=30" },
    });
  });
}

export async function POST(request: NextRequest) {
  const originError = validateOrigin(request);
  if (originError) return originError;

  const rateLimitError = rateLimit(
    request.headers.get("x-forwarded-for"),
    "recipe-post",
    { limit: 10, windowSeconds: 60 }
  );
  if (rateLimitError) return rateLimitError;

  return withAuth(async ({ user, admin }) => {
    const body = await request.json();
    const {
      title_fr, title_en, description_fr, description_en,
      ingredients, instructions_fr, instructions_en,
      image_url, category, is_public, recipe_id,
    } = body;

    if (!title_fr || typeof title_fr !== "string") {
      return NextResponse.json({ error: "title_fr is required" }, { status: 400 });
    }
    if (title_fr.length > 255 || (title_en && title_en.length > 255)) {
      return NextResponse.json({ error: "Title too long (max 255)" }, { status: 400 });
    }
    if ((description_fr && description_fr.length > 5000) || (description_en && description_en.length > 5000)) {
      return NextResponse.json({ error: "Description too long (max 5000)" }, { status: 400 });
    }
    if ((instructions_fr && instructions_fr.length > 10000) || (instructions_en && instructions_en.length > 10000)) {
      return NextResponse.json({ error: "Instructions too long (max 10000)" }, { status: 400 });
    }
    if (ingredients && (!Array.isArray(ingredients) || ingredients.length > 100)) {
      return NextResponse.json({ error: "Invalid ingredients (max 100 items)" }, { status: 400 });
    }
    if (category && !VALID_CATEGORIES.includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }
    if (image_url && (typeof image_url !== "string" || image_url.length > 2000)) {
      return NextResponse.json({ error: "Invalid image URL" }, { status: 400 });
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
      const { data: profileData } = await admin
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      const isCoach = profileData?.role === "coach";

      const updateQuery = admin
        .from("recipes")
        .update(data)
        .eq("id", recipe_id);

      if (!isCoach) {
        updateQuery.eq("author_id", user.id);
      }

      const { error: updateError } = await updateQuery;
      if (updateError) {
        console.error("Recipe update error:", updateError);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
      }
    } else {
      const { error: insertError } = await admin
        .from("recipes")
        .insert({ ...data, author_id: user.id });
      if (insertError) {
        console.error("Recipe insert error:", insertError);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  });
}
