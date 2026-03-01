"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import { useState } from "react";

const FAQ_DATA = {
  fr: [
    {
      q: "Combien coûte un cours particulier ?",
      a: "Un cours particulier (natation, fitness ou musculation) coûte 60€ la séance d'une heure. Des packs dégressifs sont disponibles avec des réductions allant jusqu'à 20%. Le coaching en ligne est à 79€/mois.",
    },
    {
      q: "Où se déroulent les séances ?",
      a: "À Valbonne et ses environs sur la Côte d'Azur (Sophia Antipolis, Mougins, Antibes, Grasse). Natation en piscine, fitness en plein air ou en salle. Coaching en ligne disponible partout en France.",
    },
    {
      q: "Proposez-vous du coaching en ligne ?",
      a: "Oui ! Le coaching en ligne à 79€/mois comprend un programme d'entraînement personnalisé hebdomadaire, un plan alimentaire adapté, des ajustements selon vos résultats et un support illimité par message.",
    },
    {
      q: "Comment réserver une première séance ?",
      a: "Via le formulaire de contact sur ce site ou par téléphone. Un entretien gratuit de 15 minutes est offert pour discuter de vos objectifs avant de commencer.",
    },
  ],
  en: [
    {
      q: "How much does a private session cost?",
      a: "A private session (swimming, fitness, or weight training) costs €60 per hour. Discounted packs are available with savings up to 20%. Online coaching is €79/month.",
    },
    {
      q: "Where do sessions take place?",
      a: "In Valbonne and surrounding areas on the French Riviera (Sophia Antipolis, Mougins, Antibes, Grasse). Swimming in pools, outdoor or indoor fitness. Online coaching available throughout France.",
    },
    {
      q: "Do you offer online coaching?",
      a: "Yes! Online coaching at €79/month includes a personalized weekly training program, a tailored meal plan, weekly adjustments based on your results, and unlimited message support.",
    },
    {
      q: "How do I book a first session?",
      a: "Through the contact form on this site or by phone. A free 15-minute consultation is offered to discuss your goals before starting.",
    },
  ],
};

export default function FAQSection() {
  const { locale } = useLanguage();
  const faqs = FAQ_DATA[locale as keyof typeof FAQ_DATA] || FAQ_DATA.fr;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 px-16 max-md:py-10 max-md:px-6">
      <FadeInWhenVisible>
        <h2 className="font-heading text-center text-4xl mb-12 font-extrabold tracking-tight text-heading max-md:text-[2rem] max-[480px]:text-[1.6rem]">
          {locale === "en" ? "Frequently Asked Questions" : "Questions Fréquentes"}
        </h2>
      </FadeInWhenVisible>
      <div className="max-w-[800px] mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <FadeInWhenVisible key={i} delay={i * 0.08}>
            <div
              className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(i)}
                aria-expanded={openIndex === i}
                className="flex justify-between items-center p-6 w-full text-left cursor-pointer bg-transparent border-none"
              >
                <h3 className="font-bold text-heading text-[1.05rem] leading-snug pr-4">
                  {faq.q}
                </h3>
                <span
                  className={`text-brand-blue transition-transform duration-300 shrink-0 text-sm ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-[300px] pb-6 px-6" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 leading-relaxed text-[1.05rem]">
                  {faq.a}
                </p>
              </div>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </section>
  );
}
