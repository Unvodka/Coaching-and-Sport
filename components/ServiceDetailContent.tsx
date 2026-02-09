"use client";

import Image from "next/image";
import Link from "next/link";
import { Service } from "@/lib/types";
import Header from "./Header";
import Footer from "./Footer";
import FadeInWhenVisible from "./animations/FadeInWhenVisible";
import StaggerContainer from "./animations/StaggerContainer";
import StaggerItem from "./animations/StaggerItem";

interface Props {
  service: Service;
}

export default function ServiceDetailContent({ service }: Props) {
  const { title, detail } = service;

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <Image
          src={detail.heroImageSrc}
          alt={detail.heroImageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50 z-[1]" />
        <div className="relative z-10 text-center text-white px-8">
          <h1 className="font-heading text-[3.5rem] font-extrabold tracking-tight mb-4 drop-shadow-lg max-md:text-[2.5rem] max-[480px]:text-[2rem]">
            {title}
          </h1>
          <p className="text-xl opacity-90 max-w-[600px] mx-auto max-md:text-lg">
            {detail.subtitle}
          </p>
        </div>
      </section>

      {/* Back link */}
      <div className="py-6 px-16 max-md:px-6">
        <Link
          href="/#services"
          className="text-brand-blue font-semibold hover:underline text-[0.95rem] inline-flex items-center gap-2"
        >
          &larr; Retour aux services
        </Link>
      </div>

      {/* Description */}
      <section className="pb-16 px-16 max-w-[800px] mx-auto max-md:px-6">
        {detail.longDescription.map((paragraph, i) => (
          <FadeInWhenVisible key={i} delay={i * 0.1}>
            <p className="text-gray-600 mb-5 leading-[1.8] text-[1.05rem]">
              {paragraph}
            </p>
          </FadeInWhenVisible>
        ))}
      </section>

      {/* Benefits */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-24 px-16 max-md:py-16 max-md:px-6">
        <FadeInWhenVisible>
          <h2 className="font-heading text-center text-4xl mb-16 font-extrabold tracking-tight text-heading max-md:text-[2rem]">
            Les Bienfaits
          </h2>
        </FadeInWhenVisible>
        <StaggerContainer className="grid grid-cols-2 gap-8 max-w-[900px] mx-auto max-md:grid-cols-1">
          {detail.benefits.map((benefit) => (
            <StaggerItem key={benefit.title}>
              <div className="bg-white p-8 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200 h-full">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-heading mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-500 leading-[1.7] text-[0.95rem]">
                  {benefit.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Target Audience */}
      <section className="py-24 px-16 max-md:py-16 max-md:px-6">
        <FadeInWhenVisible>
          <h2 className="font-heading text-center text-4xl mb-12 font-extrabold tracking-tight text-heading max-md:text-[2rem]">
            Pour Qui ?
          </h2>
        </FadeInWhenVisible>
        <div className="max-w-[600px] mx-auto">
          {detail.targetAudience.map((item, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.1}>
              <div className="flex items-center gap-3 py-3">
                <span className="text-brand-blue font-bold text-lg shrink-0">
                  ✓
                </span>
                <span className="text-gray-600 text-[1.05rem]">{item}</span>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-brand-dark to-brand-navy text-white text-center py-20 px-16 max-md:py-14 max-md:px-6">
        <FadeInWhenVisible>
          <h2 className="font-heading text-3xl font-bold mb-6 max-md:text-2xl">
            {detail.ctaText}
          </h2>
          <Link
            href="/#offres"
            className="inline-block bg-white text-brand-dark py-4 px-10 rounded-lg font-bold text-base transition-all duration-300 no-underline hover:-translate-y-[2px] hover:shadow-[0_8px_25px_rgba(255,255,255,0.3)]"
          >
            Voir les offres &amp; tarifs
          </Link>
        </FadeInWhenVisible>
      </section>

      <Footer />
    </>
  );
}
