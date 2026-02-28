-- ============================================================
-- Cleanup duplicate recipes
-- Run this ONCE in Supabase SQL Editor to remove old seeded 
-- recipes that were duplicated by the API seed route
-- ============================================================

-- Remove old SQL-seeded recipes that have different titles
-- from the API-seeded ones (these are the duplicates)
DELETE FROM public.recipes
WHERE title_fr IN (
  'Bowl Petit-Déjeuner Protéiné',
  'Salade Poulet Grillé & Avocat',
  'Saumon & Légumes Rôtis',
  'Energy Balls Chocolat & Dattes'
)
AND is_public = true;

-- Also remove any exact duplicate titles (keep only the first one)
DELETE FROM public.recipes a
USING public.recipes b
WHERE a.id > b.id
  AND a.title_fr = b.title_fr
  AND a.is_public = true
  AND b.is_public = true;

-- Remove orphaned favorites (where recipe was deleted)
DELETE FROM public.recipe_favorites
WHERE recipe_id NOT IN (SELECT id FROM public.recipes);
