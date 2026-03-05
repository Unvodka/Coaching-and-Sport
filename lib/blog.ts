export interface BlogPost {
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  date: string;
  readingTime: string;
  category: string;
  categoryEn: string;
  imageSrc: string;
  imageAlt: string;
  imageAltEn: string;
  content: string[];
  contentEn: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'perdre-du-poids-avec-coach-sportif',
    title: 'Comment perdre du poids durablement avec un coach sportif ?',
    titleEn: 'How to Lose Weight Sustainably with a Sports Coach',
    description:
      "Découvrez les clés d'une perte de poids durable grâce à un accompagnement sportif personnalisé. Conseils d'expert pour atteindre vos objectifs sans effet yoyo.",
    descriptionEn:
      'Discover the keys to sustainable weight loss through personalized sports coaching. Expert advice to reach your goals without the yo-yo effect.',
    date: '2025-01-15',
    readingTime: '6 min',
    category: 'Perte de poids',
    categoryEn: 'Weight Loss',
    imageSrc:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80',
    imageAlt:
      'Entraînement personnalisé avec un coach sportif pour perdre du poids',
    imageAltEn: 'Personalized training with a sports coach for weight loss',
    content: [
      "La perte de poids est l'un des objectifs les plus courants chez les personnes qui font appel à un coach sportif. Pourtant, beaucoup de gens se lancent dans des régimes drastiques ou des programmes d'entraînement trop intenses, ce qui mène souvent à l'abandon et à l'effet yoyo. Ayez les bonnes habitudes et abordez la perte de poids de manière intelligente et durable.",
      "La première étape est de comprendre que la perte de poids repose sur un déficit calorique modéré, combiné à une activité physique adaptée. Il ne s'agit pas de se priver ou de s'épuiser, mais de trouver le bon équilibre entre alimentation et exercice. Un coach sportif vous aide à définir ce déficit de manière personnalisée, en tenant compte de votre métabolisme, votre mode de vie et vos préférences alimentaires.",
      "L'entraînement en résistance (musculation, circuit training) est souvent sous-estimé dans un programme de perte de poids. Contrairement aux idées reçues, la musculation ne vous rendra pas « trop musclé(e) ». Au contraire, elle augmente votre métabolisme de base, ce qui signifie que vous brûlez plus de calories même au repos. Combinée avec du cardio modéré (natation, marche rapide, HIIT), cette approche donne des résultats visibles en quelques semaines.",
      "La régularité est la clé du succès. Plutôt que de s'entraîner intensément 6 jours par semaine pendant un mois puis d'abandonner, il est bien plus efficace de maintenir 2 à 3 séances hebdomadaires sur le long terme. C'est exactement ce qu'un coach sportif vous aide à mettre en place : un programme réaliste, progressif et motivant.",
      "L'alimentation représente environ 70% des résultats en matière de perte de poids. Mais attention, il ne s'agit pas de suivre un régime strict. Mon approche est basée sur le rééquilibrage alimentaire : apprendre à mieux manger sans frustration, en comprenant les macronutriments et en adoptant des habitudes durables.",
      "Enfin, le suivi régulier est essentiel. Les progrès ne sont pas toujours visibles sur la balance (la masse musculaire pèse plus que la graisse), c'est pourquoi un coach sportif utilise plusieurs indicateurs : tour de taille, photos de progression, performances sportives et bien-être général. Cette approche globale vous permet de rester motivé(e) et de voir vos véritables progrès.",
    ],
    contentEn: [
      'Weight loss is one of the most common goals for people who work with a sports coach. Yet many people jump into drastic diets or overly intense training programs, which often leads to giving up and the yo-yo effect. Build the right habits and approach weight loss in an intelligent, sustainable way.',
      "The first step is understanding that weight loss relies on a moderate caloric deficit combined with appropriate physical activity. It's not about depriving yourself or exhausting yourself, but finding the right balance between nutrition and exercise. A sports coach helps you define that deficit in a personalized way, taking into account your metabolism, lifestyle and food preferences.",
      "Resistance training (weight training, circuit training) is often underestimated in a weight-loss program. Contrary to popular belief, strength training won't make you 'too muscular'. On the contrary, it increases your basal metabolic rate, meaning you burn more calories even at rest. Combined with moderate cardio (swimming, brisk walking, HIIT), this approach delivers visible results within weeks.",
      "Consistency is the key to success. Rather than training intensely 6 days a week for a month and then quitting, it is far more effective to maintain 2 to 3 weekly sessions over the long term. That's exactly what a sports coach helps you put in place: a realistic, progressive and motivating program.",
      'Nutrition accounts for roughly 70% of weight-loss results. But beware — this is not about following a strict diet. My approach is based on nutritional rebalancing: learning to eat better without frustration, understanding macronutrients and adopting lasting habits.',
      "Finally, regular monitoring is essential. Progress isn't always visible on the scale (muscle mass weighs more than fat), which is why a sports coach uses multiple indicators: waist measurements, progress photos, athletic performance and overall well-being. This holistic approach keeps you motivated and lets you see your true progress.",
    ],
  },
  {
    slug: 'bienfaits-natation-adultes',
    title: 'Les 10 bienfaits de la natation pour les adultes',
    titleEn: 'The 10 Benefits of Swimming for Adults',
    description:
      "La natation est l'un des sports les plus complets. Découvrez ses 10 principaux bienfaits pour la santé, la forme physique et le bien-être mental des adultes.",
    descriptionEn:
      'Swimming is one of the most complete sports. Discover its 10 main benefits for the health, physical fitness and mental well-being of adults.',
    date: '2025-01-28',
    readingTime: '5 min',
    category: 'Natation',
    categoryEn: 'Swimming',
    imageSrc:
      'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&q=80',
    imageAlt: 'Nageur adulte dans une piscine effectuant un crawl',
    imageAltEn: 'Adult swimmer in a pool performing freestyle',
    content: [
      'La natation est souvent considérée comme le sport le plus complet qui existe, et pour de bonnes raisons. Je constate chaque jour les incroyables bienfaits que cette discipline apporte au personnes. Que vous soyez débutant ou nageur confirmé, voici les 10 raisons pour lesquelles vous devriez intégrer la natation dans votre routine sportive.',
      "Premier bienfait : la natation sollicite l'ensemble des groupes musculaires. Contrairement à la course à pied qui travaille principalement les jambes, ou à la musculation ciblée, la natation engage les bras, les jambes, le dos, les abdominaux et les épaules simultanément. Chaque mouvement dans l'eau est un exercice de renforcement musculaire complet.",
      "Deuxième bienfait : elle est extrêmement douce pour les articulations. L'eau porte environ 90% de votre poids corporel, ce qui réduit considérablement le stress articulaire. C'est pourquoi la natation est recommandée pour les personnes souffrant d'arthrose, de douleurs lombaires ou en phase de rééducation après une blessure.",
      'Troisième et quatrième bienfaits : la natation est un excellent brûleur de calories et améliore significativement votre endurance cardiovasculaire. Votre cœur et vos poumons deviennent plus efficaces, réduisant le risque de maladies cardiovasculaires.',
      "Cinquième et sixième bienfaits : nager régulièrement améliore votre posture (en renforçant les muscles du dos et de la ceinture abdominale) et augmente votre souplesse. Les mouvements amples dans l'eau étirent naturellement vos muscles et améliorent l'amplitude de vos articulations.",
      "Septième bienfait : la natation a un puissant effet anti-stress. Le contact avec l'eau a un effet apaisant prouvé scientifiquement. La respiration rythmée et la concentration sur les mouvements créent un état méditatif qui réduit le cortisol (hormone du stress) et favorise la production d'endorphines.",
      'Huitième, neuvième et dixième bienfaits : la natation améliore la qualité du sommeil, renforce le système immunitaire, et peut se pratiquer à tout âge sans risque. Que vous ayez 25 ou 75 ans, il existe toujours un style de nage et une intensité adaptés à votre condition physique.',
      "À Valbonne et sur la Côte d'Azur, nous avons la chance de pouvoir pratiquer la natation quasiment toute l'année. Si vous souhaitez découvrir ou redécouvrir les bienfaits de la natation avec un accompagnement professionnel, je serai ravi de vous accueillir pour une séance d'évaluation personnalisée.",
    ],
    contentEn: [
      'Swimming is often considered the most complete sport there is, and for good reason. Every day I witness the incredible benefits this discipline brings to people. Whether you are a beginner or a seasoned swimmer, here are the 10 reasons why you should integrate swimming into your fitness routine.',
      'First benefit: swimming engages all muscle groups. Unlike running, which mainly works the legs, or targeted weight training, swimming uses the arms, legs, back, abs and shoulders simultaneously. Every movement in the water is a full-body strengthening exercise.',
      'Second benefit: it is extremely gentle on the joints. Water supports about 90% of your body weight, which significantly reduces joint stress. That is why swimming is recommended for people suffering from arthritis, lower back pain or recovering from an injury.',
      'Third and fourth benefits: swimming is an excellent calorie burner and significantly improves cardiovascular endurance. Your heart and lungs become more efficient, reducing the risk of cardiovascular disease.',
      'Fifth and sixth benefits: regular swimming improves your posture (by strengthening the back and core muscles) and increases your flexibility. The wide movements in the water naturally stretch your muscles and improve your range of motion.',
      'Seventh benefit: swimming has a powerful anti-stress effect. Contact with water has a scientifically proven calming effect. Rhythmic breathing and focus on movement create a meditative state that reduces cortisol (the stress hormone) and promotes endorphin production.',
      'Eighth, ninth and tenth benefits: swimming improves sleep quality, strengthens the immune system, and can be practiced at any age without risk. Whether you are 25 or 75, there is always a swimming style and intensity suited to your fitness level.',
      'In Valbonne and on the French Riviera, we are lucky to be able to swim almost all year round. If you would like to discover or rediscover the benefits of swimming with professional guidance, I would be happy to welcome you for a personalized assessment session.',
    ],
  },
  {
    slug: 'fitness-plein-air-avantages',
    title: "Pourquoi s'entraîner en plein air est meilleur qu'en salle ?",
    titleEn: 'Why Training Outdoors Is Better Than at the Gym',
    description:
      "S'entraîner en extérieur offre des avantages uniques pour le corps et l'esprit. Découvrez pourquoi le fitness en plein air à Valbonne peut transformer vos résultats.",
    descriptionEn:
      'Training outdoors offers unique advantages for body and mind. Discover why outdoor fitness in Valbonne can transform your results.',
    date: '2025-02-10',
    readingTime: '5 min',
    category: 'Fitness',
    categoryEn: 'Fitness',
    imageSrc:
      'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=80',
    imageAlt: 'Séance de fitness en plein air dans un parc verdoyant',
    imageAltEn: 'Outdoor fitness session in a green park',
    content: [
      "Si vous hésitez entre vous entraîner en salle de sport ou en plein air, cet article est pour vous. Je propose les deux formats, mais je constate systématiquement que mes clients qui s'entraînent en extérieur obtiennent des résultats supérieurs et maintiennent leur motivation plus longtemps. Voici pourquoi.",
      "L'air frais fait une vraie différence sur vos performances. Des études scientifiques montrent que l'entraînement en extérieur augmente l'apport en oxygène de 10 à 20% par rapport à un environnement fermé et climatisé. Vos muscles sont mieux oxygénés, votre récupération est plus rapide, et votre endurance s'améliore naturellement.",
      "La lumière naturelle du soleil est un allié puissant. L'exposition au soleil pendant l'exercice stimule la production de vitamine D, essentielle pour la santé des os, le système immunitaire et l'humeur. Sur la Côte d'Azur, nous bénéficions de plus de 300 jours de soleil par an, un avantage considérable pour le fitness en plein air à Valbonne.",
      "Le terrain naturel renforce davantage vos muscles stabilisateurs. Contrairement au sol plat d'une salle de sport, les surfaces naturelles (herbe, sable, sentiers) sollicitent constamment vos muscles profonds et améliorent votre proprioception (sens de l'équilibre). Résultat : une meilleure coordination, moins de risques de blessures dans la vie quotidienne.",
      "L'effet psychologique du contact avec la nature est prouvé scientifiquement. Le concept japonais de « bain de forêt » (shinrin-yoku) montre que passer du temps dans un environnement naturel réduit le cortisol de 16% en moyenne. Combiné à l'exercice physique, cet effet anti-stress est multiplié. Mes clients qui s'entraînent en plein air rapportent systématiquement un meilleur bien-être mental.",
      "La variété des exercices possibles en plein air est quasi illimitée. Sprints, escaliers, exercices avec banc, course en côte, circuit training dans un parc — les possibilités sont infinies et chaque séance peut être différente. Cette variété combat la monotonie qui est l'ennemi numéro 1 de la régularité sportive.",
      "Valbonne et ses environs offrent un cadre exceptionnel pour le fitness en plein air. Entre les parcs verdoyants, les sentiers de randonnée et le climat méditerranéen, chaque séance devient un moment de plaisir autant qu'un entraînement efficace. Si vous souhaitez essayer le coaching en plein air, contactez-moi pour une séance découverte gratuite.",
    ],
    contentEn: [
      'If you are torn between training at a gym or outdoors, this article is for you. I offer both formats, but I consistently see that clients who train outside achieve better results and stay motivated longer. Here is why.',
      'Fresh air makes a real difference to your performance. Scientific studies show that outdoor training increases oxygen intake by 10 to 20% compared to a closed, air-conditioned environment. Your muscles are better oxygenated, recovery is faster, and endurance improves naturally.',
      'Natural sunlight is a powerful ally. Sun exposure during exercise stimulates vitamin D production, which is essential for bone health, the immune system and mood. On the French Riviera, we enjoy more than 300 sunny days a year — a considerable advantage for outdoor fitness in Valbonne.',
      'Natural terrain works your stabilizing muscles harder. Unlike the flat floor of a gym, natural surfaces (grass, sand, trails) constantly engage your deep muscles and improve proprioception (balance awareness). The result: better coordination and fewer injuries in daily life.',
      "The psychological effect of contact with nature is scientifically proven. The Japanese concept of 'forest bathing' (shinrin-yoku) shows that spending time in a natural environment reduces cortisol by an average of 16%. Combined with physical exercise, this anti-stress effect is multiplied. My clients who train outdoors consistently report better mental well-being.",
      'The variety of exercises possible outdoors is almost unlimited. Sprints, stairs, bench exercises, hill runs, circuit training in a park — the possibilities are endless and every session can be different. This variety fights the monotony that is the number-one enemy of consistency.',
      'Valbonne and its surroundings offer an exceptional setting for outdoor fitness. With lush parks, hiking trails and a Mediterranean climate, every session becomes a moment of pleasure as much as an effective workout. If you want to try outdoor coaching, contact me for a free discovery session.',
    ],
  },
  {
    slug: 'nutrition-sportive-bases',
    title: 'Nutrition sportive : les bases pour optimiser vos performances',
    titleEn: 'Sports Nutrition: The Basics to Optimize Your Performance',
    description:
      'Apprenez les fondamentaux de la nutrition sportive pour améliorer vos performances, votre récupération et atteindre vos objectifs physiques plus rapidement.',
    descriptionEn:
      'Learn the fundamentals of sports nutrition to improve your performance, recovery and reach your physical goals faster.',
    date: '2025-02-25',
    readingTime: '7 min',
    category: 'Nutrition',
    categoryEn: 'Nutrition',
    imageSrc:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80',
    imageAlt: 'Repas équilibré avec protéines, légumes et glucides complexes',
    imageAltEn:
      'Balanced meal with proteins, vegetables and complex carbohydrates',
    content: [
      "La nutrition est le pilier souvent négligé de tout programme sportif. On dit que les résultats se font à 30% à l'entraînement et à 70% dans l'assiette, et mon expérience de coach sportif à Valbonne confirme totalement cette proportion. Voici les bases de la nutrition sportive pour vous aider à optimiser vos performances et atteindre vos objectifs.",
      "Les macronutriments sont les trois grandes familles de nutriments dont votre corps a besoin : les protéines, les glucides et les lipides. Chacun joue un rôle essentiel. Les protéines réparent et construisent les muscles (visez 1,6 à 2g par kg de poids corporel si vous êtes actif). Les glucides fournissent l'énergie nécessaire à l'effort (privilégiez les glucides complexes comme les patates douces, le riz complet, les flocons d'avoine). Les lipides sont essentiels au bon fonctionnement hormonal et à l'absorption des vitamines.",
      "L'hydratation est souvent sous-estimée mais elle est cruciale. Une déshydratation de seulement 2% peut réduire vos performances de 10 à 20%. Visez au minimum 2 litres d'eau par jour, davantage les jours d'entraînement. Sur la Côte d'Azur, le climat chaud impose une vigilance particulière, surtout pour le fitness en plein air.",
      "Le timing de vos repas autour de l'entraînement fait une réelle différence. Avant l'effort (2-3h avant) : un repas complet avec glucides, protéines et peu de graisses. Juste après l'effort (dans les 30 minutes) : une collation riche en protéines et glucides rapides pour optimiser la récupération musculaire. C'est la fameuse « fenêtre anabolique » qui maximise l'absorption des nutriments par vos muscles.",
      "Les compléments alimentaires ne sont pas indispensables si votre alimentation est équilibrée. Cependant, certains peuvent être utiles : la créatine pour la force et la puissance (l'un des compléments les plus étudiés et les plus sûrs), la protéine en poudre pour compléter vos apports si nécessaire, et la vitamine D en hiver (même sur la Côte d'Azur, les mois d'hiver peuvent être insuffisants).",
      'Les erreurs nutritionnelles les plus fréquentes que je constate chez mes clients sont : sauter le petit-déjeuner (ce qui ralentit le métabolisme), ne pas manger assez de protéines (surtout chez les femmes), se priver excessivement (ce qui provoque des compulsions alimentaires), et négliger les légumes et les fibres (essentiels pour la digestion et la satiété).',
      "Mon approche nutritionnelle  est pragmatique : pas de régime strict, pas d'interdits absolus, mais un rééquilibrage progressif et personnalisé. L'objectif est de vous donner les connaissances et les habitudes pour gérer votre alimentation de manière autonome et durable. C'est cette approche qui distingue un changement temporaire d'une véritable transformation à long terme.",
    ],
    contentEn: [
      'Nutrition is the often-overlooked pillar of any sports program. They say results come 30% from training and 70% from the plate, and my experience as a sports coach in Valbonne fully confirms this. Here are the sports nutrition basics to help you optimize your performance and reach your goals.',
      'Macronutrients are the three main nutrient families your body needs: proteins, carbohydrates and fats. Each plays an essential role. Proteins repair and build muscle (aim for 1.6 to 2g per kg of body weight if you are active). Carbohydrates provide the energy needed for exercise (prioritize complex carbs like sweet potatoes, brown rice and oats). Fats are essential for hormonal function and vitamin absorption.',
      'Hydration is often underestimated but it is crucial. A dehydration of just 2% can reduce your performance by 10 to 20%. Aim for at least 2 litres of water per day, more on training days. On the French Riviera, the warm climate demands extra vigilance, especially for outdoor fitness.',
      "Meal timing around training makes a real difference. Before exercise (2–3h before): a complete meal with carbs, protein and little fat. Right after exercise (within 30 minutes): a snack rich in protein and fast carbs to optimize muscle recovery. This is the famous 'anabolic window' that maximizes nutrient absorption by your muscles.",
      'Supplements are not essential if your diet is balanced. However, some can be useful: creatine for strength and power (one of the most studied and safest supplements), protein powder to complement your intake if needed, and vitamin D in winter (even on the French Riviera, winter months can be insufficient).',
      'The most common nutritional mistakes I see in my clients are: skipping breakfast (which slows the metabolism), not eating enough protein (especially among women), excessive restriction (which triggers food cravings), and neglecting vegetables and fiber (essential for digestion and satiety).',
      'My nutritional approach is pragmatic: no strict diets, no absolute bans, but a progressive and personalized rebalancing. The goal is to give you the knowledge and habits to manage your diet autonomously and sustainably. This is what distinguishes a temporary change from a true long-term transformation.',
    ],
  },
  {
    slug: 'commencer-sport-apres-40-ans',
    title: 'Comment reprendre le sport après 40 ans en toute sécurité',
    titleEn: 'How to Safely Return to Sport After 40',
    description:
      "Il n'est jamais trop tard pour commencer ou reprendre le sport. Guide complet pour une reprise sportive en douceur après 40 ans, avec les conseils d'un coach diplômé.",
    descriptionEn:
      'It is never too late to start or return to sport. A complete guide to easing back into fitness after 40, with advice from a certified coach.',
    date: '2025-03-12',
    readingTime: '6 min',
    category: 'Remise en forme',
    categoryEn: 'Getting Back in Shape',
    imageSrc:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
    imageAlt:
      "Personne mature faisant de l'exercice en plein air avec un coach",
    imageAltEn: 'Mature person exercising outdoors with a coach',
    content: [
      "Il n'est jamais trop tard pour commencer ou reprendre une activité physique. À 40, 50 ou même 60 ans, le sport peut transformer votre qualité de vie. J'accompagne de nombreux clients dans cette tranche d'âge, et les résultats sont toujours remarquables. Voici comment aborder la reprise sportive en toute sécurité.",
      "La première étape indispensable est de consulter votre médecin pour un bilan de santé complet. Un test d'effort est recommandé, surtout si vous êtes sédentaire depuis plusieurs années. Ce bilan permet d'identifier d'éventuelles contre-indications et d'adapter votre programme en conséquence. Une fois le feu vert médical obtenu, vous pouvez commencer sereinement.",
      "La progressivité est le maître-mot après 40 ans. Votre corps a besoin de plus de temps pour s'adapter qu'à 20 ans, et c'est tout à fait normal. Je recommande de commencer par 2 séances par semaine de 30 à 45 minutes, puis d'augmenter progressivement la fréquence et l'intensité sur 4 à 6 semaines. Cette approche graduelle minimise les risques de blessures.",
      "Le choix des activités est crucial. La natation est idéale pour reprendre en douceur car elle ne met aucun stress sur les articulations. La marche active et le fitness adapté en plein air sont également excellents pour reconditionner votre système cardiovasculaire. Le renforcement musculaire léger est essentiel pour prévenir la sarcopénie (perte de masse musculaire liée à l'âge).",
      "La récupération prend une importance majeure après 40 ans. Prévoyez au minimum 48 heures entre deux séances sollicitant les mêmes groupes musculaires. Le sommeil de qualité (7-8 heures par nuit), les étirements post-entraînement et une alimentation riche en protéines sont les trois piliers d'une bonne récupération.",
      "Les bénéfices sont rapides et concrets : après 4 semaines de pratique régulière, vous constaterez une amélioration de votre énergie, de votre sommeil et de votre humeur. Après 8 à 12 semaines, les changements physiques deviennent visibles. La pratique sportive régulière après 40 ans réduit le risque de diabète de type 2, de maladies cardiovasculaires et d'ostéoporose de 30 à 50%.",
      "Le rôle d'un coach sportif est particulièrement précieux dans cette situation. Il adapte chaque exercice à votre condition physique, corrige votre posture pour éviter les blessures, et vous motive sur le long terme. Je vous propose des séances individuelles parfaitement adaptées aux besoins spécifiques des personnes de plus de 40 ans. Contactez-moi pour une évaluation personnalisée.",
    ],
    contentEn: [
      'It is never too late to start or return to physical activity. At 40, 50 or even 60, sport can transform your quality of life. I work with many clients in this age group, and the results are always remarkable. Here is how to approach returning to sport safely.',
      'The indispensable first step is to see your doctor for a full health check. A stress test is recommended, especially if you have been sedentary for several years. This assessment identifies any contraindications and allows your program to be adapted accordingly. Once you have the medical all-clear, you can start with peace of mind.',
      'Progressiveness is the key word after 40. Your body needs more time to adapt than at 20, and that is perfectly normal. I recommend starting with 2 sessions per week of 30 to 45 minutes, then gradually increasing frequency and intensity over 4 to 6 weeks. This gradual approach minimizes the risk of injury.',
      'The choice of activities is crucial. Swimming is ideal for easing back in as it puts no stress on the joints. Brisk walking and adapted outdoor fitness are also excellent for reconditioning your cardiovascular system. Light resistance training is essential to prevent sarcopenia (age-related muscle loss).',
      'Recovery takes on greater importance after 40. Allow at least 48 hours between sessions that work the same muscle groups. Quality sleep (7–8 hours per night), post-workout stretching and a protein-rich diet are the three pillars of good recovery.',
      'The benefits are quick and concrete: after 4 weeks of regular practice, you will notice improved energy, sleep and mood. After 8 to 12 weeks, physical changes become visible. Regular exercise after 40 reduces the risk of type 2 diabetes, cardiovascular disease and osteoporosis by 30 to 50%.',
      'The role of a sports coach is particularly valuable in this situation. They adapt every exercise to your fitness level, correct your posture to prevent injury, and keep you motivated over the long term. I offer individual sessions perfectly tailored to the specific needs of people over 40. Contact me for a personalized assessment.',
    ],
  },
  {
    slug: 'sport-et-sante-mentale',
    title:
      "Sport et santé mentale : comment l'activité physique transforme votre bien-être psychologique",
    titleEn:
      'Sport and Mental Health: How Physical Activity Transforms Your Well-being',
    description:
      "Découvrez comment le sport agit sur le stress, l'anxiété et la dépression. Études scientifiques, mécanismes biologiques et conseils pratiques par un coach sportif diplômé à Valbonne.",
    descriptionEn:
      'Discover how sport affects stress, anxiety and depression. Scientific studies, biological mechanisms and practical advice from a certified sports coach in Valbonne.',
    date: '2025-02-23',
    readingTime: '8 min',
    category: 'Bien-être',
    categoryEn: 'Well-being',
    imageSrc:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80',
    imageAlt:
      'Personne méditant en plein air après une séance de sport, bien-être mental',
    imageAltEn: 'Person meditating outdoors after a workout, mental well-being',
    content: [
      "La santé mentale est la Grande Cause nationale 2025 en France, et pour une bonne raison : un Français sur quatre sera confronté à un trouble psychique au cours de sa vie. Stress chronique, anxiété, burn-out, dépression... ces maux touchent toutes les tranches d'âge et tous les milieux sociaux. Mais saviez-vous que l'activité physique est l'une des armes les plus puissantes — et les plus accessibles — pour protéger et améliorer votre santé mentale ? Je constate chaque jour les transformations profondes que le sport opère sur le bien-être psychologique de mes clients.",

      "La science est formelle : une méta-analyse publiée dans le British Journal of Sports Medicine a démontré que l'exercice physique est 1,5 fois plus efficace que les traitements médicamenteux ou la psychothérapie pour réduire les symptômes de dépression et d'anxiété légères à modérées. Le Ministère de la Santé confirme qu'une activité physique adaptée peut être aussi efficace que les antidépresseurs dans ces cas. Ce n'est pas une opinion, c'est un consensus scientifique international appuyé par l'OMS, la Haute Autorité de Santé et des centaines d'études sur des millions de participants.",

      "Comment le sport agit-il concrètement sur votre cerveau ? Pendant l'exercice, votre corps libère un cocktail de substances chimiques bénéfiques. Les endorphines, souvent appelées « hormones du bonheur », créent une sensation d'euphorie naturelle — c'est le fameux « runner's high ». La sérotonine, neurotransmetteur clé de la régulation de l'humeur, voit sa production augmenter significativement. La dopamine, impliquée dans la motivation et le plaisir, est également stimulée. Enfin, le sport réduit le cortisol, l'hormone du stress, ce qui explique cette sensation de calme et de clarté mentale après une bonne séance.",

      "La réduction du stress et de l'anxiété est l'un des bénéfices les plus immédiats du sport. Une vaste étude menée sur plus de 200 000 personnes pendant 21 ans a démontré que l'exercice physique régulier réduit le risque de développer un trouble anxieux de près de 60%. Et bonne nouvelle : il ne faut pas forcément s'épuiser pour en profiter. Des recherches récentes montrent qu'à peine 15 minutes d'activité physique suffisent pour ressentir les premiers effets positifs sur le mental. La clé n'est pas l'intensité, c'est la régularité.",

      "Le sport améliore aussi la qualité du sommeil, un facteur souvent sous-estimé de la santé mentale. Les études montrent que l'activité physique régulière raccourcit le temps d'endormissement, réduit les réveils nocturnes et augmente la durée du sommeil profond. Or, un mauvais sommeil aggrave le stress, l'irritabilité et les symptômes dépressifs — c'est un cercle vicieux que le sport permet de briser. Attention toutefois à ne pas s'entraîner trop tard le soir : idéalement, terminez votre séance au moins 2 heures avant le coucher.",

      "L'estime de soi et la confiance en soi se construisent séance après séance. Chaque progrès — un exercice réussi, une distance supplémentaire nagée, un poids plus lourd soulevé — renvoie un message puissant à votre cerveau : « je suis capable ». Ce sentiment d'auto-efficacité déborde bien au-delà du sport et impacte positivement votre vie professionnelle, vos relations sociales et votre façon de gérer les défis du quotidien. Mes clients me confient souvent que ce n'est pas seulement leur corps qui a changé, mais toute leur façon de se percevoir.",

      "La dimension sociale du sport est un autre levier puissant pour la santé mentale. L'isolement et la solitude sont des facteurs de risque majeurs pour la dépression. Pratiquer une activité physique — que ce soit avec un coach, dans un groupe ou en famille — crée du lien social, un sentiment d'appartenance et une routine structurante. Même le coaching individuel offre cette relation de confiance et de soutien régulier qui peut faire toute la différence dans les périodes difficiles.",

      "Quelles activités choisir pour maximiser les bienfaits sur le mental ? Toutes les formes d'exercice sont bénéfiques, mais certaines se distinguent. La natation combine les bienfaits du sport avec l'effet apaisant de l'eau — le contact aquatique réduit le cortisol et favorise un état méditatif naturel. Le fitness en plein air ajoute les bienfaits prouvés du contact avec la nature (réduction du stress de 16% en moyenne selon les études sur le « bain de forêt » japonais). Le yoga et les étirements activent le système nerveux parasympathique, celui qui favorise la détente. Le HIIT et la musculation libèrent un maximum d'endorphines en peu de temps.",

      "La régularité prime sur l'intensité. L'OMS recommande au minimum 150 minutes d'activité modérée par semaine (soit environ 30 minutes, 5 fois par semaine) ou 75 minutes d'activité intense. Mais même en dessous de ces seuils, chaque minute compte. L'essentiel est de trouver une activité qui vous plaît et de l'intégrer durablement dans votre routine. C'est précisément le rôle d'un coach sportif : vous aider à trouver l'activité adaptée, vous accompagner dans la régularité et adapter les séances à votre état du jour — y compris les jours où la motivation est en berne.",

      "Un point important : le sport n'est pas un substitut aux soins médicaux ou psychologiques en cas de trouble mental diagnostiqué. C'est un complément puissant, reconnu par la communauté médicale. Si vous souffrez de dépression sévère, de troubles anxieux importants ou de toute autre condition psychique, consultez un professionnel de santé. Le sport viendra renforcer votre prise en charge, pas la remplacer.",

      "À Valbonne et sur la Côte d'Azur, nous avons la chance de pouvoir pratiquer en plein air presque toute l'année, dans un cadre naturel exceptionnel. Que ce soit à travers la natation, le fitness en extérieur ou un programme combiné, je vous accompagne pour faire du sport un véritable pilier de votre équilibre mental et physique. Une première séance découverte est le meilleur moyen de commencer — contactez-moi pour en discuter.",
    ],
    contentEn: [
      "Mental health is a major public health priority, and for good reason: one in four people will face a mental health challenge during their lifetime. Chronic stress, anxiety, burnout, depression — these issues affect all age groups and backgrounds. But did you know that physical activity is one of the most powerful — and accessible — tools for protecting and improving your mental health? I witness every day the profound transformations that sport brings to my clients' psychological well-being.",
      'Science is clear: a meta-analysis published in the British Journal of Sports Medicine showed that physical exercise is 1.5 times more effective than medication or psychotherapy in reducing symptoms of mild to moderate depression and anxiety. This is not an opinion — it is an international scientific consensus supported by the WHO and hundreds of studies involving millions of participants.',
      "How does sport concretely affect your brain? During exercise, your body releases a cocktail of beneficial chemicals. Endorphins, often called the 'happiness hormones', create a natural sense of euphoria — the famous runner's high. Serotonin, a key neurotransmitter for mood regulation, increases significantly. Dopamine, linked to motivation and pleasure, is also stimulated. Finally, sport reduces cortisol, the stress hormone, explaining that feeling of calm and mental clarity after a good session.",
      "Reducing stress and anxiety is one of the most immediate benefits of sport. A large study of more than 200,000 people over 21 years showed that regular exercise reduces the risk of developing an anxiety disorder by nearly 60%. Good news: you don't have to exhaust yourself to benefit. Recent research shows that just 15 minutes of physical activity is enough to feel the first positive effects on the mind. The key is not intensity — it is consistency.",
      'Sport also improves sleep quality, a factor often underestimated in mental health. Studies show that regular physical activity shortens the time to fall asleep, reduces night-time awakenings and increases deep sleep duration. Poor sleep worsens stress, irritability and depressive symptoms — a vicious cycle that sport helps break. However, avoid training too late in the evening: ideally, finish your session at least 2 hours before bedtime.',
      "Self-esteem and self-confidence are built session by session. Each achievement — a completed exercise, an extra distance swum, a heavier weight lifted — sends a powerful message to your brain: 'I am capable.' This sense of self-efficacy extends well beyond sport and positively impacts your professional life, social relationships and ability to handle daily challenges. My clients often tell me that it is not just their body that has changed, but their whole self-perception.",
      'The social dimension of sport is another powerful lever for mental health. Isolation and loneliness are major risk factors for depression. Practicing physical activity — whether with a coach, in a group or with family — creates social bonds, a sense of belonging and a structuring routine. Even individual coaching offers a relationship of trust and regular support that can make all the difference during difficult times.',
      'Which activities maximize mental health benefits? All forms of exercise are beneficial, but some stand out. Swimming combines the benefits of sport with the soothing effect of water. Outdoor fitness adds the proven benefits of contact with nature. Yoga and stretching activate the parasympathetic nervous system, promoting relaxation. HIIT and strength training release the maximum amount of endorphins in a short time.',
      'Consistency outweighs intensity. The WHO recommends at least 150 minutes of moderate activity per week or 75 minutes of intense activity. But even below these thresholds, every minute counts. The key is to find an activity you enjoy and integrate it durably into your routine. That is precisely the role of a sports coach: to help you find the right activity, support your consistency and adapt sessions to how you feel each day.',
      'One important note: sport is not a substitute for medical or psychological care when a mental health condition has been diagnosed. It is a powerful complement, recognized by the medical community. If you suffer from severe depression, major anxiety or any other mental condition, please consult a healthcare professional. Sport will reinforce your care — not replace it.',
      'In Valbonne and on the French Riviera, we are lucky to be able to train outdoors almost all year round, in an exceptional natural setting. Whether through swimming, outdoor fitness or a combined program, I am here to help you make sport a true pillar of your mental and physical balance. A first discovery session is the best way to begin — contact me to discuss it.',
    ],
  },
  {
    slug: 'gerer-stress-et-anxiete',
    title:
      "Gérer le stress et l'anxiété : techniques simples pour retrouver la sérénité",
    titleEn: 'Managing Stress and Anxiety: Simple Techniques to Restore Calm',
    description:
      "Découvrez des techniques concrètes pour gérer le stress et l'anxiété au quotidien. Respiration, récupération et habitudes bien-être pour retrouver votre équilibre.",
    descriptionEn:
      'Discover concrete techniques for managing stress and anxiety in daily life. Breathing, recovery and wellness habits to restore your balance.',
    date: '2025-03-20',
    readingTime: '7 min',
    category: 'Bien-être',
    categoryEn: 'Well-being',
    imageSrc:
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&q=80',
    imageAlt:
      'Personne pratiquant la respiration profonde dans un cadre naturel apaisant',
    imageAltEn: 'Person practicing deep breathing in a calming natural setting',
    content: [
      "Le stress et l'anxiété font partie de la vie moderne, mais quand ils deviennent chroniques, ils peuvent sérieusement affecter votre santé physique et mentale. J'accompagne régulièrement des clients qui arrivent à leur première séance avec un niveau de stress élevé. La bonne nouvelle ? Il existe des techniques simples et accessibles pour reprendre le contrôle.",

      "La respiration est votre outil anti-stress le plus puissant et le plus immédiat. La technique de respiration 4-7-8 est particulièrement efficace : inspirez par le nez pendant 4 secondes, retenez votre souffle pendant 7 secondes, puis expirez lentement par la bouche pendant 8 secondes. Répétez ce cycle 4 fois. Cette technique active votre système nerveux parasympathique, celui qui calme le corps et l'esprit. En moins de 2 minutes, votre rythme cardiaque ralentit et la tension musculaire diminue.",

      "Le mouvement doux est un antidote naturel au stress. Quand vous êtes stressé et fatigué, l'idée d'un entraînement intense peut sembler insurmontable — et ce n'est pas ce dont votre corps a besoin. Privilégiez plutôt une marche de 15 à 20 minutes en plein air, des étirements doux, ou quelques postures de yoga simples. Ces activités réduisent le cortisol (hormone du stress) sans épuiser vos réserves d'énergie déjà limitées.",

      'Le sommeil est la fondation de votre résistance au stress. Un manque de sommeil augmente la production de cortisol de 37% et réduit votre capacité à gérer les émotions. Pour améliorer votre sommeil : maintenez des horaires réguliers (même le week-end), évitez les écrans 1h avant le coucher, gardez votre chambre fraîche (18-19°C) et essayez une routine de relaxation comme la lecture ou la méditation avant de dormir.',

      "L'alimentation joue un rôle clé dans la gestion du stress. Certains aliments favorisent la production de sérotonine et de GABA, les neurotransmetteurs de la détente : les bananes, les noix, le chocolat noir (70% minimum), les poissons gras riches en oméga-3, et les légumes verts. À l'inverse, limitez la caféine après midi et réduisez les sucres raffinés qui provoquent des pics d'énergie suivis de chutes brutales.",

      "La connexion sociale est un besoin fondamental souvent négligé en période de stress. Quand on ne va pas bien, on a tendance à s'isoler, ce qui aggrave le problème. Même un simple appel de 10 minutes avec un ami ou un proche peut réduire significativement le cortisol. Si vous vous entraînez avec un coach, ces séances régulières deviennent aussi un moment de connexion et de soutien qui aide à traverser les périodes difficiles.",

      "Quand consulter un professionnel ? Le stress et l'anxiété ponctuels sont normaux, mais si vous ressentez une anxiété persistante depuis plus de deux semaines, des troubles du sommeil chroniques, une perte d'appétit ou de motivation prolongée, ou des crises de panique, n'hésitez pas à consulter votre médecin ou un psychologue. Le sport et les techniques de relaxation sont de puissants compléments, mais ils ne remplacent pas un accompagnement médical quand il est nécessaire.",
    ],
    contentEn: [
      'Stress and anxiety are part of modern life, but when they become chronic, they can seriously affect your physical and mental health. I regularly work with clients who arrive at their first session with high stress levels. The good news? There are simple, accessible techniques to regain control.',
      'Breathing is your most powerful and immediate anti-stress tool. The 4-7-8 breathing technique is particularly effective: inhale through the nose for 4 seconds, hold for 7 seconds, then exhale slowly through the mouth for 8 seconds. Repeat this cycle 4 times. This activates your parasympathetic nervous system — the one that calms the body and mind. In under 2 minutes, your heart rate slows and muscle tension decreases.',
      'Gentle movement is a natural antidote to stress. When you are stressed and tired, the idea of intense training can feel overwhelming — and that is not what your body needs. Instead, opt for a 15–20 minute outdoor walk, gentle stretches or a few simple yoga poses. These activities reduce cortisol without depleting your already limited energy reserves.',
      'Sleep is the foundation of your stress resilience. Sleep deprivation increases cortisol production by 37% and reduces your ability to manage emotions. To improve your sleep: keep regular schedules (even on weekends), avoid screens for 1 hour before bed, keep your room cool (18–19°C) and try a relaxation routine such as reading or meditation before sleeping.',
      'Nutrition plays a key role in stress management. Certain foods promote the production of serotonin and GABA, the relaxation neurotransmitters: bananas, nuts, dark chocolate (minimum 70%), oily fish rich in omega-3, and leafy greens. Conversely, limit caffeine after noon and reduce refined sugars that cause energy spikes followed by sharp crashes.',
      'Social connection is a fundamental need that is often neglected during stressful periods. When we are struggling, we tend to isolate ourselves, which makes things worse. Even a simple 10-minute call with a friend or loved one can significantly reduce cortisol. If you train with a coach, those regular sessions also become a moment of connection and support that helps get through difficult times.',
      'When should you seek professional help? Occasional stress and anxiety are normal, but if you experience persistent anxiety for more than two weeks, chronic sleep issues, prolonged loss of appetite or motivation, or panic attacks, do not hesitate to consult your doctor or a psychologist. Sport and relaxation techniques are powerful complements, but they do not replace medical care when it is needed.',
    ],
  },
  {
    slug: 'retrouver-energie-et-motivation',
    title: 'Comment retrouver énergie et motivation quand on se sent en panne',
    titleEn: 'How to Rebuild Energy and Motivation When You Feel Stuck',
    description:
      "Vous vous sentez en panne de motivation ? Découvrez des stratégies concrètes pour relancer votre énergie et retrouver l'envie d'avancer, étape par étape.",
    descriptionEn:
      'Feeling low on motivation? Discover concrete strategies to recharge your energy and find the drive to move forward, step by step.',
    date: '2025-04-05',
    readingTime: '6 min',
    category: 'Bien-être',
    categoryEn: 'Well-being',
    imageSrc:
      'https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=1200&q=80',
    imageAlt:
      'Personne marchant sur un sentier ensoleillé, symbolisant le retour de la motivation',
    imageAltEn:
      'Person walking on a sunny path, symbolizing the return of motivation',
    content: [
      "Il y a des jours — parfois des semaines — où la motivation semble avoir disparu. Vous n'êtes pas vraiment mal, mais vous n'êtes pas bien non plus. Tout semble demander un effort considérable, et l'envie de progresser s'est éteinte. En tant que coach sportif à Valbonne, je rencontre régulièrement cette situation chez mes clients. C'est normal, et surtout, c'est temporaire. Voici comment relancer la machine.",

      "La règle des 5 minutes est la technique la plus efficace pour vaincre l'inertie. Le principe est simple : engagez-vous à faire l'activité pendant seulement 5 minutes. Pas 30, pas une heure — juste 5 minutes. Mettez vos chaussures de sport et marchez 5 minutes. Ouvrez votre tapis de yoga et faites 5 minutes d'étirements. Dans 80% des cas, une fois lancé, vous continuerez bien au-delà. Et si vous arrêtez après 5 minutes ? C'est 5 minutes de plus que zéro, et votre cerveau enregistre quand même une victoire.",

      "La motivation ne précède pas l'action — elle en découle. C'est l'erreur la plus courante : attendre d'être motivé pour agir. En réalité, c'est l'inverse qui fonctionne. L'action, même minime, déclenche la production de dopamine (l'hormone de la récompense et de la motivation). Chaque petite action accomplie crée un cercle vertueux : action → dopamine → envie d'en faire plus → action. C'est pourquoi les micro-habitudes sont si puissantes.",

      "Changez votre environnement pour changer votre état d'esprit. Quand vous êtes dans une routine monotone, votre cerveau passe en mode automatique et la motivation s'émousse. Brisez le cycle : entraînez-vous dans un lieu différent, essayez une nouvelle recette, prenez un itinéraire différent pour aller au travail, ou réorganisez votre espace. Le simple fait de changer de cadre stimule la curiosité et la dopamine.",

      "Le pouvoir de la micro-action ne doit pas être sous-estimé. Au lieu de vous fixer des objectifs ambitieux qui vous paralysent (« je dois perdre 10 kg », « je dois m'entraîner 5 fois par semaine »), décomposez en actions minuscules : « aujourd'hui, je mange un légume de plus », « je fais 10 squats avant ma douche », « je bois un verre d'eau au réveil ». Ces micro-victoires s'accumulent et reconstruisent progressivement votre confiance et votre élan.",

      "Prenez soin de vos fondamentaux : sommeil, hydratation, alimentation. Un manque de motivation est souvent le symptôme d'un déséquilibre physiologique. Dormez-vous suffisamment (7-8h) ? Buvez-vous assez d'eau (2L/jour) ? Mangez-vous suffisamment de protéines et de glucides complexes pour alimenter votre cerveau et vos muscles ? Avant de chercher des solutions complexes, réglez les bases. Un client qui « manquait de motivation » a retrouvé toute son énergie simplement en passant de 5h30 à 7h de sommeil par nuit.",

      "Enfin, soyez bienveillant avec vous-même. Les passages à vide font partie du parcours de progression. Ils ne signifient pas que vous avez échoué ou que vous êtes paresseux. Parfois, votre corps et votre esprit ont besoin de ralentir pour mieux repartir. Le rôle d'un coach sportif est justement de vous accompagner dans ces moments : adapter les séances à votre état du jour, maintenir le fil de la régularité même à basse intensité, et vous rappeler tout le chemin que vous avez déjà parcouru.",
    ],
    contentEn: [
      "There are days — sometimes weeks — when motivation seems to have disappeared. You're not really bad, but you're not really good either. Everything feels like a considerable effort, and the drive to progress has gone quiet. As a sports coach in Valbonne, I regularly encounter this situation with my clients. It is normal, and above all, it is temporary. Here is how to get the engine going again.",
      "The 5-minute rule is the most effective technique for overcoming inertia. The principle is simple: commit to doing the activity for just 5 minutes. Not 30, not an hour — just 5 minutes. Put on your trainers and walk for 5 minutes. Roll out your yoga mat and stretch for 5 minutes. In 80% of cases, once you've started, you'll carry on well beyond that. And if you stop after 5 minutes? That's 5 minutes more than zero, and your brain still registers it as a win.",
      'Motivation does not precede action — it follows from it. This is the most common mistake: waiting to feel motivated before acting. In reality, the opposite works. Even the smallest action triggers dopamine (the reward and motivation hormone). Each small completed action creates a virtuous cycle: action → dopamine → desire to do more → action. That is why micro-habits are so powerful.',
      "Change your environment to change your mindset. When you're stuck in a monotonous routine, your brain goes on autopilot and motivation fades. Break the cycle: train somewhere different, try a new recipe, take a different route to work, or rearrange your space. Simply changing your surroundings stimulates curiosity and dopamine.",
      "The power of micro-actions should not be underestimated. Instead of setting ambitious goals that paralyze you ('I need to lose 10 kg', 'I need to train 5 times a week'), break things down into tiny actions: 'today I'll eat one more vegetable', 'I'll do 10 squats before my shower', 'I'll drink a glass of water when I wake up'. These micro-wins accumulate and gradually rebuild your confidence and momentum.",
      "Take care of your fundamentals: sleep, hydration, nutrition. Lack of motivation is often a symptom of a physiological imbalance. Are you sleeping enough (7–8h)? Drinking enough water (2L/day)? Eating enough protein and complex carbohydrates to fuel your brain and muscles? Before looking for complex solutions, fix the basics. One client who 'lacked motivation' recovered all his energy simply by going from 5.5 to 7 hours of sleep per night.",
      'Finally, be kind to yourself. Slumps are part of the progression journey. They do not mean you have failed or that you are lazy. Sometimes your body and mind need to slow down in order to rebound. The role of a sports coach is precisely to support you through these moments: adapting sessions to how you feel each day, maintaining the thread of consistency even at low intensity, and reminding you of how far you have already come.',
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
