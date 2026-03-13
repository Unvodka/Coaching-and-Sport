"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import CoachContactButton from "@/components/portal/CoachContactButton";

interface WellnessProgramProps {
  moodScore: number;
  energyLevel: number;
  sleepQuality?: number | null;
  stressLevel?: number | null;
  onDismiss: () => void;
}

interface DayPlan {
  icon: string;
  activity: { fr: string; en: string };
  duration: string;
  detail: { fr: string; en: string };
  alternative?: {
    icon: string;
    activity: { fr: string; en: string };
    detail: { fr: string; en: string };
  };
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

function getProgram(mood: number, energy: number, sleep: number | null, stress: number | null): Program {
  // ── HIGH PERFORMER: 3+ values ≥ 8 → Programme Athlète Complet ────────────
  const values = [mood, energy, sleep ?? 0, stress !== null ? (10 - stress) : 0];
  const highCount = values.filter(v => v >= 8).length;
  if (highCount >= 3) {
    return {
      emoji: "🏅",
      title: {
        fr: "Programme Athlète Complet — 5 jours pour performer au sommet",
        en: "Complete Athlete Program — 5 days to perform at your peak",
      },
      intro: {
        fr: "Vous êtes dans un état exceptionnel : énergie, humeur, sommeil et maîtrise du stress tous au vert. Ce programme exploite cette fenêtre optimale avec 3 séances de sport intensives et 2 séances de mobilité pour maximiser vos gains tout en préservant votre récupération.",
        en: "You're in exceptional shape: energy, mood, sleep, and stress control all in the green. This program exploits this optimal window with 3 intensive sport sessions and 2 mobility sessions to maximize gains while preserving recovery.",
      },
      days: [
        {
          icon: "🏋️",
          activity: { fr: "Musculation — Force & puissance", en: "Strength training — Power & force" },
          duration: "50 min",
          detail: {
            fr: "Séance complète en pyramide ascendante : Squats (5×5), Développé couché (5×5), Soulevé de terre (4×5), Tractions (4×max). Charges maximales, repos 2-3 min entre les séries. Profitez de votre état optimal pour battre vos records.",
            en: "Full session in ascending pyramid: Squats (5×5), Bench press (5×5), Deadlift (4×5), Pull-ups (4×max). Maximum loads, 2-3 min rest between sets. Use your optimal state to beat your records.",
          },
        },
        {
          icon: "🧘",
          activity: { fr: "Mobilité & stretching profond — Haut du corps", en: "Mobility & deep stretching — Upper body" },
          duration: "35 min",
          detail: {
            fr: "Mobilité articulaire des épaules, poignets et thoracique (10 min), puis stretching profond pectoraux, dos et biceps (15 min), puis foam roller sur les zones travaillées la veille (10 min). La mobilité régulière augmente les performances de 20%.",
            en: "Joint mobility for shoulders, wrists, and thoracic spine (10 min), then deep stretching for chest, back, and biceps (15 min), then foam roller on yesterday's worked areas (10 min). Regular mobility increases performance by 20%.",
          },
        },
        {
          icon: "🏊",
          activity: { fr: "Natation — Endurance & technique", en: "Swimming — Endurance & technique" },
          duration: "45 min",
          detail: {
            fr: "Échauffement 300m varié, puis 6×100m en nage complète avec 20s de repos, puis 4×50m sprint, puis 200m récupération. Travaillez la technique sur chaque longueur : alignement, prise d'eau, rotation des hanches.",
            en: "300m varied warm-up, then 6×100m full stroke with 20s rest, then 4×50m sprint, then 200m recovery. Work on technique every length: alignment, catch, hip rotation.",
          },
          alternative: {
            icon: "🚴",
            activity: { fr: "Vélo / cardio intensif", en: "Cycling / intensive cardio" },
            detail: {
              fr: "45 min de vélo en alternant 5 min à 70% de fréquence cardiaque max et 2 min à 90%. Même bénéfice cardiovasculaire et endurance que la natation sans piscine. Terminez par 5 min à rythme léger.",
              en: "45 min cycling alternating 5 min at 70% max heart rate and 2 min at 90%. Same cardiovascular and endurance benefit as swimming without a pool. Finish with 5 min at easy pace.",
            },
          },
        },
        {
          icon: "🧘",
          activity: { fr: "Mobilité & stretching profond — Bas du corps", en: "Mobility & deep stretching — Lower body" },
          duration: "35 min",
          detail: {
            fr: "Mobilité hanches, genoux et chevilles (10 min), puis stretching profond quadriceps, ischio-jambiers et fessiers (15 min), puis foam roller sur les jambes (10 min). Indispensable après les séances de force pour éviter les blessures et favoriser la croissance musculaire.",
            en: "Hip, knee, and ankle mobility (10 min), then deep stretching for quads, hamstrings, and glutes (15 min), then foam roller on legs (10 min). Essential after strength sessions to prevent injury and promote muscle growth.",
          },
        },
        {
          icon: "🔥",
          activity: { fr: "HIIT complet + gainage avancé", en: "Full HIIT + advanced core" },
          duration: "40 min",
          detail: {
            fr: "5 rounds de Tabata (20s effort / 10s repos × 8) : burpees, squat jumps, sprint sur place, mountain climbers. Puis 10 min de gainage avancé : planche latérale, dragon flag, ab wheel, relevés de jambes. Donnez tout sur le dernier jour !",
            en: "5 Tabata rounds (20s work / 10s rest × 8): burpees, jump squats, high knees, mountain climbers. Then 10 min advanced core: side plank, dragon flag, ab wheel, leg raises. Give everything on the last day!",
          },
        },
      ],
      bonusTip: {
        fr: "Dans cet état optimal, votre corps assimile mieux les protéines. Visez 2g de protéines par kg de poids corporel cette semaine, répartis sur 4-5 prises. Dormez minimum 7h30 pour maximiser la synthèse musculaire pendant ce programme intensif.",
        en: "In this optimal state, your body absorbs protein better. Aim for 2g of protein per kg of body weight this week, spread over 4-5 meals. Sleep at least 7h30 to maximize muscle synthesis during this intensive program.",
      },
      ctaLabel: { fr: "Voir les programmes d'entraînement", en: "See workout programs" },
      ctaHref: "/portal/workouts",
    };
  }

  // ── SLEEP-PRIORITY PROGRAMS ──────────────────────────────────────────────
  // Bad sleep + high stress → Programme Sommeil & Déstress
  if (sleep !== null && stress !== null && sleep <= 4 && stress >= 7) {
    return {
      emoji: "😴",
      title: {
        fr: "Programme Sommeil & Déstress — 5 jours pour retrouver la sérénité",
        en: "Sleep & De-stress Program — 5 days to find serenity",
      },
      intro: {
        fr: "Mauvais sommeil et stress élevé forment un cercle vicieux difficile à briser. Ce programme combine des techniques de gestion du stress, des rituels de sommeil et une activité physique douce pour couper ce cycle et restaurer votre équilibre.",
        en: "Poor sleep and high stress form a vicious cycle that's hard to break. This program combines stress management techniques, sleep rituals, and gentle physical activity to break this cycle and restore your balance.",
      },
      days: [
        {
          icon: "🫁",
          activity: { fr: "Cohérence cardiaque & respiration", en: "Cardiac coherence & breathing" },
          duration: "10 min",
          detail: {
            fr: "3 fois par jour (matin, midi, soir) : inspirez 5 secondes, expirez 5 secondes, pendant 5 minutes. Cette technique réduit le cortisol en 8 minutes. Utilisez une app comme Kardia ou RespiRelax.",
            en: "3 times a day (morning, noon, evening): inhale 5 seconds, exhale 5 seconds, for 5 minutes. This technique reduces cortisol in 8 minutes. Use an app like Kardia or RespiRelax.",
          },
        },
        {
          icon: "🚶",
          activity: { fr: "Marche déstressante en nature", en: "Stress-relief walk in nature" },
          duration: "30 min",
          detail: {
            fr: "Marche lente en plein air, sans téléphone. Concentrez-vous sur 5 choses que vous voyez, 4 que vous entendez, 3 que vous touchez. Cette technique de pleine conscience ancre dans le présent et coupe le flux de pensées stressantes.",
            en: "Slow walk outdoors, without your phone. Focus on 5 things you see, 4 you hear, 3 you touch. This mindfulness technique grounds you in the present and cuts the flow of stressful thoughts.",
          },
        },
        {
          icon: "🛁",
          activity: { fr: "Rituel bain chaud + digital detox", en: "Warm bath ritual + digital detox" },
          duration: "45 min",
          detail: {
            fr: "1h30 avant de dormir : bain chaud à 38-40°C pendant 20 min (abaisse la température corporelle et déclenche le sommeil), puis aucun écran. Lisez, méditez ou écoutez de la musique douce.",
            en: "1.5h before sleep: warm bath at 38-40°C for 20 min (lowers body temperature and triggers sleep), then no screens. Read, meditate, or listen to soft music.",
          },
        },
        {
          icon: "🧘",
          activity: { fr: "Yoga Nidra (sommeil yogique)", en: "Yoga Nidra (yogic sleep)" },
          duration: "25 min",
          detail: {
            fr: "Allongez-vous confortablement et suivez une séance de Yoga Nidra guidée (YouTube ou app Insight Timer). Cette pratique équivaut à 2-3h de sommeil réparateur et réduit le cortisol de 30%. Idéal avant de dormir.",
            en: "Lie down comfortably and follow a guided Yoga Nidra session (YouTube or Insight Timer app). This practice is equivalent to 2-3h of restorative sleep and reduces cortisol by 30%. Ideal before sleeping.",
          },
        },
        {
          icon: "📓",
          activity: { fr: "Journaling anti-stress + bilan", en: "Anti-stress journaling + review" },
          duration: "15 min",
          detail: {
            fr: "Chaque soir, écrivez : 3 choses positives du jour, 1 chose qui vous a stressé(e) et comment vous l'avez gérée, et vos intentions pour demain. Vider l'esprit sur papier améliore la qualité du sommeil de 42%.",
            en: "Each evening, write: 3 positive things from the day, 1 thing that stressed you and how you handled it, and your intentions for tomorrow. Emptying the mind on paper improves sleep quality by 42%.",
          },
        },
      ],
      bonusTip: {
        fr: "Évitez la caféine après 14h, gardez votre chambre à 18-19°C et levez-vous à la même heure chaque jour même le week-end. La régularité est la clé d'un sommeil de qualité.",
        en: "Avoid caffeine after 2pm, keep your bedroom at 18-19°C, and wake up at the same time every day including weekends. Consistency is the key to quality sleep.",
      },
      ctaLabel: { fr: "Explorer les recettes anti-stress", en: "Explore anti-stress recipes" },
      ctaHref: "/portal/recipes",
    };
  }

  // Bad sleep only (sleep ≤ 4, stress not high) → Programme Récupération Sommeil
  if (sleep !== null && sleep <= 4 && (stress === null || stress < 7)) {
    return {
      emoji: "🌙",
      title: {
        fr: "Programme Récupération Sommeil — 5 jours pour mieux dormir",
        en: "Sleep Recovery Program — 5 days to sleep better",
      },
      intro: {
        fr: "La qualité du sommeil impacte directement votre énergie, votre humeur et vos performances sportives. Ce programme restructure vos habitudes de sommeil avec des approches scientifiquement prouvées pour retrouver des nuits réparatrices.",
        en: "Sleep quality directly impacts your energy, mood, and sports performance. This program restructures your sleep habits with scientifically proven approaches to restore restorative nights.",
      },
      days: [
        {
          icon: "⏰",
          activity: { fr: "Anchor sleep — heure fixe de réveil", en: "Anchor sleep — fixed wake time" },
          duration: "Toute la semaine",
          detail: {
            fr: "La règle n°1 : réveillez-vous à la même heure chaque matin, même le week-end. Cela synchronise votre horloge circadienne en 3-5 jours. Exposez-vous à la lumière naturelle dans les 30 minutes suivant le réveil.",
            en: "Rule #1: wake up at the same time every morning, even on weekends. This syncs your circadian clock in 3-5 days. Expose yourself to natural light within 30 minutes of waking.",
          },
        },
        {
          icon: "🏃",
          activity: { fr: "Activité physique matinale", en: "Morning physical activity" },
          duration: "20 min",
          detail: {
            fr: "Une activité physique le matin (même courte) améliore le sommeil du soir de 65%. Jogging, vélo, natation ou HIIT léger. L'important est de la faire avant 14h pour ne pas perturber le sommeil.",
            en: "Morning physical activity (even brief) improves evening sleep by 65%. Jogging, cycling, swimming, or light HIIT. The key is to do it before 2pm to avoid disrupting sleep.",
          },
        },
        {
          icon: "🍵",
          activity: { fr: "Nutrition pro-sommeil", en: "Sleep-friendly nutrition" },
          duration: "Toute la semaine",
          detail: {
            fr: "Favorisez le soir : tryptophane (dinde, œufs, banane), magnésium (amandes, épinards), tisane de camomille ou valériane. Évitez l'alcool, le sucre raffiné et les repas copieux après 20h.",
            en: "Favor in the evening: tryptophan (turkey, eggs, banana), magnesium (almonds, spinach), chamomile or valerian tea. Avoid alcohol, refined sugar, and heavy meals after 8pm.",
          },
        },
        {
          icon: "📵",
          activity: { fr: "Protocole chambre noire", en: "Dark room protocol" },
          duration: "1h avant le coucher",
          detail: {
            fr: "1h avant de dormir : pas d'écrans (ou lunettes anti-lumière bleue), lumières tamisées, température chambre à 18°C, oreiller frais. Utilisez des bouchons d'oreilles ou un masque si nécessaire.",
            en: "1h before sleep: no screens (or blue light glasses), dim lights, room temperature at 18°C, cool pillow. Use earplugs or a sleep mask if needed.",
          },
        },
        {
          icon: "🧘",
          activity: { fr: "Relaxation musculaire progressive", en: "Progressive muscle relaxation" },
          duration: "15 min",
          detail: {
            fr: "Au lit : contractez chaque groupe musculaire 5 secondes puis relâchez, des pieds vers la tête. Cette technique réduit l'hyperactivation physique et mentale qui empêche de dormir. Pratiquez-la chaque soir.",
            en: "In bed: tense each muscle group for 5 seconds then release, from feet to head. This technique reduces the physical and mental hyperactivation that prevents sleep. Practice it every evening.",
          },
        },
      ],
      bonusTip: {
        fr: "Tenez un journal de sommeil cette semaine : heure de coucher, de lever, qualité ressentie. Identifier vos patterns est la première étape pour les améliorer. Votre journal bien-être est parfait pour ça !",
        en: "Keep a sleep diary this week: bedtime, wake time, perceived quality. Identifying your patterns is the first step to improving them. Your wellness journal is perfect for that!",
      },
      ctaLabel: { fr: "Voir les recettes du soir", en: "See evening recipes" },
      ctaHref: "/portal/recipes",
    };
  }

  // High stress only (stress ≥ 7, sleep not bad) → Programme Anti-Stress
  if (stress !== null && stress >= 7 && (sleep === null || sleep > 4)) {
    return {
      emoji: "🧠",
      title: {
        fr: "Programme Anti-Stress — 5 jours pour retrouver le calme",
        en: "Anti-Stress Program — 5 days to find calm",
      },
      intro: {
        fr: "Un stress chronique élevé épuise le corps et l'esprit progressivement. Ce programme combine activité physique, techniques mentales et nutrition ciblée pour réduire durablement votre niveau de cortisol et retrouver un équilibre sain.",
        en: "Chronic high stress gradually exhausts body and mind. This program combines physical activity, mental techniques, and targeted nutrition to sustainably reduce your cortisol levels and restore a healthy balance.",
      },
      days: [
        {
          icon: "🏊",
          activity: { fr: "Natation ou activité aquatique", en: "Swimming or water activity" },
          duration: "30 min",
          detail: {
            fr: "L'eau a un effet naturellement apaisant sur le système nerveux. Nage douce ou aquagym, sans objectif de performance. Concentrez-vous sur la sensation de l'eau et votre respiration. Excellent anti-stress prouvé scientifiquement.",
            en: "Water has a naturally soothing effect on the nervous system. Gentle swimming or aqua gym, with no performance goal. Focus on the sensation of the water and your breathing. Scientifically proven excellent stress reliever.",
          },
          alternative: {
            icon: "🚶",
            activity: { fr: "Marche en forêt / plein air", en: "Forest / outdoor walk" },
            detail: {
              fr: "La nature a le même effet apaisant que l'eau. Marche lente de 30 min dans un parc ou en forêt, sans téléphone. Pratiquez le 'shinrin-yoku' (bain de forêt) : observez, respirez, ressentez. Réduit le cortisol de 16%.",
              en: "Nature has the same soothing effect as water. Slow 30-min walk in a park or forest, without your phone. Practice 'shinrin-yoku' (forest bathing): observe, breathe, feel. Reduces cortisol by 16%.",
            },
          },
        },
        {
          icon: "🌿",
          activity: { fr: "Méditation mindfulness", en: "Mindfulness meditation" },
          duration: "15 min",
          detail: {
            fr: "Asseyez-vous confortablement et observez vos pensées sans les juger. Quand l'esprit vagabonde, ramenez doucement l'attention à la respiration. Même 10 minutes par jour réduisent le stress perçu de 35% en 8 semaines.",
            en: "Sit comfortably and observe your thoughts without judging them. When the mind wanders, gently bring attention back to breathing. Even 10 minutes a day reduces perceived stress by 35% in 8 weeks.",
          },
        },
        {
          icon: "💪",
          activity: { fr: "Sport intensif libérateur", en: "Intense liberating workout" },
          duration: "35 min",
          detail: {
            fr: "Le sport intense est l'un des meilleurs régulateurs du cortisol. Circuit HIIT, boxe, course rapide — donnez tout pendant 30 min. Après l'effort, votre corps entre dans un état de relaxation profonde dit 'post-exercise hypotension'.",
            en: "Intense exercise is one of the best cortisol regulators. HIIT circuit, boxing, fast running — give it your all for 30 min. After the effort, your body enters a state of deep relaxation called post-exercise hypotension.",
          },
        },
        {
          icon: "🍽️",
          activity: { fr: "Nutrition anti-cortisol", en: "Anti-cortisol nutrition" },
          duration: "Toute la semaine",
          detail: {
            fr: "Privilégiez : oméga-3 (saumon, sardines, noix), magnésium (chocolat noir 70%+, amandes), vitamine C (kiwi, poivron rouge), adaptogènes (ashwagandha, rhodiola). Réduisez caféine, alcool et sucre raffiné.",
            en: "Prioritize: omega-3 (salmon, sardines, walnuts), magnesium (70%+ dark chocolate, almonds), vitamin C (kiwi, red pepper), adaptogens (ashwagandha, rhodiola). Reduce caffeine, alcohol, and refined sugar.",
          },
        },
        {
          icon: "🤝",
          activity: { fr: "Connexion sociale & lâcher-prise", en: "Social connection & letting go" },
          duration: "Selon disponibilité",
          detail: {
            fr: "Le lien social est l'antidote naturel au stress. Planifiez une activité avec des proches, appelez un ami, rejoignez un cours collectif. Et pratiquez le lâcher-prise : identifiez ce que vous ne contrôlez pas et décidez consciemment de ne plus y dépenser d'énergie.",
            en: "Social connection is the natural antidote to stress. Plan an activity with loved ones, call a friend, join a group class. And practice letting go: identify what you don't control and consciously decide to stop spending energy on it.",
          },
        },
      ],
      bonusTip: {
        fr: "Le stress chronique vide vos réserves de magnésium. Une supplémentation en magnésium bisglycinate (300-400mg/jour le soir) peut réduire significativement l'anxiété et améliorer la qualité du sommeil en 3-4 semaines.",
        en: "Chronic stress depletes your magnesium reserves. Magnesium bisglycinate supplementation (300-400mg/day in the evening) can significantly reduce anxiety and improve sleep quality within 3-4 weeks.",
      },
      ctaLabel: { fr: "Explorer les recettes anti-stress", en: "Explore anti-stress recipes" },
      ctaHref: "/portal/recipes",
    };
  }

  // Good sleep + low stress + good mood → Programme Optimisation Performance
  if (sleep !== null && stress !== null && sleep >= 7 && stress <= 3 && mood >= 7) {
    return {
      emoji: "⚡",
      title: {
        fr: "Programme Optimisation — 5 jours pour atteindre l'excellence",
        en: "Optimization Program — 5 days to reach excellence",
      },
      intro: {
        fr: "Vous êtes dans des conditions optimales : bon sommeil, stress maîtrisé, moral au top. C'est le moment d'optimiser chaque aspect de votre bien-être pour atteindre votre meilleur niveau de performance physique et mentale.",
        en: "You're in optimal conditions: good sleep, controlled stress, great mood. This is the time to optimize every aspect of your well-being to reach your best physical and mental performance level.",
      },
      days: [
        {
          icon: "🏋️",
          activity: { fr: "Séance de force maximale", en: "Maximum strength session" },
          duration: "50 min",
          detail: {
            fr: "Profitez de votre récupération optimale pour pousser vos charges au maximum. Travaillez en pyramide ascendante sur squats, soulevé de terre et développé couché. Restez entre 3-6 répétitions avec des charges lourdes.",
            en: "Take advantage of your optimal recovery to push your weights to the maximum. Work in ascending pyramid on squats, deadlifts, and bench press. Stay between 3-6 reps with heavy loads.",
          },
        },
        {
          icon: "🧠",
          activity: { fr: "Entraînement mental & visualisation", en: "Mental training & visualization" },
          duration: "20 min",
          detail: {
            fr: "Les sportifs de haut niveau consacrent 20% de leur entraînement au mental. Pratiquez la visualisation : fermez les yeux et imaginez-vous atteindre votre objectif en détail, en ressentant les sensations. 10 min matin et soir.",
            en: "Elite athletes dedicate 20% of their training to mental work. Practice visualization: close your eyes and imagine yourself achieving your goal in detail, feeling the sensations. 10 min morning and evening.",
          },
        },
        {
          icon: "🏊",
          activity: { fr: "Entraînement technique en piscine", en: "Technical pool training" },
          duration: "45 min",
          detail: {
            fr: "Avec un esprit clair et reposé, c'est le meilleur moment pour travailler la technique. 200m échauffement, puis focus sur l'alignement du corps, la prise d'eau et la rotation. Filmez-vous si possible pour analyser vos mouvements.",
            en: "With a clear and rested mind, this is the best time to work on technique. 200m warm-up, then focus on body alignment, catch, and rotation. Film yourself if possible to analyze your movements.",
          },
          alternative: {
            icon: "🚴",
            activity: { fr: "Vélo ou yoga dynamique", en: "Cycling or dynamic yoga" },
            detail: {
              fr: "Le vélo (30 min de fractionné doux) ou une session de yoga vinyasa travaillent à la fois la technique de mouvement, la respiration et la coordination. Parfait pour développer la conscience corporelle sans piscine.",
              en: "Cycling (30 min light intervals) or a vinyasa yoga session work on movement technique, breathing, and coordination. Perfect for developing body awareness without a pool.",
            },
          },
        },
        {
          icon: "🥗",
          activity: { fr: "Optimisation nutritionnelle", en: "Nutritional optimization" },
          duration: "Toute la semaine",
          detail: {
            fr: "En état optimal, optimisez la fenêtre anabolique : 30g de protéines dans les 30 minutes post-entraînement, glucides complexes 2h avant l'effort, créatine monohydrate (5g/jour) pour maximiser les gains de force.",
            en: "In optimal state, optimize the anabolic window: 30g protein within 30 minutes post-workout, complex carbs 2h before effort, creatine monohydrate (5g/day) to maximize strength gains.",
          },
        },
        {
          icon: "📈",
          activity: { fr: "Bilan performance & nouveaux objectifs", en: "Performance review & new goals" },
          duration: "30 min",
          detail: {
            fr: "Analysez vos données (journal, poids, compositions), mesurez vos progrès et fixez des objectifs SMART pour les 4 prochaines semaines. Challengez-vous : un objectif qui ne vous fait pas un peu peur n'est pas assez ambitieux.",
            en: "Analyze your data (journal, weight, compositions), measure your progress and set SMART goals for the next 4 weeks. Challenge yourself: a goal that doesn't scare you a little isn't ambitious enough.",
          },
        },
      ],
      bonusTip: {
        fr: "Documentez tout cette semaine : poids de vos charges, temps de récupération, ressenti. Ces données sont précieuses pour reproduire ces conditions optimales. Votre journal bien-être est votre meilleur allié.",
        en: "Document everything this week: weights, recovery times, how you feel. This data is precious for reproducing these optimal conditions. Your wellness journal is your best ally.",
      },
      ctaLabel: { fr: "Voir les programmes d'entraînement", en: "See workout programs" },
      ctaHref: "/portal/workouts",
    };
  }

  // ── EXISTING MOOD × ENERGY PROGRAMS ─────────────────────────────────────
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
          alternative: {
            icon: "🧘",
            activity: { fr: "Yoga restauratif ou marche douce", en: "Restorative yoga or gentle walk" },
            detail: {
              fr: "Séquence de yoga au sol (posture de l'enfant, papillon, jambes au mur) pendant 25 min, ou marche tranquille de 30 min. Ces pratiques calment le système nerveux aussi efficacement que l'eau.",
              en: "Floor yoga sequence (child's pose, butterfly, legs up the wall) for 25 min, or a gentle 30-min walk. These practices calm the nervous system as effectively as water.",
            },
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
          alternative: {
            icon: "🥊",
            activity: { fr: "Boxe ou HIIT intensif", en: "Boxing or intensive HIIT" },
            detail: {
              fr: "5 rounds de 3 min : shadow boxing, burpees, squat jumps, mountain climbers, corde à sauter — 30s de repos entre chaque. Même intensité que la natation intensive, même libération d'endorphines.",
              en: "5 rounds of 3 min: shadow boxing, burpees, squat jumps, mountain climbers, jump rope — 30s rest between each. Same intensity as intensive swimming, same endorphin release.",
            },
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
          alternative: {
            icon: "🚴",
            activity: { fr: "Vélo ou elliptique technique", en: "Cycling or elliptical technique" },
            detail: {
              fr: "30 min de vélo en travaillant la cadence et la position, ou elliptique en alternant résistances. Même bénéfice cardio et technique que la natation, sans accès à une piscine.",
              en: "30 min cycling focusing on cadence and position, or elliptical alternating resistance levels. Same cardio and technical benefit as swimming, without pool access.",
            },
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
          alternative: {
            icon: "🚶",
            activity: { fr: "Marche douce + étirements", en: "Gentle walk + stretching" },
            detail: {
              fr: "20 min de marche tranquille suivies de 10 min d'étirements doux du corps entier. La marche lente avec des étirements offre le même bénéfice de récupération active que la nage douce.",
              en: "20 min gentle walk followed by 10 min of full-body soft stretching. Slow walking with stretching offers the same active recovery benefit as gentle swimming.",
            },
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
        alternative: {
          icon: "🏃",
          activity: { fr: "Fractionné intensif course à pied", en: "Intensive running intervals" },
          detail: {
            fr: "Échauffement 10 min, puis 10×200m sprint (récupération 30s trot), retour au calme 10 min. Même charge cardiovasculaire et anaérobie que la natation avec sprints. Visez un effort maximal sur chaque sprint.",
            en: "10 min warm-up, then 10×200m sprint (30s jog recovery), 10 min cool-down. Same cardiovascular and anaerobic load as swimming sprints. Aim for maximum effort on each sprint.",
          },
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

export default function WellnessProgram({ moodScore, energyLevel, sleepQuality, stressLevel, onDismiss }: WellnessProgramProps) {
  const { locale } = useLanguage();
  const [expandedDay, setExpandedDay] = useState<number | null>(0);
  const [altDays, setAltDays] = useState<Record<number, boolean>>({});
  const program = getProgram(moodScore, energyLevel, sleepQuality ?? null, stressLevel ?? null);
  const toggleAlt = (i: number) => setAltDays(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-xl border border-indigo-100 shadow-sm overflow-hidden w-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        {/* Row 1: emoji + label + dismiss */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-sm leading-none">{program.emoji}</span>
            <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">
              {locale === "fr" ? "Programme recommandé" : "Recommended program"}
            </p>
          </div>
          <button
            onClick={onDismiss}
            className="text-gray-400 hover:text-gray-600 transition-colors p-0.5 flex-shrink-0 -mr-0.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Row 2: title + intro both at 90% width */}
        <h3 className="text-base font-bold text-heading leading-snug mb-2 text-center" style={{ width: "90%" }}>
          {locale === "fr" ? program.title.fr : program.title.en}
        </h3>
        <p className="text-xs text-gray-600 leading-relaxed text-center" style={{ width: "90%" }}>
          {locale === "fr" ? program.intro.fr : program.intro.en}
        </p>
      </div>

      {/* Days — no horizontal padding so cards go full width */}
      <div className="pb-2">
        <div className="space-y-px">
          {program.days.map((day, i) => (
            <div
              key={i}
              className={`border-y transition-all w-full ${
                expandedDay === i
                  ? "bg-white border-indigo-100"
                  : "bg-white/60 border-gray-100 hover:bg-white"
              }`}
            >
              <button
                onClick={() => setExpandedDay(expandedDay === i ? null : i)}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left"
              >
                <span className="text-base leading-none flex-shrink-0 w-5 text-center">
                  {altDays[i] && day.alternative ? day.alternative.icon : day.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-indigo-400 uppercase">
                      {locale === "fr" ? `Jour ${i + 1}` : `Day ${i + 1}`}
                    </span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-gray-500">{day.duration}</span>
                  </div>
                  <p className="text-sm font-medium text-heading leading-tight truncate">
                    {altDays[i] && day.alternative
                      ? (locale === "fr" ? day.alternative.activity.fr : day.alternative.activity.en)
                      : (locale === "fr" ? day.activity.fr : day.activity.en)}
                  </p>
                </div>
                <svg
                  className={`w-3.5 h-3.5 text-gray-400 transition-transform flex-shrink-0 ${
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
                <div className="px-4 pb-3 pl-11">
                  <p className="text-xs text-gray-600 leading-relaxed mb-2" style={{ width: "90%" }}>
                    {altDays[i] && day.alternative
                      ? (locale === "fr" ? day.alternative.detail.fr : day.alternative.detail.en)
                      : (locale === "fr" ? day.detail.fr : day.detail.en)}
                  </p>
                  {day.alternative && (
                    <button
                      onClick={() => toggleAlt(i)}
                      className="text-xs text-indigo-500 hover:text-indigo-700 font-medium underline underline-offset-2"
                    >
                      {altDays[i]
                        ? (locale === "fr" ? "🏊 Voir avec natation" : "🏊 Show swimming version")
                        : (locale === "fr" ? "🚫 Sans natation / piscine" : "🚫 No swimming / pool")}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bonus tip */}
      <div className="mx-4 my-3 px-3 py-2.5 bg-amber-50/80 border border-amber-200/60 rounded-lg">
        <div className="text-center">
          <p className="text-xs text-amber-800 leading-relaxed text-center">
            <span className="font-semibold">{locale === "fr" ? "Conseil bonus : " : "Bonus tip: "}</span>
            {locale === "fr" ? program.bonusTip.fr : program.bonusTip.en}
          </p>
        </div>
      </div>

      {/* Coach contact */}
      <div className="px-4">
        <CoachContactButton />
      </div>

      {/* CTA */}
      <div className="px-4 pb-4">
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
