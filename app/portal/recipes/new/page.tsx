"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { createClient } from "@/lib/supabase/client";
import RecipeForm from "@/components/portal/RecipeForm";

export default function NewRecipePage() {
  const { t } = useLanguage();
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>("user");

  useEffect(() => {
    async function getUser() {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        let uid = session?.user?.id;
        if (!uid) {
          const { data: { user } } = await supabase.auth.getUser();
          uid = user?.id;
        }
        if (uid) {
          setUserId(uid);
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", uid)
            .single();
          if (profile?.role) setUserRole(profile.role);
        }
      } catch (err) {
        console.error("Auth error:", err);
      }
    }
    getUser();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-heading font-heading mb-6">
        {t("portal.recipes.new")}
      </h2>
      <RecipeForm userId={userId || undefined} userRole={userRole} />
    </div>
  );
}
