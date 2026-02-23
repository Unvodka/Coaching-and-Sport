import { Metadata } from "next";
import AboutPageContent from "@/components/AboutPageContent";
import JsonLd from "@/components/JsonLd";

const BASE_URL = "https://coach-bluewave.com";

export const metadata: Metadata = {
  title: "À Propos - Arnaud Chevallier, Coach Sportif & Maître-Nageur",
  description:
    "Découvrez le parcours d'Arnaud Chevallier, maître-nageur diplômé et coach sportif certifié à Valbonne. Spécialisé en perte de poids, remise en forme, natation et coaching personnalisé sur la Côte d'Azur.",
  keywords: [
    "coach sportif Valbonne",
    "maître-nageur diplômé",
    "Arnaud Chevallier",
    "coach sportif Côte d'Azur",
    "perte de poids",
    "remise en forme",
    "coaching personnalisé",
  ],
  alternates: {
    canonical: `${BASE_URL}/apropos`,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${BASE_URL}/apropos`,
    siteName: "Coach-Bluewave",
    title: "À Propos - Arnaud Chevallier, Coach Sportif & Maître-Nageur",
    description:
      "Maître-nageur diplômé et coach sportif certifié à Valbonne. Spécialisé en perte de poids et remise en forme.",
    images: [
      {
        url: "/images/hero-valbonne.jpg",
        width: 1200,
        height: 630,
        alt: "Coach-Bluewave - Arnaud Chevallier",
      },
    ],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: BASE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "À Propos",
      item: `${BASE_URL}/apropos`,
    },
  ],
};

export default function AproposPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <AboutPageContent />
    </>
  );
}
