"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/useLanguage";

interface WellnessTipProps {
  moodScore: number;
  energyLevel: number;
}

interface Tip {
  emoji: string;
  title: { fr: string; en: string };
  message: { fr: string; en: string };
  action: { fr: string; en: string };
  href: string;
  article?: {
    title: { fr: string; en: string };
    description: { fr: string; en: string };
    href: string;
    imageSrc: string;
  };
}

// Pick a stable variant based on today's date so it doesn't change on re-render
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── LOW MOOD, LOW ENERGY (mood ≤3, energy ≤4) ───────────────────────────────
const LOW_LOW: Tip[] = [
  {
    emoji: "🌿",
    title: { fr: "Prenez soin de vous aujourd'hui", en: "Take care of yourself today" },
    message: {
      fr: "Les journées difficiles font partie du parcours. Accordez-vous une pause : une marche de 10 minutes en plein air, une douche chaude ou simplement 5 minutes de respiration profonde peuvent faire la différence. L'important est de ne pas rester immobile — même un petit mouvement aide le corps et l'esprit à se remettre en route.",
      en: "Tough days are part of the journey. Give yourself a break: a 10-minute walk outside, a warm shower, or simply 5 minutes of deep breathing can make a difference. The key is not to stay still — even a small movement helps the body and mind reset.",
    },
    action: { fr: "Essayez une recette réconfortante", en: "Try a comforting recipe" },
    href: "/portal/recipes",
    article: {
      title: { fr: "Gérer le stress et l'anxiété", en: "Managing stress and anxiety" },
      description: {
        fr: "Techniques simples pour retrouver la sérénité : respiration, récupération et habitudes bien-être.",
        en: "Simple techniques to find serenity: breathing, recovery, and wellness habits.",
      },
      href: "/blog/gerer-stress-et-anxiete",
      imageSrc: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80",
    },
  },
  {
    emoji: "🛁",
    title: { fr: "Douceur et récupération", en: "Gentleness and recovery" },
    message: {
      fr: "Quand le corps et l'esprit sont à plat, la priorité c'est la récupération. Un bain chaud, une tisane, un film réconfortant — accordez-vous ces petits plaisirs sans culpabilité. Demain, vous repartirez plus fort. Le repos est une partie intégrante de la progression.",
      en: "When body and mind are drained, recovery is the priority. A warm bath, herbal tea, a comforting movie — allow yourself these small pleasures without guilt. Tomorrow you'll come back stronger. Rest is an integral part of progress.",
    },
    action: { fr: "Voir mon journal", en: "View my journal" },
    href: "/portal/journal",
  },
  {
    emoji: "🌙",
    title: { fr: "Votre sommeil fait la différence", en: "Your sleep makes the difference" },
    message: {
      fr: "Humeur basse et énergie faible sont souvent liées à un manque de sommeil. Ce soir, essayez de vous coucher 30 minutes plus tôt que d'habitude. Évitez les écrans 1 heure avant de dormir et préparez votre chambre fraîche et sombre. Un bon sommeil réinitialisera tout demain.",
      en: "Low mood and low energy are often linked to sleep deprivation. Tonight, try going to bed 30 minutes earlier than usual. Avoid screens 1 hour before sleeping and keep your room cool and dark. A good night's sleep will reset everything tomorrow.",
    },
    action: { fr: "Explorer les recettes du soir", en: "Explore evening recipes" },
    href: "/portal/recipes",
    article: {
      title: { fr: "Sport et santé mentale", en: "Sport and mental health" },
      description: {
        fr: "Comment l'activité physique transforme votre bien-être psychologique.",
        en: "How physical activity transforms your psychological well-being.",
      },
      href: "/blog/sport-et-sante-mentale",
      imageSrc: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    },
  },
  {
    emoji: "🤝",
    title: { fr: "Vous n'êtes pas seul(e)", en: "You are not alone" },
    message: {
      fr: "Certains jours sont simplement plus lourds que d'autres. Parler à quelqu'un — un ami, un proche ou votre coach — peut alléger ce poids. Ne gardez pas tout pour vous. La vulnérabilité est une force, et demander de l'aide est un acte courageux.",
      en: "Some days are simply heavier than others. Talking to someone — a friend, a loved one, or your coach — can lighten that weight. Don't keep everything to yourself. Vulnerability is strength, and asking for help is a courageous act.",
    },
    action: { fr: "Contacter mon coach", en: "Contact my coach" },
    href: "/#contact",
  },
];

