import { createClient, createAdminClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const HEALTHY_RECIPES = [
  {
    title_fr: "Bowl Poulet Grillé & Quinoa",
    title_en: "Grilled Chicken & Quinoa Bowl",
    description_fr: "Un bowl protéiné et équilibré, parfait après l'entraînement. Riche en protéines et en fibres.",
    description_en: "A high-protein balanced bowl, perfect post-workout. Rich in protein and fiber.",
    ingredients: [
      "150g blanc de poulet",
      "100g quinoa",
      "1 avocat",
      "100g tomates cerises",
      "50g concombre",
      "1 c.à.s huile d'olive",
      "Jus de citron",
      "Sel, poivre, paprika",
    ],
    instructions_fr:
      "1. Cuire le quinoa selon les instructions du paquet.\n2. Assaisonner le poulet avec paprika, sel et poivre. Griller 6-7 min de chaque côté.\n3. Couper l'avocat, les tomates et le concombre.\n4. Assembler le bowl : quinoa en base, poulet tranché, légumes.\n5. Arroser d'huile d'olive et de jus de citron.",
    instructions_en:
      "1. Cook quinoa according to package instructions.\n2. Season chicken with paprika, salt, and pepper. Grill 6-7 min per side.\n3. Slice avocado, halve tomatoes, dice cucumber.\n4. Assemble bowl: quinoa base, sliced chicken, vegetables.\n5. Drizzle with olive oil and lemon juice.",
    category: "lunch",
    image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
  },
  {
    title_fr: "Smoothie Vert Énergie",
    title_en: "Green Energy Smoothie",
    description_fr: "Un smoothie vert vitaminé pour bien démarrer la journée ou recharger les batteries.",
    description_en: "A vitamin-packed green smoothie to start your day or recharge your energy.",
    ingredients: [
      "1 banane",
      "1 poignée d'épinards frais",
      "1/2 avocat",
      "200ml lait d'amande",
      "1 c.à.s graines de chia",
      "1 c.à.c miel",
      "Quelques glaçons",
    ],
    instructions_fr:
      "1. Mettre tous les ingrédients dans un blender.\n2. Mixer pendant 1 minute jusqu'à obtenir une texture lisse.\n3. Ajuster la consistance avec plus de lait si nécessaire.\n4. Servir immédiatement.",
    instructions_en:
      "1. Add all ingredients to a blender.\n2. Blend for 1 minute until smooth.\n3. Adjust consistency with more milk if needed.\n4. Serve immediately.",
    category: "smoothie",
    image_url: "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=600&h=400&fit=crop",
  },
  {
    title_fr: "Salade Saumon & Avocat",
    title_en: "Salmon & Avocado Salad",
    description_fr: "Une salade fraîche et nourrissante, riche en oméga-3 et en bonnes graisses.",
    description_en: "A fresh and nourishing salad, rich in omega-3 and healthy fats.",
    ingredients: [
      "150g saumon fumé",
      "1 avocat mûr",
      "100g roquette",
      "1/2 concombre",
      "2 c.à.s graines de sésame",
      "Vinaigrette : huile d'olive, citron, moutarde",
      "Sel, poivre",
    ],
    instructions_fr:
      "1. Disposer la roquette dans une assiette.\n2. Couper l'avocat en tranches et le concombre en rondelles.\n3. Disposer le saumon fumé par-dessus.\n4. Préparer la vinaigrette : mélanger huile d'olive, jus de citron et moutarde.\n5. Parsemer de graines de sésame et arroser de vinaigrette.",
    instructions_en:
      "1. Arrange arugula on a plate.\n2. Slice avocado and cucumber.\n3. Layer smoked salmon on top.\n4. Prepare dressing: mix olive oil, lemon juice, and mustard.\n5. Sprinkle with sesame seeds and drizzle with dressing.",
    category: "salad",
    image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
  },
  {
    title_fr: "Porridge Protéiné aux Fruits",
    title_en: "Protein Fruit Porridge",
    description_fr: "Un petit-déjeuner chaud et réconfortant qui vous donne de l'énergie pour toute la matinée.",
    description_en: "A warm, comforting breakfast that fuels you through the entire morning.",
    ingredients: [
      "80g flocons d'avoine",
      "250ml lait (ou lait végétal)",
      "1 banane",
      "1 poignée de myrtilles",
      "1 c.à.s beurre de cacahuète",
      "1 c.à.s graines de lin",
      "Cannelle",
    ],
    instructions_fr:
      "1. Cuire les flocons d'avoine dans le lait à feu moyen pendant 5 minutes.\n2. Couper la banane en rondelles.\n3. Verser le porridge dans un bol.\n4. Garnir avec banane, myrtilles, beurre de cacahuète et graines de lin.\n5. Saupoudrer de cannelle.",
    instructions_en:
      "1. Cook oats in milk over medium heat for 5 minutes.\n2. Slice the banana.\n3. Pour porridge into a bowl.\n4. Top with banana, blueberries, peanut butter, and flax seeds.\n5. Sprinkle with cinnamon.",
    category: "breakfast",
    image_url: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=600&h=400&fit=crop",
  },
  {
    title_fr: "Wrap Dinde & Légumes Croquants",
    title_en: "Turkey & Crunchy Veggie Wrap",
    description_fr: "Un wrap léger mais rassasiant, idéal pour un déjeuner rapide et sain.",
    description_en: "A light but filling wrap, ideal for a quick and healthy lunch.",
    ingredients: [
      "1 tortilla complète",
      "100g blanc de dinde",
      "1 carotte râpée",
      "50g chou rouge émincé",
      "1/2 avocat",
      "2 c.à.s houmous",
      "Quelques feuilles de laitue",
    ],
    instructions_fr:
      "1. Étaler le houmous sur la tortilla.\n2. Disposer les feuilles de laitue.\n3. Ajouter la dinde, la carotte râpée et le chou rouge.\n4. Couper l'avocat en tranches et placer sur le dessus.\n5. Rouler le wrap bien serré. Couper en deux et servir.",
    instructions_en:
      "1. Spread hummus on the tortilla.\n2. Layer lettuce leaves.\n3. Add turkey, grated carrot, and red cabbage.\n4. Slice avocado and place on top.\n5. Roll the wrap tightly. Cut in half and serve.",
    category: "lunch",
    image_url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&h=400&fit=crop",
  },
];

export async function POST() {
  try {
    // Verify user
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const admin = createAdminClient();

    // Check if recipes already seeded (avoid duplicates)
    const { data: existing } = await admin
      .from("recipes")
      .select("id")
      .eq("author_id", user.id)
      .eq("is_public", true)
      .limit(1);

    if (existing && existing.length > 0) {
      return NextResponse.json({ message: "Recipes already seeded", alreadyExists: true });
    }

    // Insert all 5 recipes
    const recipesToInsert = HEALTHY_RECIPES.map((r) => ({
      ...r,
      author_id: user.id,
      is_public: true,
    }));

    const { data: inserted, error: insertError } = await admin
      .from("recipes")
      .insert(recipesToInsert)
      .select("id");

    if (insertError) {
      console.error("Seed recipes insert error:", insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    // Favorite all 5 recipes for this user
    if (inserted && inserted.length > 0) {
      const favorites = inserted.map((r: { id: string }) => ({
        user_id: user.id,
        recipe_id: r.id,
      }));

      const { error: favError } = await admin
        .from("recipe_favorites")
        .insert(favorites);

      if (favError) {
        console.error("Seed favorites error:", favError);
        // Non-fatal — recipes are still created
      }
    }

    return NextResponse.json({
      success: true,
      count: inserted?.length ?? 0,
    });
  } catch (error) {
    console.error("Seed recipes error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
