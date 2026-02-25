-- ============================================================
-- Coach-Bluewave Database Schema Migration
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- ==========================================
-- PROFILES
-- ==========================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'coach')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Coach can view all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'coach')
  );

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ==========================================
-- RECIPES
-- ==========================================
CREATE TABLE public.recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title_fr TEXT NOT NULL,
  title_en TEXT NOT NULL DEFAULT '',
  description_fr TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  ingredients JSONB NOT NULL DEFAULT '[]',
  instructions_fr TEXT NOT NULL DEFAULT '',
  instructions_en TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view public recipes"
  ON public.recipes FOR SELECT
  USING (is_public = true AND auth.role() = 'authenticated');

CREATE POLICY "Users can view own recipes"
  ON public.recipes FOR SELECT
  USING (author_id = auth.uid());

CREATE POLICY "Users can create recipes"
  ON public.recipes FOR INSERT
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Users can update own recipes"
  ON public.recipes FOR UPDATE
  USING (author_id = auth.uid());

CREATE POLICY "Users can delete own recipes"
  ON public.recipes FOR DELETE
  USING (author_id = auth.uid());

CREATE POLICY "Coach can manage all recipes"
  ON public.recipes FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'coach')
  );


-- ==========================================
-- RECIPE FAVORITES
-- ==========================================
CREATE TABLE public.recipe_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  recipe_id UUID NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, recipe_id)
);

ALTER TABLE public.recipe_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own favorites"
  ON public.recipe_favorites FOR ALL
  USING (user_id = auth.uid());


-- ==========================================
-- WEIGHT LOGS
-- ==========================================
CREATE TABLE public.weight_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  weight_kg DECIMAL(5,2) NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.weight_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own weight logs"
  ON public.weight_logs FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "Coach can view all weight logs"
  ON public.weight_logs FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'coach')
  );


-- ==========================================
-- MOOD ENTRIES
-- ==========================================
CREATE TABLE public.mood_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  mood_score SMALLINT NOT NULL CHECK (mood_score BETWEEN 1 AND 10),
  energy_level SMALLINT NOT NULL CHECK (energy_level BETWEEN 1 AND 10),
  notes TEXT,
  tags TEXT[] DEFAULT '{}',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own mood entries"
  ON public.mood_entries FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "Coach can view all mood entries"
  ON public.mood_entries FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'coach')
  );


-- ==========================================
-- WORKOUT PROGRAMS
-- ==========================================
CREATE TABLE public.workout_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title_fr TEXT NOT NULL,
  title_en TEXT NOT NULL DEFAULT '',
  description_fr TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  difficulty TEXT NOT NULL DEFAULT 'intermediate' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  duration_weeks INTEGER NOT NULL DEFAULT 4,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.workout_programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view public programs"
  ON public.workout_programs FOR SELECT
  USING (is_public = true AND auth.role() = 'authenticated');

CREATE POLICY "Coach can manage all programs"
  ON public.workout_programs FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'coach')
  );


-- ==========================================
-- WORKOUT EXERCISES
-- ==========================================
CREATE TABLE public.workout_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES public.workout_programs(id) ON DELETE CASCADE,
  name_fr TEXT NOT NULL,
  name_en TEXT NOT NULL DEFAULT '',
  description_fr TEXT,
  description_en TEXT,
  sets INTEGER NOT NULL DEFAULT 3,
  reps TEXT NOT NULL DEFAULT '10',
  rest_seconds INTEGER NOT NULL DEFAULT 60,
  order_index INTEGER NOT NULL DEFAULT 0,
  day_number INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.workout_exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view exercises of public programs"
  ON public.workout_exercises FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.workout_programs
      WHERE id = program_id AND (is_public = true OR coach_id = auth.uid())
    )
  );

CREATE POLICY "Coach can manage all exercises"
  ON public.workout_exercises FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'coach')
  );


-- ==========================================
-- USER WORKOUT PROGRESS
-- ==========================================
CREATE TABLE public.user_workout_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  program_id UUID NOT NULL REFERENCES public.workout_programs(id) ON DELETE CASCADE,
  exercise_id UUID NOT NULL REFERENCES public.workout_exercises(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  notes TEXT,
  sets_completed INTEGER,
  reps_completed TEXT
);

ALTER TABLE public.user_workout_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own progress"
  ON public.user_workout_progress FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "Coach can view all progress"
  ON public.user_workout_progress FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'coach')
  );


-- ==========================================
-- INDEXES
-- ==========================================
CREATE INDEX idx_recipes_author ON public.recipes(author_id);
CREATE INDEX idx_recipes_public ON public.recipes(is_public) WHERE is_public = true;
CREATE INDEX idx_recipe_favorites_user ON public.recipe_favorites(user_id);
CREATE INDEX idx_weight_logs_user_date ON public.weight_logs(user_id, date DESC);
CREATE INDEX idx_mood_entries_user_date ON public.mood_entries(user_id, date DESC);
CREATE INDEX idx_workout_exercises_program ON public.workout_exercises(program_id, order_index);
CREATE INDEX idx_user_progress_user_program ON public.user_workout_progress(user_id, program_id);


-- ==========================================
-- SETUP COACH ROLE
-- After your first Google login, run this with your email:
-- UPDATE public.profiles SET role = 'coach' WHERE email = 'your-email@gmail.com';
-- ==========================================
