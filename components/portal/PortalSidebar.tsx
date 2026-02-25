"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { createClient } from "@/lib/supabase/client";

const NAV_ITEMS = [
  { href: "/portal", icon: "dashboard", keyFr: "portal.dashboard", keyEn: "portal.dashboard" },
  { href: "/portal/recipes", icon: "recipes", keyFr: "portal.recipes", keyEn: "portal.recipes" },
  { href: "/portal/weight", icon: "weight", keyFr: "portal.weight", keyEn: "portal.weight" },
  { href: "/portal/journal", icon: "journal", keyFr: "portal.journal", keyEn: "portal.journal" },
  { href: "/portal/workouts", icon: "workouts", keyFr: "portal.workouts", keyEn: "portal.workouts" },
  { href: "/portal/profile", icon: "profile", keyFr: "portal.profile", keyEn: "portal.profile" },
];

function NavIcon({ icon, className }: { icon: string; className?: string }) {
  const cn = className || "w-5 h-5";
  switch (icon) {
    case "dashboard":
      return (
        <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      );
    case "recipes":
      return (
        <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    case "weight":
      return (
        <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      );
    case "journal":
      return (
        <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "workouts":
      return (
        <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case "profile":
      return (
        <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    default:
      return null;
  }
}

interface PortalSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function PortalSidebar({ open, onClose }: PortalSidebarProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  const handleSignOut = () => {
    const supabase = createClient();
    supabase.auth.signOut().catch(() => {});
    window.location.href = "/";
  };

  const isActive = (href: string) => {
    if (href === "/portal") return pathname === "/portal";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#1a2a56] to-[#1e3a8a] text-white z-50 transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <Link href="/" className="text-xl font-bold tracking-tight no-underline text-white">
              Coach-Bluewave
            </Link>
            <p className="text-xs text-white/60 mt-1">{t("auth.myPortal")}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors no-underline ${
                  isActive(item.href)
                    ? "bg-white/15 text-white border-r-4 border-brand-blue"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <NavIcon icon={item.icon} />
                {t(item.keyFr as Parameters<typeof t>[0])}
              </Link>
            ))}
          </nav>

          {/* Sign out */}
          <div className="p-4 border-t border-white/10">
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-2 text-sm text-white/70 hover:text-white transition-colors w-full cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {t("auth.signOut")}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
