"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";

interface WellnessProgramProps {
  moodScore: number;
  energyLevel: number;
  onDismiss: () => void;
}

interface DayPlan {
  icon: string;
  activity: { fr: string; en: string };
  duration: string;
  detail: { fr: string; en: string };
}

interface Program {
  emoji: string;
  title: { fr: string; en: string };
  intro: { fr: string; en: string };
  days: DayPlan[];
  bonusTip: { fr: string; en: string };
  ctaLabel: { fr: string; en: string };
  ctaHref: string;
}

function getProgram(mood: number, energy: number): Program {
  // Mood bas + énergie basse → Programme douceur & récupération
  if (mood <= 3 && energy <= 4) {
    return {
      emoji: "🌱",
      title: {
        fr: "Programme Douceur — 5 jours pour retrouver l'équilibre",
        en: "Gentle Program — 5 days to find your balance",
      },
      intro: {
        fr: "Quand le corps et l'esprit sont fatigués, la priorité est la récupération active. Ce programme mise sur la douceur pour relancer progressivement votre énergie sans vous brusquer.",
        en: "When body and mind are tired, active recovery is the priority. This program focuses on gentleness to progressively reboot your energy without pushing too hard.",
      },
      days: [
        {
          icon: "🧘",
          activity: { fr: "Respiration & étirements doux", en: "Breathing & gentle stretching" },
          duration: "15 min",
          detail: {
            fr: "5 min de respiration abdominale (inspirez 4s, retenez 4s, expirez 6s), puis 10 min d'étirements légers du dos, des épaules et des hanches.",
            en: "5 min abdominal breathing (inhale 4s, hold 4s, exhale 6s), then 10 min light stretching for back, shoulders, and hips.",
          },
        },
        {
          icon: "🚶",
          activity: { fr: "Marche en plein air", en: "Outdoor walk" },
          duration: "20 min",
          detail: {
            fr: "Marche tranquille en nature ou dans un parc. Concentrez-vous sur vos sensations : l'air, les sons, la lumière. Pas de musique, juste le moment présent.",
            en: "Calm walk in nature or a park. Focus on your senses: the air, sounds, light. No music, just the present moment.",
          },
        },
        {
          icon: "🛁",
          activity: { fr: "Yoga restauratif & automassage", en: "Restorative yoga & self-massage" },
          duration: "20 min",
          detail: {
            fr: "Postures de yoga au sol (enfant, papillon allongé, jambes au mur). Terminez par un automassage de la nuque et des pieds avec une huile.",
            en: "Floor yoga poses (child's pose, reclined butterfly, legs up the wall). Finish with a self-massage of neck and feet with oil.",
          },
        },
        {
          icon: "🏊",
          activity: { fr: "Natation douce ou aquagym", en: "Gentle swimming or aqua gym" },
          duration: "30 min",
          detail: {
            fr: "Nage tranquille ou exercices dans l'eau. L'eau détend les muscles et apaise le système nerveux. Pas de performance, juste du bien-être.",
            en: "Calm swimming or water exercises. Water relaxes muscles and soothes the nervous system. No performance goals, just well-being.",
          },
        },
        {
          icon: "🌅",
          activity: { fr: "Méditation guidée & journaling", en: "Guided meditation & journaling" },
          duration: "15 min",
          detail: {
            fr: "10 min de méditation guidée (scan corporel), puis 5 min d'écriture libre : notez 3 choses positives de votre semaine, même petites.",
            en: "10 min guided meditation (body scan), then 5 min free writing: note 3 positive things from your week, even small ones.",
          },
        },
      ],
      bonusTip: {
        fr: "Pensez à bien dormir (7-9h) et à vous hydrater. Un bain chaud le soir avec quelques gouttes d'huile essentielle de lavande peut aider à trouver le sommeil.",
        en: "Prioritize sleep (7-9h) and hydration. A warm bath in the evening with a few drops of lavender essential oil can help you fall asleep.",
      },
      ctaLabel: { fr: "Voir des recettes réconfortantes", en: "See comforting recipes" },
      ctaHref: "/portal/recipes",
    };
  }

  // Mood bas + énergie haute → Programme défouloir
  if (mood <= 3 && energy > 4) {
    return {
      emoji: "⚡",
      title: {
        fr: "Programme Défouloir — 5 jours pour transformer l'énergie",
        en: "Release Program — 5 days to transform your energy",
      },
      intro: {
        fr: "Vous avez de l'énergie mais le moral ne suit pas ? C'est le moment parfait pour canaliser cette énergie dans l'effort physique. L'exercice intense libère des endorphines et peut renverser votre humeur en quelques séances.",
        en: "You have energy but your mood doesn't match? This is the perfect time to channel that energy into physical effort. Intense exercise releases endorphins and can turn your mood around in just a few sessions.",
      },
      days: [
        {
          icon: "🏃",
          activity: { fr: "Course à pied / jogging", en: "Running / jogging" },
          duration: "30 min",
          detail: {
            fr: "Alternez 5 min de course et 2 min de marche. L'objectif est de bouger sans pression. Si vous préférez, vélo ou corde à sauter fonctionnent aussi.",
            en: "Alternate 5 min running with 2 min walking. The goal is to move without pressure. Bike or jump rope work too if preferred.",
          },
        },
        {
          icon: "🥊",
          activity: { fr: "HIIT ou circuit training", en: "HIIT or circuit training" },
          duration: "25 min",
          detail: {
            fr: "5 rounds de : 30s burpees, 30s squats, 30s mountain climbers, 30s gainage, 30s repos. L'intensité doit être élevée pour libérer les tensions.",
            en: "5 rounds of: 30s burpees, 30s squats, 30s mountain climbers, 30s plank, 30s rest. Intensity should be high to release tension.",
          },
        },
        {
          icon: "🏊",
          activity: { fr: "Natation intensive", en: "Intensive swimming" },
          duration: "40 min",
          detail: {
            fr: "Échauffement 200m, puis 10×50m en crawl avec 20s de repos entre chaque. Terminez par 200m de nage au choix en relâchant le rythme.",
            en: "200m warm-up, then 10×50m freestyle with 20s rest between each. Finish with 200m of any stroke at a relaxed pace.",
          },
        },
        {
          icon: "💪",
          activity: { fr: "Renforcement musculaire haut du corps", en: "Upper body strength training" },
          duration: "35 min",
          detail: {
            fr: "Pompes (3×12), dips sur chaise (3×10), planche (3×45s), rowing avec bouteilles d'eau (3×15). Focus sur la respiration et le contrôle du mouvement.",
            en: "Push-ups (3×12), chair dips (3×10), plank (3×45s), water bottle rows (3×15). Focus on breathing and movement control.",
          },
        },
        {
          icon: "🧘",
          activity: { fr: "Yoga dynamique + étirements", en: "Dynamic yoga + stretching" },
          duration: "30 min",
          detail: {
            fr: "Enchaînements de salutations au soleil pour commencer, puis étirements profonds pour récupérer. Finir par 5 min de Savasana (relaxation allongée).",
            en: "Sun salutation flows to start, then deep stretches for recovery. End with 5 min Savasana (lying relaxation).",
          },
        },
      ],
      bonusTip: {
        fr: "Après l'effort, privilégiez un repas riche en protéines et en glucides complexes pour bien récupérer. Pensez aussi à noter votre humeur après chaque séance — vous verrez la progression !",
        en: "After exercise, prioritize a meal rich in protein and complex carbs for good recovery. Also track your mood after each session — you'll see the progress!",
      },
      ctaLabel: { fr: "Voir les programmes d'entraînement", en: "See workout programs" },
      ctaHref: "/portal/workouts",
    };
  }

  // Mood moyen (4-6) → Programme équilibre
  if (mood >= 4 && mood <= 6) {
    return {
      emoji: "⚖️",
      title: {
        fr: "Programme Équilibre — 5 jours pour consolider vos habitudes",
        en: "Balance Program — 5 days to strengthen your habits",
      },
      intro: {
        fr: "Vous êtes dans une zone neutre — c'est le terrain idéal pour installer de bonnes habitudes durables. Ce programme combine mouvement, nutrition et bien-être mental pour vous faire passer au niveau supérieur.",
        en: "You're in a neutral zone — this is the ideal ground to build lasting good habits. This program combines movement, nutrition, and mental well-being to take you to the next level.",
      },
      days: [
        {
          icon: "🚶",
          activity: { fr: "Marche active + respiration", en: "Brisk walk + breathing" },
          duration: "30 min",
          detail: {
            fr: "Marche rapide (rythme soutenu sans courir). Toutes les 5 minutes, faites une pause de 30s de respiration profonde. Terminez par 5 min de marche lente pour récupérer.",
            en: "Brisk walking (sustained pace without running). Every 5 minutes, take a 30s deep breathing pause. End with 5 min slow walking to cool down.",
          },
        },
        {
          icon: "🍽️",
          activity: { fr: "Préparation de repas sains (meal prep)", en: "Healthy meal prep" },
          duration: "45 min",
          detail: {
            fr: "Préparez 3 repas sains pour les jours suivants. Privilégiez les légumes, les protéines maigres et les céréales complètes. Consultez vos recettes favorites dans le portail !",
            en: "Prepare 3 healthy meals for the coming days. Prioritize vegetables, lean proteins, and whole grains. Check your favorite recipes in the portal!",
          },
        },
        {
          icon: "💪",
          activity: { fr: "Renforcement musculaire complet", en: "Full body strength training" },
          duration: "30 min",
          detail: {
            fr: "Circuit de 4 tours : squats (12), pompes (10), fentes (12 par jambe), gainage (45s), chaise contre le mur (30s). 1 min de repos entre les tours.",
            en: "4-round circuit: squats (12), push-ups (10), lunges (12 per leg), plank (45s), wall sit (30s). 1 min rest between rounds.",
          },
        },
        {
          icon: "🏊",
          activity: { fr: "Natation technique", en: "Technique swimming" },
          duration: "30 min",
          detail: {
            fr: "Travaillez votre technique : 200m d'échauffement, puis des éducatifs (rattrapé, bras tendus, battements). L'eau est excellente pour la concentration et la détente.",
            en: "Work on your technique: 200m warm-up, then drills (catch-up, fingertip drag, kick sets). Water is excellent for focus and relaxation.",
          },
        },
        {
          icon: "📝",
          activity: { fr: "Bilan + objectifs de la semaine", en: "Review + weekly goals" },
          duration: "20 min",
          detail: {
            fr: "Prenez 20 min pour noter : vos victoires de la semaine, ce que vous voulez améliorer, et 3 objectifs concrets pour la semaine prochaine. La clarté crée la motivation.",
            en: "Take 20 min to write: your week's wins, what you want to improve, and 3 concrete goals for next week. Clarity creates motivation.",
          },
        },
      ],
      bonusTip: {
        fr: "La régularité bat l'intensité. Même 15 minutes d'activité par jour ont un impact mesurable sur le bien-être. L'important n'est pas la perfection mais la constance.",
        en: "Consistency beats intensity. Even 15 minutes of daily activity has a measurable impact on well-being. What matters isn't perfection but constancy.",
      },
      ctaLabel: { fr: "Préparer un repas sain", en: "Prepare a healthy meal" },
      ctaHref: "/portal/recipes",
    };
  }

  // Mood bon + énergie basse → Programme récupération active
  if (mood >= 7 && energy <= 4) {
    return {
      emoji: "🌊",
      title: {
        fr: "Programme Récupération Active — 5 jours pour recharger",
        en: "Active Recovery Program — 5 days to recharge",
      },
      intro: {
        fr: "Votre moral est bon mais le corps demande du repos — c'est le signe qu'il faut récupérer intelligemment. Ce programme maintient le mouvement tout en laissant vos muscles et votre système nerveux se régénérer.",
        en: "Your mood is great but your body needs rest — that's the signal to recover smartly. This program maintains movement while letting your muscles and nervous system regenerate.",
      },
      days: [
        {
          icon: "🧘",
          activity: { fr: "Yoga Yin (étirements profonds)", en: "Yin Yoga (deep stretching)" },
          duration: "25 min",
          detail: {
            fr: "Postures tenues 3-5 minutes chacune : papillon, pigeon, torsion allongée, posture de l'enfant. Respirez profondément dans chaque étirement.",
            en: "Hold poses 3-5 min each: butterfly, pigeon, reclined twist, child's pose. Breathe deeply into each stretch.",
          },
        },
        {
          icon: "🚶",
          activity: { fr: "Marche douce + podcast bien-être", en: "Easy walk + wellness podcast" },
          duration: "30 min",
          detail: {
            fr: "Marche tranquille en écoutant un podcast sur la nutrition, le développement personnel ou la méditation. Le mouvement léger aide à la récupération.",
            en: "Easy walk while listening to a podcast on nutrition, personal development, or meditation. Light movement aids recovery.",
          },
        },
        {
          icon: "🏊",
          activity: { fr: "Nage de récupération", en: "Recovery swim" },
          duration: "20 min",
          detail: {
            fr: "Nage très douce en dos crawlé ou brasse. L'eau soutient le corps et détend les muscles sans effort intense. Profitez de l'apesanteur.",
            en: "Very gentle backstroke or breaststroke. Water supports the body and relaxes muscles without intense effort. Enjoy the weightlessness.",
          },
        },
        {
          icon: "🍵",
          activity: { fr: "Automassage + tisane", en: "Self-massage + herbal tea" },
          duration: "20 min",
          detail: {
            fr: "Automassage avec rouleau en mousse (foam roller) : dos, cuisses, mollets. Terminez par une tisane anti-stress (camomille, tilleul ou verveine).",
            en: "Self-massage with a foam roller: back, thighs, calves. Finish with an anti-stress herbal tea (chamomile, linden, or verbena).",
          },
        },
        {
          icon: "🎯",
          activity: { fr: "Mobilité articulaire + méditation", en: "Joint mobility + meditation" },
          duration: "20 min",
          detail: {
            fr: "Rotations douces de toutes les articulations (cou, épaules, hanches, chevilles), puis 10 min de méditation de gratitude : remerciez votre corps pour ce qu'il fait chaque jour.",
            en: "Gentle rotations of all joints (neck, shoulders, hips, ankles), then 10 min gratitude meditation: thank your body for what it does every day.",
          },
        },
      ],
      bonusTip: {
        fr: "La récupération est un entraînement à part entière. Dormez suffisamment, mangez des aliments anti-inflammatoires (poisson, fruits rouges, curcuma) et évitez l'alcool cette semaine.",
        en: "Recovery is a workout in itself. Sleep enough, eat anti-inflammatory foods (fish, berries, turmeric), and avoid alcohol this week.",
      },
      ctaLabel: { fr: "Suivre mon poids & composition", en: "Track my weight & composition" },
      ctaHref: "/portal/weight",
    };
  }

  // Mood bon + énergie haute → Programme performance
  return {
    emoji: "🏆",
    title: {
      fr: "Programme Performance — 5 jours pour vous dépasser",
      en: "Performance Program — 5 days to push your limits",
    },
    intro: {
      fr: "Vous êtes au sommet de votre forme ! C'est le moment parfait pour viser plus haut. Ce programme pousse l'intensité pour profiter de cette fenêtre d'énergie et de motivation. Donnez tout !",
      en: "You're at the top of your game! This is the perfect time to aim higher. This program pushes intensity to make the most of this energy and motivation window. Give it your all!",
    },
    days: [
      {
        icon: "🏃",
        activity: { fr: "Fractionné / interval training", en: "Interval training" },
        duration: "35 min",
        detail: {
          fr: "Échauffement 10 min, puis 8×(1 min sprint / 1 min marche), puis retour au calme 10 min. Poussez l'intensité sur les sprints, c'est là que la magie opère.",
          en: "10 min warm-up, then 8×(1 min sprint / 1 min walk), then 10 min cool-down. Push intensity on sprints, that's where the magic happens.",
        },
      },
      {
        icon: "💪",
        activity: { fr: "Musculation complète + gainage", en: "Full strength + core" },
        duration: "45 min",
        detail: {
          fr: "Squats (4×15), pompes diamant (3×12), fentes sautées (3×10), soulevé de terre (3×12), gainage dynamique (3×1min). Augmentez les charges si possible.",
          en: "Squats (4×15), diamond push-ups (3×12), jump lunges (3×10), deadlifts (3×12), dynamic plank (3×1min). Increase weights if possible.",
        },
      },
      {
        icon: "🏊",
        activity: { fr: "Natation intensive avec sprints", en: "Intensive swimming with sprints" },
        duration: "45 min",
        detail: {
          fr: "300m d'échauffement varié, puis 8×50m sprint crawl (repos 15s), 4×100m en nage complète, 200m de récupération. Visez l'excellence technique.",
          en: "300m varied warm-up, then 8×50m freestyle sprint (15s rest), 4×100m full stroke, 200m recovery. Aim for technical excellence.",
        },
      },
      {
        icon: "🔥",
        activity: { fr: "HIIT Tabata + abdos", en: "Tabata HIIT + abs" },
        duration: "30 min",
        detail: {
          fr: "4 Tabatas (20s effort / 10s repos × 8) : burpees, squats sautés, mountain climbers, jumping jacks. Puis 10 min d'abdos : crunchs, relevés de jambes, russian twists.",
          en: "4 Tabatas (20s work / 10s rest × 8): burpees, jump squats, mountain climbers, jumping jacks. Then 10 min abs: crunches, leg raises, russian twists.",
        },
      },
      {
        icon: "🧘",
        activity: { fr: "Récupération active + bilan", en: "Active recovery + review" },
        duration: "30 min",
        detail: {
          fr: "Yoga dynamique (20 min) pour détendre les muscles sollicités, puis 10 min pour noter vos performances et fixer de nouveaux objectifs. Célébrez vos progrès !",
          en: "Dynamic yoga (20 min) to release worked muscles, then 10 min to log your performance and set new goals. Celebrate your progress!",
        },
      },
    ],
    bonusTip: {
      fr: "Profitez de cette période pour optimiser votre nutrition : augmentez vos apports en protéines (1,6 à 2g/kg de poids de corps), hydratez-vous bien et dormez au moins 7h pour maximiser les résultats.",
      en: "Use this period to optimize nutrition: increase protein intake (1.6-2g/kg body weight), stay well hydrated, and sleep at least 7h to maximize results.",
    },
    ctaLabel: { fr: "Voir les programmes d'entraînement", en: "See workout programs" },
    ctaHref: "/portal/workouts",
  };
}

