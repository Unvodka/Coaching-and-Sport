"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";
import FadeInWhenVisible from "./animations/FadeInWhenVisible";
import ScaleInWhenVisible from "./animations/ScaleInWhenVisible";

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="apropos" className="bg-white py-24 px-16 w-full max-md:py-16 max-md:px-6">
      <FadeInWhenVisible>
        <h2 className="font-heading text-center text-5xl mb-4 font-extrabold tracking-tight text-heading max-md:text-[2.2rem] max-[480px]:text-[1.8rem]">
          {t("about.title")}
        </h2>
      </FadeInWhenVisible>
      <div className="flex flex-col items-center text-center max-w-[800px] mx-auto">
        <div>
          <FadeInWhenVisible delay={0.1}>
            <h3 className="font-heading text-heading text-[1.8rem] mb-6 font-bold">
              {t("about.heading")}
            </h3>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.2}>
            <p className="text-gray-600 mb-5 leading-[1.8] text-[1.05rem]">
              {t("about.p1")}
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.3}>
            <p className="text-gray-600 mb-5 leading-[1.8] text-[1.05rem]">
              {t("about.p2")}
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.4}>
            <p className="text-gray-600 mb-5 leading-[1.8] text-[1.05rem]">
              {t("about.p3")}
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.5}>
            <p className="text-gray-600 mb-5 leading-[1.8] text-[1.05rem]">
              <strong className="text-heading">{t("about.p4.prefix")}</strong>
              {t("about.p4.suffix")}
            </p>
          </FadeInWhenVisible>
        </div>
        <ScaleInWhenVisible delay={0.6}>
          <div className="text-[8rem] mt-8">🏅</div>
        </ScaleInWhenVisible>
      </div>
    </section>
  );
}
