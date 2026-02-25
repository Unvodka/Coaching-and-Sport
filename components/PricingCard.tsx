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
      className={`h-full bg-white py-8 px-6 rounded-xl border-2 border-gray-200 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_35px_rgba(0,0,0,0.1)] hover:border-brand-blue flex flex-col ${
        isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <h3 className="font-heading text-[1.375rem] mb-3 text-heading">{title}</h3>
      <div className="text-[2.075rem] font-bold text-heading my-3 leading-none max-[480px]:text-[1.675rem]">
        {price}
      </div>
      <div className="text-gray-500 text-[0.9125rem] mb-5 italic">{duration}</div>
      <ul className="list-none p-0 my-5 text-left flex-1">
        {features.map((feature) => (
          <li
            key={feature}
            className="py-[0.5rem] text-gray-600 text-[0.9125rem] flex items-start gap-[0.6rem]"
          >
            <span className="text-brand-blue font-bold text-sm shrink-0">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <span className="bg-gradient-to-br from-brand-blue to-brand-navy text-white py-3 px-6 rounded-lg font-bold text-[0.975rem] transition-all duration-300 w-full inline-block text-center">
          {isLoading ? t("offers.redirecting") : t("offers.bookNow")}
        </span>
        <p className="text-[0.7rem] text-gray-400 mt-3 flex items-center justify-center gap-1">
          🔒 {t("security.securedByStripe")}
        </p>
      </div>
    </div>
  );
}
