import dynamic from "next/dynamic";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import OffersSection from "@/components/OffersSection";
import JsonLd from "@/components/JsonLd";
import { FAQ_FR } from "@/lib/faq";

// Below-the-fold — lazy loaded
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
  mainEntity: FAQ_FR.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
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
