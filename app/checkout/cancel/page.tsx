"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";

export default function CheckoutCancel() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-8">
      <div className="bg-white p-12 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-200 text-center max-w-lg w-full">
        <div className="text-6xl mb-6">❌</div>
        <h1 className="font-heading text-3xl font-bold text-heading mb-4">
          {t("checkout.cancel.title")}
        </h1>
        <p className="text-gray-500 text-lg mb-6 leading-relaxed">
          {t("checkout.cancel.message")}
        </p>
        <p className="text-[0.8rem] text-gray-400 mb-8 flex items-center justify-center gap-2">
          🔒 {t("security.checkoutSecured")}
        </p>
        <Link
          href="/#offres"
          className="inline-block bg-gradient-to-br from-brand-blue to-brand-navy text-white py-4 px-10 rounded-lg font-bold text-base transition-all duration-300 no-underline hover:-translate-y-[2px] hover:shadow-[0_8px_25px_rgba(37,99,235,0.3)]"
        >
          {t("checkout.cancel.seeOffers")}
        </Link>
      </div>
    </div>
  );
}
