import { NavLink, Service, Program, PricingPack } from "./types";

export const NAV_LINKS: NavLink[] = [
  { href: "/#accueil", label: "Accueil" },
  { href: "/#services", label: "Services" },
  { href: "/#offres", label: "Offres & Tarifs" },
  { href: "/#apropos", label: "À Propos" },
  { href: "/#contact", label: "Contact" },
];

export const SERVICES: Service[] = [
  {
    slug: "natation",
    imageSrc:
      "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800&q=80",
    imageAlt: "Natation",
    title: "Natation",
    description:
      "Cours de natation adaptés à tous les niveaux. Perfectionnement technique, endurance et perte de poids grâce à une activité complète et douce pour les articulations.",
    detail: {
      heroImageSrc:
        "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=1600&q=80",
      heroImageAlt: "Cours de natation dans une piscine",
      subtitle: "Maîtrisez l'eau, transformez votre corps",
      longDescription: [
        "La natation est l'un des sports les plus complets qui existe. Elle sollicite l'ensemble des groupes musculaires tout en préservant vos articulations, ce qui en fait une activité idéale à tout âge et pour tous les niveaux de forme physique.",
        "En tant que maître-nageur diplômé d'État, je vous propose des cours individuels ou en petit groupe adaptés à votre niveau et à vos objectifs. Que vous souhaitiez apprendre les bases, perfectionner votre technique de crawl ou de papillon, ou simplement profiter des bienfaits de l'eau pour votre santé, je vous accompagne à chaque étape.",
        "Chaque séance est structurée pour combiner travail technique, renforcement musculaire aquatique et exercices de cardio dans l'eau. Vous progresserez à votre rythme dans un environnement bienveillant et motivant.",
      ],
      benefits: [
        {
          icon: "💪",
          title: "Sport complet",
          description:
            "La natation travaille l'ensemble des groupes musculaires : bras, jambes, dos, abdominaux. Un entraînement global sans impact sur les articulations.",
        },
        {
          icon: "🦴",
          title: "Doux pour les articulations",
          description:
            "L'eau porte votre poids corporel, réduisant le stress articulaire de 90%. Idéal pour la rééducation ou les personnes souffrant de douleurs chroniques.",
        },
        {
          icon: "🔥",
          title: "Brûleur de calories",
          description:
            "Une séance de natation intensive permet de brûler jusqu'à 500 calories par heure, tout en affinant la silhouette et en améliorant l'endurance cardiovasculaire.",
        },
        {
          icon: "🧘",
          title: "Anti-stress naturel",
          description:
            "Le contact avec l'eau procure un effet apaisant immédiat. La natation réduit le cortisol et favorise la production d'endorphines pour un bien-être durable.",
        },
      ],
      targetAudience: [
        "Débutants souhaitant apprendre à nager en toute confiance",
        "Nageurs intermédiaires voulant perfectionner leur technique",
        "Sportifs en rééducation ou en reprise d'activité physique",
        "Personnes cherchant une activité douce pour perdre du poids",
        "Seniors souhaitant maintenir leur forme et leur mobilité",
      ],
      ctaText: "Prêt à plonger ? Découvrez nos offres",
    },
  },
  {
    slug: "fitness",
    imageSrc:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    imageAlt: "Fitness",
    title: "Fitness",
    description:
      "Entraînements personnalisés en salle pour renforcer votre musculature, brûler des calories et sculpter votre silhouette avec des exercices adaptés à vos objectifs.",
    detail: {
      heroImageSrc:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80",
      heroImageAlt: "Entraînement fitness en salle de sport",
      subtitle: "Sculptez votre corps, dépassez vos limites",
      longDescription: [
        "Le fitness est bien plus qu'un simple entraînement physique — c'est un véritable mode de vie. Mes séances de fitness sont conçues pour vous aider à atteindre vos objectifs, que ce soit la perte de poids, la prise de masse musculaire, la tonification ou simplement l'amélioration de votre condition physique générale.",
        "Chaque programme est élaboré sur mesure en fonction de votre morphologie, votre niveau actuel et vos objectifs personnels. J'utilise une combinaison de musculation, de HIIT, de circuits training et d'exercices fonctionnels pour maximiser vos résultats.",
        "Lors de nos séances, je vous enseigne les bonnes postures et les techniques correctes pour chaque exercice, afin de prévenir les blessures et d'optimiser chaque mouvement. Vous bénéficiez d'un accompagnement professionnel qui fait toute la différence.",
      ],
      benefits: [
        {
          icon: "🏋️",
          title: "Renforcement musculaire",
          description:
            "Développez votre force et votre masse musculaire grâce à des exercices ciblés et progressifs adaptés à votre niveau.",
        },
        {
          icon: "⚡",
          title: "Boost métabolique",
          description:
            "Le fitness accélère votre métabolisme, vous aidant à brûler des calories même au repos. Résultats visibles en quelques semaines.",
        },
        {
          icon: "🎯",
          title: "Objectifs personnalisés",
          description:
            "Programme entièrement adapté à vos besoins : perte de poids, prise de muscle, tonification, préparation sportive ou remise en forme générale.",
        },
        {
          icon: "📈",
          title: "Progression mesurable",
          description:
            "Suivi régulier de vos performances et de vos mensurations pour visualiser vos progrès et ajuster le programme en continu.",
        },
      ],
      targetAudience: [
        "Débutants souhaitant se mettre au sport avec un encadrement professionnel",
        "Sportifs intermédiaires cherchant à franchir un palier",
        "Personnes en surpoids voulant perdre du gras efficacement",
        "Athlètes souhaitant un programme de préparation physique spécifique",
        "Toute personne motivée par un changement physique durable",
      ],
      ctaText: "Prêt à vous transformer ? Découvrez nos offres",
    },
  },
  {
    slug: "activites-exterieures",
    imageSrc:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
    imageAlt: "Activités Extérieures",
    title: "Activités Extérieures",
    description:
      "Sessions en plein air combinant course à pied, circuit training et exercices fonctionnels. Profitez de la nature tout en vous dépassant dans un cadre motivant.",
    detail: {
      heroImageSrc:
        "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1600&q=80",
      heroImageAlt: "Entraînement en plein air dans la nature",
      subtitle: "La nature comme terrain de jeu, le plein air comme motivation",
      longDescription: [
        "Rien ne vaut un entraînement en plein air pour se sentir vivant et connecté à la nature. Mes séances d'activités extérieures se déroulent dans les plus beaux espaces verts de Valbonne et ses alentours, offrant un cadre incomparable pour se dépenser.",
        "Les sessions combinent course à pied, circuit training, exercices au poids du corps et entraînement fonctionnel. Chaque séance est variée et stimulante, utilisant le terrain naturel comme support : bancs, escaliers, collines, parcours de santé.",
        "L'entraînement en extérieur offre des avantages uniques : l'air frais oxygène mieux les muscles, la vitamine D naturelle du soleil renforce les os, et le contact avec la nature réduit considérablement le stress et l'anxiété.",
      ],
      benefits: [
        {
          icon: "🌳",
          title: "Connexion avec la nature",
          description:
            "S'entraîner en plein air réduit le stress de 40% par rapport à une salle. Le contact avec la nature améliore l'humeur et la motivation.",
        },
        {
          icon: "🏃",
          title: "Entraînement varié",
          description:
            "Course, sprint, exercices au poids du corps, circuit training — chaque séance est unique et stimulante, sans routine ni ennui.",
        },
        {
          icon: "☀️",
          title: "Vitamine D naturelle",
          description:
            "L'exposition au soleil pendant l'effort favorise la synthèse de vitamine D, essentielle pour la santé osseuse et le système immunitaire.",
        },
        {
          icon: "🫁",
          title: "Meilleure oxygénation",
          description:
            "L'air frais améliore l'apport en oxygène aux muscles, augmentant l'endurance et les performances physiques de manière naturelle.",
        },
      ],
      targetAudience: [
        "Personnes qui préfèrent s'entraîner en plein air plutôt qu'en salle",
        "Coureurs souhaitant améliorer leurs performances",
        "Personnes stressées cherchant une activité physique apaisante",
        "Groupes d'amis ou collègues souhaitant s'entraîner ensemble",
        "Toute personne voulant varier ses entraînements et sortir de la routine",
      ],
      ctaText: "Envie de prendre l'air ? Découvrez nos offres",
    },
  },
  {
    slug: "nutrition-equilibree",
    imageSrc:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    imageAlt: "Nutrition Équilibrée",
    title: "Nutrition Équilibrée",
    description:
      "Conseils nutritionnels personnalisés pour une alimentation variée et équilibrée. Apprenez à mieux manger sans frustration pour des résultats durables et un bien-être optimal.",
    detail: {
      heroImageSrc:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1600&q=80",
      heroImageAlt: "Alimentation saine et équilibrée",
      subtitle: "Mangez mieux, vivez mieux — sans frustration",
      longDescription: [
        "La nutrition est le pilier fondamental de tout programme de remise en forme. Sans une alimentation adaptée, même le meilleur entraînement ne donnera pas les résultats escomptés. C'est pourquoi je propose un accompagnement nutritionnel personnalisé, complémentaire à vos séances de sport.",
        "Mon approche se base sur l'équilibre et le plaisir, pas sur les régimes restrictifs. Je vous aide à comprendre vos besoins nutritionnels, à composer des repas savoureux et équilibrés, et à adopter des habitudes alimentaires durables qui s'intègrent naturellement à votre quotidien.",
        "Grâce à un bilan nutritionnel complet, j'identifie vos carences, vos excès et vos habitudes à ajuster. Ensemble, nous construisons un plan alimentaire réaliste et agréable qui soutient vos objectifs sportifs tout en respectant vos goûts et votre mode de vie.",
      ],
      benefits: [
        {
          icon: "🥗",
          title: "Plan alimentaire sur mesure",
          description:
            "Un programme nutritionnel adapté à vos goûts, votre mode de vie et vos objectifs. Pas de régime strict, juste un rééquilibrage intelligent.",
        },
        {
          icon: "📊",
          title: "Bilan nutritionnel complet",
          description:
            "Analyse détaillée de vos habitudes alimentaires, identification des carences et des excès pour des ajustements ciblés et efficaces.",
        },
        {
          icon: "🍳",
          title: "Recettes et idées repas",
          description:
            "Des idées de repas simples, rapides et savoureux pour chaque moment de la journée. Manger sain n'a jamais été aussi facile.",
        },
        {
          icon: "⚖️",
          title: "Résultats durables",
          description:
            "Fini l'effet yoyo des régimes. Mon approche vise des changements progressifs et durables pour une santé optimale sur le long terme.",
        },
      ],
      targetAudience: [
        "Personnes souhaitant perdre du poids de manière saine et durable",
        "Sportifs voulant optimiser leurs performances par l'alimentation",
        "Personnes souffrant de troubles digestifs ou de fatigue chronique",
        "Toute personne cherchant à adopter une alimentation plus équilibrée",
        "Parents souhaitant améliorer l'alimentation de toute la famille",
      ],
      ctaText: "Prêt à mieux manger ? Découvrez nos offres",
    },
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

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
