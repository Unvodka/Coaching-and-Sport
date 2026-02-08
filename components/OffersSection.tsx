"use client";

import { useState } from "react";
import { PROGRAMS, PRICING_PACKS } from "@/lib/constants";
import ProgramCard from "./ProgramCard";
import PricingCard from "./PricingCard";
import InfoNote from "./InfoNote";

export default function OffersSection() {
  const [loadingPack, setLoadingPack] = useState<string | null>(null);

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
        alert("Erreur lors de la création de la session de paiement.");
        setLoadingPack(null);
      }
    } catch {
      alert("Erreur de connexion. Veuillez réessayer.");
      setLoadingPack(null);
    }
  };

  return (
    <section
      id="offres"
      className="bg-gradient-to-br from-slate-50 to-slate-100 py-24 px-16 w-full max-md:py-16 max-md:px-6"
    >
      <h2
        data-aos="fade-up"
        className="font-heading text-center text-5xl mb-4 font-extrabold tracking-tight text-heading max-md:text-[2.2rem] max-[480px]:text-[1.8rem]"
      >
        Offres &amp; Tarifs
      </h2>
      <p
        data-aos="fade-up"
        data-aos-delay="100"
        className="text-center text-gray-500 text-lg mb-16 max-w-[700px] mx-auto"
      >
        Choisissez la formule qui correspond le mieux à vos besoins et objectifs
      </p>

      <div className="w-full">
        {/* Programs Grid */}
        <div className="flex flex-row flex-wrap gap-10 mb-16 max-md:flex-col">
          {PROGRAMS.map((program, index) => (
            <ProgramCard
              key={program.title}
              {...program}
              index={index}
              isLoading={loadingPack === program.title}
              onCheckout={
                program.priceNumeric
                  ? () => handleCheckout(program.title, program.priceNumeric!)
                  : undefined
              }
            />
          ))}
        </div>

        {/* Pricing Divider */}
        <div
          id="pricing-packs"
          data-aos="fade-up"
          className="text-center my-16 max-w-[800px] mx-auto"
        >
          <h3 className="font-heading text-[2.2rem] text-heading mb-3 font-bold">
            Packs Cours Particuliers
          </h3>
          <p className="text-gray-500 text-[1.05rem]">
            Réservez vos séances individuelles avec des packs avantageux
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="flex flex-wrap gap-8 mt-12 max-md:flex-col">
          {PRICING_PACKS.map((pack, index) => (
            <PricingCard
              key={pack.title}
              {...pack}
              index={index}
              isLoading={loadingPack === pack.title}
              onBuy={() => handleCheckout(pack.title, pack.priceNumeric)}
            />
          ))}
        </div>

        <InfoNote />
      </div>
    </section>
  );
}
