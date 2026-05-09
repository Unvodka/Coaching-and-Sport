import { BASE_URL } from "@/lib/config";
import { Metadata } from "next";
import AvanceImmediateContent from "@/components/legal/AvanceImmediateContent";

export const metadata: Metadata = {
  title: "Avance Immédiate du Crédit d'Impôt — Coach Bluewave",
  description:
    "Informations sur le dispositif d'Avance Immédiate du crédit d'impôt pour les services à la personne proposé par Coach Bluewave (Urssaf / DGFiP).",
  alternates: {
    canonical: `${BASE_URL}/avance-immediate`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AvanceImmediatePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <AvanceImmediateContent />
      </div>
    </main>
  );
}
