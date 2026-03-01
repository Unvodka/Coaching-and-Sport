import dynamic from "next/dynamic";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import JsonLd from "@/components/JsonLd";

const AboutSection = dynamic(() => import("@/components/AboutSection"), {
  loading: () => <div className="min-h-[300px]" />,
});
const ServicesSection = dynamic(() => import("@/components/ServicesSection"), {
  loading: () => <div className="min-h-[400px]" />,
});
const OffersSection = dynamic(() => import("@/components/OffersSection"), {
  loading: () => <div className="min-h-[400px]" />,
});
const ContactSection = dynamic(() => import("@/components/ContactSection"), {
  loading: () => <div className="min-h-[300px]" />,
});
const FAQSection = dynamic(() => import("@/components/FAQSection"), {
  loading: () => <div className="min-h-[200px]" />,
});
const TrustBar = dynamic(() => import("@/components/TrustBar"), {
  loading: () => <div className="min-h-[80px]" />,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="min-h-[200px]" />,
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Combien coûte un cours particulier avec Coach-Bluewave ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un cours particulier (natation, fitness ou musculation) coûte 60€ la séance d'une heure. Des packs dégressifs sont disponibles avec des réductions allant jusqu'à 20%. Le coaching en ligne est à 79€/mois.",
      },
    },
    {
      "@type": "Question",
      name: "Où se déroulent les séances de coaching ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "À Valbonne et ses environs sur la Côte d'Azur (Sophia Antipolis, Mougins, Antibes, Grasse). Natation en piscine, fitness en plein air ou en salle. Coaching en ligne disponible partout en France.",
      },
    },
    {
      "@type": "Question",
      name: "Proposez-vous du coaching en ligne ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui ! Le coaching en ligne à 79€/mois comprend un programme d'entraînement personnalisé hebdomadaire, un plan alimentaire adapté, des ajustements selon vos résultats et un support illimité par message.",
      },
    },
    {
      "@type": "Question",
      name: "Comment réserver une première séance ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Via le formulaire de contact sur coach-bluewave.com ou par téléphone. Un entretien gratuit de 15 minutes est offert pour discuter de vos objectifs avant de commencer.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <Header />
      <main id="main-content">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <OffersSection />
      <ContactSection />
      <FAQSection />
      <TrustBar />
      </main>
      <Footer />
    </>
  );
}
