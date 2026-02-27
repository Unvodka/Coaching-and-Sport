"use client";

import { useState } from "react";
import Image from "next/image";
import { Program } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/useLanguage";

interface ProgramCardProps extends Program {
  onCheckout?: () => void;
  isLoading?: boolean;
}

export default function ProgramCard({
  imageSrc,
  title,
  description,
  features,
  goals,
  price,
  priceDetails,
  ctaText,
  ctaHref,
  isFeatured,
  featuredBadge,
  onCheckout,
  isLoading = false,
}: ProgramCardProps) {
  const { t } = useLanguage();
  const [showFeatures, setShowFeatures] = useState(false);
  const [showGoals, setShowGoals] = useState(false);
  const isStripe = !!onCheckout;

  const cardClasses = `bg-white rounded-2xl overflow-hidden flex flex-col transition-shadow duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_35px_rgba(37,99,235,0.12)] no-underline ${
    isFeatured ? "border-[3px] border-brand-blue" : "border border-gray-200"
  } ${isLoading ? "opacity-60 pointer-events-none" : ""}`;

  const content = (
    <>
      {/* Image header */}
      <div className="relative h-36 w-full overflow-hidden max-md:h-44">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10" />
        {featuredBadge && (
          <span className="absolute top-3 right-3 bg-brand-blue text-white py-1 px-3 rounded-full text-[0.65rem] font-bold uppercase tracking-wider shadow-md">
            {featuredBadge}
          </span>
        )}
        <h3 className="font-heading absolute top-1/2 -translate-y-1/2 left-0 right-0 text-center text-white text-[1.5rem] font-bold drop-shadow-lg">
          {title}
        </h3>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col text-center max-md:p-6">
        <p className="text-gray-500 leading-[1.6] mb-5 text-[0.95rem] min-h-[4.5rem] max-md:min-h-0">{description}</p>

        {/* Toggle buttons row */}
        <div className="flex items-center justify-center gap-4 mb-2">
          <button
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); setShowFeatures(!showFeatures); }}
            className={`text-[0.75rem] font-bold uppercase tracking-wider py-2 px-4 rounded-full border transition-all duration-200 bg-transparent cursor-pointer ${
              showFeatures
                ? "border-brand-blue text-brand-blue bg-blue-50"
                : "border-gray-200 text-gray-500 hover:border-brand-blue hover:text-brand-blue"
            }`}
          >
            {t("offers.included")} {showFeatures ? "▲" : "▼"}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); setShowGoals(!showGoals); }}
            className={`text-[0.75rem] font-bold uppercase tracking-wider py-2 px-4 rounded-full border transition-all duration-200 bg-transparent cursor-pointer ${
              showGoals
                ? "border-heading text-heading bg-slate-50"
                : "border-gray-200 text-gray-500 hover:border-heading hover:text-heading"
            }`}
          >
            {t("offers.goals")} {showGoals ? "▲" : "▼"}
          </button>
        </div>

        {/* Expandable features */}
        <div className={`grid transition-all duration-300 ease-in-out ${showFeatures ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            <ul className="list-none p-0 text-left mx-auto w-fit">
              {features.map((feature) => (
                <li key={feature} className="py-1 text-gray-600 flex items-start gap-2 text-[0.95rem] leading-snug">
                  <span className="text-brand-blue font-bold text-sm shrink-0 mt-px">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Expandable goals */}
        <div className={`grid transition-all duration-300 ease-in-out ${showGoals ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            <ul className="list-none p-0 text-left mx-auto w-fit">
              {goals.map((goal) => (
                <li key={goal} className="py-1 text-gray-600 flex items-start gap-2 text-[0.95rem] leading-snug">
                  <span className="shrink-0 mt-px">🎯</span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto p-5 flex flex-col items-center text-center border-t border-gray-100 max-md:p-6">
        <div className="text-[1.8rem] font-bold text-heading leading-none mb-1 max-[480px]:text-[1.5rem]">
          {price}
        </div>
        <p className="text-gray-400 text-[0.95rem] mb-4">{priceDetails}</p>
        <span className="bg-gradient-to-br from-brand-blue to-brand-navy text-white py-3 px-8 rounded-lg font-bold transition-all duration-300 inline-block w-full text-center text-[1rem] cursor-pointer hover:opacity-90">
          {isLoading ? t("offers.redirecting") : ctaText}
        </span>
        <p className="text-[0.7rem] text-gray-400 mt-3 flex items-center justify-center gap-1">
          🔒 {t("security.securedByStripe")}
        </p>
      </div>
    </>
  );

  if (isStripe) {
    return (
      <div onClick={!isLoading ? onCheckout : undefined} className={cardClasses}>
        {content}
      </div>
    );
  }

  return (
    <a href={ctaHref} className={cardClasses}>
      {content}
    </a>
  );
}
