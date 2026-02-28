-- ============================================================
-- Seed 11 healthy starter recipes (authored by the coach)
-- Run this in Supabase SQL Editor AFTER setting up your coach role
-- 
-- NOTE: The API route /api/portal/seed-recipes also seeds these
-- same recipes automatically. Only run this SQL if you need to
-- seed manually. Duplicates are prevented by title_fr.
-- ============================================================

-- Helper: only insert if title doesn't already exist
-- Recipe 1: Bowl Poulet Grillé & Quinoa
INSERT INTO public.recipes (author_id, title_fr, title_en, description_fr, description_en, ingredients, instructions_fr, instructions_en, image_url, category, is_public)
SELECT
  p.id,
  'Bowl Poulet Grillé & Quinoa',
  'Grilled Chicken & Quinoa Bowl',
  'Un bowl protéiné et équilibré, parfait après l''entraînement. Riche en protéines et en fibres.',
  'A high-protein balanced bowl, perfect post-workout. Rich in protein and fiber.',
  '["150g blanc de poulet", "100g quinoa", "1 avocat", "100g tomates cerises", "50g concombre", "1 c.à.s huile d''olive", "Jus de citron", "Sel, poivre, paprika"]'::jsonb,
  '1. Cuire le quinoa selon les instructions du paquet.
2. Assaisonner le poulet avec paprika, sel et poivre. Griller 6-7 min de chaque côté.
3. Couper l''avocat, les tomates et le concombre.
4. Assembler le bowl : quinoa en base, poulet tranché, légumes.
5. Arroser d''huile d''olive et de jus de citron.',
  '1. Cook quinoa according to package instructions.
2. Season chicken with paprika, salt, and pepper. Grill 6-7 min per side.
3. Slice avocado, halve tomatoes, dice cucumber.
4. Assemble bowl: quinoa base, sliced chicken, vegetables.
5. Drizzle with olive oil and lemon juice.',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
  'lunch',
  true
FROM public.profiles p WHERE p.role = 'coach'
AND NOT EXISTS (SELECT 1 FROM public.recipes WHERE title_fr = 'Bowl Poulet Grillé & Quinoa')
LIMIT 1;

-- Recipe 2: Smoothie Vert Énergie
INSERT INTO public.recipes (author_id, title_fr, title_en, description_fr, description_en, ingredients, instructions_fr, instructions_en, image_url, category, is_public)
SELECT
  p.id,
  'Smoothie Vert Énergie',
  'Green Energy Smoothie',
  'Un smoothie vert vitaminé pour bien démarrer la journée ou recharger les batteries.',
  'A vitamin-packed green smoothie to start your day or recharge your energy.',
  '["1 banane", "1 poignée d''épinards frais", "1/2 avocat", "200ml lait d''amande", "1 c.à.s graines de chia", "1 c.à.c miel", "Quelques glaçons"]'::jsonb,
  '1. Mettre tous les ingrédients dans un blender.
2. Mixer pendant 1 minute jusqu''à obtenir une texture lisse.
3. Ajuster la consistance avec plus de lait si nécessaire.
4. Servir immédiatement.',
  '1. Add all ingredients to a blender.
2. Blend for 1 minute until smooth.
3. Adjust consistency with more milk if needed.
4. Serve immediately.',
  'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=600&h=400&fit=crop',
  'smoothie',
  true
FROM public.profiles p WHERE p.role = 'coach'
AND NOT EXISTS (SELECT 1 FROM public.recipes WHERE title_fr = 'Smoothie Vert Énergie')
LIMIT 1;

-- Recipe 3: Salade Saumon & Avocat
INSERT INTO public.recipes (author_id, title_fr, title_en, description_fr, description_en, ingredients, instructions_fr, instructions_en, image_url, category, is_public)
SELECT
  p.id,
  'Salade Saumon & Avocat',
  'Salmon & Avocado Salad',
  'Une salade fraîche et nourrissante, riche en oméga-3 et en bonnes graisses.',
  'A fresh and nourishing salad, rich in omega-3 and healthy fats.',
  '["150g saumon fumé", "1 avocat mûr", "100g roquette", "1/2 concombre", "2 c.à.s graines de sésame", "Vinaigrette : huile d''olive, citron, moutarde", "Sel, poivre"]'::jsonb,
  '1. Disposer la roquette dans une assiette.
