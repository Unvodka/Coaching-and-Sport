"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
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
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-heading text-[4rem] mb-6 font-extrabold tracking-tight text-white max-md:text-[2.5rem] max-[480px]:text-[2rem]"
        >
          Arnaud Chevallier
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[1.4rem] mb-10 font-normal opacity-95 max-md:text-[1.2rem] max-[480px]:text-base"
        >
          Maître-nageur et coach sportif spécialisé en perte de poids et remise
          en forme
        </motion.p>
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
          className="inline-block bg-white text-brand-dark py-5 px-12 rounded-lg no-underline font-bold text-[1.05rem] transition-colors duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:bg-brand-blue hover:text-white"
        >
          Commencer ma transformation
        </motion.a>
      </div>
    </section>
  );
}
