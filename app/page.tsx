import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import OffersSection from "@/components/OffersSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import TrustBar from "@/components/TrustBar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

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
      name: "Quelles sont les qualifications d'Arnaud Chevallier ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Arnaud Chevallier est maître-nageur diplômé d'État (BPJEPS AAN) et coach sportif certifié. Il est spécialisé en perte de poids, remise en forme, cours de natation et coaching personnalisé sur la Côte d'Azur.",
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
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <OffersSection />
      <ContactSection />
      <FAQSection />
      <TrustBar />
      <Footer />
    </>
  );
}
