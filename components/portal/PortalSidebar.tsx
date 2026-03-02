"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { useAuth } from "@/lib/supabase/AuthContext";

const NAV_ITEMS = [
  { href: "/portal", icon: "dashboard", keyFr: "portal.dashboard", keyEn: "portal.dashboard" },
  { href: "/portal/recipes", icon: "recipes", keyFr: "portal.recipes", keyEn: "portal.recipes" },
  { href: "/portal/weight", icon: "weight", keyFr: "portal.weight", keyEn: "portal.weight" },
  { href: "/portal/journal", icon: "journal", keyFr: "portal.journal", keyEn: "portal.journal" },
  { href: "/portal/workouts", icon: "workouts", keyFr: "portal.workouts", keyEn: "portal.workouts" },
  { href: "/portal/profile", icon: "profile", keyFr: "portal.profile", keyEn: "portal.profile" },
];

const COACH_NAV_ITEMS = [
  { href: "/portal/coach/users", icon: "users", keyFr: "portal.coach.users", keyEn: "portal.coach.users" },
  { href: "/portal/coach/programs", icon: "programs", keyFr: "portal.coach.programs", keyEn: "portal.coach.programs" },
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
    case "users":
      return (
        <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      );
    case "programs":
      return (
        <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
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
  const { profile } = useAuth();
  const isCoach = profile?.role === "coach";

  const handleSignOut = () => {
    fetch("/auth/logout", { method: "POST" }).finally(() => {
      window.location.replace("/");
    });
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
            <Link href="/" className="block no-underline mb-1">
              <Image
                src="/images/logo-bluewave-white.png"
                alt="Coach-Bluewave"
                width={180}
                height={40}
                className="h-9 w-auto"
                priority
              />
            </Link>
            <p className="text-xs text-white/60">{t("auth.myPortal")}</p>
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

            {/* Coach section */}
            {isCoach && (
              <>
                <div className="mx-6 my-3 border-t border-white/10" />
                <p className="px-6 py-1 text-xs font-semibold text-white/40 uppercase tracking-wider">
                  {t("portal.coach")}
                </p>
                {COACH_NAV_ITEMS.map((item) => (
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
              </>
            )}
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