2. Couper l''avocat en tranches et le concombre en rondelles.
3. Disposer le saumon fumé par-dessus.
4. Préparer la vinaigrette : mélanger huile d''olive, jus de citron et moutarde.
5. Parsemer de graines de sésame et arroser de vinaigrette.',
  '1. Arrange arugula on a plate.
2. Slice avocado and cucumber.
3. Layer smoked salmon on top.
4. Prepare dressing: mix olive oil, lemon juice, and mustard.
5. Sprinkle with sesame seeds and drizzle with dressing.',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
  'salad',
  true
FROM public.profiles p WHERE p.role = 'coach'
AND NOT EXISTS (SELECT 1 FROM public.recipes WHERE title_fr = 'Salade Saumon & Avocat')
LIMIT 1;

-- Recipe 4: Porridge Protéiné aux Fruits
INSERT INTO public.recipes (author_id, title_fr, title_en, description_fr, description_en, ingredients, instructions_fr, instructions_en, image_url, category, is_public)
SELECT
  p.id,
  'Porridge Protéiné aux Fruits',
  'Protein Fruit Porridge',
  'Un petit-déjeuner chaud et réconfortant qui vous donne de l''énergie pour toute la matinée.',
  'A warm, comforting breakfast that fuels you through the entire morning.',
  '["80g flocons d''avoine", "250ml lait (ou lait végétal)", "1 banane", "1 poignée de myrtilles", "1 c.à.s beurre de cacahuète", "1 c.à.s graines de lin", "Cannelle"]'::jsonb,
  '1. Cuire les flocons d''avoine dans le lait à feu moyen pendant 5 minutes.
2. Couper la banane en rondelles.
3. Verser le porridge dans un bol.
4. Garnir avec banane, myrtilles, beurre de cacahuète et graines de lin.
5. Saupoudrer de cannelle.',
  '1. Cook oats in milk over medium heat for 5 minutes.
2. Slice the banana.
3. Pour porridge into a bowl.
4. Top with banana, blueberries, peanut butter, and flax seeds.
5. Sprinkle with cinnamon.',
  'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=600&h=400&fit=crop',
  'breakfast',
  true
FROM public.profiles p WHERE p.role = 'coach'
AND NOT EXISTS (SELECT 1 FROM public.recipes WHERE title_fr = 'Porridge Protéiné aux Fruits')
LIMIT 1;

-- Recipe 5: Wrap Dinde & Légumes Croquants
INSERT INTO public.recipes (author_id, title_fr, title_en, description_fr, description_en, ingredients, instructions_fr, instructions_en, image_url, category, is_public)
SELECT
  p.id,
  'Wrap Dinde & Légumes Croquants',
  'Turkey & Crunchy Veggie Wrap',
  'Un wrap léger mais rassasiant, idéal pour un déjeuner rapide et sain.',
  'A light but filling wrap, ideal for a quick and healthy lunch.',
  '["1 tortilla complète", "100g blanc de dinde", "1 carotte râpée", "50g chou rouge émincé", "1/2 avocat", "2 c.à.s houmous", "Quelques feuilles de laitue"]'::jsonb,
  '1. Étaler le houmous sur la tortilla.
2. Disposer les feuilles de laitue.
3. Ajouter la dinde, la carotte râpée et le chou rouge.
4. Couper l''avocat en tranches et placer sur le dessus.
5. Rouler le wrap bien serré. Couper en deux et servir.',
  '1. Spread hummus on the tortilla.
2. Layer lettuce leaves.
3. Add turkey, grated carrot, and red cabbage.
4. Slice avocado and place on top.
5. Roll the wrap tightly. Cut in half and serve.',
  'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&h=400&fit=crop',
  'lunch',
  true
FROM public.profiles p WHERE p.role = 'coach'
AND NOT EXISTS (SELECT 1 FROM public.recipes WHERE title_fr = 'Wrap Dinde & Légumes Croquants')
LIMIT 1;

-- Recipe 6: Poulet Rôti aux Herbes & Patates Douces
INSERT INTO public.recipes (author_id, title_fr, title_en, description_fr, description_en, ingredients, instructions_fr, instructions_en, image_url, category, is_public)
SELECT
  p.id,
  'Poulet Rôti aux Herbes & Patates Douces',
  'Herb Roasted Chicken & Sweet Potatoes',
  'Un dîner complet et réconfortant. Le poulet rôti aux herbes associé aux patates douces offre un repas riche en protéines et en glucides complexes.',
  'A complete and comforting dinner. Herb-roasted chicken with sweet potatoes provides a meal rich in protein and complex carbs.',
  '["4 hauts de cuisse de poulet", "2 patates douces moyennes", "2 c.à.s huile d''olive", "3 gousses d''ail", "1 c.à.c thym séché", "1 c.à.c romarin séché", "1 c.à.c paprika fumé", "200g haricots verts", "Sel, poivre"]'::jsonb,
  '1. Préchauffer le four à 200°C.
