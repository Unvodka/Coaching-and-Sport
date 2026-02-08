import { NavLink, Service, Program, PricingPack } from "./types";

export const NAV_LINKS: NavLink[] = [
  { href: "#accueil", label: "Accueil" },
  { href: "#services", label: "Services" },
  { href: "#offres", label: "Offres & Tarifs" },
  { href: "#apropos", label: "À Propos" },
  { href: "#contact", label: "Contact" },
];

export const SERVICES: Service[] = [
  {
    imageSrc:
      "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800&q=80",
    imageAlt: "Natation",
    title: "Natation",
    description:
      "Cours de natation adaptés à tous les niveaux. Perfectionnement technique, endurance et perte de poids grâce à une activité complète et douce pour les articulations.",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    imageAlt: "Fitness",
    title: "Fitness",
    description:
      "Entraînements personnalisés en salle pour renforcer votre musculature, brûler des calories et sculpter votre silhouette avec des exercices adaptés à vos objectifs.",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
    imageAlt: "Activités Extérieures",
    title: "Activités Extérieures",
    description:
      "Sessions en plein air combinant course à pied, circuit training et exercices fonctionnels. Profitez de la nature tout en vous dépassant dans un cadre motivant.",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    imageAlt: "Nutrition Équilibrée",
    title: "Nutrition Équilibrée",
    description:
      "Conseils nutritionnels personnalisés pour une alimentation variée et équilibrée. Apprenez à mieux manger sans frustration pour des résultats durables et un bien-être optimal.",
  },
];

export const PROGRAMS: Program[] = [
  {
    imageSrc:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    title: "Cours Particuliers",
    description:
      "Un accompagnement 100% personnalisé pour atteindre vos objectifs rapidement avec un suivi individuel de qualité.",
    features: [
      "Séances individuelles d'1 heure",
      "Programme entièrement sur mesure",
      "Horaires ultra-flexibles",
      "Corrections techniques en temps réel",
      "Suivi nutritionnel personnalisé",
    ],
    price: "45€",
    priceDetails: "par séance",
    ctaText: "Voir les packs",
    ctaHref: "#pricing-packs",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    title: "Coaching en Ligne",
    description:
      "Un programme complet à distance avec suivi quotidien pour progresser où que vous soyez, à votre rythme.",
    features: [
      "Programme d'entraînement personnalisé hebdomadaire",
      "Plan alimentaire adapté à vos objectifs",
      "Vidéos d'exercices détaillées",
      "Ajustements hebdomadaires selon résultats",
      "Support illimité par message (24h)",
      "Application de suivi mobile",
    ],
    price: "79€",
    priceNumeric: 79,
    priceUnit: "/mois",
    priceDetails: "Engagement 3 mois",
    ctaText: "Commencer maintenant",
    isFeatured: true,
    featuredBadge: "⭐ POPULAIRE",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80",
    title: "Programme Transformation",
    description:
      "La formule premium combinant coaching en ligne ET séances en personne pour des résultats exceptionnels.",
    features: [
      "4 séances particulières par mois",
      "Programme d'entraînement complet quotidien",
      "Plan nutritionnel détaillé avec recettes",
      "Suivi quotidien par application",
      "Support prioritaire 7j/7",
      "Analyses corporelles régulières",
      "Garantie résultats en 3 mois",
    ],
    price: "249€",
    priceNumeric: 249,
    priceUnit: "/mois",
    priceDetails: "Programme 3-6 mois",
    ctaText: "Transformer mon corps",
  },
];

export const PRICING_PACKS: PricingPack[] = [
  {
    title: "Séance Découverte",
    price: "45€",
    priceNumeric: 45,
    duration: "1 séance / 1 heure",
    features: [
      "Évaluation personnalisée",
      "Définition des objectifs",
      "Plan d'action sur mesure",
      "Conseils nutrition de base",
    ],
  },
  {
    title: "Pack 5 Séances",
    price: "200€",
    priceNumeric: 200,
    duration: "5 séances / Validité 2 mois",
    features: [
      "5 séances d'1 heure",
      "Programme personnalisé complet",
      "Suivi nutritionnel détaillé",
      "Support par message",
      "Économie de 25€",
    ],
  },
  {
    title: "Pack 10 Séances",
    price: "380€",
    priceNumeric: 380,
    duration: "10 séances / Validité 3 mois",
    features: [
      "10 séances d'1 heure",
      "Programme évolutif complet",
      "Suivi nutrition approfondi",
      "Support illimité par message",
      "Bilan mensuel détaillé",
      "Économie de 70€",
    ],
  },
  {
    title: "Pack 20 Séances",
    price: "700€",
    priceNumeric: 700,
    duration: "20 séances / Validité 6 mois",
    features: [
      "20 séances d'1 heure",
      "Programme transformation complète",
      "Suivi nutrition et analyses corporelles",
      "Support prioritaire 7j/7",
      "Bilan bi-mensuel détaillé",
      "Économie de 200€ !",
    ],
  },
];
