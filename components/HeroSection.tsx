import Image from "next/image";

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
        <h1 className="font-heading text-[4rem] mb-6 font-extrabold tracking-tight text-white animate-fadeInUp max-md:text-[2.5rem] max-[480px]:text-[2rem]">
          Arnaud Chevallier
        </h1>
        <p className="text-[1.4rem] mb-10 font-normal opacity-95 animate-fadeInUp animate-delay-200 max-md:text-[1.2rem] max-[480px]:text-base">
          Maître-nageur et coach sportif spécialisé en perte de poids et remise
          en forme
        </p>
        <a
          href="#contact"
          className="inline-block bg-white text-brand-dark py-5 px-12 rounded-lg no-underline font-bold text-[1.05rem] transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.2)] animate-fadeInUp animate-delay-400 hover:-translate-y-[5px] hover:shadow-[0_20px_50px_rgba(255,255,255,0.25)] hover:bg-brand-blue hover:text-white hover:scale-105 active:scale-95 active:translate-y-0"
        >
          Commencer ma transformation
        </a>
      </div>
    </section>
  );
}