export default function WellnessProgram({ moodScore, energyLevel, onDismiss }: WellnessProgramProps) {
  const { locale } = useLanguage();
  const [expandedDay, setExpandedDay] = useState<number | null>(0);
  const program = getProgram(moodScore, energyLevel);

  return (
    <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-xl border border-indigo-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{program.emoji}</span>
            <div>
              <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-0.5">
                {locale === "fr" ? "Programme recommandé" : "Recommended program"}
              </p>
              <h3 className="text-lg font-bold text-heading leading-tight">
                {locale === "fr" ? program.title.fr : program.title.en}
              </h3>
            </div>
          </div>
          <button
            onClick={onDismiss}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-3 leading-relaxed">
          {locale === "fr" ? program.intro.fr : program.intro.en}
        </p>
      </div>

      {/* Days */}
      <div className="px-6 pb-2">
        <div className="space-y-2">
          {program.days.map((day, i) => (
            <div
              key={i}
              className={`rounded-lg border transition-all ${
                expandedDay === i
                  ? "bg-white border-indigo-200 shadow-sm"
                  : "bg-white/60 border-gray-100 hover:border-gray-200"
              }`}
            >
              <button
                onClick={() => setExpandedDay(expandedDay === i ? null : i)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left"
              >
                <span className="text-lg flex-shrink-0">{day.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase">
                      {locale === "fr" ? `Jour ${i + 1}` : `Day ${i + 1}`}
                    </span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-gray-500">{day.duration}</span>
                  </div>
                  <p className="text-sm font-medium text-heading truncate">
                    {locale === "fr" ? day.activity.fr : day.activity.en}
                  </p>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${
                    expandedDay === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedDay === i && (
                <div className="px-4 pb-3 pl-12">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {locale === "fr" ? day.detail.fr : day.detail.en}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bonus tip */}
      <div className="mx-6 my-4 px-4 py-3 bg-amber-50/80 border border-amber-200/60 rounded-lg">
        <div className="flex items-start gap-2">
          <span className="text-sm flex-shrink-0">💡</span>
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-semibold">{locale === "fr" ? "Conseil bonus : " : "Bonus tip: "}</span>
            {locale === "fr" ? program.bonusTip.fr : program.bonusTip.en}
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-6">
        <Link
          href={program.ctaHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity no-underline"
        >
          {locale === "fr" ? program.ctaLabel.fr : program.ctaLabel.en}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
