"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";

export function HeroContent() {
  const { t } = useLanguage();

  return (
    <div className="relative z-10 max-w-[900px] p-8">
      <h1
        className="font-elegant text-[2rem] mb-10 font-bold opacity-0 animate-hero-title max-md:text-[1.65rem] max-[480px]:text-[1.4rem]"
      >
        {t("hero.subtitle")}
      </h1>
      <a
        href="#contact"
        className="inline-block bg-white text-brand-dark py-5 px-12 rounded-lg no-underline font-bold text-[1.05rem] transition-colors duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:bg-brand-blue hover:text-white hover:scale-105 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(255,255,255,0.25)] active:scale-95 opacity-0 animate-hero-cta max-md:py-3 max-md:px-8 max-md:text-[0.95rem]"
      >
        {t("hero.cta")}
      </a>
    </div>
  );
}
