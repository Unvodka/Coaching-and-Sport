-- ============================================================
-- Seed 5 healthy starter recipes (authored by the coach)
-- Run this in Supabase SQL Editor AFTER setting up your coach role
-- ============================================================

-- Insert 5 public recipes authored by the coach
INSERT INTO public.recipes (author_id, title_fr, title_en, description_fr, description_en, ingredients, instructions_fr, instructions_en, image_url, category, is_public)
SELECT
  p.id,
  'Bowl Petit-Déjeuner Protéiné',
  'Protein Breakfast Bowl',
  'Un petit-déjeuner équilibré et riche en protéines pour bien démarrer la journée. Idéal avant un entraînement matinal.',
  'A balanced, protein-rich breakfast to start your day right. Perfect before a morning workout.',
  '["150g de yaourt grec nature", "30g de flocons d''avoine", "1 banane", "10g de graines de chia", "1 cuillère à soupe de miel", "Une poignée de myrtilles", "10g d''amandes effilées"]'::jsonb,
  '1. Placer le yaourt grec dans un bol.
2. Ajouter les flocons d''avoine et les graines de chia, mélanger.
3. Couper la banane en rondelles et disposer sur le dessus.
4. Ajouter les myrtilles et les amandes effilées.
5. Arroser de miel.
6. Déguster immédiatement ou laisser reposer 10 min au frigo pour un overnight oats.',
  '1. Place the Greek yogurt in a bowl.
2. Add the oats and chia seeds, mix well.
3. Slice the banana and arrange on top.
4. Add the blueberries and sliced almonds.
5. Drizzle with honey.
6. Enjoy immediately or refrigerate for 10 min for an overnight oats style.',
  'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800',
  'breakfast',
  true
FROM public.profiles p WHERE p.role = 'coach' LIMIT 1;

INSERT INTO public.recipes (author_id, title_fr, title_en, description_fr, description_en, ingredients, instructions_fr, instructions_en, image_url, category, is_public)
SELECT
  p.id,
  'Salade Poulet Grillé & Avocat',
  'Grilled Chicken & Avocado Salad',
  'Une salade complète, riche en protéines et en bonnes graisses. Parfaite pour un déjeuner léger mais rassasiant.',
  'A complete salad, rich in protein and healthy fats. Perfect for a light but filling lunch.',
  '["150g de blanc de poulet", "1 avocat mûr", "100g de roquette", "10 tomates cerises", "1/2 concombre", "30g de feta", "Jus d''un citron", "1 cuillère à soupe d''huile d''olive", "Sel, poivre"]'::jsonb,
  '1. Griller le blanc de poulet assaisonné de sel et poivre (6 min de chaque côté).
2. Laisser reposer 5 minutes puis couper en tranches.
3. Disposer la roquette dans un grand bol.
4. Couper l''avocat en tranches, les tomates cerises en deux et le concombre en rondelles.
5. Assembler la salade avec le poulet, les légumes et la feta émiettée.
6. Assaisonner avec le jus de citron et l''huile d''olive.',
  '1. Grill the chicken breast seasoned with salt and pepper (6 min each side).
2. Let it rest for 5 minutes then slice.
3. Arrange the arugula in a large bowl.
4. Slice the avocado, halve the cherry tomatoes, and slice the cucumber.
5. Assemble the salad with chicken, vegetables, and crumbled feta.
6. Dress with lemon juice and olive oil.',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
  'lunch',
  true
FROM public.profiles p WHERE p.role = 'coach' LIMIT 1;

INSERT INTO public.recipes (author_id, title_fr, title_en, description_fr, description_en, ingredients, instructions_fr, instructions_en, image_url, category, is_public)
SELECT
  p.id,
  'Smoothie Vert Énergie',
  'Green Energy Smoothie',
  'Un smoothie détox et énergisant, parfait en collation ou après le sport. Riche en vitamines et minéraux.',
  'A detox and energizing smoothie, perfect as a snack or post-workout. Rich in vitamins and minerals.',
  '["1 banane", "Une poignée d''épinards frais", "1/2 pomme verte", "200ml de lait d''amande", "1 cuillère à soupe de beurre de cacahuète", "5 glaçons"]'::jsonb,
  '1. Mettre tous les ingrédients dans un blender.
2. Mixer pendant 45 secondes à vitesse maximale.
3. Vérifier la consistance et ajouter du lait d''amande si trop épais.
4. Verser dans un grand verre.
5. Déguster immédiatement.',
  '1. Place all ingredients in a blender.
2. Blend for 45 seconds at maximum speed.
3. Check consistency and add more almond milk if too thick.
4. Pour into a tall glass.
5. Enjoy immediately.',
  'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=800',
  'smoothie',
  true
FROM public.profiles p WHERE p.role = 'coach' LIMIT 1;

