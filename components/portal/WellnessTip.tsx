"use client";

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
        title: {
          fr: "Gérer le stress et l'anxiété",
          en: "Managing stress and anxiety",
        },
        description: {
          fr: "Techniques simples pour retrouver la sérénité : respiration, récupération et habitudes bien-être.",
          en: "Simple techniques to find serenity: breathing, recovery, and wellness habits.",
        },
        href: "/blog/gerer-stress-et-anxiete",
        imageSrc: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80",
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
        title: {
          fr: "Sport et santé mentale",
          en: "Sport and mental health",
        },
        description: {
          fr: "Comment l'activité physique transforme votre bien-être psychologique.",
          en: "How physical activity transforms your psychological well-being.",
        },
        href: "/blog/sport-et-sante-mentale",
        imageSrc: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
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
        title: {
          fr: "Retrouver énergie et motivation",
          en: "Finding energy and motivation",
        },
        description: {
          fr: "Des stratégies concrètes pour relancer votre énergie et retrouver l'envie d'avancer.",
          en: "Concrete strategies to boost your energy and find the drive to move forward.",
        },
        href: "/blog/retrouver-energie-et-motivation",
        imageSrc: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=600&q=80",
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
  const showCoachReminder = moodScore <= 6;

  return (
    <div className="space-y-4">
      {/* Main wellness tip card */}
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
            <Link
              href={tip.href}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity no-underline w-fit"
            >
              {locale === "fr" ? tip.action.fr : tip.action.en}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Article recommendation card */}
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
