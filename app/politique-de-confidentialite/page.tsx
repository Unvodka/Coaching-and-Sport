import { BASE_URL } from "@/lib/config";
import { Metadata } from "next";
import PrivacyContent from "@/components/legal/PrivacyContent";


export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description:
    "Politique de confidentialité et protection des données personnelles du site Coach-Bluewave — Conformité RGPD.",
  alternates: {
    canonical: `${BASE_URL}/politique-de-confidentialite`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <PrivacyContent />
      </div>
    </main>
  );
}
