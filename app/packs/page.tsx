import { Metadata } from "next";
import PacksPageContent from "./PacksPageContent";

const BASE_URL = "https://coach-bluewave.com";

export const metadata: Metadata = {
  title: "Packs & Tarifs Cours Particuliers — Natation, Fitness, Musculation",
  description:
    "Réservez vos packs de séances particulières avec Arnaud Chevallier, maître-nageur et coach sportif à Valbonne. Tarifs dégressifs de 1 à 20 séances. Natation, fitness, musculation. Paiement sécurisé Stripe.",
  keywords: [
    "pack cours particuliers",
    "tarif coach sportif",
    "tarif maître-nageur",
    "prix cours natation Valbonne",
    "cours particuliers fitness",
    "pack séances sport",
  ],
  alternates: {
    canonical: `${BASE_URL}/packs`,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${BASE_URL}/packs`,
    siteName: "Coach-Bluewave",
    title: "Packs & Tarifs Cours Particuliers | Coach-Bluewave",
    description:
      "Packs de séances particulières avec coach sportif et maître-nageur diplômé à Valbonne. Tarifs dégressifs, paiement sécurisé.",
    images: [
      {
        url: "/images/hero-valbonne.jpg",
        width: 1200,
        height: 630,
        alt: "Coach-Bluewave - Packs & Tarifs",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PacksPage() {
  return <PacksPageContent />;
}