// ─── LOW MOOD, HIGH ENERGY (mood ≤3, energy ≥5) ──────────────────────────────
const LOW_HIGH: Tip[] = [
  {
    emoji: "💪",
    title: { fr: "Canalisez votre énergie", en: "Channel your energy" },
    message: {
      fr: "Vous avez de l'énergie malgré une humeur basse — c'est le moment idéal pour un entraînement ! L'exercice physique libère des endorphines, les hormones du bonheur. Un bon workout intense comme du HIIT ou un jogging peut transformer votre état d'esprit en 30 minutes. Utilisez cette énergie à votre avantage.",
      en: "You have energy despite a low mood — this is the perfect time for a workout! Physical exercise releases endorphins, the happiness hormones. A good intense workout like HIIT or jogging can transform your mindset in 30 minutes. Use that energy to your advantage.",
    },
    action: { fr: "Voir les programmes d'entraînement", en: "See workout programs" },
    href: "/portal/workouts",
    article: {
      title: { fr: "Sport et santé mentale", en: "Sport and mental health" },
      description: {
        fr: "Comment l'activité physique transforme votre bien-être psychologique.",
        en: "How physical activity transforms your psychological well-being.",
      },
      href: "/blog/sport-et-sante-mentale",
      imageSrc: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    },
  },
  {
    emoji: "🏃",
    title: { fr: "Bougez, la tête suivra", en: "Move your body, your mind will follow" },
    message: {
      fr: "Quand les pensées s'accumulent, le mouvement est votre meilleur allié. Une course à pied, une session de natation ou même 20 minutes de corde à sauter permettent de vider la tête et d'évacuer les tensions. Ne réfléchissez pas, chaussez vos baskets et sortez.",
      en: "When thoughts pile up, movement is your best ally. A run, a swimming session, or even 20 minutes of jump rope can clear your head and release tension. Don't think about it — just lace up your shoes and go.",
    },
    action: { fr: "Voir les programmes", en: "See programs" },
    href: "/portal/workouts",
  },
  {
    emoji: "🎵",
    title: { fr: "La musique comme moteur", en: "Music as a motor" },
    message: {
      fr: "Vous êtes énergique mais pas dans le bon état d'esprit ? Créez une playlist qui vous donne envie de bouger et lancez une séance de cardio. La combinaison musique + exercice est l'une des méthodes les plus efficaces pour améliorer rapidement l'humeur. Testez 30 minutes et observez le résultat.",
      en: "You're energetic but not in the right headspace? Create a playlist that makes you want to move and start a cardio session. The combination of music + exercise is one of the most effective methods to quickly improve mood. Try 30 minutes and observe the result.",
    },
    action: { fr: "Voir les recettes énergisantes", en: "See energizing recipes" },
    href: "/portal/recipes",
  },
];