2. Couper les patates douces en cubes de 2 cm.
3. Mélanger le poulet avec l''huile d''olive, l''ail émincé, le thym, le romarin, le paprika, le sel et le poivre.
4. Disposer le poulet et les patates douces sur une plaque de cuisson.
5. Enfourner 25 minutes.
6. Ajouter les haricots verts, mélanger et cuire encore 10 minutes.
7. Le poulet doit être doré et les légumes tendres. Servir chaud.',
  '1. Preheat oven to 200°C (400°F).
2. Cut sweet potatoes into 2 cm cubes.
3. Toss chicken with olive oil, minced garlic, thyme, rosemary, paprika, salt, and pepper.
4. Arrange chicken and sweet potatoes on a baking sheet.
5. Roast for 25 minutes.
6. Add green beans, toss, and cook for another 10 minutes.
7. Chicken should be golden and vegetables tender. Serve hot.',
  'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=600&h=400&fit=crop',
  'dinner',
  true
FROM public.profiles p WHERE p.role = 'coach'
AND NOT EXISTS (SELECT 1 FROM public.recipes WHERE title_fr = 'Poulet Rôti aux Herbes & Patates Douces')
LIMIT 1;

-- Recipe 7: Pavé de Cabillaud & Ratatouille Maison
INSERT INTO public.recipes (author_id, title_fr, title_en, description_fr, description_en, ingredients, instructions_fr, instructions_en, image_url, category, is_public)
SELECT
  p.id,
  'Pavé de Cabillaud & Ratatouille Maison',
  'Cod Fillet with Homemade Ratatouille',
  'Un dîner méditerranéen léger et savoureux. Le cabillaud apporte des protéines maigres, accompagné d''une ratatouille riche en vitamines.',
  'A light and flavorful Mediterranean dinner. Cod provides lean protein, paired with a vitamin-rich ratatouille.',
  '["2 pavés de cabillaud", "1 courgette", "1 aubergine", "1 poivron rouge", "1 poivron jaune", "4 tomates mûres", "1 oignon", "3 gousses d''ail", "2 c.à.s huile d''olive", "Herbes de Provence", "Basilic frais", "Sel, poivre"]'::jsonb,
  '1. Couper tous les légumes en dés réguliers.
2. Faire revenir l''oignon et l''ail dans l''huile d''olive pendant 3 minutes.
3. Ajouter l''aubergine et les poivrons, cuire 5 minutes.
4. Ajouter la courgette et les tomates, assaisonner avec les herbes de Provence, sel et poivre.
5. Laisser mijoter 20 minutes à feu doux en remuant de temps en temps.
6. Assaisonner les pavés de cabillaud et les cuire à la poêle 4 minutes de chaque côté.
7. Servir le cabillaud sur la ratatouille, garnir de basilic frais.',
  '1. Dice all vegetables into even pieces.
2. Sauté onion and garlic in olive oil for 3 minutes.
3. Add eggplant and peppers, cook for 5 minutes.
4. Add zucchini and tomatoes, season with herbes de Provence, salt, and pepper.
5. Simmer for 20 minutes on low heat, stirring occasionally.
6. Season cod fillets and pan-sear for 4 minutes per side.
7. Serve cod on top of ratatouille, garnish with fresh basil.',
  'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&h=400&fit=crop',
  'dinner',
  true
FROM public.profiles p WHERE p.role = 'coach'
AND NOT EXISTS (SELECT 1 FROM public.recipes WHERE title_fr = 'Pavé de Cabillaud & Ratatouille Maison')
LIMIT 1;

