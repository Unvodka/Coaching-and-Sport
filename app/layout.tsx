import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { AuthProvider } from "@/lib/supabase/AuthContext";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const BASE_URL = "https://coach-bluewave.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Coach-Bluewave | Arnaud Chevallier - Coach Sportif & Maître-Nageur",
    template: "%s | Coach-Bluewave",
  },
  description:
    "Coach-Bluewave par Arnaud Chevallier — coach sportif et maître-nageur diplômé d'État à Valbonne. Cours de natation (swimming lessons), fitness en plein air, musculation, HIIT et nutrition personnalisée. Personal trainer en personne (Côte d'Azur) et en ligne partout en France. Première séance découverte à 45€.",
  keywords: [
    // Brand
    "Coach-Bluewave",
    "coach bluewave",
    "Arnaud Chevallier coach",
    // Maître-nageur (FR)
    "maître-nageur",
    "maitre nageur",
    "maître-nageur diplômé",
    "maître-nageur diplômé d'État",
    "maître-nageur Côte d'Azur",
    "maître-nageur Valbonne",
    "cours de natation maître-nageur",
    // Natation (FR)
    "natation",
    "cours de natation",
    "cours de natation adulte",
    "cours de natation Valbonne",
    "cours de natation Sophia Antipolis",
    "apprendre à nager adulte",
    "leçon de natation",
    "professeur de natation",
    // Swimming (EN)
    "swimming teacher",
    "swimming teacher French Riviera",
    "swimming lessons",
    "swimming coach",
    "learn to swim adult",
    "private swimming lessons",
    // Coach sportif (FR)
    "coach sportif",
    "coach sportif Valbonne",
    "coach sportif Côte d'Azur",
    "coach sportif en ligne",
    "coaching sportif",
    "coaching sportif en ligne",
    "coaching sportif personnalisé",
    "coach personnel",
    // Personal trainer (EN)
    "personal trainer",
    "personal trainer French Riviera",
    "online personal trainer France",
    "fitness coach",
    "sports coach",
    // Fitness (FR + EN)
    "fitness",
    "fitness plein air",
    "fitness Valbonne",
    "fitness Côte d'Azur",
    "outdoor fitness",
    "musculation",
    "HIIT",
    "circuit training",
    "renforcement musculaire",
    "entraînement fonctionnel",
    // Weight loss / Perte de poids
    "perte de poids",
    "perte de poids coach",
    "perdre du poids",
    "maigrir avec coach sportif",
    "weight loss coach",
    // Nutrition (FR + EN)
    "nutrition sportive",
    "nutrition personnalisée",
    "coaching nutritionnel",
    "nutritional coaching",
    "meal plan",
    "plan alimentaire",
    // Remise en forme
    "remise en forme",
    "sport après 40 ans",
    "reprendre le sport",
    "body transformation",
  ],
  authors: [{ name: "Arnaud Chevallier", url: BASE_URL }],
  creator: "Coach-Bluewave",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    url: BASE_URL,
    siteName: "Coach-Bluewave",
    title: "Coach-Bluewave | Arnaud Chevallier - Coach Sportif & Maître-Nageur",
    description:
      "Coach-Bluewave par Arnaud Chevallier, maître-nageur diplômé d'État — coaching sportif, cours de natation, fitness, musculation, HIIT et nutrition personnalisée à Valbonne. Personal trainer en personne (Côte d'Azur) et en ligne.",
    images: [
      {
        url: "/images/hero-valbonne.jpg",
        width: 1200,
        height: 630,
        alt: "Coach-Bluewave - Coaching sportif par Arnaud Chevallier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coach-Bluewave | Arnaud Chevallier - Coach Sportif & Maître-Nageur",
    description:
      "Coach-Bluewave — maître-nageur et coach sportif à Valbonne. Natation, fitness, musculation, HIIT et nutrition personnalisée par Arnaud Chevallier. Personal trainer Côte d'Azur.",
    images: ["/images/hero-valbonne.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-verification-code",
  },
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${BASE_URL}/#business`,
  name: "Coach-Bluewave | Arnaud Chevallier",
  description:
    "Coach-Bluewave par Arnaud Chevallier — coach sportif (personal trainer) et maître-nageur diplômé d'État à Valbonne. Cours de natation (swimming lessons), fitness, musculation, HIIT, circuit training et nutrition personnalisée. Coaching en personne sur la Côte d'Azur (French Riviera) et en ligne partout en France. Spécialisé en perte de poids et remise en forme.",
  url: BASE_URL,
  image: `${BASE_URL}/images/hero-valbonne.jpg`,
  areaServed: [
    {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 43.6418,
        longitude: 7.0085,
      },
      geoRadius: "30000",
    },
    {
      "@type": "Country",
      name: "France",
    },
  ],
  serviceType: [
    "Coaching sportif",
    "Coach sportif",
    "Personal trainer",
    "Cours de natation",
    "Swimming lessons",
    "Swimming teacher",
    "Maître-nageur",
    "Fitness",
    "Fitness en plein air",
    "Outdoor fitness",
    "Musculation",
    "HIIT",
    "Circuit training",
    "Coaching nutritionnel",
    "Nutritional coaching",
    "Coaching en ligne",
    "Online coaching",
    "Perte de poids",
    "Remise en forme",
  ],
  priceRange: "€€",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services de coaching sportif",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cours de Natation",
          description:
            "Cours de natation adaptés à tous les niveaux avec maître-nageur diplômé. Séances individuelles ou en petit groupe.",
          provider: { "@id": `${BASE_URL}/#person` },
          areaServed: "Côte d'Azur",
          availableChannel: {
            "@type": "ServiceChannel",
            serviceType: "En personne",
          },
        },
        price: "45",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "45",
          priceCurrency: "EUR",
          unitText: "séance",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Fitness & Plein Air",
          description:
            "Entraînements personnalisés en extérieur : musculation, HIIT, circuit training et exercices fonctionnels.",
          provider: { "@id": `${BASE_URL}/#person` },
          areaServed: "Côte d'Azur",
          availableChannel: {
            "@type": "ServiceChannel",
            serviceType: "En personne",
          },
        },
        price: "45",
        priceCurrency: "EUR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Nutrition Équilibrée",
          description:
            "Conseils nutritionnels personnalisés pour une alimentation variée et équilibrée. Plan alimentaire sur mesure.",
          provider: { "@id": `${BASE_URL}/#person` },
          availableChannel: [
            {
              "@type": "ServiceChannel",
              serviceType: "En personne",
            },
            {
              "@type": "ServiceChannel",
              serviceType: "En ligne",
              serviceUrl: BASE_URL,
            },
          ],
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Coaching en Ligne",
          description:
            "Programme d'entraînement et nutrition personnalisé à distance avec suivi quotidien. Accessible partout en France.",
          provider: { "@id": `${BASE_URL}/#person` },
          areaServed: { "@type": "Country", name: "France" },
          availableChannel: {
            "@type": "ServiceChannel",
            serviceType: "En ligne",
            serviceUrl: BASE_URL,
          },
        },
        price: "79",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "79",
          priceCurrency: "EUR",
          unitText: "mois",
        },
      },
    ],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${BASE_URL}/#person`,
  name: "Arnaud Chevallier",
  jobTitle: "Coach Sportif & Maître-Nageur",
  description:
    "Fondateur de Coach-Bluewave. Maître-nageur diplômé d'État (certified swimming teacher) et coach sportif (personal trainer) à Valbonne. Cours de natation, fitness, musculation, HIIT et nutrition personnalisée. Coaching en personne sur la Côte d'Azur (French Riviera) et en ligne partout en France. Spécialisé en perte de poids et remise en forme.",
  url: BASE_URL,
  image: `${BASE_URL}/images/hero-valbonne.jpg`,
  knowsAbout: [
    "Natation",
    "Swimming",
    "Swimming teaching",
    "Maître-nageur",
    "Lifeguard",
    "Fitness",
    "Outdoor fitness",
    "Musculation",
    "Weight training",
    "HIIT",
    "Circuit training",
    "Functional training",
    "Nutrition sportive",
    "Sports nutrition",
    "Coaching sportif",
    "Personal training",
    "Perte de poids",
    "Weight loss",
    "Remise en forme",
    "Body transformation",
    "Coaching en ligne",
    "Online coaching",
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "Brevet d'État Maître-Nageur Sauveteur",
  },
  makesOffer: {
    "@id": `${BASE_URL}/#business`,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Coach-Bluewave",
  url: BASE_URL,
  description:
    "Coach-Bluewave — site officiel d'Arnaud Chevallier, maître-nageur diplômé d'État (swimming teacher) et coach sportif (personal trainer) à Valbonne. Cours de natation, fitness, musculation et coaching en personne (Côte d'Azur) et en ligne.",
  inLanguage: ["fr", "en"],
  publisher: {
    "@id": `${BASE_URL}/#person`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <JsonLd data={professionalServiceJsonLd} />
        <JsonLd data={personJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body
        className={`${inter.className} ${playfair.variable} ${cormorant.variable} leading-[1.7] text-gray-800 overflow-x-hidden bg-white`}
      >
        <LanguageProvider>
          <AuthProvider>{children}</AuthProvider>
        </LanguageProvider>

        {/* Google Analytics 4 — REMPLACE G-GEJXN9BH9R par ton vrai ID GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GEJXN9BH9R"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GEJXN9BH9R');
          `}
        </Script>
      </body>
    </html>
  );
}
