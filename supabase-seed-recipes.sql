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
