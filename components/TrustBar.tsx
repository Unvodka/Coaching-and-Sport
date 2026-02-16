"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";
import FadeInWhenVisible from "./animations/FadeInWhenVisible";

export default function TrustBar() {
  const { t } = useLanguage();

  return (
    <section className="py-10 px-16 max-md:py-6 max-md:px-6">
      <FadeInWhenVisible>
        <div className="max-w-[900px] mx-auto flex flex-wrap justify-center gap-8 py-6 px-4 bg-white rounded-xl border border-gray-200 shadow-sm max-md:gap-4 max-md:py-4">
          <div className="flex items-center gap-3 text-center">
            <span className="text-2xl">🔒</span>
            <div>
              <p className="text-sm font-bold text-heading leading-tight">
                {t("security.badge1.title")}
              </p>
              <p className="text-xs text-gray-400">
                {t("security.badge1.desc")}
              </p>
            </div>
          </div>
          <div className="hidden sm:block w-px bg-gray-200 self-stretch" />
          <div className="flex items-center gap-3 text-center">
            <span className="text-2xl">🛡️</span>
            <div>
              <p className="text-sm font-bold text-heading leading-tight">
                {t("security.badge2.title")}
              </p>
              <p className="text-xs text-gray-400">
                {t("security.badge2.desc")}
              </p>
            </div>
          </div>
          <div className="hidden sm:block w-px bg-gray-200 self-stretch" />
          <div className="flex items-center gap-3 text-center">
            <span className="text-2xl">💳</span>
            <div>
              <p className="text-sm font-bold text-heading leading-tight">
                {t("security.badge3.title")}
              </p>
              <p className="text-xs text-gray-400">
                {t("security.badge3.desc")}
              </p>
            </div>
          </div>
        </div>
      </FadeInWhenVisible>
    </section>
  );
}
