import { HeroContent } from "./HeroContent";

export default function HeroSection() {
  return (
    <section
      id="accueil"
      aria-label="Accueil"
      className="text-white p-0 text-center relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      {/* Background Image — <picture> for responsive small/large variants */}
      <picture className="absolute inset-0 w-full h-full">
        <source
          media="(min-width: 768px)"
          srcSet="/images/swimmer-large.jpg"
        />
        <img
          src="/images/swimmer-small.jpg"
          alt="Arnaud Chevallier, coach sportif à Valbonne"
          className="w-full h-full object-cover object-[center_30%]"
          fetchPriority="high"
        />
      </picture>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50 z-[1]" />

      <HeroContent />
    </section>
  );
}
