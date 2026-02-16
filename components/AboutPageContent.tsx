"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";

export default function AboutPageContent() {
  const { t } = useLanguage();

  const qualifications = [
    t("aboutPage.q1"),
    t("aboutPage.q2"),
    t("aboutPage.q3"),
    t("aboutPage.q4"),
  ];

  const approaches = [
    t("aboutPage.approach1"),
    t("aboutPage.approach2"),
    t("aboutPage.approach3"),
    t("aboutPage.approach4"),
  ];

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark to-brand-navy text-white py-20 px-16 text-center max-md:py-14 max-md:px-6">
        <h1 className="font-heading text-[3rem] font-extrabold tracking-tight mb-4 max-md:text-[2.2rem]">
          {t("aboutPage.title")}
        </h1>
        <p className="text-xl opacity-90 max-w-[600px] mx-auto max-md:text-lg">
          {t("aboutPage.subtitle")}
        </p>
      </section>

      {/* Main content */}
      <section className="py-20 px-16 max-md:py-12 max-md:px-6">
        <div className="max-w-[800px] mx-auto">
          {/* Bio */}
          <FadeInWhenVisible>
            <h2 className="font-heading text-heading text-[1.8rem] mb-8 font-bold text-center">
              {t("aboutPage.heading")}
            </h2>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.1}>
            <p className="text-gray-600 mb-5 leading-[1.8] text-[1.05rem]">
              {t("aboutPage.p1")}
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.15}>
            <p className="text-gray-600 mb-5 leading-[1.8] text-[1.05rem]">
              {t("aboutPage.p2")}
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.2}>
            <p className="text-gray-600 mb-5 leading-[1.8] text-[1.05rem]">
              {t("aboutPage.p3")}
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.25}>
            <p className="text-gray-600 mb-12 leading-[1.8] text-[1.05rem]">
              {t("aboutPage.p4")}
            </p>
          </FadeInWhenVisible>

          {/* Qualifications */}
          <FadeInWhenVisible delay={0.3}>
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-10 mb-12 border border-blue-100">
              <h3 className="font-heading text-heading text-2xl font-bold mb-6 flex items-center gap-3">
                🎓 {t("aboutPage.qualificationsTitle")}
              </h3>
              <ul className="space-y-4">
                {qualifications.map((q, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-gray-600 text-[1.02rem] leading-relaxed"
                  >
                    <span className="text-brand-blue text-lg mt-0.5">✓</span>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInWhenVisible>

          {/* Approach */}
          <FadeInWhenVisible delay={0.35}>
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-10 mb-12 border border-gray-200">
              <h3 className="font-heading text-heading text-2xl font-bold mb-6 flex items-center gap-3">
                🎯 {t("aboutPage.approachTitle")}
              </h3>
              <ol className="space-y-4">
                {approaches.map((a, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-gray-600 text-[1.02rem] leading-relaxed"
                  >
                    <span className="bg-brand-blue text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {a}
                  </li>
                ))}
              </ol>
            </div>
          </FadeInWhenVisible>

          {/* CTA */}
          <FadeInWhenVisible delay={0.4}>
            <div className="text-center bg-gradient-to-br from-brand-dark to-brand-navy rounded-2xl p-12 text-white">
              <h3 className="font-heading text-3xl font-bold mb-6">
                {t("aboutPage.ctaTitle")}
              </h3>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold py-4 px-10 rounded-xl text-lg shadow-lg hover:bg-blue-700 transition-all duration-300 hover:-translate-y-0.5 no-underline"
              >
                {t("aboutPage.ctaText")} &rarr;
              </Link>
            </div>
          </FadeInWhenVisible>

          {/* Back link */}
          <FadeInWhenVisible delay={0.45}>
            <div className="text-center mt-10">
              <Link
                href="/"
                className="text-brand-blue font-semibold hover:underline"
              >
                {t("aboutPage.backHome")}
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      <Footer />
    </>
  );
}
