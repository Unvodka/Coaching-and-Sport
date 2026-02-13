"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";

export default function CheckoutSuccess() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-8">
      <div className="bg-white p-12 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-200 text-center max-w-lg w-full">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="font-heading text-3xl font-bold text-heading mb-4">
          {t("checkout.success.title")}
        </h1>
        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
          {t("checkout.success.message")}
        </p>
        <Link
          href="/"
          className="inline-block bg-gradient-to-br from-brand-blue to-brand-navy text-white py-4 px-10 rounded-lg font-bold text-base transition-all duration-300 no-underline hover:-translate-y-[2px] hover:shadow-[0_8px_25px_rgba(37,99,235,0.3)]"
        >
          {t("checkout.success.backHome")}
        </Link>
      </div>
    </div>
  );
}
