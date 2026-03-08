export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          avatar_url: string | null;
          role: "user" | "coach";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string;
          avatar_url?: string | null;
          role?: "user" | "coach";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          avatar_url?: string | null;
          role?: "user" | "coach";
          created_at?: string;
          updated_at?: string;
        };
      };
      recipes: {
        Row: {
          id: string;
          author_id: string;
          title_fr: string;
          title_en: string;
          description_fr: string;
          description_en: string;
          ingredients: Json;
          instructions_fr: string;
          instructions_en: string;
          image_url: string | null;
          category: string;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          author_id: string;
          title_fr: string;
          title_en?: string;
          description_fr?: string;
          description_en?: string;
          ingredients?: Json;
          instructions_fr?: string;
          instructions_en?: string;
          image_url?: string | null;
          category?: string;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          author_id?: string;
          title_fr?: string;
          title_en?: string;
          description_fr?: string;
          description_en?: string;
          ingredients?: Json;
          instructions_fr?: string;
          instructions_en?: string;
          image_url?: string | null;
          category?: string;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      recipe_favorites: {
        Row: {
          id: string;
          user_id: string;
          recipe_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          recipe_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          recipe_id?: string;
          created_at?: string;
        };
      };
      weight_logs: {
        Row: {
          id: string;
          user_id: string;
          weight_kg: number;
          body_fat_pct: number | null;
          visceral_fat: number | null;
          muscle_mass_kg: number | null;
          water_pct: number | null;
          bone_mass_kg: number | null;
          bmr_kcal: number | null;
          daily_cal_kcal: number | null;
          bmi: number | null;
          date: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          weight_kg: number;
          body_fat_pct?: number | null;
          visceral_fat?: number | null;
          muscle_mass_kg?: number | null;
          water_pct?: number | null;
          bone_mass_kg?: number | null;
          bmr_kcal?: number | null;
          daily_cal_kcal?: number | null;
          bmi?: number | null;
          date?: string;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          weight_kg?: number;
          body_fat_pct?: number | null;
          visceral_fat?: number | null;
          muscle_mass_kg?: number | null;
          water_pct?: number | null;
          bone_mass_kg?: number | null;
          bmr_kcal?: number | null;
          daily_cal_kcal?: number | null;
          bmi?: number | null;
          date?: string;
          notes?: string | null;
          created_at?: string;
        };
      };
      mood_entries: {
        Row: {
          id: string;
          user_id: string;
          mood_score: number;
          energy_level: number;
          sleep_quality: number | null;
          stress_level: number | null;
          notes: string | null;
          tags: string[];
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          mood_score: number;
          energy_level: number;
          sleep_quality?: number | null;
          stress_level?: number | null;
          notes?: string | null;
          tags?: string[];
          date?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          mood_score?: number;
          energy_level?: number;
          sleep_quality?: number | null;
          stress_level?: number | null;
          notes?: string | null;
          tags?: string[];
          date?: string;
          created_at?: string;
        };
      };
      workout_programs: {
        Row: {
          id: string;
          coach_id: string;
          title_fr: string;
          title_en: string;
          description_fr: string;
          description_en: string;
          difficulty: "beginner" | "intermediate" | "advanced";
          duration_weeks: number;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          coach_id: string;
          title_fr: string;
          title_en?: string;
          description_fr?: string;
          description_en?: string;
          difficulty?: "beginner" | "intermediate" | "advanced";
          duration_weeks?: number;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          coach_id?: string;
          title_fr?: string;
          title_en?: string;
          description_fr?: string;
          description_en?: string;
          difficulty?: "beginner" | "intermediate" | "advanced";
          duration_weeks?: number;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      workout_exercises: {
        Row: {
          id: string;
          program_id: string;
          name_fr: string;
          name_en: string;
          description_fr: string | null;
          description_en: string | null;
          sets: number;
          reps: string;
          rest_seconds: number;
          duration_seconds: number | null;
          order_index: number;
          day_number: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          program_id: string;
          name_fr: string;
          name_en?: string;
          description_fr?: string | null;
          description_en?: string | null;
          sets?: number;
          reps?: string;
          rest_seconds?: number;
          duration_seconds?: number | null;
          order_index?: number;
          day_number?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          program_id?: string;
          name_fr?: string;
          name_en?: string;
          description_fr?: string | null;
          description_en?: string | null;
          sets?: number;
          reps?: string;
          rest_seconds?: number;
          duration_seconds?: number | null;
          order_index?: number;
          day_number?: number;
          created_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          stripe_customer_id: string;
          status: string;
          program_title: string;
          amount_cents: number;
          currency: string;
          interval: string;
          minimum_months: number;
          current_period_start: string | null;
          current_period_end: string | null;
          cancel_at_period_end: boolean;
          canceled_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          user_id: string;
          stripe_customer_id: string;
          status: string;
          program_title: string;
          amount_cents: number;
          currency?: string;
          interval?: string;
          minimum_months?: number;
          current_period_start?: string | null;
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
          canceled_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          stripe_customer_id?: string;
          status?: string;
          program_title?: string;
          amount_cents?: number;
          currency?: string;
          interval?: string;
          minimum_months?: number;
          current_period_start?: string | null;
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
          canceled_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      subscription_payments: {
        Row: {
          id: string;
          subscription_id: string;
          user_id: string;
          amount_cents: number;
          currency: string;
          status: string;
          invoice_url: string | null;
          invoice_pdf: string | null;
          paid_at: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          subscription_id: string;
          user_id: string;
          amount_cents: number;
          currency?: string;
          status: string;
          invoice_url?: string | null;
          invoice_pdf?: string | null;
          paid_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          subscription_id?: string;
          user_id?: string;
          amount_cents?: number;
          currency?: string;
          status?: string;
          invoice_url?: string | null;
          invoice_pdf?: string | null;
          paid_at?: string | null;
          created_at?: string;
        };
      };
      program_assignments: {
        Row: {
          id: string;
          program_id: string;
          user_id: string;
          assigned_by: string;
          assigned_at: string;
          message: string | null;
        };
        Insert: {
          id?: string;
          program_id: string;
          user_id: string;
          assigned_by: string;
          assigned_at?: string;
          message?: string | null;
        };
        Update: {
          id?: string;
          program_id?: string;
          user_id?: string;
          assigned_by?: string;
          assigned_at?: string;
          message?: string | null;
        };
      };
      user_workout_progress: {
        Row: {
          id: string;
          user_id: string;
          program_id: string;
          exercise_id: string;
          completed_at: string;
          notes: string | null;
          sets_completed: number | null;
          reps_completed: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          program_id: string;
          exercise_id: string;
          completed_at?: string;
          notes?: string | null;
          sets_completed?: number | null;
          reps_completed?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          program_id?: string;
          exercise_id?: string;
          completed_at?: string;
          notes?: string | null;
          sets_completed?: number | null;
          reps_completed?: string | null;
        };
      };
    };
  };
}

// Convenience types
export type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
export type SubscriptionPayment = Database["public"]["Tables"]["subscription_payments"]["Row"];
// 
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Recipe = Database["public"]["Tables"]["recipes"]["Row"];
export type RecipeFavorite = Database["public"]["Tables"]["recipe_favorites"]["Row"];
export type WeightLog = Database["public"]["Tables"]["weight_logs"]["Row"];
export type MoodEntry = Database["public"]["Tables"]["mood_entries"]["Row"];
export type WorkoutProgram = Database["public"]["Tables"]["workout_programs"]["Row"];
export type WorkoutExercise = Database["public"]["Tables"]["workout_exercises"]["Row"];
export type ProgramAssignment = Database["public"]["Tables"]["program_assignments"]["Row"];
export type UserWorkoutProgress = Database["public"]["Tables"]["user_workout_progress"]["Row"];