-- Recipe 8: Steak de Thon & Wok de Légumes au Sésame
INSERT INTO public.recipes (author_id, title_fr, title_en, description_fr, description_en, ingredients, instructions_fr, instructions_en, image_url, category, is_public)
SELECT
  p.id,
  'Steak de Thon & Wok de Légumes au Sésame',
  'Tuna Steak & Sesame Vegetable Stir-Fry',
  'Un dîner healthy et rapide d''inspiration asiatique. Le thon snacké est riche en protéines et en oméga-3, accompagné de légumes croquants.',
  'A healthy and quick Asian-inspired dinner. Seared tuna is rich in protein and omega-3, served with crispy stir-fried vegetables.',
  '["2 steaks de thon frais (150g chacun)", "1 c.à.s sauce soja", "1 c.à.c huile de sésame", "1 brocoli (en fleurettes)", "1 carotte (en julienne)", "1 poivron rouge (en lamelles)", "100g pois mange-tout", "2 gousses d''ail", "1 c.à.s gingembre frais râpé", "2 c.à.s graines de sésame", "1 c.à.s huile d''olive", "Coriandre fraîche"]'::jsonb,
  '1. Mariner les steaks de thon dans la sauce soja et l''huile de sésame pendant 10 minutes.
2. Faire chauffer l''huile d''olive dans un wok à feu vif.
3. Saisir le brocoli, la carotte et le poivron pendant 3 minutes.
4. Ajouter les pois mange-tout, l''ail et le gingembre. Cuire 2 minutes.
5. Dans une poêle très chaude, saisir les steaks de thon 1-2 minutes de chaque côté (laisser rosé au centre).
6. Servir le thon tranché sur les légumes, parsemer de sésame et de coriandre.',
  '1. Marinate tuna steaks in soy sauce and sesame oil for 10 minutes.
2. Heat olive oil in a wok over high heat.
3. Stir-fry broccoli, carrot, and pepper for 3 minutes.
4. Add snap peas, garlic, and ginger. Cook for 2 minutes.
5. In a very hot pan, sear tuna steaks 1-2 minutes per side (keep pink in the center).
6. Serve sliced tuna over vegetables, sprinkle with sesame seeds and cilantro.',
  'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=600&h=400&fit=crop',
  'dinner',
  true
FROM public.profiles p WHERE p.role = 'coach'
AND NOT EXISTS (SELECT 1 FROM public.recipes WHERE title_fr = 'Steak de Thon & Wok de Légumes au Sésame')
LIMIT 1;

-- Recipe 9: Tartine Salée Œuf, Avocat & Feta
INSERT INTO public.recipes (author_id, title_fr, title_en, description_fr, description_en, ingredients, instructions_fr, instructions_en, image_url, category, is_public)
SELECT
  p.id,
  'Tartine Salée Œuf, Avocat & Feta',
  'Savory Egg, Avocado & Feta Toast',
  'Un petit-déjeuner salé complet et rassasiant. L''association œuf-avocat-feta apporte protéines, bonnes graisses et saveurs méditerranéennes.',
  'A complete and filling savory breakfast. The egg-avocado-feta combination delivers protein, healthy fats, and Mediterranean flavors.',
  '["2 tranches de pain complet", "2 œufs", "1 avocat mûr", "40g de feta", "1 petite tomate", "1 c.à.c huile d''olive", "Quelques feuilles de roquette", "Graines de courge", "Piment d''Espelette (ou flocons de piment)", "Sel, poivre"]'::jsonb,
  '1. Faire griller les tranches de pain.
2. Écraser l''avocat à la fourchette avec un filet d''huile d''olive, sel et poivre.
3. Cuire les œufs au plat dans une poêle antiadhésive.
4. Tartiner l''avocat sur le pain grillé.
5. Couper la tomate en tranches fines et disposer sur l''avocat.
6. Déposer un œuf sur chaque tartine.
7. Émietter la feta par-dessus, ajouter la roquette et les graines de courge.
8. Saupoudrer de piment d''Espelette. Servir immédiatement.',
  '1. Toast the bread slices.
2. Mash avocado with a fork, a drizzle of olive oil, salt, and pepper.
3. Fry eggs sunny-side up in a non-stick pan.
4. Spread mashed avocado on toasted bread.
5. Slice tomato thinly and arrange over avocado.
6. Place an egg on each toast.
7. Crumble feta on top, add arugula and pumpkin seeds.
8. Sprinkle with Espelette pepper. Serve immediately.',
  'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=400&fit=crop',
  'breakfast',
  true
FROM public.profiles p WHERE p.role = 'coach'
AND NOT EXISTS (SELECT 1 FROM public.recipes WHERE title_fr = 'Tartine Salée Œuf, Avocat & Feta')
LIMIT 1;

