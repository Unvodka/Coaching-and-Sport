import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, getServiceBySlug } from "@/lib/constants";
import ServiceDetailContent from "@/components/ServiceDetailContent";
import JsonLd from "@/components/JsonLd";

const BASE_URL = "https://coach-bluewave.com";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

const SERVICE_KEYWORDS: Record<string, string[]> = {
  natation: [
    "cours de natation", "natation", "swimming lessons", "swimming teacher",
    "maître-nageur", "maitre nageur", "maître-nageur diplômé",
    "apprendre à nager", "learn to swim", "professeur de natation",
    "cours de natation adulte", "cours de natation Valbonne",
    "swimming coach", "natation Côte d'Azur", "piscine Valbonne",
  ],
  "fitness-plein-air": [
    "fitness", "fitness plein air", "outdoor fitness", "coach fitness",
    "musculation", "HIIT", "circuit training", "renforcement musculaire",
    "personal trainer", "coach sportif", "entraînement fonctionnel",
    "fitness Valbonne", "fitness Côte d'Azur", "weight training",
    "outdoor personal trainer", "sport en plein air",
  ],
  "nutrition-equilibree": [
    "nutrition sportive", "nutrition personnalisée", "coaching nutritionnel",
    "nutritional coaching", "plan alimentaire", "meal plan",
    "perte de poids", "weight loss", "rééquilibrage alimentaire",
    "coach nutrition", "diet coach", "alimentation équilibrée",
    "nutrition Valbonne", "nutrition coach France",
  ],
};

export function generateMetadata({ params }: Props): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  const pageUrl = `${BASE_URL}/services/${service.slug}`;
  const serviceKeywords = SERVICE_KEYWORDS[params.slug] || [];

  return {
    title: service.title,
    description: service.description,
    keywords: [
      "Coach-Bluewave", "Arnaud Chevallier",
      ...serviceKeywords,
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: pageUrl,
      siteName: "Coach-Bluewave",
      title: `${service.title} - Coach-Bluewave`,
      description: service.description,
      images: [
        {
          url: service.detail.heroImageSrc,
          width: 1200,
          height: 630,
          alt: service.detail.heroImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} - Coach-Bluewave`,
      description: service.description,
      images: [service.detail.heroImageSrc],
    },
  };
}

export default function ServicePage({ params }: Props) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const SERVICE_ALT_NAMES: Record<string, string[]> = {
    natation: ["Swimming Lessons", "Cours de natation", "Swimming coaching", "Leçon de natation"],
    "fitness-plein-air": ["Outdoor Fitness", "Personal Training", "Fitness coaching", "Entraînement en plein air"],
    "nutrition-equilibree": ["Nutritional Coaching", "Diet coaching", "Coaching nutritionnel", "Plan alimentaire personnalisé"],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    alternateName: SERVICE_ALT_NAMES[service.slug] || [],
    description: service.description,
    url: `${BASE_URL}/services/${service.slug}`,
    image: service.detail.heroImageSrc,
    provider: {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Arnaud Chevallier",
      jobTitle: "Maître-Nageur Diplômé & Coach Sportif",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Côte d'Azur" },
      { "@type": "AdministrativeArea", name: "Valbonne" },
      { "@type": "Country", name: "France" },
    ],
    serviceType: service.title,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.detail.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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
        name: "Services",
        item: `${BASE_URL}/#services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${BASE_URL}/services/${service.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <ServiceDetailContent slug={params.slug} />
    </>
  );
}
