"use client";

import Image from "next/image";
import { useAuth } from "@/lib/supabase/AuthContext";
import { useLanguage } from "@/lib/i18n/useLanguage";

interface PortalHeaderProps {
  title: string;
  onMenuToggle: () => void;
}

export default function PortalHeader({ title, onMenuToggle }: PortalHeaderProps) {
  const { user, profile } = useAuth();
  const { locale, setLocale } = useLanguage();

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

      {/* Right: language + user */}
      <div className="flex items-center gap-4">
        {/* Language toggle — styled for white background */}
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

        <div className="flex items-center gap-2">
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
        </div>
      </div>
    </header>
  );
}
