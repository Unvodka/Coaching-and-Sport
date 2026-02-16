import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import OffersSection from "@/components/OffersSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import TrustBar from "@/components/TrustBar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <ServicesSection />
      <OffersSection />
      <AboutSection />
      <ContactSection />
      <TrustBar />
      <Footer />
    </>
  );
}
