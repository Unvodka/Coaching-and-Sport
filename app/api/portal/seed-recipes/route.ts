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
  // --- 6 NEW RECIPES ---
  {
    title_fr: "Poulet Rôti aux Herbes & Patates Douces",
    title_en: "Herb Roasted Chicken & Sweet Potatoes",
    description_fr: "Un dîner complet et réconfortant. Le poulet rôti aux herbes associé aux patates douces offre un repas riche en protéines et en glucides complexes.",
    description_en: "A complete and comforting dinner. Herb-roasted chicken with sweet potatoes provides a meal rich in protein and complex carbs.",
    ingredients: [
      "4 hauts de cuisse de poulet",
      "2 patates douces moyennes",
      "2 c.à.s huile d'olive",
      "3 gousses d'ail",
      "1 c.à.c thym séché",
      "1 c.à.c romarin séché",
      "1 c.à.c paprika fumé",
      "200g haricots verts",
      "Sel, poivre",
    ],
    instructions_fr:
      "1. Préchauffer le four à 200°C.\n2. Couper les patates douces en cubes de 2 cm.\n3. Mélanger le poulet avec l'huile d'olive, l'ail émincé, le thym, le romarin, le paprika, le sel et le poivre.\n4. Disposer le poulet et les patates douces sur une plaque de cuisson.\n5. Enfourner 25 minutes.\n6. Ajouter les haricots verts, mélanger et cuire encore 10 minutes.\n7. Le poulet doit être doré et les légumes tendres. Servir chaud.",
    instructions_en:
      "1. Preheat oven to 200°C (400°F).\n2. Cut sweet potatoes into 2 cm cubes.\n3. Toss chicken with olive oil, minced garlic, thyme, rosemary, paprika, salt, and pepper.\n4. Arrange chicken and sweet potatoes on a baking sheet.\n5. Roast for 25 minutes.\n6. Add green beans, toss, and cook for another 10 minutes.\n7. Chicken should be golden and vegetables tender. Serve hot.",
    category: "dinner",
    image_url: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=600&h=400&fit=crop",
  },
  {
    title_fr: "Pavé de Cabillaud & Ratatouille Maison",
    title_en: "Cod Fillet with Homemade Ratatouille",
    description_fr: "Un dîner méditerranéen léger et savoureux. Le cabillaud apporte des protéines maigres, accompagné d'une ratatouille riche en vitamines.",
    description_en: "A light and flavorful Mediterranean dinner. Cod provides lean protein, paired with a vitamin-rich ratatouille.",
    ingredients: [
      "2 pavés de cabillaud",
      "1 courgette",
      "1 aubergine",
      "1 poivron rouge",
      "1 poivron jaune",
      "4 tomates mûres",
      "1 oignon",
      "3 gousses d'ail",
      "2 c.à.s huile d'olive",
      "Herbes de Provence",
      "Basilic frais",
      "Sel, poivre",
    ],
    instructions_fr:
      "1. Couper tous les légumes en dés réguliers.\n2. Faire revenir l'oignon et l'ail dans l'huile d'olive pendant 3 minutes.\n3. Ajouter l'aubergine et les poivrons, cuire 5 minutes.\n4. Ajouter la courgette et les tomates, assaisonner avec les herbes de Provence, sel et poivre.\n5. Laisser mijoter 20 minutes à feu doux en remuant de temps en temps.\n6. Assaisonner les pavés de cabillaud et les cuire à la poêle 4 minutes de chaque côté.\n7. Servir le cabillaud sur la ratatouille, garnir de basilic frais.",
    instructions_en:
      "1. Dice all vegetables into even pieces.\n2. Sauté onion and garlic in olive oil for 3 minutes.\n3. Add eggplant and peppers, cook for 5 minutes.\n4. Add zucchini and tomatoes, season with herbes de Provence, salt, and pepper.\n5. Simmer for 20 minutes on low heat, stirring occasionally.\n6. Season cod fillets and pan-sear for 4 minutes per side.\n7. Serve cod on top of ratatouille, garnish with fresh basil.",
    category: "dinner",
    image_url: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&h=400&fit=crop",
  },
  {
    title_fr: "Steak de Thon & Wok de Légumes au Sésame",
    title_en: "Tuna Steak & Sesame Vegetable Stir-Fry",
    description_fr: "Un dîner healthy et rapide d'inspiration asiatique. Le thon snacké est riche en protéines et en oméga-3, accompagné de légumes croquants.",
    description_en: "A healthy and quick Asian-inspired dinner. Seared tuna is rich in protein and omega-3, served with crispy stir-fried vegetables.",
    ingredients: [
      "2 steaks de thon frais (150g chacun)",
      "1 c.à.s sauce soja",
      "1 c.à.c huile de sésame",
      "1 brocoli (en fleurettes)",
      "1 carotte (en julienne)",
      "1 poivron rouge (en lamelles)",
      "100g pois mange-tout",
      "2 gousses d'ail",
      "1 c.à.s gingembre frais râpé",
      "2 c.à.s graines de sésame",
      "1 c.à.s huile d'olive",
      "Coriandre fraîche",
    ],
    instructions_fr:
      "1. Mariner les steaks de thon dans la sauce soja et l'huile de sésame pendant 10 minutes.\n2. Faire chauffer l'huile d'olive dans un wok à feu vif.\n3. Saisir le brocoli, la carotte et le poivron pendant 3 minutes.\n4. Ajouter les pois mange-tout, l'ail et le gingembre. Cuire 2 minutes.\n5. Dans une poêle très chaude, saisir les steaks de thon 1-2 minutes de chaque côté (laisser rosé au centre).\n6. Servir le thon tranché sur les légumes, parsemer de sésame et de coriandre.",
    instructions_en:
      "1. Marinate tuna steaks in soy sauce and sesame oil for 10 minutes.\n2. Heat olive oil in a wok over high heat.\n3. Stir-fry broccoli, carrot, and pepper for 3 minutes.\n4. Add snap peas, garlic, and ginger. Cook for 2 minutes.\n5. In a very hot pan, sear tuna steaks 1-2 minutes per side (keep pink in the center).\n6. Serve sliced tuna over vegetables, sprinkle with sesame seeds and cilantro.",
    category: "dinner",
    image_url: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=600&h=400&fit=crop",
  },
  {
    title_fr: "Tartine Salée Œuf, Avocat & Feta",
    title_en: "Savory Egg, Avocado & Feta Toast",
    description_fr: "Un petit-déjeuner salé complet et rassasiant. L'association œuf-avocat-feta apporte protéines, bonnes graisses et saveurs méditerranéennes.",
    description_en: "A complete and filling savory breakfast. The egg-avocado-feta combination delivers protein, healthy fats, and Mediterranean flavors.",
    ingredients: [
      "2 tranches de pain complet",
      "2 œufs",
      "1 avocat mûr",
      "40g de feta",
      "1 petite tomate",
      "1 c.à.c huile d'olive",
      "Quelques feuilles de roquette",
      "Graines de courge",
      "Piment d'Espelette (ou flocons de piment)",
      "Sel, poivre",
    ],
    instructions_fr:
      "1. Faire griller les tranches de pain.\n2. Écraser l'avocat à la fourchette avec un filet d'huile d'olive, sel et poivre.\n3. Cuire les œufs au plat dans une poêle antiadhésive (ou pochés selon votre préférence).\n4. Tartiner l'avocat sur le pain grillé.\n5. Couper la tomate en tranches fines et disposer sur l'avocat.\n6. Déposer un œuf sur chaque tartine.\n7. Émietter la feta par-dessus, ajouter la roquette et les graines de courge.\n8. Saupoudrer de piment d'Espelette. Servir immédiatement.",
    instructions_en:
      "1. Toast the bread slices.\n2. Mash avocado with a fork, a drizzle of olive oil, salt, and pepper.\n3. Fry eggs sunny-side up in a non-stick pan (or poach to preference).\n4. Spread mashed avocado on toasted bread.\n5. Slice tomato thinly and arrange over avocado.\n6. Place an egg on each toast.\n7. Crumble feta on top, add arugula and pumpkin seeds.\n8. Sprinkle with Espelette pepper. Serve immediately.",
    category: "breakfast",
    image_url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=400&fit=crop",
  },
  {
    title_fr: "Velouté de Butternut & Noisettes",
    title_en: "Butternut Squash & Hazelnut Soup",
    description_fr: "Un velouté onctueux et réconfortant, parfait pour les soirées fraîches. La butternut apporte des vitamines A et C, les noisettes ajoutent du croquant et des bonnes graisses.",
    description_en: "A creamy and comforting soup, perfect for cool evenings. Butternut squash provides vitamins A and C, while hazelnuts add crunch and healthy fats.",
    ingredients: [
      "1 courge butternut (environ 800g)",
      "1 oignon",
      "2 gousses d'ail",
      "1 c.à.s huile d'olive",
      "500ml bouillon de légumes",
      "100ml crème fraîche légère (ou lait de coco)",
      "1 c.à.c curcuma",
      "1 pincée de muscade",
      "30g noisettes concassées",
      "Sel, poivre",
    ],
    instructions_fr:
      "1. Éplucher et couper la butternut en cubes.\n2. Faire revenir l'oignon et l'ail émincés dans l'huile d'olive pendant 3 minutes.\n3. Ajouter les cubes de butternut, le curcuma et la muscade. Mélanger.\n4. Verser le bouillon de légumes et porter à ébullition.\n5. Laisser mijoter 20-25 minutes jusqu'à ce que la courge soit tendre.\n6. Mixer finement, ajouter la crème fraîche et rectifier l'assaisonnement.\n7. Servir dans des bols, parsemer de noisettes concassées.",
    instructions_en:
      "1. Peel and cube the butternut squash.\n2. Sauté minced onion and garlic in olive oil for 3 minutes.\n3. Add squash cubes, turmeric, and nutmeg. Stir.\n4. Pour in vegetable broth and bring to a boil.\n5. Simmer 20-25 minutes until squash is tender.\n6. Blend until smooth, stir in cream, and adjust seasoning.\n7. Serve in bowls, topped with crushed hazelnuts.",
    category: "soup",
    image_url: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=600&h=400&fit=crop",
  },
  {
    title_fr: "Potage Poireaux, Pommes de Terre & Ciboulette",
    title_en: "Leek, Potato & Chive Potage",
    description_fr: "Un grand classique français revisité, léger et nourrissant. Ce potage crémeux est riche en fibres et idéal pour un dîner simple et sain.",
    description_en: "A light and nourishing French classic. This creamy potage is rich in fiber and perfect for a simple, healthy dinner.",
    ingredients: [
      "3 poireaux (blanc et vert tendre)",
      "3 pommes de terre moyennes",
      "1 oignon",
      "1 gousse d'ail",
      "1 c.à.s huile d'olive",
      "700ml bouillon de volaille (ou légumes)",
      "2 c.à.s crème fraîche légère",
      "Ciboulette fraîche",
      "Sel, poivre",
    ],
    instructions_fr:
      "1. Laver et émincer les poireaux. Éplucher et couper les pommes de terre en morceaux.\n2. Faire revenir l'oignon et l'ail dans l'huile d'olive 2 minutes.\n3. Ajouter les poireaux et faire suer 5 minutes à feu doux.\n4. Ajouter les pommes de terre et le bouillon. Porter à ébullition.\n5. Cuire à couvert pendant 20 minutes à feu moyen.\n6. Mixer le tout jusqu'à consistance lisse.\n7. Incorporer la crème fraîche, assaisonner.\n8. Servir chaud avec la ciboulette ciselée et un filet d'huile d'olive.",
    instructions_en:
      "1. Wash and slice leeks. Peel and chop potatoes.\n2. Sauté onion and garlic in olive oil for 2 minutes.\n3. Add leeks and sweat for 5 minutes on low heat.\n4. Add potatoes and broth. Bring to a boil.\n5. Cover and cook for 20 minutes on medium heat.\n6. Blend until smooth.\n7. Stir in cream, season to taste.\n8. Serve hot with snipped chives and a drizzle of olive oil.",
    category: "soup",
    image_url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop",
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

    // Fetch all existing public recipe titles to avoid duplicates
    const { data: existing } = await admin
      .from("recipes")
      .select("title_fr")
      .eq("is_public", true);

    const existingTitles = new Set(
      (existing || []).map((r: { title_fr: string }) => r.title_fr)
    );

    // Filter out recipes that already exist (by French title)
    const newRecipes = HEALTHY_RECIPES.filter(
      (r) => !existingTitles.has(r.title_fr)
    );

    if (newRecipes.length === 0) {
      return NextResponse.json({ message: "All recipes already exist", alreadyExists: true });
    }

    // Insert only new recipes
    const recipesToInsert = newRecipes.map((r) => ({
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

    // Favorite all new recipes for this user
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
