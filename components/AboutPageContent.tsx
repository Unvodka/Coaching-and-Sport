"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/useLanguage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";

export default function AboutPageContent() {
  const { t, locale } = useLanguage();

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
      <section className="bg-gradient-to-br from-brand-dark to-brand-navy text-white pt-32 pb-20 px-16 text-center max-md:pt-24 max-md:pb-14 max-md:px-6">
        <h1 className="font-heading text-[3rem] font-extrabold tracking-tight mb-4 max-md:text-[2.2rem]">
          {t("aboutPage.title")}
        </h1>
        <p className="text-xl opacity-90 max-w-[600px] mx-auto max-md:text-lg">
          {t("aboutPage.subtitle")}
        </p>
      </section>

      {/* Main content */}
      <section className="py-20 px-16 max-md:py-12 max-md:px-6">
        <div className="max-w-[800px] lg:max-w-[90%] xl:max-w-[1200px] mx-auto">
          {/* Bio */}
          <FadeInWhenVisible>
            <h2 className="font-heading text-heading text-[1.8rem] mb-8 font-bold text-center">
              {t("aboutPage.headingName")}
              <br />
              <span className="text-[1.3rem] font-semibold text-gray-500">
                {t("aboutPage.headingRole")}
              </span>
            </h2>
          </FadeInWhenVisible>

          {/* Photo + Qualifications + Approach — 3-column grid on desktop */}
          <div className="grid lg:grid-cols-3 gap-8 items-start mb-12">
            {/* Qualifications — left on desktop, below photo on mobile */}
            <FadeInWhenVisible delay={0.15} className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100 h-full">
                <h3 className="font-heading text-heading text-xl font-bold mb-4 flex items-center gap-3">
                  🎓 {t("aboutPage.qualificationsTitle")}
                </h3>
                <ul className="space-y-3">
                  {qualifications.map((q, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-gray-600 text-[0.95rem] leading-relaxed"
                    >
                      <span className="text-brand-blue text-base mt-0.5 shrink-0">✓</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInWhenVisible>

            {/* Photo — center on desktop, top on mobile */}
            <FadeInWhenVisible delay={0.1} className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-[280px] h-[320px] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-4 border-white">
                <Image
                  src="/images/Aquabike.jpg"
                  alt="Arnaud Chevallier — Éducateur Sportif & Maître-Nageur"
                  fill
                  className="object-cover"
                  sizes="280px"
                />
              </div>
            </FadeInWhenVisible>

            {/* Approach — right on desktop, below qualifications on mobile */}
            <FadeInWhenVisible delay={0.2} className="order-3">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 h-full">
                <h3 className="font-heading text-heading text-xl font-bold mb-4 flex items-center gap-3">
                  🎯 {t("aboutPage.approachTitle")}
                </h3>
                <ol className="space-y-3">
                  {approaches.map((a, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-gray-600 text-[0.95rem] leading-relaxed"
                    >
                      <span className="bg-brand-blue text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {a}
                    </li>
                  ))}
                </ol>
              </div>
            </FadeInWhenVisible>
          </div>

          <FadeInWhenVisible delay={0.25}>
            <p className="text-gray-600 mb-5 leading-[1.8] text-[1.037rem] tracking-[-0.1px]">
              {t("aboutPage.p1")}
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.3}>
            <p className="text-gray-600 mb-5 leading-[1.8] text-[1.037rem] tracking-[-0.1px]">
              {t("aboutPage.p2")}
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.35}>
            <p className="text-gray-600 mb-5 leading-[1.8] text-[1.037rem] tracking-[-0.1px]">
              {t("aboutPage.p3")}
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.4}>
            <p className="text-gray-600 mb-5 leading-[1.8] text-[1.037rem] tracking-[-0.1px]">
              {t("aboutPage.p4")}
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.45}>
            <p className="text-gray-600 mb-5 leading-[1.8] text-[1.037rem] tracking-[-0.1px]">
              {t("aboutPage.p5")}
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.5}>
            <p className="text-gray-600 mb-12 leading-[1.8] text-[1.037rem] tracking-[-0.1px]">
              {t("aboutPage.p6")}
            </p>
          </FadeInWhenVisible>

          {/* Diplômes & Certifications */}
          <FadeInWhenVisible delay={0.5}>
            <div className="mb-12">
              <h2 className="font-heading text-heading text-[1.6rem] font-bold mb-6 text-center">
                🏅 {locale === "en" ? "Diplomas & Certifications" : "Diplômes & Certifications"}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">

                {/* BPJEPS AAN */}
                <div className="flex gap-4 items-start bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-5 shadow-sm">
                  <div className="text-3xl shrink-0">🎓</div>
                  <div>
                    <p className="font-bold text-brand-dark text-[0.95rem] leading-snug">
                      BPJEPS — Activités Aquatiques et de la Natation
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Brevet Professionnel de la Jeunesse, de l&apos;Éducation Populaire et du Sport
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      RNCP Niveau IV · EQF Niveau 4 · N° BPNOR160280 · Délivré le 27/09/2016
                    </p>
                  </div>
                </div>

                {/* Carte Professionnelle */}
                <div className="flex gap-4 items-start bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-2xl p-5 shadow-sm">
                  <div className="text-3xl shrink-0">🪪</div>
                  <div>
                    <p className="font-bold text-brand-dark text-[0.95rem] leading-snug">
                      Carte Professionnelle d&apos;Éducateur Sportif
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Délivrée par le Ministère chargé des Sports — Préfecture des Alpes-Maritimes
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      N° 07520ED0375 · Valide jusqu&apos;au 19/11/2030
                    </p>
                    <a
                      href="https://recherche-educateur.sports.gouv.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-blue text-xs hover:underline mt-1 inline-block"
                    >
                      Vérifier sur recherche-educateur.sports.gouv.fr →
                    </a>
                  </div>
                </div>

                {/* PSE2 */}
                <div className="flex gap-4 items-start bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-2xl p-5 shadow-sm">
                  <div className="text-3xl shrink-0">🚑</div>
                  <div>
                    <p className="font-bold text-brand-dark text-[0.95rem] leading-snug">
                      PSE2 — Équipier Secouriste Niveau 2
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Secouristes Français Croix Blanche
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      N° PSE2-FSFCB-2023-199501-5 · Obtenu le 22/11/2023
                    </p>
                  </div>
                </div>

                {/* PSE1 */}
                <div className="flex gap-4 items-start bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-2xl p-5 shadow-sm">
                  <div className="text-3xl shrink-0">🩺</div>
                  <div>
                    <p className="font-bold text-brand-dark text-[0.95rem] leading-snug">
                      PSE1 — Premiers Secours en Équipe Niveau 1
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      CREPS Sud-Est — Site d&apos;Antibes
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      N° 06-2013-047 · Obtenu le 18/11/2013
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </FadeInWhenVisible>

          {/* CTA */}
          <FadeInWhenVisible delay={0.55}>
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
          <FadeInWhenVisible delay={0.6}>
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
