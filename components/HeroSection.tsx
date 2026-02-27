"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/useLanguage";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="accueil"
      className="text-white p-0 text-center relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src="/images/hero-valbonne.jpg"
        alt="Vue côte d'Azur - Valbonne"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50 z-[1]" />

      <div className="relative z-10 max-w-[900px] p-8">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-elegant text-[2rem] mb-10 font-medium opacity-95 max-md:text-[1.525rem] max-[480px]:text-[1.275rem]"
        >
          {t("hero.subtitle")}
        </motion.h2>
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover={{
            scale: 1.05,
            y: -5,
            boxShadow: "0 20px 50px rgba(255,255,255,0.25)",
          }}
          whileTap={{ scale: 0.95, y: 0 }}
          className="inline-block bg-white text-brand-dark py-5 px-12 rounded-lg no-underline font-bold text-[1.05rem] transition-colors duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:bg-brand-blue hover:text-white max-md:py-3 max-md:px-8 max-md:text-[0.95rem]"
        >
          {t("hero.cta")}
        </motion.a>
      </div>
    </section>
  );
}