// ─── MEDIUM MOOD (mood 4–6) ──────────────────────────────────────────────────
const MEDIUM: Tip[] = [
  {
    emoji: "🎯",
    title: { fr: "Gardez le cap, vous êtes sur la bonne voie", en: "Stay on track, you're doing well" },
    message: {
      fr: "Une journée normale est une bonne journée ! Pour progresser, la régularité compte plus que l'intensité. Profitez-en pour préparer un repas sain, faire une séance de sport modérée ou planifier votre semaine. Ce sont ces petites habitudes quotidiennes qui construisent les grands résultats.",
      en: "A normal day is a good day! To make progress, consistency matters more than intensity. Take this opportunity to prepare a healthy meal, do a moderate workout, or plan your week. It's these small daily habits that build big results.",
    },
    action: { fr: "Préparez un repas sain", en: "Prepare a healthy meal" },
    href: "/portal/recipes",
    article: {
      title: { fr: "Retrouver énergie et motivation", en: "Finding energy and motivation" },
      description: {
        fr: "Des stratégies concrètes pour relancer votre énergie et retrouver l'envie d'avancer.",
        en: "Concrete strategies to boost your energy and find the drive to move forward.",
      },
      href: "/blog/retrouver-energie-et-motivation",
      imageSrc: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=600&q=80",
    },
  },
  {
    emoji: "📊",
    title: { fr: "Suivez vos progrès pour rester motivé(e)", en: "Track your progress to stay motivated" },
    message: {
      fr: "Les jours moyens sont parfaits pour faire le point. Consultez vos données de poids, relisez vos entrées de journal — vous verrez probablement que vous avez progressé plus que vous ne le pensez. La motivation vient souvent en regardant le chemin parcouru.",
      en: "Average days are perfect for taking stock. Check your weight data, re-read your journal entries — you'll probably see that you've progressed more than you think. Motivation often comes from looking at how far you've come.",
    },
    action: { fr: "Voir mon suivi de poids", en: "View my weight tracking" },
    href: "/portal/weight",
  },
  {
    emoji: "🥗",
    title: { fr: "La nutrition, pilier de votre énergie", en: "Nutrition, the pillar of your energy" },
    message: {
      fr: "Une humeur stable passe aussi par une alimentation équilibrée. Aujourd'hui, faites attention à bien vous hydrater (1,5 à 2L d'eau) et misez sur des aliments riches en oméga-3 (poissons gras, noix) et en magnésium (légumes verts, amandes) qui soutiennent l'humeur naturellement.",
      en: "A stable mood also comes from balanced nutrition. Today, make sure to stay well-hydrated (1.5–2L of water) and focus on foods rich in omega-3 (oily fish, walnuts) and magnesium (green vegetables, almonds) that naturally support mood.",
    },
    action: { fr: "Explorer les recettes", en: "Explore recipes" },
    href: "/portal/recipes",
  },
  {
    emoji: "🧠",
    title: { fr: "Petite action, grand impact", en: "Small action, big impact" },
    message: {
      fr: "Vous n'êtes pas au sommet aujourd'hui, et c'est normal. L'astuce : identifiez une seule chose que vous pouvez faire qui améliorera votre journée — même minime. Boire un grand verre d'eau, faire 10 squats, appeler un ami. Une action simple suffit à changer la dynamique.",
      en: "You're not at your peak today, and that's okay. The trick: identify just one thing you can do that will improve your day — even something tiny. Drink a big glass of water, do 10 squats, call a friend. One simple action is enough to change the dynamic.",
    },
    action: { fr: "Voir les programmes", en: "See programs" },
    href: "/portal/workouts",
  },
];

