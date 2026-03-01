"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center bg-white/10 rounded-full overflow-hidden text-sm font-semibold" role="group" aria-label="Language selection">
      <button
        onClick={() => setLocale("fr")}
        aria-label="Passer en français"
        aria-pressed={locale === "fr"}
        className={`px-3 py-1.5 transition-all duration-200 ${
          locale === "fr"
            ? "bg-white text-brand-dark"
            : "text-white/70 hover:text-white"
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLocale("en")}
        aria-label="Switch to English"
        aria-pressed={locale === "en"}
        className={`px-3 py-1.5 transition-all duration-200 ${
          locale === "en"
            ? "bg-white text-brand-dark"
            : "text-white/70 hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}
