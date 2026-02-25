"use client";

import Link from "next/link";
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
    label: { fr: string; en: string };
    href: string;
  };
}

function getTip(mood: number, energy: number): Tip {
  // Low mood, low energy (1-3 mood, 1-4 energy)
  if (mood <= 3 && energy <= 4) {
    return {
      emoji: "🌿",
      title: {
        fr: "Prenez soin de vous aujourd'hui",
        en: "Take care of yourself today",
      },
      message: {
        fr: "Les journées difficiles font partie du parcours. Accordez-vous une pause : une marche de 10 minutes en plein air, une douche chaude ou simplement 5 minutes de respiration profonde peuvent faire la différence. L'important est de ne pas rester immobile — même un petit mouvement aide le corps et l'esprit à se remettre en route.",
        en: "Tough days are part of the journey. Give yourself a break: a 10-minute walk outside, a warm shower, or simply 5 minutes of deep breathing can make a difference. The key is not to stay still — even a small movement helps the body and mind reset.",
      },
      action: {
        fr: "Essayez une recette réconfortante",
        en: "Try a comforting recipe",
      },
      href: "/portal/recipes",
      article: {
        label: {
          fr: "Lire un article sur la gestion du stress",
          en: "Read an article about stress management",
        },
        href: "/blog/gerer-stress-et-anxiete",
      },
    };
  }

  // Low mood, high energy (1-3 mood, 5-10 energy)
  if (mood <= 3 && energy > 4) {
    return {
      emoji: "💪",
      title: {
        fr: "Canalisez votre énergie",
        en: "Channel your energy",
      },
      message: {
        fr: "Vous avez de l'énergie malgré une humeur basse — c'est le moment idéal pour un entraînement ! L'exercice physique libère des endorphines, les hormones du bonheur. Un bon workout intense comme du HIIT ou un jogging peut transformer votre état d'esprit en 30 minutes. Utilisez cette énergie à votre avantage.",
        en: "You have energy despite a low mood — this is the perfect time for a workout! Physical exercise releases endorphins, the happiness hormones. A good intense workout like HIIT or jogging can transform your mindset in 30 minutes. Use that energy to your advantage.",
      },
      action: {
        fr: "Voir les programmes d'entraînement",
        en: "See workout programs",
      },
      href: "/portal/workouts",
      article: {
        label: {
          fr: "Lire un article sur le sport et la santé mentale",
          en: "Read an article about sport and mental health",
        },
        href: "/blog/sport-et-sante-mentale",
      },
    };
  }

  // Medium mood (4-6)
  if (mood >= 4 && mood <= 6) {
    return {
      emoji: "🎯",
      title: {
        fr: "Gardez le cap, vous êtes sur la bonne voie",
        en: "Stay on track, you're doing well",
      },
      message: {
        fr: "Une journée normale est une bonne journée ! Pour progresser, la régularité compte plus que l'intensité. Profitez-en pour préparer un repas sain, faire une séance de sport modérée ou planifier votre semaine. Ce sont ces petites habitudes quotidiennes qui construisent les grands résultats.",
        en: "A normal day is a good day! To make progress, consistency matters more than intensity. Take this opportunity to prepare a healthy meal, do a moderate workout, or plan your week. It's these small daily habits that build big results.",
      },
      action: {
        fr: "Préparez un repas sain",
        en: "Prepare a healthy meal",
      },
      href: "/portal/recipes",
      article: {
        label: {
          fr: "Lire un article pour retrouver motivation et énergie",
          en: "Read an article about finding motivation and energy",
        },
        href: "/blog/retrouver-energie-et-motivation",
      },
    };
  }

  // Good mood, low energy (7-10 mood, 1-4 energy)
  if (mood >= 7 && energy <= 4) {
    return {
      emoji: "🧘",
      title: {
        fr: "Bonne humeur, repos mérité",
        en: "Good mood, well-deserved rest",
      },
      message: {
        fr: "Vous vous sentez bien mais votre corps a besoin de repos — écoutez-le ! La récupération est aussi importante que l'entraînement. C'est le moment parfait pour des étirements doux, du yoga ou une méditation. Pensez aussi à bien vous hydrater et à manger un repas nutritif pour recharger vos batteries.",
        en: "You feel good but your body needs rest — listen to it! Recovery is as important as training. This is the perfect time for gentle stretching, yoga, or meditation. Also remember to stay hydrated and eat a nutritious meal to recharge your batteries.",
      },
      action: {
        fr: "Suivez votre poids",
        en: "Track your weight",
      },
      href: "/portal/weight",
    };
  }

  // High mood, high energy (7-10 mood, 5-10 energy)
  return {
    emoji: "🔥",
    title: {
      fr: "Vous êtes au top ! Profitez-en",
      en: "You're at your best! Make the most of it",
    },
    message: {
      fr: "Quelle super journée ! C'est le moment idéal pour repousser vos limites : essayez un nouveau programme d'entraînement, battez votre record personnel ou testez une nouvelle recette saine. Notez aussi ce qui a contribué à cette excellente journée pour pouvoir reproduire ces bonnes habitudes.",
      en: "What a great day! This is the ideal time to push your limits: try a new workout program, beat your personal record, or test a new healthy recipe. Also note what contributed to this excellent day so you can replicate these good habits.",
    },
    action: {
      fr: "Lancez un programme d'entraînement",
      en: "Start a workout program",
    },
    href: "/portal/workouts",
  };
}

export default function WellnessTip({ moodScore, energyLevel }: WellnessTipProps) {
  const { locale } = useLanguage();
  const tip = getTip(moodScore, energyLevel);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <span className="text-4xl flex-shrink-0">{tip.emoji}</span>
        <div className="flex-1">
          <h3 className="font-semibold text-heading text-lg mb-2">
            {locale === "fr" ? tip.title.fr : tip.title.en}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {locale === "fr" ? tip.message.fr : tip.message.en}
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href={tip.href}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity no-underline w-fit"
            >
              {locale === "fr" ? tip.action.fr : tip.action.en}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            {tip.article && (
              <Link
                href={tip.article.href}
                className="inline-flex items-center gap-2 text-sm text-brand-blue hover:text-brand-navy transition-colors no-underline"
              >
                <span>📖</span>
                {locale === "fr" ? tip.article.label.fr : tip.article.label.en}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
