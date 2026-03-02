"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";
import { getFAQs } from "@/lib/faq";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import { useState } from "react";

export default function FAQSection() {
  const { locale } = useLanguage();
  const faqs = getFAQs(locale);
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
                  {faq.question}
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
                  {faq.answer}
                </p>
              </div>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </section>
  );
}
