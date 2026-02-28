"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/lib/supabase/AuthContext";
import { useLanguage } from "@/lib/i18n/useLanguage";

interface PortalHeaderProps {
  title: string;
  onMenuToggle: () => void;
}

export default function PortalHeader({ title, onMenuToggle }: PortalHeaderProps) {
  const { user, profile } = useAuth();
  const { locale, setLocale, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    setMenuOpen(false);
    fetch("/auth/logout", { method: "POST" }).finally(() => {
      window.location.replace("/");
    });
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left: hamburger + title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-heading">{title}</h1>
      </div>

      {/* Right: language + user menu */}
      <div className="flex items-center gap-4">
        {/* Language toggle */}
        <div className="flex items-center bg-gray-100 rounded-full overflow-hidden text-sm font-semibold border border-gray-200">
          <button
            onClick={() => setLocale("fr")}
            className={`px-3 py-1.5 transition-all duration-200 ${
              locale === "fr"
                ? "bg-brand-blue text-white"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            FR
          </button>
          <button
            onClick={() => setLocale("en")}
            className={`px-3 py-1.5 transition-all duration-200 ${
              locale === "en"
                ? "bg-brand-blue text-white"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            EN
          </button>
        </div>

        {/* User avatar + dropdown */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
          >
            {profile?.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={profile.full_name || ""}
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center text-white text-sm font-bold">
                {(profile?.full_name || user?.email || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}
            <span className="text-sm text-gray-600 hidden sm:block">
              {profile?.full_name || user?.email}
            </span>
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {profile?.full_name || user?.email}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {user?.email}
                </p>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {t("auth.signOut")}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
