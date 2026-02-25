"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/useLanguage";
import PortalSidebar from "./PortalSidebar";
import PortalHeader from "./PortalHeader";

const PAGE_TITLES: Record<string, { fr: string; en: string }> = {
  "/portal": { fr: "Tableau de bord", en: "Dashboard" },
  "/portal/recipes": { fr: "Recettes", en: "Recipes" },
  "/portal/recipes/new": { fr: "Nouvelle recette", en: "New Recipe" },
  "/portal/weight": { fr: "Suivi du poids", en: "Weight Tracking" },
  "/portal/journal": { fr: "Journal bien-être", en: "Wellness Journal" },
  "/portal/journal/new": { fr: "Nouvelle entrée", en: "New Entry" },
  "/portal/workouts": { fr: "Programmes", en: "Programs" },
  "/portal/profile": { fr: "Mon profil", en: "My Profile" },
};

export default function PortalLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { locale } = useLanguage();

  const getTitle = () => {
    const exact = PAGE_TITLES[pathname];
    if (exact) return locale === "fr" ? exact.fr : exact.en;

    // Check prefix matches for dynamic routes
    for (const [path, titles] of Object.entries(PAGE_TITLES)) {
      if (pathname.startsWith(path) && path !== "/portal") {
        return locale === "fr" ? titles.fr : titles.en;
      }
    }
    return locale === "fr" ? "Mon Espace" : "My Portal";
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <PortalSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <PortalHeader
          title={getTitle()}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
