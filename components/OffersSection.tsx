"use client";

import { useState } from "react";
import { getPrograms, getPricingPacks } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/useLanguage";
import ProgramCard from "./ProgramCard";
import PricingCard from "./PricingCard";
import InfoNote from "./InfoNote";
import FadeInWhenVisible from "./animations/FadeInWhenVisible";

export default function OffersSection() {
  const [loadingPack, setLoadingPack] = useState<string | null>(null);
  const { locale, t } = useLanguage();

  const programs = getPrograms(locale);
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
    <section
      id="offres"
      className="bg-gradient-to-br from-slate-50 to-slate-100 py-24 px-16 w-full max-md:py-16 max-md:px-6"
    >
      <FadeInWhenVisible>
        <h2 className="font-heading text-center text-5xl mb-4 font-extrabold tracking-tight text-heading max-md:text-[2.2rem] max-[480px]:text-[1.8rem]">
          {t("offers.title")}
        </h2>
      </FadeInWhenVisible>
      <FadeInWhenVisible delay={0.1}>
        <p className="text-center text-gray-500 text-lg mb-16 max-w-[700px] mx-auto">
          {t("offers.subtitle")}
        </p>
      </FadeInWhenVisible>

      <div className="w-full">
        {/* Programs Grid */}
        <div className="grid grid-cols-4 gap-6 mb-16 max-lg:grid-cols-2 max-md:grid-cols-1">
          {programs.map((program, i) => (
            <FadeInWhenVisible key={program.title} delay={i * 0.15}>
              <ProgramCard
                {...program}
                isLoading={loadingPack === program.title}
                onCheckout={
                  program.priceNumeric
                    ? () => handleCheckout(program.title, program.priceNumeric!)
                    : undefined
                }
              />
            </FadeInWhenVisible>
          ))}
        </div>

        {/* Security Trust Bar */}
        <FadeInWhenVisible delay={0.2}>
          <div className="flex flex-wrap justify-center gap-8 my-12 py-6 px-4 bg-white rounded-xl border border-gray-200 shadow-sm max-md:gap-4 max-md:py-4">
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

        {/* Pricing Divider */}
        <FadeInWhenVisible>
          <div id="pricing-packs" className="text-center my-16 max-w-[800px] mx-auto">
            <h3 className="font-heading text-[2.2rem] text-heading mb-3 font-bold">
              {t("offers.packsTitle")}
            </h3>
            <p className="text-gray-500 text-[1.05rem]">
              {t("offers.packsSubtitle")}
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Pricing Grid */}
        <div className="flex flex-wrap gap-8 mt-12 max-md:flex-col">
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

        <FadeInWhenVisible delay={0.2} duration={0.8}>
          <InfoNote />
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
