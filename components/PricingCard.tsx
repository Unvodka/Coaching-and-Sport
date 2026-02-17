"use client";

import { PricingPack } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/useLanguage";

interface PricingCardProps extends PricingPack {
  onBuy: () => void;
  isLoading?: boolean;
}

export default function PricingCard({
  title,
  price,
  duration,
  features,
  onBuy,
  isLoading = false,
}: PricingCardProps) {
  const { t } = useLanguage();

  return (
    <div
      onClick={!isLoading ? onBuy : undefined}
      className={`h-full bg-white py-10 px-8 rounded-xl border-2 border-gray-200 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_35px_rgba(0,0,0,0.1)] hover:border-brand-blue flex flex-col ${
        isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <h3 className="font-heading text-2xl mb-4 text-heading">{title}</h3>
      <div className="text-[2.2rem] font-bold text-heading my-4 leading-none max-[480px]:text-[1.8rem]">
        {price}
      </div>
      <div className="text-gray-500 text-[1.1rem] mb-6 italic">{duration}</div>
      <ul className="list-none p-0 my-6 text-left flex-1">
        {features.map((feature) => (
          <li
            key={feature}
            className="py-[0.6rem] text-gray-600 text-[1.1rem] flex items-start gap-[0.7rem]"
          >
            <span className="text-brand-blue font-bold text-lg shrink-0">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <span className="bg-gradient-to-br from-brand-blue to-brand-navy text-white py-4 px-8 rounded-lg font-bold text-[1.1rem] transition-all duration-300 w-full inline-block text-center">
          {isLoading ? t("offers.redirecting") : t("offers.bookNow")}
        </span>
        <p className="text-[0.7rem] text-gray-400 mt-3 flex items-center justify-center gap-1">
          🔒 {t("security.securedByStripe")}
        </p>
      </div>
    </div>
  );
}