-- Recipe 10: Velouté de Butternut & Noisettes
INSERT INTO public.recipes (author_id, title_fr, title_en, description_fr, description_en, ingredients, instructions_fr, instructions_en, image_url, category, is_public)
SELECT
  p.id,
  'Velouté de Butternut & Noisettes',
  'Butternut Squash & Hazelnut Soup',
  'Un velouté onctueux et réconfortant, parfait pour les soirées fraîches. La butternut apporte des vitamines A et C, les noisettes ajoutent du croquant et des bonnes graisses.',
  'A creamy and comforting soup, perfect for cool evenings. Butternut squash provides vitamins A and C, while hazelnuts add crunch and healthy fats.',
  '["1 courge butternut (environ 800g)", "1 oignon", "2 gousses d''ail", "1 c.à.s huile d''olive", "500ml bouillon de légumes", "100ml crème fraîche légère (ou lait de coco)", "1 c.à.c curcuma", "1 pincée de muscade", "30g noisettes concassées", "Sel, poivre"]'::jsonb,
  '1. Éplucher et couper la butternut en cubes.
2. Faire revenir l''oignon et l''ail émincés dans l''huile d''olive pendant 3 minutes.
3. Ajouter les cubes de butternut, le curcuma et la muscade. Mélanger.
4. Verser le bouillon de légumes et porter à ébullition.
5. Laisser mijoter 20-25 minutes jusqu''à ce que la courge soit tendre.
6. Mixer finement, ajouter la crème fraîche et rectifier l''assaisonnement.
7. Servir dans des bols, parsemer de noisettes concassées.',
  '1. Peel and cube the butternut squash.
2. Sauté minced onion and garlic in olive oil for 3 minutes.
3. Add squash cubes, turmeric, and nutmeg. Stir.
4. Pour in vegetable broth and bring to a boil.
5. Simmer 20-25 minutes until squash is tender.
6. Blend until smooth, stir in cream, and adjust seasoning.
7. Serve in bowls, topped with crushed hazelnuts.',
  'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=600&h=400&fit=crop',
  'soup',
  true
FROM public.profiles p WHERE p.role = 'coach'
AND NOT EXISTS (SELECT 1 FROM public.recipes WHERE title_fr = 'Velouté de Butternut & Noisettes')
LIMIT 1;

-- Recipe 11: Potage Poireaux, Pommes de Terre & Ciboulette
INSERT INTO public.recipes (author_id, title_fr, title_en, description_fr, description_en, ingredients, instructions_fr, instructions_en, image_url, category, is_public)
SELECT
  p.id,
  'Potage Poireaux, Pommes de Terre & Ciboulette',
  'Leek, Potato & Chive Potage',
  'Un grand classique français revisité, léger et nourrissant. Ce potage crémeux est riche en fibres et idéal pour un dîner simple et sain.',
  'A light and nourishing French classic. This creamy potage is rich in fiber and perfect for a simple, healthy dinner.',
  '["3 poireaux (blanc et vert tendre)", "3 pommes de terre moyennes", "1 oignon", "1 gousse d''ail", "1 c.à.s huile d''olive", "700ml bouillon de volaille (ou légumes)", "2 c.à.s crème fraîche légère", "Ciboulette fraîche", "Sel, poivre"]'::jsonb,
  '1. Laver et émincer les poireaux. Éplucher et couper les pommes de terre en morceaux.
2. Faire revenir l''oignon et l''ail dans l''huile d''olive 2 minutes.
3. Ajouter les poireaux et faire suer 5 minutes à feu doux.
4. Ajouter les pommes de terre et le bouillon. Porter à ébullition.
5. Cuire à couvert pendant 20 minutes à feu moyen.
6. Mixer le tout jusqu''à consistance lisse.
7. Incorporer la crème fraîche, assaisonner.
8. Servir chaud avec la ciboulette ciselée et un filet d''huile d''olive.',
  '1. Wash and slice leeks. Peel and chop potatoes.
2. Sauté onion and garlic in olive oil for 2 minutes.
3. Add leeks and sweat for 5 minutes on low heat.
4. Add potatoes and broth. Bring to a boil.
5. Cover and cook for 20 minutes on medium heat.
6. Blend until smooth.
7. Stir in cream, season to taste.
8. Serve hot with snipped chives and a drizzle of olive oil.',
  'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop',
  'soup',
  true
FROM public.profiles p WHERE p.role = 'coach'
AND NOT EXISTS (SELECT 1 FROM public.recipes WHERE title_fr = 'Potage Poireaux, Pommes de Terre & Ciboulette')
LIMIT 1;