// ─── GOOD MOOD, LOW ENERGY (mood ≥7, energy ≤4) ──────────────────────────────
const HIGH_LOW: Tip[] = [
  {
    emoji: "🧘",
    title: { fr: "Bonne humeur, repos mérité", en: "Good mood, well-deserved rest" },
    message: {
      fr: "Vous vous sentez bien mais votre corps a besoin de repos — écoutez-le ! La récupération est aussi importante que l'entraînement. C'est le moment parfait pour des étirements doux, du yoga ou une méditation. Pensez aussi à bien vous hydrater et à manger un repas nutritif pour recharger vos batteries.",
      en: "You feel good but your body needs rest — listen to it! Recovery is as important as training. This is the perfect time for gentle stretching, yoga, or meditation. Also remember to stay hydrated and eat a nutritious meal to recharge your batteries.",
    },
    action: { fr: "Suivez votre poids", en: "Track your weight" },
    href: "/portal/weight",
  },
  {
    emoji: "🌊",
    title: { fr: "Récupération active", en: "Active recovery" },
    message: {
      fr: "Bonne humeur mais faible énergie : c'est le profil idéal pour une récupération active. Une marche tranquille, une séance de natation douce ou du stretching de 20 minutes vont vous faire du bien sans fatiguer votre corps. L'objectif : maintenir la mobilité et libérer les tensions accumulées.",
      en: "Good mood but low energy: this is the ideal profile for active recovery. A leisurely walk, a gentle swim, or 20 minutes of stretching will do you good without tiring your body. The goal: maintain mobility and release accumulated tension.",
    },
    action: { fr: "Voir les recettes légères", en: "See light recipes" },
    href: "/portal/recipes",
  },
  {
    emoji: "📖",
    title: { fr: "Nourrissez votre esprit", en: "Nourish your mind" },
    message: {
      fr: "Quand l'énergie physique manque mais que l'esprit est positif, c'est le moment de s'instruire. Lisez un article sur la nutrition, regardez une vidéo sur une technique d'entraînement ou planifiez vos objectifs de la semaine. Investir dans votre savoir, c'est aussi progresser.",
      en: "When physical energy is lacking but the mind is positive, it's time to learn. Read an article about nutrition, watch a video on a training technique, or plan your goals for the week. Investing in your knowledge is also progressing.",
    },
    action: { fr: "Voir mes objectifs", en: "View my goals" },
    href: "/portal/weight",
    article: {
      title: { fr: "Retrouver énergie et motivation", en: "Finding energy and motivation" },
      description: {
        fr: "Des stratégies concrètes pour relancer votre énergie et retrouver l'envie d'avancer.",
        en: "Concrete strategies to boost your energy and find the drive to move forward.",
      },
      href: "/blog/retrouver-energie-et-motivation",
      imageSrc: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=600&q=80",
    },
  },
];

// ─── HIGH MOOD, HIGH ENERGY (mood ≥7, energy ≥5) ─────────────────────────────
const HIGH_HIGH: Tip[] = [
  {
    emoji: "🔥",
    title: { fr: "Vous êtes au top ! Profitez-en", en: "You're at your best! Make the most of it" },
    message: {
      fr: "Quelle super journée ! C'est le moment idéal pour repousser vos limites : essayez un nouveau programme d'entraînement, battez votre record personnel ou testez une nouvelle recette saine. Notez aussi ce qui a contribué à cette excellente journée pour pouvoir reproduire ces bonnes habitudes.",
      en: "What a great day! This is the ideal time to push your limits: try a new workout program, beat your personal record, or test a new healthy recipe. Also note what contributed to this excellent day so you can replicate these good habits.",
    },
    action: { fr: "Lancez un programme d'entraînement", en: "Start a workout program" },
    href: "/portal/workouts",
  },
  {
    emoji: "🏆",
    title: { fr: "Journée de champion(ne)", en: "Champion's day" },
    message: {
      fr: "Énergie et motivation au maximum — c'est le moment de faire quelque chose dont vous serez fier(e). Augmentez vos charges, ajoutez des séries à votre programme, ou essayez un nouveau sport. Les jours comme celui-ci sont rares, capitalisez dessus au maximum !",
      en: "Energy and motivation at their peak — this is the time to do something you'll be proud of. Increase your weights, add sets to your program, or try a new sport. Days like this are rare, make the most of them!",
    },
    action: { fr: "Voir les programmes", en: "See programs" },
    href: "/portal/workouts",
  },
  {
    emoji: "✨",
    title: { fr: "Énergie positive, partagez-la !", en: "Positive energy — share it!" },
    message: {
      fr: "Vous rayonnez aujourd'hui ! C'est aussi un excellent moment pour aider un ami à se remettre au sport, préparer un repas sain pour toute la famille ou simplement prendre le temps de noter dans votre journal ce qui vous rend heureux(se). La gratitude renforce la bonne humeur.",
      en: "You're glowing today! It's also a great time to help a friend get back to exercising, prepare a healthy meal for the whole family, or simply take the time to note in your journal what makes you happy. Gratitude reinforces good mood.",
    },
    action: { fr: "Explorer de nouvelles recettes", en: "Explore new recipes" },
    href: "/portal/recipes",
    article: {
      title: { fr: "Sport en plein air sur la Côte d'Azur", en: "Outdoor sports on the French Riviera" },
      description: {
        fr: "Profitez de la nature pour booster vos performances et votre bien-être.",
        en: "Take advantage of nature to boost your performance and well-being.",
      },
      href: "/blog/sport-plein-air-cote-azur",
      imageSrc: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80",
    },
  },
  {
    emoji: "🎽",
    title: { fr: "Battez votre record personnel", en: "Beat your personal record" },
    message: {
      fr: "Avec ce niveau d'énergie et de motivation, c'est la journée parfaite pour établir un nouveau record. Course, natation, musculation — choisissez votre discipline et donnez tout. Après l'effort, pensez à bien récupérer avec un repas riche en protéines et une bonne hydratation.",
      en: "With this level of energy and motivation, it's the perfect day to set a new record. Running, swimming, weightlifting — choose your discipline and give it your all. After the effort, make sure to recover well with a protein-rich meal and good hydration.",
    },
    action: { fr: "Voir les programmes intensifs", en: "See intensive programs" },
    href: "/portal/workouts",
  },
];

