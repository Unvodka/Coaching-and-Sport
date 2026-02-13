"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";

export default function InfoNote() {
  const { t } = useLanguage();

  return (
    <div className="bg-white p-8 rounded-xl mt-12 border-2 border-gray-200 border-l-4 border-l-brand-blue text-center">
      <p className="my-3 text-gray-600 leading-[1.7]">
        💡 <strong className="text-heading">{t("info.programsInclude")}</strong>{" "}
        {t("info.programsDetails")}
      </p>
      <p className="my-3 text-gray-600 leading-[1.7]">
        💳 <strong className="text-heading">{t("info.securePayment")}</strong> •{" "}
        {t("info.paymentMethods")}
      </p>
      <p className="my-3 text-gray-600 leading-[1.7]">
        {t("info.sessionsNote")}
      </p>
      <p className="my-3 text-gray-600 leading-[1.7]">
        📞 {t("info.needAdvice")}{" "}
        <a
          href="#contact"
          className="text-brand-blue no-underline font-semibold hover:underline"
        >
          {t("info.contactMe")}
        </a>{" "}
        {t("info.freeConsult")}
      </p>
    </div>
  );
}
