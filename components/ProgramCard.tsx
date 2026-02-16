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
  // priceUnit no longer displayed separately (price is inside button)
  priceDetails,
  ctaText,
  ctaHref,
  isFeatured,
  featuredBadge,
  onCheckout,
  isLoading = false,
}: ProgramCardProps) {
  const { t } = useLanguage();
  const [showGoals, setShowGoals] = useState(false);
  const isStripe = !!onCheckout;

  const cardClasses = `h-full bg-white rounded-xl overflow-hidden flex flex-col transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_35px_rgba(37,99,235,0.12)] hover:border-brand-blue hover:-translate-y-1 no-underline cursor-pointer ${
    isFeatured ? "border-[3px] border-brand-blue" : "border-2 border-gray-200"
  } ${isLoading ? "opacity-60 pointer-events-none" : ""}`;

  const content = (
    <>
      <div className="relative h-32 w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/10" />
        {featuredBadge && (
          <span className="absolute top-3 right-3 bg-brand-blue text-white py-1 px-3 rounded-full text-xs font-bold uppercase tracking-wider">
            {featuredBadge}
          </span>
        )}
        <h3 className="font-heading absolute top-1/2 -translate-y-1/2 left-0 right-0 text-center text-white text-[1.6rem] font-bold drop-shadow-lg">
          {title}
        </h3>
      </div>
      <div className="flex-1 p-6 flex flex-col text-center">
        <p className="text-gray-500 leading-[1.6] mb-4 text-[0.95rem]">{description}</p>

        {/* What's included */}
        <p className="text-[0.8rem] font-bold text-brand-blue uppercase tracking-wider mb-3 mt-2">
          {t("offers.included")}
        </p>
        <ul className="list-none p-0 mb-4 text-left mx-auto w-fit">
          {features.map((feature) => (
            <li key={feature} className="py-1 text-gray-600 flex items-start gap-2.5 text-[0.85rem] leading-snug">
              <span className="text-brand-blue font-bold text-sm shrink-0 mt-px">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Goals toggle */}
        <button
          onClick={(e) => { e.stopPropagation(); e.preventDefault(); setShowGoals(!showGoals); }}
          className="text-[0.8rem] font-bold text-heading uppercase tracking-wider mb-3 mt-auto flex items-center justify-center gap-1 bg-transparent border-none cursor-pointer hover:text-brand-blue transition-colors"
        >
          {showGoals ? t("offers.hideGoals") : t("offers.showGoals")}
          <span className="text-[0.65rem]">{showGoals ? "▲" : "▼"}</span>
        </button>
        {showGoals && (
          <ul className="list-none p-0 text-left mx-auto w-fit">
            {goals.map((goal) => (
              <li key={goal} className="py-1 text-gray-600 flex items-start gap-2.5 text-[0.85rem] leading-snug">
                <span className="shrink-0 mt-px">🎯</span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="p-6 flex flex-col justify-center items-center text-center bg-white border-t border-gray-200">
        <span className="bg-gradient-to-br from-brand-blue to-brand-navy text-white py-3 px-8 rounded-lg font-bold transition-all duration-300 inline-block w-full text-center text-[0.95rem]">
          {isLoading ? t("offers.redirecting") : `${price} — ${ctaText}`}
        </span>
        <p className="text-gray-500 text-[0.8rem] mt-2">{priceDetails}</p>
        <p className="text-[0.7rem] text-gray-400 mt-2 flex items-center justify-center gap-1">
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
