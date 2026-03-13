import { Suspense } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import WelcomeBanner from "@/components/WelcomeBanner";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import OffersSection from "@/components/OffersSection";
import JsonLd from "@/components/JsonLd";
import { FAQ_FR } from "@/lib/faq";
import { BASE_URL } from "@/lib/config";

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

// Use only FR FAQs for the schema — single canonical language per page.
// The page URL is the French homepage (/), so FR is the correct language.
// Each service page has its own separate FAQPage schema — no duplication.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${BASE_URL}/#faq`,
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
      <Suspense fallback={null}><WelcomeBanner /></Suspense>
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
