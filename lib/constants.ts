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

export const NAV_LINKS = NAV_LINKS_FR;

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
        "La natation est l'un des sports les plus complets qui existe. Elle sollicite l'ensemble des groupes musculaires tout en préservant vos articulations, ce qui en fait une activité idéale à tout âge et pour tous les niveaux de forme physique.",
        "En tant que maître-nageur diplômé d'État, je vous propose des cours individuels ou en petit groupe adaptés à votre niveau et à vos objectifs. Que vous souhaitiez apprendre les bases, perfectionner votre technique de crawl ou de papillon, ou simplement profiter des bienfaits de l'eau pour votre santé, je vous accompagne à chaque étape.",
        "Chaque séance est structurée pour combiner travail technique, renforcement musculaire aquatique et exercices de cardio dans l'eau. Vous progresserez à votre rythme dans un environnement bienveillant et motivant.",
      ],
      benefits: [
        {
          icon: '💪',
          title: 'Sport complet',
          description:
            "La natation travaille l'ensemble des groupes musculaires : bras, jambes, dos, abdominaux. Un entraînement global sans impact sur les articulations.",
        },
        {
          icon: '🦴',
          title: 'Doux pour les articulations',
          description:
            "L'eau porte votre poids corporel, réduisant le stress articulaire de 90%. Idéal pour la rééducation ou les personnes souffrant de douleurs chroniques.",
        },
        {
          icon: '🔥',
          title: 'Brûleur de calories',
          description:
            "Une séance de natation intensive permet de brûler jusqu'à 500 calories par heure, tout en affinant la silhouette et en améliorant l'endurance cardiovasculaire.",
        },
        {
          icon: '🧘',
          title: 'Anti-stress naturel',
          description:
            "Le contact avec l'eau procure un effet apaisant immédiat. La natation réduit le cortisol et favorise la production d'endorphines pour un bien-être durable.",
        },
      ],
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
      heroImageAlt: 'Entraînement fitness en salle et en plein air',
      subtitle: 'Sculptez votre corps, en salle comme en plein air',
      longDescription: [
        "Le fitness est bien plus qu'un simple entraînement physique — c'est un véritable mode de vie. Mes séances sont conçues pour vous aider à atteindre vos objectifs, que ce soit la perte de poids, la prise de masse musculaire, la tonification ou l'amélioration de votre condition physique générale.",
        "Chaque programme est élaboré sur mesure en fonction de votre morphologie, votre niveau actuel et vos objectifs personnels. J'utilise une combinaison de musculation, de HIIT, de circuits training et d'exercices fonctionnels pour maximiser vos résultats — en salle ou en plein air selon vos préférences.",
        "Les séances en extérieur se déroulent dans les plus beaux espaces verts de Valbonne et ses alentours. L'air frais oxygène mieux les muscles, la vitamine D naturelle du soleil renforce les os, et le contact avec la nature réduit considérablement le stress. Une combinaison gagnante pour des résultats optimaux.",
      ],
      benefits: [
        {
          icon: '🏋️',
          title: 'Renforcement musculaire',
          description:
            'Développez votre force et votre masse musculaire grâce à des exercices ciblés et progressifs adaptés à votre niveau, en salle ou en extérieur.',
        },
        {
          icon: '🌳',
          title: 'Entraînement en plein air',
          description:
            'Profitez de la nature comme terrain de jeu : course, sprint, circuit training en extérieur pour un entraînement varié et motivant.',
        },
        {
          icon: '⚡',
          title: 'Boost métabolique',
          description:
            'Le fitness accélère votre métabolisme, vous aidant à brûler des calories même au repos. Résultats visibles en quelques semaines.',
        },
        {
          icon: '🎯',
          title: 'Objectifs personnalisés',
          description:
            'Programme entièrement adapté à vos besoins : perte de poids, prise de muscle, tonification, préparation sportive ou remise en forme générale.',
        },
      ],
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
        "Mon approche se base sur l'équilibre et le plaisir, pas sur les régimes restrictifs. Je vous aide à comprendre vos besoins nutritionnels, à composer des repas savoureux et équilibrés, et à adopter des habitudes alimentaires durables qui s'intègrent naturellement à votre quotidien.",
        "Grâce à un bilan nutritionnel complet, j'identifie vos carences, vos excès et vos habitudes à ajuster. Ensemble, nous construisons un plan alimentaire réaliste et agréable qui soutient vos objectifs sportifs tout en respectant vos goûts et votre mode de vie.",
      ],
      benefits: [
        {
          icon: '🥗',
          title: 'Plan alimentaire sur mesure',
          description:
            'Un programme nutritionnel adapté à vos goûts, votre mode de vie et vos objectifs. Pas de régime strict, juste un rééquilibrage intelligent.',
        },
        {
          icon: '📊',
          title: 'Bilan nutritionnel complet',
          description:
            'Analyse détaillée de vos habitudes alimentaires, identification des carences et des excès pour des ajustements ciblés et efficaces.',
        },
        {
          icon: '🍳',
          title: 'Recettes et idées repas',
          description:
            "Des idées de repas simples, rapides et savoureux pour chaque moment de la journée. Manger sain n'a jamais été aussi facile.",
        },
        {
          icon: '⚖️',
          title: 'Résultats durables',
          description:
            "Fini l'effet yoyo des régimes. Mon approche vise des changements progressifs et durables pour une santé optimale sur le long terme.",
        },
      ],
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
  {
    slug: 'coaching-en-ligne',
    imageSrc:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    imageAlt: 'Coaching sportif en ligne',
    title: 'Coaching en Ligne',
    description:
      'Programme d\'entraînement et nutrition personnalisé à distance avec suivi quotidien. Accessible partout en France pour transformer votre corps depuis chez vous.',
    detail: {
      heroImageSrc:
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80',
      heroImageAlt: 'Coaching sportif en ligne depuis chez soi',
      subtitle: 'Votre coach personnel, où que vous soyez',
      longDescription: [
        "Le coaching en ligne vous permet de bénéficier d'un accompagnement professionnel complet sans contrainte géographique. Que vous soyez à Paris, Lyon, Marseille ou n'importe où en France, je vous accompagne au quotidien pour atteindre vos objectifs sportifs et nutritionnels.",
        "Chaque semaine, vous recevez un programme d'entraînement personnalisé, un plan alimentaire adapté à vos goûts et votre mode de vie, ainsi que des ajustements en fonction de vos résultats. Le suivi est continu : je suis disponible par message pour répondre à vos questions, vous motiver et adapter votre programme en temps réel.",
        "Cette formule est idéale pour les personnes autonomes qui souhaitent s'entraîner à leur rythme tout en bénéficiant de l'expertise d'un coach diplômé. Vous avez accès à un portail client dédié avec journal de bord, suivi de poids et composition corporelle, et recettes saines.",
      ],
      benefits: [
        {
          icon: '📱',
          title: 'Suivi quotidien',
          description:
            'Contact permanent par message pour ajuster votre programme, répondre à vos questions et maintenir votre motivation au plus haut.',
        },
        {
          icon: '🏠',
          title: 'Entraînement flexible',
          description:
            'Programmes adaptés à votre équipement : domicile, salle de sport, ou plein air. Pas besoin de matériel coûteux pour commencer.',
        },
        {
          icon: '🥗',
          title: 'Plan nutritionnel inclus',
          description:
            'Rééquilibrage alimentaire personnalisé avec recettes simples et liste de courses. Adapté à vos préférences et intolérances.',
        },
        {
          icon: '📊',
          title: 'Portail client dédié',
          description:
            'Suivez vos progrès sur votre espace personnel : poids, mensurations, journal de bien-être et bibliothèque de recettes.',
        },
      ],
      targetAudience: [
        'Personnes éloignées géographiquement de la Côte d\'Azur',
        'Professionnels avec des horaires chargés souhaitant un suivi flexible',
        'Personnes autonomes voulant s\'entraîner à leur rythme',
        'Toute personne motivée cherchant un accompagnement professionnel à distance',
        'Débutants souhaitant un cadre structuré pour se lancer',
      ],
      ctaText: 'Commencez votre transformation dès aujourd\'hui',
      faqs: [
        {
          question: 'Comment fonctionne le coaching en ligne concrètement ?',
          answer:
            'Après un bilan initial par visioconférence, je vous envoie chaque semaine votre programme d\'entraînement et votre plan alimentaire. Vous m\'envoyez vos retours quotidiens et je fais les ajustements nécessaires. On échange par message en continu.',
        },
        {
          question: 'Ai-je besoin de matériel spécifique ?',
          answer:
            'Non, je conçois votre programme en fonction de votre équipement disponible. On peut démarrer uniquement au poids du corps, puis évoluer selon vos moyens.',
        },
        {
          question: 'Le coaching en ligne est-il aussi efficace qu\'en présentiel ?',
          answer:
            'Oui, à condition d\'être régulier et impliqué. Le coaching en ligne offre l\'avantage d\'un suivi quotidien continu, ce qui compense largement l\'absence physique du coach.',
        },
        {
          question: 'Quelle est la durée d\'engagement minimum ?',
          answer:
            'L\'engagement minimum est de 3 mois. C\'est le temps nécessaire pour installer de nouvelles habitudes et observer des résultats significatifs et durables.',
        },
        {
          question: 'Les séances de visioconférence sont-elles incluses ?',
          answer:
            'Oui, un appel visio est prévu chaque mois pour faire le point sur vos progrès, ajuster les objectifs et vous remontrer les exercices si nécessaire.',
        },
      ],
    },
  },
  {
    slug: 'musculation',
    imageSrc:
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
    imageAlt: 'Musculation et renforcement musculaire',
    title: 'Musculation',
    description:
      'Programmes de musculation personnalisés pour développer votre force, sculpter votre physique et booster votre métabolisme. Encadrement professionnel en salle.',
    detail: {
      heroImageSrc:
        'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1600&q=80',
      heroImageAlt: 'Séance de musculation avec coach sportif',
      subtitle: 'Développez votre force, sculptez votre physique',
      longDescription: [
        "La musculation est un pilier fondamental de toute transformation physique. Que votre objectif soit la prise de masse, la perte de graisse, la tonification ou simplement l'amélioration de votre santé, un programme de renforcement musculaire bien conçu vous permettra d'y parvenir plus rapidement et plus durablement.",
        "En tant que coach sportif diplômé, je conçois des programmes entièrement personnalisés basés sur votre morphologie, votre niveau actuel et vos objectifs. Chaque exercice est démontré, corrigé et adapté pour maximiser vos résultats tout en minimisant les risques de blessure. La technique correcte est ma priorité absolue.",
        "Les séances combinent exercices composés (squat, soulevé de terre, développé couché) et exercices d'isolation pour un développement musculaire harmonieux. Je vous enseigne également les principes de surcharge progressive pour que vous continuiez à progresser semaine après semaine.",
      ],
      benefits: [
        {
          icon: '💪',
          title: 'Gain de force',
          description:
            'Développez votre force fonctionnelle grâce à des exercices composés et progressifs. Résultats mesurables dès les premières semaines.',
        },
        {
          icon: '🔥',
          title: 'Métabolisme accéléré',
          description:
            'Plus de muscle = plus de calories brûlées au repos. La musculation est le meilleur allié de la perte de poids durable.',
        },
        {
          icon: '🛡️',
          title: 'Prévention des blessures',
          description:
            'Un corps musclé protège vos articulations et prévient les douleurs chroniques, notamment le mal de dos.',
        },
        {
          icon: '📈',
          title: 'Progression constante',
          description:
            'Programme évolutif avec surcharge progressive : vous soulevez plus lourd chaque semaine, vos résultats sont visibles et mesurables.',
        },
      ],
      targetAudience: [
        'Débutants souhaitant apprendre les bons gestes en toute sécurité',
        'Sportifs intermédiaires voulant franchir un palier de performance',
        'Personnes souhaitant prendre de la masse musculaire',
        'Personnes en perte de poids voulant préserver leur masse musculaire',
        'Seniors souhaitant maintenir leur force et leur autonomie',
      ],
      ctaText: 'Prêt à devenir plus fort ? Découvrez nos offres',
      faqs: [
        {
          question: 'Je suis débutant(e), puis-je commencer la musculation ?',
          answer:
            'Bien sûr ! C\'est même le meilleur moment pour commencer avec un coach. Je vous enseigne les bons gestes dès le départ pour des résultats sûrs et rapides.',
        },
        {
          question: 'La musculation va-t-elle me rendre trop musclé(e) ?',
          answer:
            'Non, prendre beaucoup de masse musculaire demande des années d\'entraînement intensif et une alimentation très spécifique. Mon programme vous donnera un physique tonique et athlétique.',
        },
        {
          question: 'Où se déroulent les séances de musculation ?',
          answer:
            'En salle de sport dans la région de Valbonne, Sophia Antipolis et alentours. Je peux également concevoir un programme avec matériel minimal pour un entraînement à domicile.',
        },
        {
          question: 'Combien de fois par semaine faut-il s\'entraîner ?',
          answer:
            'Je recommande 2 à 4 séances par semaine selon votre niveau et vos objectifs. La récupération est aussi importante que l\'entraînement lui-même.',
        },
        {
          question: 'La musculation est-elle adaptée après 50 ans ?',
          answer:
            'Absolument ! La musculation est même recommandée après 50 ans pour lutter contre la sarcopénie (perte de masse musculaire liée à l\'âge) et maintenir la densité osseuse.',
        },
      ],
    },
  },
  {
    slug: 'hiit-circuit-training',
    imageSrc:
      'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800&q=80',
    imageAlt: 'HIIT et circuit training en plein air',
    title: 'HIIT & Circuit Training',
    description:
      'Séances haute intensité pour brûler un maximum de calories et améliorer votre endurance. Entraînements courts, efficaces et adaptés à tous les niveaux.',
    detail: {
      heroImageSrc:
        'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=1600&q=80',
      heroImageAlt: 'Séance de HIIT et circuit training intense',
      subtitle: 'Maximum de résultats en minimum de temps',
      longDescription: [
        "Le HIIT (High-Intensity Interval Training) et le circuit training sont les méthodes d'entraînement les plus efficaces pour perdre du gras et améliorer votre condition physique en un temps record. Mes séances de 45 à 60 minutes vous permettent de brûler jusqu'à 500 calories tout en développant votre endurance et votre force.",
        "Le principe est simple : alterner des phases d'effort intense avec des phases de récupération active. Cette méthode provoque l'effet \"afterburn\" (EPOC) — votre métabolisme reste élevé pendant 24 à 48 heures après la séance, ce qui signifie que vous continuez à brûler des calories même au repos.",
        "Chaque séance est différente pour éviter la routine et maintenir votre motivation. J'utilise des exercices variés au poids du corps, avec élastiques, haltères ou kettlebells, adaptés à votre niveau. Que vous soyez débutant ou sportif confirmé, l'intensité est ajustée pour que chaque séance soit un défi stimulant et réalisable.",
      ],
      benefits: [
        {
          icon: '⚡',
          title: 'Efficacité maximale',
          description:
            'Brûlez plus de calories en 45 minutes qu\'en 90 minutes de cardio classique. Le rapport temps/résultats est imbattable.',
        },
        {
          icon: '🔥',
          title: 'Effet afterburn',
          description:
            'Votre métabolisme reste élevé 24 à 48h après la séance. Vous brûlez des calories même en dormant.',
        },
        {
          icon: '❤️',
          title: 'Cardio renforcé',
          description:
            'Amélioration rapide de votre VO2max et de votre endurance cardiovasculaire. Votre cœur devient plus efficace.',
        },
        {
          icon: '🎲',
          title: 'Variété garantie',
          description:
            'Jamais deux séances identiques : exercices variés, circuits changeants, défis nouveaux à chaque entraînement.',
        },
      ],
      targetAudience: [
        'Personnes avec peu de temps disponible cherchant des résultats rapides',
        'Sportifs souhaitant améliorer leur endurance et leur explosivité',
        'Personnes en perte de poids voulant maximiser la dépense calorique',
        'Athlètes en préparation physique générale',
        'Toute personne qui s\'ennuie avec le cardio classique',
      ],
      ctaText: 'Prêt à repousser vos limites ? Découvrez nos offres',
      faqs: [
        {
          question: 'Le HIIT est-il adapté aux débutants ?',
          answer:
            'Oui ! L\'intensité est relative à votre niveau. Un débutant fera un effort intense pour lui, qui sera différent de celui d\'un sportif confirmé. J\'adapte chaque exercice à votre capacité.',
        },
        {
          question: 'Quelle est la différence entre HIIT et circuit training ?',
          answer:
            'Le HIIT alterne des phases d\'effort intense et de repos. Le circuit training enchaîne différents exercices en stations avec peu de repos. En pratique, mes séances combinent les deux pour un maximum d\'efficacité.',
        },
        {
          question: 'Combien de séances de HIIT par semaine ?',
          answer:
            'Je recommande 2 à 3 séances par semaine maximum, avec au moins un jour de repos entre chaque. La récupération est essentielle pour progresser et éviter le surentraînement.',
        },
        {
          question: 'Les séances se font-elles en salle ou en plein air ?',
          answer:
            'Les deux ! Profitez du climat de la Côte d\'Azur pour des séances en extérieur, ou optez pour la salle de sport. Je m\'adapte à vos préférences.',
        },
        {
          question: 'Quel équipement est nécessaire ?',
          answer:
            'Simplement une tenue de sport confortable et des baskets. Je fournis tout le matériel : haltères, kettlebells, élastiques, tapis, cordes à sauter.',
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
        'Swimming is one of the most complete sports in existence. It engages all muscle groups while preserving your joints, making it an ideal activity at any age and for all fitness levels.',
        'As a state-certified lifeguard, I offer individual or small group lessons adapted to your level and goals. Whether you want to learn the basics, perfect your crawl or butterfly technique, or simply enjoy the health benefits of water, I support you every step of the way.',
        'Each session is structured to combine technical work, aquatic muscle strengthening and cardio exercises in the water. You will progress at your own pace in a supportive and motivating environment.',
      ],
      benefits: [
        {
          icon: '💪',
          title: 'Complete sport',
          description:
            'Swimming works all muscle groups: arms, legs, back, abs. A full-body workout with no impact on joints.',
        },
        {
          icon: '🦴',
          title: 'Gentle on joints',
          description:
            'Water supports your body weight, reducing joint stress by 90%. Ideal for rehabilitation or people with chronic pain.',
        },
        {
          icon: '🔥',
          title: 'Calorie burner',
          description:
            'An intensive swimming session burns up to 500 calories per hour, while toning the body and improving cardiovascular endurance.',
        },
        {
          icon: '🧘',
          title: 'Natural stress relief',
          description:
            'Contact with water provides an immediate soothing effect. Swimming reduces cortisol and promotes endorphin production for lasting well-being.',
        },
      ],
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
        'Each program is tailor-made based on your body type, current level and personal goals. I use a combination of weight training, HIIT, circuit training and functional exercises to maximize your results — in the gym or outdoors, as you prefer.',
        'Outdoor sessions take place in the most beautiful green spaces of Valbonne and its surroundings. Fresh air oxygenates muscles better, natural vitamin D from the sun strengthens bones, and contact with nature significantly reduces stress. A winning combination for optimal results.',
      ],
      benefits: [
        {
          icon: '🏋️',
          title: 'Muscle strengthening',
          description:
            'Build your strength and muscle mass with targeted, progressive exercises adapted to your level, indoors or outdoors.',
        },
        {
          icon: '🌳',
          title: 'Outdoor training',
          description:
            'Enjoy nature as your playground: running, sprinting, outdoor circuit training for a varied and motivating workout.',
        },
        {
          icon: '⚡',
          title: 'Metabolic boost',
          description:
            'Fitness accelerates your metabolism, helping you burn calories even at rest. Visible results in just a few weeks.',
        },
        {
          icon: '🎯',
          title: 'Personalized goals',
          description:
            'Program fully adapted to your needs: weight loss, muscle gain, toning, sports preparation or general fitness.',
        },
      ],
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
        'My approach is based on balance and enjoyment, not restrictive diets. I help you understand your nutritional needs, create delicious and balanced meals, and adopt lasting eating habits that naturally fit into your daily life.',
        'Through a comprehensive nutritional assessment, I identify your deficiencies, excesses and habits to adjust. Together, we build a realistic and enjoyable eating plan that supports your sports goals while respecting your tastes and lifestyle.',
      ],
      benefits: [
        {
          icon: '🥗',
          title: 'Custom meal plan',
          description:
            'A nutritional program tailored to your tastes, lifestyle and goals. No strict diets, just smart rebalancing.',
        },
        {
          icon: '📊',
          title: 'Complete nutritional assessment',
          description:
            'Detailed analysis of your eating habits, identification of deficiencies and excesses for targeted and effective adjustments.',
        },
        {
          icon: '🍳',
          title: 'Recipes and meal ideas',
          description:
            'Simple, quick and delicious meal ideas for every time of day. Eating healthy has never been easier.',
        },
        {
          icon: '⚖️',
          title: 'Lasting results',
          description:
            'No more yo-yo dieting. My approach targets progressive and lasting changes for optimal long-term health.',
        },
      ],
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
  {
    slug: 'coaching-en-ligne',
    imageSrc:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    imageAlt: 'Online sports coaching',
    title: 'Online Coaching',
    description:
      'Personalized training and nutrition program with daily follow-up. Accessible throughout France to transform your body from home.',
    detail: {
      heroImageSrc:
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80',
      heroImageAlt: 'Online coaching from home',
      subtitle: 'Your personal coach, wherever you are',
      longDescription: [
        "Online coaching gives you access to full professional support without geographic constraints. Whether you're in Paris, Lyon, Marseille or anywhere in France, I accompany you daily to reach your fitness and nutritional goals.",
        "Each week, you receive a personalized workout program, a meal plan adapted to your tastes and lifestyle, and adjustments based on your results. The follow-up is continuous: I'm available by message to answer your questions, motivate you and adapt your program in real time.",
        "This package is ideal for autonomous people who want to train at their own pace while benefiting from a certified coach's expertise. You have access to a dedicated client portal with wellness journal, weight and body composition tracking, and healthy recipes.",
      ],
      benefits: [
        {
          icon: '📱',
          title: 'Daily follow-up',
          description:
            'Constant contact by message to adjust your program, answer questions and keep your motivation at its highest.',
        },
        {
          icon: '🏠',
          title: 'Flexible training',
          description:
            'Programs adapted to your equipment: home, gym, or outdoors. No expensive equipment needed to get started.',
        },
        {
          icon: '🥗',
          title: 'Nutrition plan included',
          description:
            'Personalized nutritional rebalancing with simple recipes and shopping lists. Adapted to your preferences and intolerances.',
        },
        {
          icon: '📊',
          title: 'Dedicated client portal',
          description:
            'Track your progress on your personal space: weight, measurements, wellness journal and recipe library.',
        },
      ],
      targetAudience: [
        'People located far from the Côte d\'Azur',
        'Professionals with busy schedules seeking flexible follow-up',
        'Autonomous individuals wanting to train at their own pace',
        'Anyone motivated seeking professional remote support',
        'Beginners wanting a structured framework to get started',
      ],
      ctaText: 'Start your transformation today',
      faqs: [
        {
          question: 'How does online coaching work concretely?',
          answer:
            'After an initial video call assessment, I send you your weekly training program and meal plan. You send me daily feedback and I make the necessary adjustments. We communicate continuously by message.',
        },
        {
          question: 'Do I need specific equipment?',
          answer:
            'No, I design your program based on your available equipment. We can start with bodyweight only, then evolve according to your means.',
        },
        {
          question: 'Is online coaching as effective as in-person?',
          answer:
            'Yes, as long as you are consistent and committed. Online coaching offers the advantage of continuous daily follow-up, which more than compensates for the coach\'s physical absence.',
        },
        {
          question: 'What is the minimum commitment period?',
          answer:
            'The minimum commitment is 3 months. This is the time needed to establish new habits and observe significant, lasting results.',
        },
        {
          question: 'Are video call sessions included?',
          answer:
            'Yes, a monthly video call is included to review your progress, adjust goals and re-demonstrate exercises if needed.',
        },
      ],
    },
  },
  {
    slug: 'musculation',
    imageSrc:
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
    imageAlt: 'Weight training and strength building',
    title: 'Weight Training',
    description:
      'Personalized weight training programs to build strength, sculpt your physique and boost your metabolism. Professional coaching in the gym.',
    detail: {
      heroImageSrc:
        'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1600&q=80',
      heroImageAlt: 'Weight training session with personal trainer',
      subtitle: 'Build your strength, sculpt your physique',
      longDescription: [
        "Weight training is a fundamental pillar of any physical transformation. Whether your goal is muscle gain, fat loss, toning or simply improving your health, a well-designed strength program will help you get there faster and more sustainably.",
        "As a certified sports coach, I design fully personalized programs based on your body type, current level and goals. Every exercise is demonstrated, corrected and adapted to maximize your results while minimizing injury risk. Correct technique is my absolute priority.",
        "Sessions combine compound exercises (squat, deadlift, bench press) and isolation exercises for harmonious muscular development. I also teach you progressive overload principles so you continue progressing week after week.",
      ],
      benefits: [
        {
          icon: '💪',
          title: 'Strength gains',
          description:
            'Develop functional strength through progressive compound exercises. Measurable results from the very first weeks.',
        },
        {
          icon: '🔥',
          title: 'Boosted metabolism',
          description:
            'More muscle = more calories burned at rest. Weight training is the best ally for lasting weight loss.',
        },
        {
          icon: '🛡️',
          title: 'Injury prevention',
          description:
            'A muscular body protects your joints and prevents chronic pain, especially back pain.',
        },
        {
          icon: '📈',
          title: 'Constant progression',
          description:
            'Progressive program with increasing loads: you lift heavier each week, your results are visible and measurable.',
        },
      ],
      targetAudience: [
        'Beginners wanting to learn proper form safely',
        'Intermediate athletes looking to break through a performance plateau',
        'People wanting to build muscle mass',
        'People losing weight wanting to preserve muscle mass',
        'Seniors wanting to maintain strength and independence',
      ],
      ctaText: 'Ready to get stronger? Discover our offers',
      faqs: [
        {
          question: 'I\'m a beginner, can I start weight training?',
          answer:
            'Of course! It\'s actually the best time to start with a coach. I teach you proper form from day one for safe and fast results.',
        },
        {
          question: 'Will weight training make me too bulky?',
          answer:
            'No, building significant muscle mass requires years of intense training and very specific nutrition. My program will give you a toned, athletic physique.',
        },
        {
          question: 'Where do weight training sessions take place?',
          answer:
            'At gyms in the Valbonne, Sophia Antipolis and surrounding area. I can also design a minimal equipment program for home training.',
        },
        {
          question: 'How many times per week should I train?',
          answer:
            'I recommend 2 to 4 sessions per week depending on your level and goals. Recovery is as important as the training itself.',
        },
        {
          question: 'Is weight training suitable after 50?',
          answer:
            'Absolutely! Weight training is even recommended after 50 to fight sarcopenia (age-related muscle loss) and maintain bone density.',
        },
      ],
    },
  },
  {
    slug: 'hiit-circuit-training',
    imageSrc:
      'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800&q=80',
    imageAlt: 'HIIT and circuit training outdoors',
    title: 'HIIT & Circuit Training',
    description:
      'High-intensity sessions to burn maximum calories and boost endurance. Short, effective workouts adapted to all levels.',
    detail: {
      heroImageSrc:
        'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=1600&q=80',
      heroImageAlt: 'Intense HIIT and circuit training session',
      subtitle: 'Maximum results in minimum time',
      longDescription: [
        "HIIT (High-Intensity Interval Training) and circuit training are the most effective training methods for burning fat and improving your fitness in record time. My 45 to 60-minute sessions allow you to burn up to 500 calories while developing endurance and strength.",
        "The principle is simple: alternate phases of intense effort with active recovery. This method triggers the 'afterburn' effect (EPOC) — your metabolism stays elevated for 24 to 48 hours after the session, meaning you continue burning calories even at rest.",
        "Every session is different to avoid routine and maintain motivation. I use varied bodyweight exercises, resistance bands, dumbbells or kettlebells, adapted to your level. Whether beginner or experienced athlete, the intensity is adjusted so each session is a stimulating, achievable challenge.",
      ],
      benefits: [
        {
          icon: '⚡',
          title: 'Maximum efficiency',
          description:
            'Burn more calories in 45 minutes than in 90 minutes of traditional cardio. The time-to-results ratio is unbeatable.',
        },
        {
          icon: '🔥',
          title: 'Afterburn effect',
          description:
            'Your metabolism stays elevated 24-48h after the session. You burn calories even while sleeping.',
        },
        {
          icon: '❤️',
          title: 'Enhanced cardio',
          description:
            'Rapid improvement of your VO2max and cardiovascular endurance. Your heart becomes more efficient.',
        },
        {
          icon: '🎲',
          title: 'Guaranteed variety',
          description:
            'No two sessions alike: varied exercises, changing circuits, new challenges at every workout.',
        },
      ],
      targetAudience: [
        'People with limited time seeking quick results',
        'Athletes wanting to improve endurance and explosiveness',
        'People losing weight wanting to maximize calorie burn',
        'Athletes in general physical preparation',
        'Anyone who gets bored with traditional cardio',
      ],
      ctaText: 'Ready to push your limits? Discover our offers',
      faqs: [
        {
          question: 'Is HIIT suitable for beginners?',
          answer:
            'Yes! Intensity is relative to your level. A beginner will work at an intensity that\'s challenging for them, which is different from an experienced athlete. I adapt each exercise to your ability.',
        },
        {
          question: 'What\'s the difference between HIIT and circuit training?',
          answer:
            'HIIT alternates intense effort and rest phases. Circuit training chains different exercises in stations with minimal rest. In practice, my sessions combine both for maximum effectiveness.',
        },
        {
          question: 'How many HIIT sessions per week?',
          answer:
            'I recommend 2 to 3 sessions per week maximum, with at least one rest day between each. Recovery is essential for progress and avoiding overtraining.',
        },
        {
          question: 'Are sessions indoors or outdoors?',
          answer:
            'Both! Take advantage of the Côte d\'Azur climate for outdoor sessions, or opt for the gym. I adapt to your preferences.',
        },
        {
          question: 'What equipment is needed?',
          answer:
            'Just comfortable sportswear and trainers. I provide all equipment: dumbbells, kettlebells, resistance bands, mats, jump ropes.',
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

export const PROGRAMS = PROGRAMS_FR;

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

export const PRICING_PACKS = PRICING_PACKS_FR;