INSERT INTO public.recipes (author_id, title_fr, title_en, description_fr, description_en, ingredients, instructions_fr, instructions_en, image_url, category, is_public)
SELECT
  p.id,
  'Saumon & Légumes Rôtis',
  'Salmon & Roasted Vegetables',
  'Un dîner sain et savoureux, riche en oméga-3 et en fibres. Cuisson simple au four pour un maximum de saveurs.',
  'A healthy and tasty dinner, rich in omega-3 and fiber. Simple oven cooking for maximum flavor.',
  '["2 pavés de saumon", "1 courgette", "1 poivron rouge", "200g de brocoli", "2 cuillères à soupe d''huile d''olive", "1 citron", "2 gousses d''ail", "Herbes de Provence", "Sel, poivre"]'::jsonb,
  '1. Préchauffer le four à 200°C.
2. Couper les légumes en morceaux et les disposer sur une plaque de cuisson.
3. Arroser d''huile d''olive, assaisonner avec les herbes, le sel et le poivre.
4. Enfourner les légumes pendant 15 minutes.
5. Placer les pavés de saumon sur les légumes, ajouter l''ail émincé et le jus de citron.
6. Cuire encore 15 minutes jusqu''à ce que le saumon soit doré.
7. Servir immédiatement.',
  '1. Preheat the oven to 200°C (400°F).
2. Cut the vegetables into pieces and arrange on a baking sheet.
3. Drizzle with olive oil, season with herbs, salt, and pepper.
4. Roast the vegetables for 15 minutes.
5. Place the salmon fillets on top of the vegetables, add minced garlic and lemon juice.
6. Cook for another 15 minutes until the salmon is golden.
7. Serve immediately.',
  'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
  'dinner',
  true
FROM public.profiles p WHERE p.role = 'coach' LIMIT 1;

INSERT INTO public.recipes (author_id, title_fr, title_en, description_fr, description_en, ingredients, instructions_fr, instructions_en, image_url, category, is_public)
SELECT
  p.id,
  'Energy Balls Chocolat & Dattes',
  'Chocolate & Date Energy Balls',
  'Des collations saines et sans cuisson, idéales avant ou après le sport. Préparation en 10 minutes !',
  'Healthy no-bake snacks, ideal before or after exercise. Ready in 10 minutes!',
  '["100g de dattes dénoyautées", "50g de flocons d''avoine", "30g de cacao en poudre non sucré", "2 cuillères à soupe de beurre de cacahuète", "1 cuillère à soupe de miel", "20g de noix de coco râpée"]'::jsonb,
  '1. Mixer les dattes dans un robot jusqu''à obtenir une pâte.
2. Ajouter les flocons d''avoine, le cacao, le beurre de cacahuète et le miel.
3. Mixer jusqu''à obtenir un mélange homogène.
4. Former des petites boules avec les mains (environ 12 boules).
5. Rouler dans la noix de coco râpée.
6. Placer au frigo pendant 30 minutes avant de déguster.
7. Se conservent 1 semaine au réfrigérateur.',
  '1. Blend the dates in a food processor until a paste forms.
2. Add the oats, cocoa, peanut butter, and honey.
3. Blend until the mixture is smooth.
4. Shape into small balls with your hands (about 12 balls).
5. Roll in shredded coconut.
6. Refrigerate for 30 minutes before serving.
7. Keeps for 1 week in the fridge.',
  'https://images.unsplash.com/photo-1604045709665-49tried1be14?w=800',
  'snack',
  true
FROM public.profiles p WHERE p.role = 'coach' LIMIT 1;

-- === 6 NEW RECIPES ===

-- Dinner 1: Poulet Rôti aux Herbes & Patates Douces
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
  'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800',
  'dinner',
  true
FROM public.profiles p WHERE p.role = 'coach' LIMIT 1;

-- Dinner 2: Pavé de Cabillaud & Ratatouille Maison
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
  'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800',
  'dinner',
  true
FROM public.profiles p WHERE p.role = 'coach' LIMIT 1;

-- Dinner 3: Steak de Thon & Wok de Légumes au Sésame
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
  'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=800',
  'dinner',
  true
FROM public.profiles p WHERE p.role = 'coach' LIMIT 1;

-- Breakfast salé: Tartine Salée Œuf, Avocat & Feta
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
  'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800',
  'breakfast',
  true
FROM public.profiles p WHERE p.role = 'coach' LIMIT 1;

-- Soup 1: Velouté de Butternut & Noisettes
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
  'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800',
  'soup',
  true
FROM public.profiles p WHERE p.role = 'coach' LIMIT 1;

-- Soup 2: Potage Poireaux, Pommes de Terre & Ciboulette
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
  'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
  'soup',
  true
FROM public.profiles p WHERE p.role = 'coach' LIMIT 1;
