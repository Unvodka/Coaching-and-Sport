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

export default function PacksPageContent() {
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
          <p className="text-center text-gray-500 text-lg mb-12 max-w-[700px] mx-auto">
            {t("packs.subtitle")}
          </p>
        </FadeInWhenVisible>

        {/* Tax Credit Banner */}
        <FadeInWhenVisible delay={0.15}>
          <div className="max-w-6xl mx-auto mb-12 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-8 max-md:p-5">
            <div className="flex items-start gap-4 max-md:flex-col max-md:items-center max-md:text-center">
              <span className="text-4xl shrink-0">🏠</span>
              <div className="flex-1">
                <h2 className="font-heading text-xl font-bold text-heading mb-2">
                  {locale === "en"
                    ? "50% tax credit for home sessions"
                    : "50% de crédit d'impôt pour les cours à domicile"}
                </h2>
                <p className="text-gray-600 text-[0.95rem] leading-relaxed mb-4">
                  {locale === "en"
                    ? "As a personal services provider (Services à la Personne), your home coaching sessions are eligible for a 50% income tax credit. This means the actual cost is halved!"
                    : "En tant que prestataire de Services à la Personne (SAP), vos séances de coaching à domicile sont éligibles au crédit d'impôt de 50%. Concrètement, le coût réel pour vous est divisé par deux !"}
                </p>
                <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2 max-[480px]:grid-cols-1">
                  {pricingPacks.map((pack) => (
                    <div key={pack.title} className="bg-white rounded-xl p-4 text-center border border-emerald-100">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{pack.title}</p>
                      <p className="text-gray-400 line-through text-sm">{pack.price}</p>
                      <p className="text-2xl font-bold text-emerald-600 max-md:text-xl">
                        {(pack.priceNumeric / 2).toFixed(2).replace(".", ",")}€
                      </p>
                      <p className="text-xs text-emerald-500 font-semibold">
                        {locale === "en" ? "actual cost" : "coût réel"}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-4 italic">
                  {locale === "en"
                    ? "* Tax credit applicable to home sessions only. Subject to conditions — consult your tax advisor."
                    : "* Crédit d'impôt applicable uniquement aux séances à domicile. Sous conditions — consultez votre conseiller fiscal."}
                </p>
              </div>
            </div>
          </div>
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
