"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { createClient } from "@/lib/supabase/client";
import RecipeForm from "@/components/portal/RecipeForm";

export default function NewRecipePage() {
  const { t, locale } = useLanguage();
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>("user");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        const supabase = createClient();
        // Try getSession first (fast, local)
        const { data: { session } } = await supabase.auth.getSession();
        let uid = session?.user?.id;
        if (!uid) {
          const { data: { user } } = await supabase.auth.getUser();
          uid = user?.id;
        }
        if (uid) {
          setUserId(uid);
          // Check role
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", uid)
            .single();
          if (profile?.role) setUserRole(profile.role);
        }
      } catch (err) {
        console.error("Auth error:", err);
      } finally {
        setLoading(false);
      }
    }
    getUser();
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse mb-6" />
        <div className="space-y-4">
          <div className="h-12 bg-gray-200 rounded animate-pulse" />
          <div className="h-12 bg-gray-200 rounded animate-pulse" />
          <div className="h-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <p className="text-red-600">
          {locale === "fr" ? "Erreur de connexion. Essayez de vous reconnecter." : "Connection error. Try signing in again."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-heading font-heading mb-6">
        {t("portal.recipes.new")}
      </h2>
      <RecipeForm userId={userId} userRole={userRole} />
    </div>
  );
}
