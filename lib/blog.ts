export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
  content: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "perdre-du-poids-avec-coach-sportif",
    title: "Comment perdre du poids durablement avec un coach sportif ?",
    description:
      "Découvrez les clés d'une perte de poids durable grâce à un accompagnement sportif personnalisé. Conseils d'expert pour atteindre vos objectifs sans effet yoyo.",
    date: "2025-01-15",
    readingTime: "6 min",
    category: "Perte de poids",
    imageSrc:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80",
    imageAlt: "Entraînement personnalisé avec un coach sportif pour perdre du poids",
    content: [
      "La perte de poids est l'un des objectifs les plus courants chez les personnes qui font appel à un coach sportif. Pourtant, beaucoup de gens se lancent dans des régimes drastiques ou des programmes d'entraînement trop intenses, ce qui mène souvent à l'abandon et à l'effet yoyo. En tant que coach sportif diplômé à Valbonne, je vous explique comment aborder la perte de poids de manière intelligente et durable.",
      "La première étape est de comprendre que la perte de poids repose sur un déficit calorique modéré, combiné à une activité physique adaptée. Il ne s'agit pas de se priver ou de s'épuiser, mais de trouver le bon équilibre entre alimentation et exercice. Un coach sportif vous aide à définir ce déficit de manière personnalisée, en tenant compte de votre métabolisme, votre mode de vie et vos préférences alimentaires.",
      "L'entraînement en résistance (musculation, circuit training) est souvent sous-estimé dans un programme de perte de poids. Contrairement aux idées reçues, la musculation ne vous rendra pas « trop musclé(e) ». Au contraire, elle augmente votre métabolisme de base, ce qui signifie que vous brûlez plus de calories même au repos. Combinée avec du cardio modéré (natation, marche rapide, HIIT), cette approche donne des résultats visibles en quelques semaines.",
      "La régularité est la clé du succès. Plutôt que de s'entraîner intensément 6 jours par semaine pendant un mois puis d'abandonner, il est bien plus efficace de maintenir 2 à 3 séances hebdomadaires sur le long terme. C'est exactement ce qu'un coach sportif vous aide à mettre en place : un programme réaliste, progressif et motivant.",
      "L'alimentation représente environ 70% des résultats en matière de perte de poids. Mais attention, il ne s'agit pas de suivre un régime strict. Mon approche en tant que coach à Valbonne est basée sur le rééquilibrage alimentaire : apprendre à mieux manger sans frustration, en comprenant les macronutriments et en adoptant des habitudes durables.",
      "Enfin, le suivi régulier est essentiel. Les progrès ne sont pas toujours visibles sur la balance (la masse musculaire pèse plus que la graisse), c'est pourquoi un coach sportif utilise plusieurs indicateurs : tour de taille, photos de progression, performances sportives et bien-être général. Cette approche globale vous permet de rester motivé(e) et de voir vos véritables progrès.",
    ],
  },
  {
    slug: "bienfaits-natation-adultes",
    title: "Les 10 bienfaits de la natation pour les adultes",
    description:
      "La natation est l'un des sports les plus complets. Découvrez ses 10 principaux bienfaits pour la santé, la forme physique et le bien-être mental des adultes.",
    date: "2025-01-28",
    readingTime: "5 min",
    category: "Natation",
    imageSrc:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&q=80",
    imageAlt: "Nageur adulte dans une piscine effectuant un crawl",
    content: [
      "La natation est souvent considérée comme le sport le plus complet qui existe, et pour de bonnes raisons. En tant que maître-nageur diplômé d'État à Valbonne, je constate chaque jour les incroyables bienfaits que cette discipline apporte à mes élèves adultes. Que vous soyez débutant ou nageur confirmé, voici les 10 raisons pour lesquelles vous devriez intégrer la natation dans votre routine sportive.",
      "Premier bienfait : la natation sollicite l'ensemble des groupes musculaires. Contrairement à la course à pied qui travaille principalement les jambes, ou à la musculation ciblée, la natation engage les bras, les jambes, le dos, les abdominaux et les épaules simultanément. Chaque mouvement dans l'eau est un exercice de renforcement musculaire complet.",
      "Deuxième bienfait : elle est extrêmement douce pour les articulations. L'eau porte environ 90% de votre poids corporel, ce qui réduit considérablement le stress articulaire. C'est pourquoi la natation est recommandée pour les personnes souffrant d'arthrose, de douleurs lombaires ou en phase de rééducation après une blessure.",
      "Troisième et quatrième bienfaits : la natation est un excellent brûleur de calories (jusqu'à 500 kcal/heure en nage intensive) et améliore significativement votre endurance cardiovasculaire. Votre cœur et vos poumons deviennent plus efficaces, réduisant le risque de maladies cardiovasculaires.",
      "Cinquième et sixième bienfaits : nager régulièrement améliore votre posture (en renforçant les muscles du dos et de la ceinture abdominale) et augmente votre souplesse. Les mouvements amples dans l'eau étirent naturellement vos muscles et améliorent l'amplitude de vos articulations.",
      "Septième bienfait : la natation a un puissant effet anti-stress. Le contact avec l'eau a un effet apaisant prouvé scientifiquement. La respiration rythmée et la concentration sur les mouvements créent un état méditatif qui réduit le cortisol (hormone du stress) et favorise la production d'endorphines.",
      "Huitième, neuvième et dixième bienfaits : la natation améliore la qualité du sommeil, renforce le système immunitaire, et peut se pratiquer à tout âge sans risque. Que vous ayez 25 ou 75 ans, il existe toujours un style de nage et une intensité adaptés à votre condition physique.",
      "À Valbonne et sur la Côte d'Azur, nous avons la chance de pouvoir pratiquer la natation quasiment toute l'année. Si vous souhaitez découvrir ou redécouvrir les bienfaits de la natation avec un accompagnement professionnel, je serai ravi de vous accueillir pour une séance d'évaluation personnalisée.",
    ],
  },
  {
    slug: "fitness-plein-air-avantages",
    title: "Pourquoi s'entraîner en plein air est meilleur qu'en salle ?",
    description:
      "S'entraîner en extérieur offre des avantages uniques pour le corps et l'esprit. Découvrez pourquoi le fitness en plein air à Valbonne peut transformer vos résultats.",
    date: "2025-02-10",
    readingTime: "5 min",
    category: "Fitness",
    imageSrc:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=80",
    imageAlt: "Séance de fitness en plein air dans un parc verdoyant",
    content: [
      "Si vous hésitez entre vous entraîner en salle de sport ou en plein air, cet article est pour vous. En tant que coach sportif à Valbonne, je propose les deux formats, mais je constate systématiquement que mes clients qui s'entraînent en extérieur obtiennent des résultats supérieurs et maintiennent leur motivation plus longtemps. Voici pourquoi.",
      "L'air frais fait une vraie différence sur vos performances. Des études scientifiques montrent que l'entraînement en extérieur augmente l'apport en oxygène de 10 à 20% par rapport à un environnement fermé et climatisé. Vos muscles sont mieux oxygénés, votre récupération est plus rapide, et votre endurance s'améliore naturellement.",
      "La lumière naturelle du soleil est un allié puissant. L'exposition au soleil pendant l'exercice stimule la production de vitamine D, essentielle pour la santé des os, le système immunitaire et l'humeur. Sur la Côte d'Azur, nous bénéficions de plus de 300 jours de soleil par an, un avantage considérable pour le fitness en plein air à Valbonne.",
      "Le terrain naturel renforce davantage vos muscles stabilisateurs. Contrairement au sol plat d'une salle de sport, les surfaces naturelles (herbe, sable, sentiers) sollicitent constamment vos muscles profonds et améliorent votre proprioception (sens de l'équilibre). Résultat : une meilleure coordination, moins de risques de blessures dans la vie quotidienne.",
      "L'effet psychologique du contact avec la nature est prouvé scientifiquement. Le concept japonais de « bain de forêt » (shinrin-yoku) montre que passer du temps dans un environnement naturel réduit le cortisol de 16% en moyenne. Combiné à l'exercice physique, cet effet anti-stress est multiplié. Mes clients qui s'entraînent en plein air rapportent systématiquement un meilleur bien-être mental.",
      "La variété des exercices possibles en plein air est quasi illimitée. Sprints, escaliers, exercices avec banc, course en côte, circuit training dans un parc — les possibilités sont infinies et chaque séance peut être différente. Cette variété combat la monotonie qui est l'ennemi numéro 1 de la régularité sportive.",
      "Valbonne et ses environs offrent un cadre exceptionnel pour le fitness en plein air. Entre les parcs verdoyants, les sentiers de randonnée et le climat méditerranéen, chaque séance devient un moment de plaisir autant qu'un entraînement efficace. Si vous souhaitez essayer le coaching en plein air, contactez-moi pour une séance découverte gratuite.",
    ],
  },
  {
    slug: "nutrition-sportive-bases",
    title: "Nutrition sportive : les bases pour optimiser vos performances",
    description:
      "Apprenez les fondamentaux de la nutrition sportive pour améliorer vos performances, votre récupération et atteindre vos objectifs physiques plus rapidement.",
    date: "2025-02-25",
    readingTime: "7 min",
    category: "Nutrition",
    imageSrc:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80",
    imageAlt: "Repas équilibré avec protéines, légumes et glucides complexes",
    content: [
      "La nutrition est le pilier souvent négligé de tout programme sportif. On dit que les résultats se font à 30% à l'entraînement et à 70% dans l'assiette, et mon expérience de coach sportif à Valbonne confirme totalement cette proportion. Voici les bases de la nutrition sportive pour vous aider à optimiser vos performances et atteindre vos objectifs.",
      "Les macronutriments sont les trois grandes familles de nutriments dont votre corps a besoin : les protéines, les glucides et les lipides. Chacun joue un rôle essentiel. Les protéines réparent et construisent les muscles (visez 1,6 à 2g par kg de poids corporel si vous êtes actif). Les glucides fournissent l'énergie nécessaire à l'effort (privilégiez les glucides complexes comme les patates douces, le riz complet, les flocons d'avoine). Les lipides sont essentiels au bon fonctionnement hormonal et à l'absorption des vitamines.",
      "L'hydratation est souvent sous-estimée mais elle est cruciale. Une déshydratation de seulement 2% peut réduire vos performances de 10 à 20%. Visez au minimum 2 litres d'eau par jour, davantage les jours d'entraînement. Sur la Côte d'Azur, le climat chaud impose une vigilance particulière, surtout pour le fitness en plein air.",
      "Le timing de vos repas autour de l'entraînement fait une réelle différence. Avant l'effort (2-3h avant) : un repas complet avec glucides, protéines et peu de graisses. Juste après l'effort (dans les 30 minutes) : une collation riche en protéines et glucides rapides pour optimiser la récupération musculaire. C'est la fameuse « fenêtre anabolique » qui maximise l'absorption des nutriments par vos muscles.",
      "Les compléments alimentaires ne sont pas indispensables si votre alimentation est équilibrée. Cependant, certains peuvent être utiles : la créatine pour la force et la puissance (l'un des compléments les plus étudiés et les plus sûrs), la protéine en poudre pour compléter vos apports si nécessaire, et la vitamine D en hiver (même sur la Côte d'Azur, les mois d'hiver peuvent être insuffisants).",
      "Les erreurs nutritionnelles les plus fréquentes que je constate chez mes clients sont : sauter le petit-déjeuner (ce qui ralentit le métabolisme), ne pas manger assez de protéines (surtout chez les femmes), se priver excessivement (ce qui provoque des compulsions alimentaires), et négliger les légumes et les fibres (essentiels pour la digestion et la satiété).",
      "Mon approche nutritionnelle en tant que coach à Valbonne est pragmatique : pas de régime strict, pas d'interdits absolus, mais un rééquilibrage progressif et personnalisé. L'objectif est de vous donner les connaissances et les habitudes pour gérer votre alimentation de manière autonome et durable. C'est cette approche qui distingue un changement temporaire d'une véritable transformation à long terme.",
    ],
  },
  {
    slug: "commencer-sport-apres-40-ans",
    title: "Comment reprendre le sport après 40 ans en toute sécurité",
    description:
      "Il n'est jamais trop tard pour commencer ou reprendre le sport. Guide complet pour une reprise sportive en douceur après 40 ans, avec les conseils d'un coach diplômé.",
    date: "2025-03-12",
    readingTime: "6 min",
    category: "Remise en forme",
    imageSrc:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
    imageAlt: "Personne mature faisant de l'exercice en plein air avec un coach",
    content: [
      "Il n'est jamais trop tard pour commencer ou reprendre une activité physique. À 40, 50 ou même 60 ans, le sport peut transformer votre qualité de vie. En tant que coach sportif à Valbonne, j'accompagne de nombreux clients dans cette tranche d'âge, et les résultats sont toujours remarquables. Voici comment aborder la reprise sportive en toute sécurité.",
      "La première étape indispensable est de consulter votre médecin pour un bilan de santé complet. Un test d'effort est recommandé, surtout si vous êtes sédentaire depuis plusieurs années. Ce bilan permet d'identifier d'éventuelles contre-indications et d'adapter votre programme en conséquence. Une fois le feu vert médical obtenu, vous pouvez commencer sereinement.",
      "La progressivité est le maître-mot après 40 ans. Votre corps a besoin de plus de temps pour s'adapter qu'à 20 ans, et c'est tout à fait normal. Je recommande de commencer par 2 séances par semaine de 30 à 45 minutes, puis d'augmenter progressivement la fréquence et l'intensité sur 4 à 6 semaines. Cette approche graduelle minimise les risques de blessures.",
      "Le choix des activités est crucial. La natation est idéale pour reprendre en douceur car elle ne met aucun stress sur les articulations. La marche active et le fitness adapté en plein air sont également excellents pour reconditionner votre système cardiovasculaire. Le renforcement musculaire léger est essentiel pour prévenir la sarcopénie (perte de masse musculaire liée à l'âge).",
      "La récupération prend une importance majeure après 40 ans. Prévoyez au minimum 48 heures entre deux séances sollicitant les mêmes groupes musculaires. Le sommeil de qualité (7-8 heures par nuit), les étirements post-entraînement et une alimentation riche en protéines sont les trois piliers d'une bonne récupération.",
      "Les bénéfices sont rapides et concrets : après 4 semaines de pratique régulière, vous constaterez une amélioration de votre énergie, de votre sommeil et de votre humeur. Après 8 à 12 semaines, les changements physiques deviennent visibles. La pratique sportive régulière après 40 ans réduit le risque de diabète de type 2, de maladies cardiovasculaires et d'ostéoporose de 30 à 50%.",
      "Le rôle d'un coach sportif est particulièrement précieux dans cette situation. Il adapte chaque exercice à votre condition physique, corrige votre posture pour éviter les blessures, et vous motive sur le long terme. À Valbonne, je propose des séances individuelles parfaitement adaptées aux besoins spécifiques des personnes de plus de 40 ans. Contactez-moi pour une évaluation personnalisée.",
    ],
  },
  {
    slug: "sport-et-sante-mentale",
    title: "Sport et santé mentale : comment l'activité physique transforme votre bien-être psychologique",
    description:
      "Découvrez comment le sport agit sur le stress, l'anxiété et la dépression. Études scientifiques, mécanismes biologiques et conseils pratiques par un coach sportif diplômé à Valbonne.",
    date: "2025-02-23",
    readingTime: "8 min",
    category: "Bien-être",
    imageSrc:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
    imageAlt: "Personne méditant en plein air après une séance de sport, bien-être mental",
    content: [
      "La santé mentale est la Grande Cause nationale 2025 en France, et pour une bonne raison : un Français sur quatre sera confronté à un trouble psychique au cours de sa vie. Stress chronique, anxiété, burn-out, dépression... ces maux touchent toutes les tranches d'âge et tous les milieux sociaux. Mais saviez-vous que l'activité physique est l'une des armes les plus puissantes — et les plus accessibles — pour protéger et améliorer votre santé mentale ? En tant que coach sportif et maître-nageur diplômé à Valbonne, je constate chaque jour les transformations profondes que le sport opère sur le bien-être psychologique de mes clients.",

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
  },
  {
    slug: "gerer-stress-et-anxiete",
    title: "Gérer le stress et l'anxiété : techniques simples pour retrouver la sérénité",
    description:
      "Découvrez des techniques concrètes pour gérer le stress et l'anxiété au quotidien. Respiration, récupération et habitudes bien-être pour retrouver votre équilibre.",
    date: "2025-03-20",
    readingTime: "7 min",
    category: "Bien-être",
    imageSrc:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&q=80",
    imageAlt: "Personne pratiquant la respiration profonde dans un cadre naturel apaisant",
    content: [
      "Le stress et l'anxiété font partie de la vie moderne, mais quand ils deviennent chroniques, ils peuvent sérieusement affecter votre santé physique et mentale. En tant que coach sportif à Valbonne, j'accompagne régulièrement des clients qui arrivent à leur première séance avec un niveau de stress élevé. La bonne nouvelle ? Il existe des techniques simples et accessibles pour reprendre le contrôle.",

      "La respiration est votre outil anti-stress le plus puissant et le plus immédiat. La technique de respiration 4-7-8 est particulièrement efficace : inspirez par le nez pendant 4 secondes, retenez votre souffle pendant 7 secondes, puis expirez lentement par la bouche pendant 8 secondes. Répétez ce cycle 4 fois. Cette technique active votre système nerveux parasympathique, celui qui calme le corps et l'esprit. En moins de 2 minutes, votre rythme cardiaque ralentit et la tension musculaire diminue.",

      "Le mouvement doux est un antidote naturel au stress. Quand vous êtes stressé et fatigué, l'idée d'un entraînement intense peut sembler insurmontable — et ce n'est pas ce dont votre corps a besoin. Privilégiez plutôt une marche de 15 à 20 minutes en plein air, des étirements doux, ou quelques postures de yoga simples. Ces activités réduisent le cortisol (hormone du stress) sans épuiser vos réserves d'énergie déjà limitées.",

      "Le sommeil est la fondation de votre résistance au stress. Un manque de sommeil augmente la production de cortisol de 37% et réduit votre capacité à gérer les émotions. Pour améliorer votre sommeil : maintenez des horaires réguliers (même le week-end), évitez les écrans 1h avant le coucher, gardez votre chambre fraîche (18-19°C) et essayez une routine de relaxation comme la lecture ou la méditation avant de dormir.",

      "L'alimentation joue un rôle clé dans la gestion du stress. Certains aliments favorisent la production de sérotonine et de GABA, les neurotransmetteurs de la détente : les bananes, les noix, le chocolat noir (70% minimum), les poissons gras riches en oméga-3, et les légumes verts. À l'inverse, limitez la caféine après midi et réduisez les sucres raffinés qui provoquent des pics d'énergie suivis de chutes brutales.",

      "La connexion sociale est un besoin fondamental souvent négligé en période de stress. Quand on ne va pas bien, on a tendance à s'isoler, ce qui aggrave le problème. Même un simple appel de 10 minutes avec un ami ou un proche peut réduire significativement le cortisol. Si vous vous entraînez avec un coach, ces séances régulières deviennent aussi un moment de connexion et de soutien qui aide à traverser les périodes difficiles.",

      "Quand consulter un professionnel ? Le stress et l'anxiété ponctuels sont normaux, mais si vous ressentez une anxiété persistante depuis plus de deux semaines, des troubles du sommeil chroniques, une perte d'appétit ou de motivation prolongée, ou des crises de panique, n'hésitez pas à consulter votre médecin ou un psychologue. Le sport et les techniques de relaxation sont de puissants compléments, mais ils ne remplacent pas un accompagnement médical quand il est nécessaire.",
    ],
  },
  {
    slug: "retrouver-energie-et-motivation",
    title: "Comment retrouver énergie et motivation quand on se sent en panne",
    description:
      "Vous vous sentez en panne de motivation ? Découvrez des stratégies concrètes pour relancer votre énergie et retrouver l'envie d'avancer, étape par étape.",
    date: "2025-04-05",
    readingTime: "6 min",
    category: "Bien-être",
    imageSrc:
      "https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=1200&q=80",
    imageAlt: "Personne marchant sur un sentier ensoleillé, symbolisant le retour de la motivation",
    content: [
      "Il y a des jours — parfois des semaines — où la motivation semble avoir disparu. Vous n'êtes pas vraiment mal, mais vous n'êtes pas bien non plus. Tout semble demander un effort considérable, et l'envie de progresser s'est éteinte. En tant que coach sportif à Valbonne, je rencontre régulièrement cette situation chez mes clients. C'est normal, et surtout, c'est temporaire. Voici comment relancer la machine.",

      "La règle des 5 minutes est la technique la plus efficace pour vaincre l'inertie. Le principe est simple : engagez-vous à faire l'activité pendant seulement 5 minutes. Pas 30, pas une heure — juste 5 minutes. Mettez vos chaussures de sport et marchez 5 minutes. Ouvrez votre tapis de yoga et faites 5 minutes d'étirements. Dans 80% des cas, une fois lancé, vous continuerez bien au-delà. Et si vous arrêtez après 5 minutes ? C'est 5 minutes de plus que zéro, et votre cerveau enregistre quand même une victoire.",

      "La motivation ne précède pas l'action — elle en découle. C'est l'erreur la plus courante : attendre d'être motivé pour agir. En réalité, c'est l'inverse qui fonctionne. L'action, même minime, déclenche la production de dopamine (l'hormone de la récompense et de la motivation). Chaque petite action accomplie crée un cercle vertueux : action → dopamine → envie d'en faire plus → action. C'est pourquoi les micro-habitudes sont si puissantes.",

      "Changez votre environnement pour changer votre état d'esprit. Quand vous êtes dans une routine monotone, votre cerveau passe en mode automatique et la motivation s'émousse. Brisez le cycle : entraînez-vous dans un lieu différent, essayez une nouvelle recette, prenez un itinéraire différent pour aller au travail, ou réorganisez votre espace. Le simple fait de changer de cadre stimule la curiosité et la dopamine.",

      "Le pouvoir de la micro-action ne doit pas être sous-estimé. Au lieu de vous fixer des objectifs ambitieux qui vous paralysent (« je dois perdre 10 kg », « je dois m'entraîner 5 fois par semaine »), décomposez en actions minuscules : « aujourd'hui, je mange un légume de plus », « je fais 10 squats avant ma douche », « je bois un verre d'eau au réveil ». Ces micro-victoires s'accumulent et reconstruisent progressivement votre confiance et votre élan.",

      "Prenez soin de vos fondamentaux : sommeil, hydratation, alimentation. Un manque de motivation est souvent le symptôme d'un déséquilibre physiologique. Dormez-vous suffisamment (7-8h) ? Buvez-vous assez d'eau (2L/jour) ? Mangez-vous suffisamment de protéines et de glucides complexes pour alimenter votre cerveau et vos muscles ? Avant de chercher des solutions complexes, réglez les bases. Un client qui « manquait de motivation » a retrouvé toute son énergie simplement en passant de 5h30 à 7h de sommeil par nuit.",

      "Enfin, soyez bienveillant avec vous-même. Les passages à vide font partie du parcours de progression. Ils ne signifient pas que vous avez échoué ou que vous êtes paresseux. Parfois, votre corps et votre esprit ont besoin de ralentir pour mieux repartir. Le rôle d'un coach sportif est justement de vous accompagner dans ces moments : adapter les séances à votre état du jour, maintenir le fil de la régularité même à basse intensité, et vous rappeler tout le chemin que vous avez déjà parcouru.",
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
