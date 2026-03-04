import { NavLink, Service, Program, PricingPack, Locale } from './types';

// ─── NAV LINKS ──────────────────────────────────────────────

const NAV_LINKS_FR: NavLink[] = [
  { href: '/#accueil', label: 'Accueil' },
  { href: '/apropos', label: 'À Propos' },
  { href: '/#services', label: 'Services' },
  { href: '/#offres', label: 'Offres & Tarifs' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
];

const NAV_LINKS_EN: NavLink[] = [
  { href: '/#accueil', label: 'Home' },
  { href: '/apropos', label: 'About' },
  { href: '/#services', label: 'Services' },
  { href: '/#offres', label: 'Offers & Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
];

export function getNavLinks(locale: Locale): NavLink[] {
  return locale === 'en' ? NAV_LINKS_EN : NAV_LINKS_FR;
}

// ─── SERVICES ───────────────────────────────────────────────

const SERVICES_FR: Service[] = [
  {
    slug: 'natation',
    imageSrc:
      'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800&q=80',
    imageAlt: 'Natation',
    title: 'Natation',
    description:
      "Cours de natation avec maître-nageur diplômé d'État, adaptés à tous les niveaux. Perfectionnement technique, endurance et perte de poids grâce à une activité complète et douce pour les articulations.",
    detail: {
      heroImageSrc:
        'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=1600&q=80',
      heroImageAlt: 'Cours de natation dans une piscine',
      subtitle: "Maîtrisez l'eau, transformez votre corps",
      longDescription: [
        "La natation est l'un des sports les plus complets qui existe. Elle sollicite l'ensemble des groupes musculaires — bras, jambes, dos, abdominaux — tout en préservant vos articulations. L'eau porte votre poids corporel, réduisant le stress articulaire de 90%, ce qui en fait une activité idéale à tout âge, pour la rééducation comme pour la performance.",
        "Une séance de natation permet de brûler des calories, tout en affinant la silhouette et en améliorant l'endurance et la condition cardiovasculaire. Le contact avec l'eau procure également un effet apaisant immédiat : la natation réduit le cortisol et favorise la production d'endorphines pour un bien-être durable du corps et de l'esprit.",
        "Je vous propose des cours individuels adaptés à votre niveau et à vos objectifs. Que vous souhaitiez apprendre les bases, perfectionner votre technique de nage, ou simplement profiter des bienfaits de l'eau pour votre santé, je vous accompagne à chaque étape.",
        "Chaque séance est structurée pour combiner travail technique, renforcement musculaire aquatique et exercices de cardio dans l'eau, mais également découvrir les sensations de flotaison et de glisse. Vous progresserez à votre rythme dans un environnement bienveillant et motivant.",
      ],
      benefits: [],
      targetAudience: [
        'Débutants souhaitant apprendre à nager en toute confiance',
        'Nageurs intermédiaires voulant perfectionner leur technique',
        "Sportifs en rééducation ou en reprise d'activité physique",
        'Personnes cherchant une activité douce pour perdre du poids',
        'Seniors souhaitant maintenir leur forme et leur mobilité',
      ],
      ctaText: 'Prêt à plonger ? Découvrez nos offres',
      faqs: [
        {
          question: 'À quel âge peut-on commencer les cours de natation ?',
          answer:
            "Les cours de natation sont accessibles dès 4 ans pour l'initiation aquatique. Pour les adultes, il n'y a aucune limite d'âge. J'adapte chaque séance au niveau et à la condition physique de l'élève.",
        },
        {
          question: 'Faut-il savoir nager pour prendre des cours ?',
          answer:
            "Non, absolument pas ! J'accueille les débutants complets et les accompagne pas à pas pour acquérir les bases de la natation en toute sécurité et confiance.",
        },
        {
          question: 'Où se déroulent les cours de natation à Valbonne ?',
          answer:
            'Les cours se déroulent dans des piscines partenaires à Valbonne et ses environs (Sophia Antipolis, Mougins, Antibes). Le lieu exact est défini selon votre localisation pour plus de commodité.',
        },
        {
          question: 'Combien de séances faut-il pour apprendre à nager ?',
          answer:
            'En général, un débutant acquiert les bases en 8 à 12 séances. Pour le perfectionnement technique, comptez 5 à 10 séances supplémentaires selon vos objectifs. Chaque progression est individuelle.',
        },
        {
          question: 'La natation aide-t-elle vraiment à perdre du poids ?',
          answer:
            "Oui, la natation est excellente pour la perte de poids. Une séance intensive brûle jusqu'à 500 calories par heure tout en sollicitant tous les groupes musculaires, sans impact sur les articulations.",
        },
      ],
    },
  },
  {
    slug: 'fitness-plein-air',
    imageSrc:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    imageAlt: 'Fitness & Plein Air',
    title: 'Fitness & Plein Air',
    description:
      'Entraînements personnalisés en salle ou en extérieur : musculation, HIIT, circuit training et exercices fonctionnels pour sculpter votre corps et vous dépasser.',
    detail: {
      heroImageSrc:
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80',
      heroImageAlt: 'Entraînement fitness en plein air ou à domicile',
      subtitle: 'Sculptez votre corps, en plein air ou chez vous',
      longDescription: [
        "Le fitness est bien plus qu'un simple entraînement physique — c'est un véritable mode de vie. Mes séances sont conçues pour vous aider à atteindre vos objectifs, que ce soit la perte de poids, la prise de masse musculaire, la tonification ou l'amélioration de votre condition physique générale.",
        'Développez votre force et votre masse musculaire grâce à des exercices ciblés et progressifs. Le fitness accélère votre métabolisme, vous aidant à brûler des calories même au repos. Chaque programme est entièrement adapté à vos besoins — perte de poids, prise de muscle, tonification, préparation sportive ou remise en forme générale — pour des résultats visibles en quelques semaines.',
        "J'utilise une combinaison de musculation, de circuits training, d'exercices fractionnés, et d'exercices fonctionnels pour maximiser vos résultats. Chaque programme est élaboré sur mesure en fonction de votre morphologie, votre niveau actuel et vos objectifs personnels.",
        "Les séances en extérieur se déroulent dans les plus beaux décors de la région ou à votre domicile. L'air frais oxygène mieux les muscles, la vitamine D naturelle du soleil renforce les os, et le contact avec la nature réduit considérablement le stress. Une combinaison gagnante pour des résultats optimaux et durables.",
      ],
      benefits: [],
      targetAudience: [
        'Débutants souhaitant se mettre au sport avec un encadrement professionnel',
        'Sportifs intermédiaires cherchant à franchir un palier',
        'Personnes en surpoids voulant perdre du gras efficacement',
        "Personnes préférant s'entraîner en plein air plutôt qu'en salle",
        'Toute personne motivée par un changement physique durable',
      ],
      ctaText: 'Prêt à vous transformer ? Découvrez nos offres',
      faqs: [
        {
          question: "Quels types d'entraînement proposez-vous en fitness ?",
          answer:
            'Je propose de la musculation, du HIIT (entraînement par intervalles haute intensité), du circuit training, des exercices fonctionnels et du renforcement musculaire. Chaque programme est adapté à vos objectifs.',
        },
        {
          question:
            'Les séances en plein air se déroulent-elles même en hiver ?',
          answer:
            "Oui, grâce au climat de la Côte d'Azur, les séances en extérieur sont possibles quasiment toute l'année. En cas de mauvais temps, nous basculons sur une séance en salle ou en intérieur.",
        },
        {
          question: 'Je suis débutant(e), le fitness est-il adapté pour moi ?',
          answer:
            'Absolument ! Chaque programme est conçu sur mesure selon votre niveau actuel. Je vous accompagne progressivement pour éviter les blessures et garantir des résultats visibles.',
        },
        {
          question:
            "À quelle fréquence faut-il s'entraîner pour voir des résultats ?",
          answer:
            "Pour des résultats visibles, je recommande 2 à 3 séances par semaine minimum. Les premiers changements apparaissent généralement après 3 à 4 semaines d'entraînement régulier.",
        },
        {
          question: 'Quel équipement faut-il pour les séances en plein air ?',
          answer:
            'Simplement une tenue de sport confortable et des baskets adaptées. Je fournis tout le matériel nécessaire (élastiques, haltères, tapis) pour les séances en extérieur.',
        },
      ],
    },
  },
  {
    slug: 'nutrition-equilibree',
    imageSrc:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
    imageAlt: 'Nutrition Équilibrée et Bien-Être',
    title: 'Nutrition Équilibrée et Bien-Être',
    description:
      'Conseils nutritionnels personnalisés pour une alimentation variée et équilibrée. Apprenez à mieux manger sans frustration pour des résultats durables et un bien-être optimal.',
    detail: {
      heroImageSrc:
        'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1600&q=80',
      heroImageAlt: 'Alimentation saine et équilibrée',
      subtitle: 'Mangez mieux, vivez mieux — sans frustration',
      longDescription: [
        "La nutrition est le pilier fondamental de tout programme de remise en forme. Sans une alimentation adaptée, même le meilleur entraînement ne donnera pas les résultats escomptés. C'est pourquoi je propose un accompagnement nutritionnel personnalisé, complémentaire à vos séances de sport.",
        "Mon approche repose sur un plan alimentaire sur mesure, adapté à vos goûts, votre mode de vie et vos objectifs - un rééquilibrage intelligent. Grâce à un bilan nutritionnel complet, j'identifie vos carences, vos excès et vos habitudes à ajuster pour des changements ciblés et efficaces.",
        "Je vous aide à comprendre vos besoins nutritionnels, à composer des repas savoureux et équilibrés, et à adopter de bonnes habitudes alimentaires qui s'intègrent naturellement à votre quotidien. Des idées de repas simples, rapides et savoureux pour chaque moment de la journée — manger sain n'a jamais été aussi facile.",
        "Fini l'effet yoyo des régimes. Ensemble, nous construisons un plan alimentaire réaliste et agréable qui soutient vos objectifs sportifs tout en respectant vos goûts et votre mode de vie, pour une santé optimale sur le long terme.",
      ],
      benefits: [],
      targetAudience: [
        'Personnes souhaitant perdre du poids de manière saine et durable',
        "Sportifs voulant optimiser leurs performances par l'alimentation",
        'Personnes souffrant de troubles digestifs ou de fatigue chronique',
        'Toute personne cherchant à adopter une alimentation plus équilibrée',
        "Parents souhaitant améliorer l'alimentation de toute la famille",
      ],
      ctaText: 'Prêt à mieux manger ? Découvrez nos offres',
      faqs: [
        {
          question: 'Proposez-vous des régimes stricts ou restrictifs ?',
          answer:
            "Non, mon approche est basée sur le rééquilibrage alimentaire, pas sur les régimes restrictifs. L'objectif est d'adopter des habitudes durables et agréables, sans frustration ni effet yoyo.",
        },
        {
          question: 'Comment se déroule le bilan nutritionnel initial ?',
          answer:
            "Le bilan comprend une analyse de vos habitudes alimentaires actuelles, de votre mode de vie, de vos objectifs et de vos éventuelles intolérances. Il dure environ 45 minutes et permet d'élaborer un plan alimentaire personnalisé.",
        },
        {
          question:
            'Le suivi nutritionnel est-il inclus dans le coaching sportif ?',
          answer:
            'Les conseils nutrition de base sont inclus dans tous mes programmes. Pour un accompagnement nutritionnel approfondi avec plan alimentaire détaillé et recettes, optez pour les formules Coaching en Ligne ou Transformation.',
        },
        {
          question: "Pouvez-vous m'aider avec des intolérances alimentaires ?",
          answer:
            "Oui, je prends en compte toutes les intolérances et allergies alimentaires pour élaborer un plan nutritionnel adapté. J'ai l'habitude de travailler avec des régimes sans gluten, sans lactose ou végétariens.",
        },
        {
          question:
            'En combien de temps peut-on voir des résultats avec un rééquilibrage alimentaire ?',
          answer:
            'Les premiers effets (meilleure énergie, meilleur sommeil) se font sentir dès la première semaine. Pour la perte de poids, comptez 3 à 4 semaines pour observer des résultats significatifs et durables.',
        },
      ],
    },
  },
];

const SERVICES_EN: Service[] = [
  {
    slug: 'natation',
    imageSrc:
      'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800&q=80',
    imageAlt: 'Swimming',
    title: 'Swimming',
    description:
      'Swimming lessons with a certified lifeguard (maître-nageur), adapted to all levels. Technical improvement, endurance and weight loss through a complete activity that is gentle on the joints.',
    detail: {
      heroImageSrc:
        'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=1600&q=80',
      heroImageAlt: 'Swimming lesson in a pool',
      subtitle: 'Master the water, transform your body',
      longDescription: [
        'Swimming is one of the most complete sports in existence. It engages all muscle groups — arms, legs, back, abs — while preserving your joints. Water supports your body weight, reducing joint stress by 90%, making it an ideal activity at any age, for rehabilitation as well as performance.',
        'An intensive swimming session burns up to 500 calories per hour, while toning the body and improving cardiovascular endurance. Contact with water also provides an immediate soothing effect: swimming reduces cortisol and promotes endorphin production for lasting physical and mental well-being.',
        'As a state-certified lifeguard, I offer individual or small group lessons adapted to your level and goals. Whether you want to learn the basics, perfect your crawl or butterfly technique, or simply enjoy the health benefits of water, I support you every step of the way.',
        'Each session is structured to combine technical work, aquatic muscle strengthening and cardio exercises in the water. You will progress at your own pace in a supportive and motivating environment.',
      ],
      benefits: [],
      targetAudience: [
        'Beginners wanting to learn to swim with confidence',
        'Intermediate swimmers looking to perfect their technique',
        'Athletes in rehabilitation or returning to physical activity',
        'People looking for a gentle activity to lose weight',
        'Seniors wanting to maintain their fitness and mobility',
      ],
      ctaText: 'Ready to dive in? Discover our offers',
      faqs: [
        {
          question: 'At what age can you start swimming lessons?',
          answer:
            "Swimming lessons are available from age 4 for water introduction. For adults, there is no age limit. I adapt each session to the student's level and physical condition.",
        },
        {
          question: 'Do I need to know how to swim to take lessons?',
          answer:
            'Not at all! I welcome complete beginners and guide them step by step to learn the basics of swimming safely and confidently.',
        },
        {
          question: 'Where do swimming lessons take place in Valbonne?',
          answer:
            'Lessons take place in partner pools in Valbonne and surroundings (Sophia Antipolis, Mougins, Antibes). The exact location is chosen based on your location for convenience.',
        },
        {
          question: 'How many sessions does it take to learn to swim?',
          answer:
            'Generally, a beginner acquires the basics in 8 to 12 sessions. For technical improvement, count 5 to 10 additional sessions depending on your goals. Each progression is individual.',
        },
        {
          question: 'Does swimming really help with weight loss?',
          answer:
            'Yes, swimming is excellent for weight loss. An intensive session burns up to 500 calories per hour while engaging all muscle groups, without impact on joints.',
        },
      ],
    },
  },
  {
    slug: 'fitness-plein-air',
    imageSrc:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    imageAlt: 'Fitness & Outdoor Training',
    title: 'Fitness & Outdoor Training',
    description:
      'Personalized workouts indoors or outdoors: weight training, HIIT, circuit training and functional exercises to sculpt your body and push your limits.',
    detail: {
      heroImageSrc:
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80',
      heroImageAlt: 'Fitness training indoors and outdoors',
      subtitle: 'Sculpt your body, indoors or outdoors',
      longDescription: [
        "Fitness is much more than just physical training — it's a true lifestyle. My sessions are designed to help you reach your goals, whether it's weight loss, muscle gain, toning or improving your overall fitness.",
        'Build your strength and muscle mass with targeted, progressive exercises. Fitness accelerates your metabolism, helping you burn calories even at rest. Each program is fully adapted to your needs — weight loss, muscle gain, toning, sports preparation or general fitness — for visible results in just a few weeks.',
        'I use a combination of weight training, HIIT, circuit training and functional exercises to maximize your results — in the gym or outdoors, as you prefer. Each program is tailor-made based on your body type, current level and personal goals.',
        'Outdoor sessions take place in the most beautiful green spaces of Valbonne and its surroundings. Fresh air oxygenates muscles better, natural vitamin D from the sun strengthens bones, and contact with nature significantly reduces stress. A winning combination for optimal results.',
      ],
      benefits: [],
      targetAudience: [
        'Beginners wanting to get into sports with professional guidance',
        'Intermediate athletes looking to break through a plateau',
        'Overweight individuals wanting to lose fat effectively',
        'People who prefer training outdoors rather than in a gym',
        'Anyone motivated by lasting physical change',
      ],
      ctaText: 'Ready to transform? Discover our offers',
      faqs: [
        {
          question: 'What types of fitness training do you offer?',
          answer:
            'I offer weight training, HIIT (high-intensity interval training), circuit training, functional exercises and muscle strengthening. Each program is adapted to your goals.',
        },
        {
          question: 'Do outdoor sessions take place even in winter?',
          answer:
            'Yes, thanks to the French Riviera climate, outdoor sessions are possible almost year-round. In case of bad weather, we switch to an indoor session.',
        },
        {
          question: "I'm a beginner, is fitness suitable for me?",
          answer:
            'Absolutely! Each program is custom-designed based on your current level. I guide you progressively to avoid injuries and guarantee visible results.',
        },
        {
          question: 'How often should I train to see results?',
          answer:
            'For visible results, I recommend a minimum of 2 to 3 sessions per week. The first changes usually appear after 3 to 4 weeks of regular training.',
        },
        {
          question: 'What equipment do I need for outdoor sessions?',
          answer:
            'Simply comfortable sportswear and appropriate sneakers. I provide all necessary equipment (resistance bands, dumbbells, mats) for outdoor sessions.',
        },
      ],
    },
  },
  {
    slug: 'nutrition-equilibree',
    imageSrc:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
    imageAlt: 'Balanced Nutrition & Wellness',
    title: 'Balanced Nutrition & Wellness',
    description:
      'Personalized nutritional advice for a varied and balanced diet. Learn to eat better without frustration for lasting results and optimal well-being.',
    detail: {
      heroImageSrc:
        'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1600&q=80',
      heroImageAlt: 'Healthy and balanced food',
      subtitle: 'Eat better, live better — without frustration',
      longDescription: [
        "Nutrition is the fundamental pillar of any fitness program. Without a proper diet, even the best training won't deliver the expected results. That's why I offer personalized nutritional support, complementary to your sports sessions.",
        'My approach is built on a custom meal plan tailored to your tastes, lifestyle and goals — no strict diets, just smart rebalancing. Through a comprehensive nutritional assessment, I identify your deficiencies, excesses and habits to adjust for targeted and effective changes.',
        'I help you understand your nutritional needs, create delicious and balanced meals, and adopt lasting eating habits that naturally fit into your daily life. Simple, quick and delicious meal ideas for every time of day — eating healthy has never been easier.',
        'No more yo-yo dieting. Together, we build a realistic and enjoyable eating plan that supports your sports goals while respecting your tastes and lifestyle, for optimal long-term health.',
      ],
      benefits: [],
      targetAudience: [
        'People wanting to lose weight in a healthy and sustainable way',
        'Athletes wanting to optimize their performance through diet',
        'People suffering from digestive issues or chronic fatigue',
        'Anyone looking to adopt a more balanced diet',
        "Parents wanting to improve the whole family's nutrition",
      ],
      ctaText: 'Ready to eat better? Discover our offers',
      faqs: [
        {
          question: 'Do you offer strict or restrictive diets?',
          answer:
            'No, my approach is based on nutritional rebalancing, not restrictive diets. The goal is to adopt lasting and enjoyable habits, without frustration or yo-yo effects.',
        },
        {
          question: 'How does the initial nutritional assessment work?',
          answer:
            'The assessment includes an analysis of your current eating habits, lifestyle, goals and any intolerances. It lasts approximately 45 minutes and allows me to create a personalized meal plan.',
        },
        {
          question: 'Is nutritional support included in sports coaching?',
          answer:
            'Basic nutrition advice is included in all my programs. For in-depth nutritional support with detailed meal plans and recipes, opt for the Online Coaching or Transformation packages.',
        },
        {
          question: 'Can you help with food intolerances?',
          answer:
            'Yes, I take into account all food intolerances and allergies to develop an adapted nutritional plan. I regularly work with gluten-free, lactose-free or vegetarian diets.',
        },
        {
          question:
            'How long does it take to see results with nutritional rebalancing?',
          answer:
            'The first effects (better energy, better sleep) can be felt within the first week. For weight loss, expect 3 to 4 weeks to see significant and lasting results.',
        },
      ],
    },
  },
];

export function getServices(locale: Locale): Service[] {
  return locale === 'en' ? SERVICES_EN : SERVICES_FR;
}

export const SERVICES = SERVICES_FR;

export function getServiceBySlug(
  slug: string,
  locale: Locale = 'fr',
): Service | undefined {
  const services = locale === 'en' ? SERVICES_EN : SERVICES_FR;
  return services.find((s) => s.slug === slug);
}

// ─── PROGRAMS ───────────────────────────────────────────────

const PROGRAMS_FR: Program[] = [
  {
    imageSrc:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
    title: 'Cours Particuliers',
    description:
      'Un accompagnement 100% personnalisé pour atteindre vos objectifs rapidement avec un suivi individuel de qualité.',
    features: [
      "Séances individuelles d'une heure",
      'Programme entièrement sur mesure',
      'Horaires ultra-flexibles',
      'Corrections techniques en temps réel',
      'Suivi nutritionnel personnalisé',
    ],
    goals: [
      'Apprendre les bases ou perfectionner votre technique',
      'Progresser à votre rythme avec un encadrement dédié',
      'Obtenir des résultats rapides et visibles',
      'Aisance aquatique / Aquaphobie',
    ],
    price: '60€',
    priceDetails: 'par séance',
    ctaText: 'Voir les packs',
    ctaHref: '/packs',
    featuredBadge: "🏠 50% CRÉDIT D'IMPÔT",
  },
  {
    imageSrc:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    title: 'Coaching en Ligne',
    description:
      'Un programme complet à distance avec suivi quotidien pour progresser où que vous soyez, à votre rythme.',
    features: [
      "Programme d'entraînement personnalisé",
      'Plan alimentaire adapté à vos objectifs',
      'Ajustements hebdomadaires selon résultats',
      'Support illimité par message (24h)',
    ],
    goals: [
      'Perdre du poids durablement',
      'Améliorer votre condition physique générale',
      'Adopter un mode de vie plus sain',
    ],
    price: '79€/mois',
    priceNumeric: 79,
    priceUnit: '/mois',
    priceDetails: 'Engagement de 3 mois minimum',
    ctaText: 'Commencer maintenant',
    isFeatured: true,
    featuredBadge: '⭐ POPULAIRE',
  },
  {
    imageSrc:
      'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80',
    title: 'Advanced Training',
    description:
      'La formule premium combinant coaching en ligne ET séances en personne pour repousser vos limites.',
    features: [
      '4 séances individuelles par mois',
      "Programme d'entraînement personnalisé",
      'Plan nutritionnel détaillé avec recettes',
      'Support prioritaire 7j/7',
      'Analyses corporelles régulières',
    ],
    goals: [
      'Amélioration des performances',
      'Développer force, endurance et puissance',
      'Atteindre un niveau sportif avancé',
    ],
    price: '149€/mois',
    priceNumeric: 149,
    priceUnit: '/mois',
    priceDetails: 'Engagement de 3 mois minimum',
    ctaText: 'Passer au niveau supérieur',
  },
  {
    imageSrc:
      'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=800&q=80',
    title: 'Transformation',
    description:
      'Le programme ultime pour une transformation physique complète. Corps, nutrition et mental — tout est inclus.',
    features: [
      '8 séances individuelles par mois',
      "Programme d'entraînement complet",
      'Plan nutritionnel complet avec recettes',
      'Support prioritaire 7j/7',
      'Analyses corporelles régulières',
    ],
    goals: [
      'Transformation physique complète',
      'Perte de poids significative et durable',
      'Changement radical de mode de vie',
      'Gagner en confiance et en énergie',
    ],
    price: '499€',
    priceNumeric: 499,
    priceUnit: '',
    priceDetails: 'Programme de 3 mois',
    ctaText: 'Transformer mon corps',
  },
];

const PROGRAMS_EN: Program[] = [
  {
    imageSrc:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
    title: 'Private Lessons',
    description:
      '100% personalized coaching to reach your goals quickly with quality individual follow-up.',
    features: [
      '1-hour individual sessions',
      'Fully customized program',
      'Ultra-flexible schedule',
      'Real-time technical corrections',
      'Personalized nutritional follow-up',
    ],
    goals: [
      'Learn the basics or perfect your technique',
      'Progress at your own pace with dedicated guidance',
      'Achieve quick and visible results',
      'Water confidence / Aquaphobia',
    ],
    price: '60€',
    priceDetails: 'per session',
    ctaText: 'See packs',
    ctaHref: '/packs',
    featuredBadge: '🏠 50% TAX CREDIT',
  },
  {
    imageSrc:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    title: 'Online Coaching',
    description:
      'A complete remote program with daily follow-up to progress wherever you are, at your own pace.',
    features: [
      'Weekly personalized training program',
      'Meal plan tailored to your goals',
      'Weekly adjustments based on results',
      'Unlimited messaging support (24h)',
    ],
    goals: [
      'Lose weight sustainably',
      'Improve your overall fitness',
      'Adopt a healthier lifestyle',
    ],
    price: '79€/month',
    priceNumeric: 79,
    priceUnit: '/month',
    priceDetails: '3-month minimum commitment',
    ctaText: 'Start now',
    isFeatured: true,
    featuredBadge: '⭐ POPULAR',
  },
  {
    imageSrc:
      'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80',
    title: 'Advanced Training',
    description:
      'The premium formula combining online coaching AND in-person sessions to push your limits.',
    features: [
      '4 private sessions per month',
      'Complete daily training program',
      'Detailed nutrition plan with recipes',
      'Priority support 7 days/week',
      'Regular body analysis',
      'Performance improvement',
    ],
    goals: [
      'Break through your performance plateau',
      'Build strength, endurance and power',
      'Reach an advanced athletic level',
    ],
    price: '149€/month',
    priceNumeric: 149,
    priceUnit: '/month',
    priceDetails: '3-month minimum commitment',
    ctaText: 'Level up',
  },
  {
    imageSrc:
      'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=800&q=80',
    title: 'Transformation',
    description:
      'The ultimate program for a complete physical transformation. Body, nutrition and mindset — everything is included.',
    features: [
      '8 private sessions per month',
      'Daily personalized training program',
      'Complete nutrition plan with recipes',
      'Priority support 7 days/week',
      'Bi-monthly body analysis',
    ],
    goals: [
      'Complete physical transformation',
      'Significant and lasting weight loss',
      'Radical lifestyle change',
      'Gain confidence and energy',
    ],
    price: '499€',
    priceNumeric: 499,
    priceUnit: '',
    priceDetails: '3-month program',
    ctaText: 'Transform my body',
  },
];

export function getPrograms(locale: Locale): Program[] {
  return locale === 'en' ? PROGRAMS_EN : PROGRAMS_FR;
}

// ─── PRICING PACKS ──────────────────────────────────────────

const PRICING_PACKS_FR: PricingPack[] = [
  {
    title: 'Séance Découverte',
    price: '60€',
    priceNumeric: 60,
    duration: '1 séance / 1 heure',
    features: [
      'Évaluation personnalisée',
      'Définition des objectifs',
      "Plan d'action sur mesure",
      'Conseils nutrition de base',
    ],
  },
  {
    title: 'Pack 5 Séances',
    price: '249€',
    priceNumeric: 249,
    duration: '5 séances / Validité 2 mois',
    features: [
      "5 séances d'1 heure",
      'Programme personnalisé complet',
      'Suivi nutritionnel détaillé',
      'Support par message',
      'Économie de 51€',
    ],
  },
  {
    title: 'Pack 10 Séances',
    price: '499€',
    priceNumeric: 499,
    duration: '10 séances / Validité 6 mois',
    features: [
      "10 séances d'1 heure",
      'Programme évolutif complet',
      'Suivi nutrition approfondi',
      'Support illimité par message',
      'Bilan mensuel détaillé',
      'Économie de 101€',
    ],
  },
  {
    title: 'Pack 20 Séances',
    price: '849€',
    priceNumeric: 849,
    duration: '20 séances / Validité 12 mois',
    features: [
      "20 séances d'1 heure",
      'Programme transformation complète',
      'Suivi nutrition et analyses corporelles',
      'Support prioritaire 7j/7',
      'Bilan bi-mensuel détaillé',
      'Économie de 351€ !',
    ],
  },
];

const PRICING_PACKS_EN: PricingPack[] = [
  {
    title: 'Discovery Session',
    price: '60€',
    priceNumeric: 60,
    duration: '1 session / 1 hour',
    features: [
      'Personalized assessment',
      'Goal setting',
      'Custom action plan',
      'Basic nutrition advice',
    ],
  },
  {
    title: '5-Session Pack',
    price: '249€',
    priceNumeric: 249,
    duration: '5 sessions / Valid 2 months',
    features: [
      '5 one-hour sessions',
      'Complete personalized program',
      'Detailed nutritional follow-up',
      'Messaging support',
      'Save 51€',
    ],
  },
  {
    title: '10-Session Pack',
    price: '499€',
    priceNumeric: 499,
    duration: '10 sessions / Valid 6 months',
    features: [
      '10 one-hour sessions',
      'Complete progressive program',
      'In-depth nutrition follow-up',
      'Unlimited messaging support',
      'Detailed monthly review',
      'Save 101€',
    ],
  },
  {
    title: '20-Session Pack',
    price: '849€',
    priceNumeric: 849,
    duration: '20 sessions / Valid 12 months',
    features: [
      '20 one-hour sessions',
      'Complete transformation program',
      'Nutrition follow-up and body analysis',
      'Priority support 7 days/week',
      'Detailed bi-monthly review',
      'Save 351€!',
    ],
  },
];

export function getPricingPacks(locale: Locale): PricingPack[] {
  return locale === 'en' ? PRICING_PACKS_EN : PRICING_PACKS_FR;
}
