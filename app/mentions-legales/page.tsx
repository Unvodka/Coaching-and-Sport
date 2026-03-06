import { BASE_URL } from "@/lib/config";
import { Metadata } from "next";
import MentionsLegalesContent from "@/components/legal/MentionsLegalesContent";


export const metadata: Metadata = {
  title: "Mentions Légales",
  description:
    "Mentions légales du site Coach-Bluewave — Arnaud Chevallier, coach sportif et maître-nageur diplômé à Valbonne.",
  alternates: {
    canonical: `${BASE_URL}/mentions-legales`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <MentionsLegalesContent />
      </div>
    </main>
  );
}
