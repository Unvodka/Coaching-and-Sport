import { BASE_URL } from "@/lib/config";
import { Metadata } from "next";
import CGVContent from "@/components/legal/CGVContent";


export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description:
    "Conditions générales de vente des prestations de coaching sportif et cours de natation — Coach-Bluewave, Arnaud Chevallier.",
  alternates: {
    canonical: `${BASE_URL}/cgv`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CGVPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <CGVContent />
      </div>
    </main>
  );
}