function getTips(mood: number, energy: number): Tip[] {
  if (mood <= 3 && energy <= 4) return LOW_LOW;
  if (mood <= 3 && energy > 4) return LOW_HIGH;
  if (mood >= 7 && energy <= 4) return HIGH_LOW;
  if (mood >= 7 && energy > 4) return HIGH_HIGH;
  return MEDIUM;
}

export default function WellnessTip({ moodScore, energyLevel }: WellnessTipProps) {
  const { locale } = useLanguage();
  const tips = getTips(moodScore, energyLevel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tip = useMemo(() => pickRandom(tips), [moodScore, energyLevel]);
  const showCoachReminder = moodScore <= 6;

  return (
    <div className="space-y-4">
      {/* Main wellness tip card */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-xl leading-none flex-shrink-0">{tip.emoji}</span>
          <h3 className="font-semibold text-heading text-base leading-snug">
            {locale === "fr" ? tip.title.fr : tip.title.en}
          </h3>
        </div>
        <div style={{ width: "90%" }} className="mx-auto flex flex-col items-center">
          <p className="text-gray-600 text-sm leading-relaxed mb-4 text-center">
            {locale === "fr" ? tip.message.fr : tip.message.en}
          </p>
          <Link
            href={tip.href}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity no-underline w-fit mx-auto"
          >
            {locale === "fr" ? tip.action.fr : tip.action.en}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Article recommendation */}
      {tip.article && (
        <Link
          href={tip.article.href}
          className="block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow no-underline group"
        >
          <div className="flex flex-col sm:flex-row">
            <div className="relative sm:w-40 h-32 sm:h-auto flex-shrink-0">
              <Image
                src={tip.article.imageSrc}
                alt={tip.article.title[locale] || "Article bien-être"}
                fill
                sizes="(max-width: 640px) 100vw, 160px"
                className="object-cover"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-center">
              <p className="text-xs font-medium text-orange-600 uppercase tracking-wide mb-1">
                {locale === "fr" ? "Article recommandé" : "Recommended article"}
              </p>
              <h4 className="font-semibold text-heading text-base mb-1 group-hover:text-brand-blue transition-colors">
                {locale === "fr" ? tip.article.title.fr : tip.article.title.en}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-2">
                {locale === "fr" ? tip.article.description.fr : tip.article.description.en}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue group-hover:text-brand-navy transition-colors">
                {locale === "fr" ? "Lire l'article" : "Read article"}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* Coach contact reminder */}
      {showCoachReminder && (
        <div className="bg-blue-50 rounded-xl border border-blue-100 p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">💬</span>
            <div>
              <h4 className="font-semibold text-heading text-sm mb-1">
                {locale === "fr"
                  ? "Besoin d'en parler ? Votre coach est là pour vous"
                  : "Need to talk? Your coach is here for you"}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {locale === "fr"
                  ? "N'hésitez pas à me contacter pour en discuter. Ensemble, on peut adapter votre programme et trouver des solutions pour vous aider à vous sentir mieux."
                  : "Don't hesitate to reach out. Together, we can adjust your program and find solutions to help you feel better."}
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-brand-blue rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors no-underline"
              >
                {locale === "fr" ? "Contacter mon coach" : "Contact my coach"}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
