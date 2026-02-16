"use client";

import { useState } from "react";
import Link from "next/link";
import { getPricingPacks } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/useLanguage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingCard from "@/components/PricingCard";
import InfoNote from "@/components/InfoNote";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";

export default function PacksPage() {
  const [loadingPack, setLoadingPack] = useState<string | null>(null);
  const { locale, t } = useLanguage();

  const pricingPacks = getPricingPacks(locale);

  const handleCheckout = async (title: string, priceNumeric: number) => {
    setLoadingPack(title);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          priceInCents: priceNumeric * 100,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(t("offers.checkoutError"));
        setLoadingPack(null);
      }
    } catch {
      alert(t("offers.connectionError"));
      setLoadingPack(null);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-32 pb-24 px-16 max-md:pt-24 max-md:pb-16 max-md:px-6">
        {/* Back link */}
        <FadeInWhenVisible>
          <Link
            href="/#offres"
            className="inline-block text-brand-blue font-semibold text-sm mb-8 no-underline hover:underline"
          >
            {t("packs.backToOffers")}
          </Link>
        </FadeInWhenVisible>

        {/* Title */}
        <FadeInWhenVisible>
          <h1 className="font-heading text-center text-5xl mb-4 font-extrabold tracking-tight text-heading max-md:text-[2.2rem] max-[480px]:text-[1.8rem]">
            {t("packs.title")}
          </h1>
        </FadeInWhenVisible>
        <FadeInWhenVisible delay={0.1}>
          <p className="text-center text-gray-500 text-lg mb-16 max-w-[700px] mx-auto">
            {t("packs.subtitle")}
          </p>
        </FadeInWhenVisible>

        {/* Pricing Grid */}
        <div className="flex flex-wrap gap-8 max-w-6xl mx-auto max-md:flex-col">
          {pricingPacks.map((pack, i) => (
            <FadeInWhenVisible key={pack.title} delay={i * 0.1} className="flex-1 min-w-0 max-md:min-w-full">
              <PricingCard
                {...pack}
                isLoading={loadingPack === pack.title}
                onBuy={() => handleCheckout(pack.title, pack.priceNumeric)}
              />
            </FadeInWhenVisible>
          ))}
        </div>

        {/* Security Trust Bar */}
        <FadeInWhenVisible delay={0.2}>
          <div className="flex flex-wrap justify-center gap-8 my-12 py-6 px-4 bg-white rounded-xl border border-gray-200 shadow-sm max-w-6xl mx-auto max-md:gap-4 max-md:py-4">
            <div className="flex items-center gap-3 text-center">
              <span className="text-2xl">🔒</span>
              <div>
                <p className="text-sm font-bold text-heading leading-tight">{t("security.badge1.title")}</p>
                <p className="text-xs text-gray-400">{t("security.badge1.desc")}</p>
              </div>
            </div>
            <div className="hidden sm:block w-px bg-gray-200 self-stretch" />
            <div className="flex items-center gap-3 text-center">
              <span className="text-2xl">🛡️</span>
              <div>
                <p className="text-sm font-bold text-heading leading-tight">{t("security.badge2.title")}</p>
                <p className="text-xs text-gray-400">{t("security.badge2.desc")}</p>
              </div>
            </div>
            <div className="hidden sm:block w-px bg-gray-200 self-stretch" />
            <div className="flex items-center gap-3 text-center">
              <span className="text-2xl">💳</span>
              <div>
                <p className="text-sm font-bold text-heading leading-tight">{t("security.badge3.title")}</p>
                <p className="text-xs text-gray-400">{t("security.badge3.desc")}</p>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Info Note */}
        <div className="max-w-6xl mx-auto">
          <FadeInWhenVisible delay={0.3} duration={0.8}>
            <InfoNote />
          </FadeInWhenVisible>
        </div>
      </main>
      <Footer />
    </>
  );
}
