import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import Script from 'next/script';
import { Inter, Playfair_Display } from 'next/font/google';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { AuthProvider } from '@/lib/supabase/AuthContext';
import { BASE_URL } from '@/lib/config';
import JsonLd from '@/components/JsonLd';
import CookieConsent from '@/components/CookieConsent';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default:
      'Coach-Bluewave | Arnaud Chevallier - Coach Sportif & Maître-Nageur',
    template: '%s | Coach-Bluewave',
  },
  description:
    "Coach-Bluewave par Arnaud Chevallier — coach sportif et maître-nageur diplômé d'État à Valbonne. Cours de natation (swimming lessons), fitness en plein air, musculation, HIIT et nutrition personnalisée. Personal trainer en personne (Côte d'Azur) et en ligne partout en France. Première séance découverte à 45€.",
  keywords: [
    'Coach-Bluewave',
    'coach sportif Valbonne',
    'maître-nageur',
    'cours de natation',
    'personal trainer French Riviera',
    'swimming lessons Côte d\'Azur',
    'fitness coaching',
    'coaching sportif en ligne',
    'perte de poids coach',
    'Arnaud Chevallier',
  ],
  authors: [{ name: 'Arnaud Chevallier', url: BASE_URL }],
  creator: 'Coach-Bluewave',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: 'en_US',
    url: BASE_URL,
    siteName: 'Coach-Bluewave',
    title: 'Coach-Bluewave | Arnaud Chevallier - Coach Sportif & Maître-Nageur',
    description:
      "Coach-Bluewave par Arnaud Chevallier, maître-nageur diplômé d'État — coaching sportif, cours de natation, fitness, musculation, HIIT et nutrition personnalisée à Valbonne. Personal trainer en personne (Côte d'Azur) et en ligne.",
    images: [
      {
        url: '/images/hero-valbonne.jpg',
        width: 1200,
        height: 630,
        alt: 'Coach-Bluewave - Coaching sportif par Arnaud Chevallier',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coach-Bluewave | Arnaud Chevallier - Coach Sportif & Maître-Nageur',
    description:
      "Coach-Bluewave — maître-nageur et coach sportif à Valbonne. Natation, fitness, musculation, HIIT et nutrition personnalisée par Arnaud Chevallier. Personal trainer Côte d'Azur.",
    images: ['/images/hero-valbonne.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    //Add your Google Search Console verification code here
    google:
      'google-site-verification=Hx8-0QhFjTq0QhogEO4_wDLhpu8YRa70zM0y6MXDYB8',
  },
};

const professionalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${BASE_URL}/#business`,
  name: 'Coach-Bluewave | Arnaud Chevallier',
  description:
    "Coach-Bluewave par Arnaud Chevallier — coach sportif (personal trainer) et maître-nageur diplômé d'État à Valbonne. Cours de natation (swimming lessons), fitness, musculation, HIIT, circuit training et nutrition personnalisée. Coaching en personne sur la Côte d'Azur (French Riviera) et en ligne partout en France. Spécialisé en perte de poids et remise en forme.",
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo-bluewave.png`,
  image: `${BASE_URL}/images/hero-valbonne.jpg`,
  areaServed: [
    {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 43.6418,
        longitude: 7.0085,
      },
      geoRadius: '30000',
    },
    {
      '@type': 'Country',
      name: 'France',
    },
  ],
  serviceType: [
    'Coaching sportif',
    'Coach sportif',
    'Personal trainer',
    'Cours de natation',
    'Swimming lessons',
    'Swimming teacher',
    'Maître-nageur',
    'Fitness',
    'Fitness en plein air',
    'Outdoor fitness',
    'Musculation',
    'HIIT',
    'Circuit training',
    'Coaching nutritionnel',
    'Nutritional coaching',
    'Coaching en ligne',
    'Online coaching',
    'Perte de poids',
    'Remise en forme',
  ],
  priceRange: '€€',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services de coaching sportif',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Cours de Natation',
          description:
            'Cours de natation adaptés à tous les niveaux avec maître-nageur diplômé. Séances individuelles ou en petit groupe.',
          provider: { '@id': `${BASE_URL}/#person` },
          areaServed: "Côte d'Azur",
          availableChannel: {
            '@type': 'ServiceChannel',
            serviceType: 'En personne',
          },
        },
        price: '45',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '45',
          priceCurrency: 'EUR',
          unitText: 'séance',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Fitness & Plein Air',
          description:
            'Entraînements personnalisés en extérieur : musculation, HIIT, circuit training et exercices fonctionnels.',
          provider: { '@id': `${BASE_URL}/#person` },
          areaServed: "Côte d'Azur",
          availableChannel: {
            '@type': 'ServiceChannel',
            serviceType: 'En personne',
          },
        },
        price: '45',
        priceCurrency: 'EUR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Nutrition Équilibrée',
          description:
            'Conseils nutritionnels personnalisés pour une alimentation variée et équilibrée. Plan alimentaire sur mesure.',
          provider: { '@id': `${BASE_URL}/#person` },
          availableChannel: [
            {
              '@type': 'ServiceChannel',
              serviceType: 'En personne',
            },
            {
              '@type': 'ServiceChannel',
              serviceType: 'En ligne',
              serviceUrl: BASE_URL,
            },
          ],
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Coaching en Ligne',
          description:
            "Programme d'entraînement et nutrition personnalisé à distance avec suivi quotidien. Accessible partout en France.",
          provider: { '@id': `${BASE_URL}/#person` },
          areaServed: { '@type': 'Country', name: 'France' },
          availableChannel: {
            '@type': 'ServiceChannel',
            serviceType: 'En ligne',
            serviceUrl: BASE_URL,
          },
        },
        price: '79',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '79',
          priceCurrency: 'EUR',
          unitText: 'mois',
        },
      },
    ],
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${BASE_URL}/#person`,
  name: 'Arnaud Chevallier',
  jobTitle: 'Coach Sportif & Maître-Nageur',
  description:
    "Fondateur de Coach-Bluewave. Maître-nageur diplômé d'État (certified swimming teacher) et coach sportif (personal trainer) à Valbonne. Cours de natation, fitness, musculation, HIIT et nutrition personnalisée. Coaching en personne sur la Côte d'Azur (French Riviera) et en ligne partout en France. Spécialisé en perte de poids et remise en forme.",
  url: BASE_URL,
  image: `${BASE_URL}/images/hero-valbonne.jpg`,
  knowsAbout: [
    'Natation',
    'Swimming',
    'Swimming teaching',
    'Maître-nageur',
    'Lifeguard',
    'Fitness',
    'Outdoor fitness',
    'Musculation',
    'Weight training',
    'HIIT',
    'Circuit training',
    'Functional training',
    'Nutrition sportive',
    'Sports nutrition',
    'Coaching sportif',
    'Personal training',
    'Perte de poids',
    'Weight loss',
    'Remise en forme',
    'Body transformation',
    'Coaching en ligne',
    'Online coaching',
  ],
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    name: "Brevet d'État Maître-Nageur Sauveteur",
  },
  makesOffer: {
    '@id': `${BASE_URL}/#business`,
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  name: 'Coach-Bluewave',
  url: BASE_URL,
  description:
    "Coach-Bluewave — site officiel d'Arnaud Chevallier, maître-nageur diplômé d'État (swimming teacher) et coach sportif (personal trainer) à Valbonne. Cours de natation, fitness, musculation et coaching en personne (Côte d'Azur) et en ligne.",
  inLanguage: ['fr', 'en'],
  publisher: {
    '@id': `${BASE_URL}/#person`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = headers().get('x-nonce') ?? '';

  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        {/* Favicons & App Icons — light mode (navy logo) */}
        <link rel="icon" href="/favicon.ico?v=2" sizes="48x48" media="(prefers-color-scheme: light)" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" media="(prefers-color-scheme: light)" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2" media="(prefers-color-scheme: light)" />
        {/* Favicons — dark mode (light blue logo) */}
        <link rel="icon" href="/favicon-dark.ico?v=3" sizes="48x48" media="(prefers-color-scheme: dark)" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32-dark.png?v=3" media="(prefers-color-scheme: dark)" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16-dark.png?v=3" media="(prefers-color-scheme: dark)" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=9" />
        <link rel="manifest" href="/site.webmanifest?v=3" />
        <meta name="theme-color" content="#2563eb" />

        {/* Hreflang for bilingual SEO */}
        {/* Single-URL bilingual site: only x-default + fr. No separate /en/ URL exists. */}
        <link rel="alternate" hrefLang="fr" href={`${BASE_URL}`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}`} />

        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <JsonLd data={professionalServiceJsonLd} />
        <JsonLd data={personJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body
        className={`${inter.className} ${playfair.variable} leading-[1.7] text-gray-800 overflow-x-hidden bg-white`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-brand-blue focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
        >
          Aller au contenu principal
        </a>
        <LanguageProvider>
          <AuthProvider>{children}</AuthProvider>
          <CookieConsent />
        </LanguageProvider>

        {/* Google Analytics 4 — lazy loaded to avoid blocking render */}
        <Script id="ga-consent-default" strategy="lazyOnload" nonce={nonce}>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
            });
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GEJXN9BH9R"
          strategy="lazyOnload"
          nonce={nonce}
        />
        <Script id="google-analytics" strategy="lazyOnload" nonce={nonce}>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GEJXN9BH9R', { 'anonymize_ip': true });
          `}
        </Script>
      </body>
    </html>
  );
}
