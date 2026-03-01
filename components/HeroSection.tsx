import Image from "next/image";
import { HeroContent } from "./HeroContent";

export default function HeroSection() {
  return (
    <section
      id="accueil"
      aria-label="Accueil"
      className="text-white p-0 text-center relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      {/* Background Image — server-rendered for fast LCP */}
      <Image
        src="/images/hero-valbonne.webp"
        alt="Vue côte d'Azur - Valbonne"
        fill
        className="object-cover"
        priority
        fetchPriority="high"
        sizes="100vw"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50 z-[1]" />

      <HeroContent />
    </section>
  );
}
