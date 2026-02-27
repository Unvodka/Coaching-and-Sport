"use client";

import { useState } from "react";
import { getPrograms } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/useLanguage";
import ProgramCard from "./ProgramCard";
import InfoNote from "./InfoNote";
import FadeInWhenVisible from "./animations/FadeInWhenVisible";

export default function OffersSection() {
  const [loadingPack, setLoadingPack] = useState<string | null>(null);
  const { locale, t } = useLanguage();

  const programs = getPrograms(locale);

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
        <div className="grid grid-cols-4 items-start gap-6 mb-16 max-lg:grid-cols-2 max-md:grid-cols-1 max-w-[1600px] mx-auto">
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

        <FadeInWhenVisible delay={0.2} duration={0.8}>
          <InfoNote />
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
