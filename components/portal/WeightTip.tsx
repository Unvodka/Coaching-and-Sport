"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";

export interface WeightEntry {
  weight_kg: number;
  body_fat_pct?: number | null;
  visceral_fat?: number | null;
  muscle_mass_kg?: number | null;
  water_pct?: number | null;
  bmi?: number | null;
}

interface Tip {
  emoji: string;
  title: { fr: string; en: string };
  body: { fr: string; en: string };
  activities: { fr: string; en: string }[];
  color: string; // tailwind bg class for accent
}

function getTip(entry: WeightEntry): Tip {
  const fat = entry.body_fat_pct ?? null;
  const visceral = entry.visceral_fat ?? null;
  const muscle = entry.muscle_mass_kg ?? null;
  const bmi = entry.bmi ?? null;

  // Priority 1 — High visceral fat (≥ 13)
  if (visceral !== null && visceral >= 13) {
    return {
      emoji: "🔥",
      color: "bg-red-50 border-red-200",
      title: {
        fr: "Graisse viscérale élevée — priorité cardio",
        en: "High visceral fat — cardio priority",
      },
      body: {
        fr: "La graisse viscérale est la plus dangereuse pour la santé cardiovasculaire. Le cardio modéré est la méthode la plus efficace pour la réduire rapidement.",
        en: "Visceral fat is the most dangerous for cardiovascular health. Moderate cardio is the most effective method to reduce it quickly.",
      },
      activities: [
        { fr: "🚶 Marche rapide 45 min / jour (meilleur brûleur de graisse viscérale)", en: "🚶 Brisk walk 45 min / day (best visceral fat burner)" },
        { fr: "🚴 Vélo ou natation 30 min à intensité modérée", en: "🚴 Cycling or swimming 30 min at moderate intensity" },
        { fr: "⛔ Évitez les séances trop courtes — visez minimum 30 min en continu", en: "⛔ Avoid very short sessions — aim for minimum 30 min continuous" },
      ],
    };
  }

  // Priority 2 — Low muscle mass relative to weight (muscle < 30% of weight)
  if (muscle !== null && entry.weight_kg > 0 && (muscle / entry.weight_kg) < 0.30) {
    return {
      emoji: "💪",
      color: "bg-blue-50 border-blue-200",
      title: {
        fr: "Masse musculaire faible — priorité musculation",
        en: "Low muscle mass — strength training priority",
      },
      body: {
        fr: "Plus de muscles = métabolisme plus rapide au repos. La musculation est votre meilleur allié pour recomposer votre corps durablement.",
        en: "More muscle = faster resting metabolism. Strength training is your best ally for durable body recomposition.",
      },
      activities: [
        { fr: "🏋️ Musculation 3× / semaine : squats, tractions, développé couché", en: "🏋️ Strength training 3× / week: squats, pull-ups, bench press" },
        { fr: "🥩 Apport protéique : 1.8–2g / kg de poids corporel par jour", en: "🥩 Protein intake: 1.8–2g / kg body weight per day" },
        { fr: "😴 Dormez 7–8h : 70% de la synthèse musculaire se fait pendant le sommeil", en: "😴 Sleep 7–8h: 70% of muscle synthesis happens during sleep" },
      ],
    };
  }

  // Priority 3 — High body fat (men > 25%, women > 32% — use 28% as neutral threshold)
  if (fat !== null && fat >= 28) {
    return {
      emoji: "🏃",
      color: "bg-orange-50 border-orange-200",
      title: {
        fr: "Taux de masse graisseuse élevé — mix cardio + force",
        en: "High body fat — cardio + strength mix",
      },
      body: {
        fr: "La combinaison cardio + musculation est la plus efficace pour perdre de la graisse tout en préservant le muscle. Évitez de ne faire que du cardio.",
        en: "Combining cardio + strength training is the most effective way to lose fat while preserving muscle. Avoid cardio only.",
      },
      activities: [
        { fr: "🔄 Alternez 1 jour musculation / 1 jour cardio modéré", en: "🔄 Alternate 1 day strength / 1 day moderate cardio" },
        { fr: "🏊 Natation ou aquagym : brûle les graisses sans impact articulaire", en: "🏊 Swimming or aqua gym: burns fat with no joint impact" },
        { fr: "🥗 Déficit calorique modéré : -300 à -500 kcal/jour maximum", en: "🥗 Moderate caloric deficit: -300 to -500 kcal/day maximum" },
      ],
    };
  }

  // Priority 4 — Good body fat (< 18%) → performance focus
  if (fat !== null && fat < 18) {
    return {
      emoji: "⚡",
      color: "bg-green-50 border-green-200",
      title: {
        fr: "Excellente composition corporelle — optimisation performance",
        en: "Excellent body composition — performance optimisation",
      },
      body: {
        fr: "Votre taux de graisse est dans la zone athlétique. Concentrez-vous sur la performance, la puissance et la récupération.",
        en: "Your body fat is in the athletic zone. Focus on performance, power output, and recovery.",
      },
      activities: [
        { fr: "🏋️ Entraînement en force : séries lourdes 3–5 reps pour la puissance", en: "🏋️ Heavy strength training: 3–5 rep sets for power" },
        { fr: "🏊 Natation technique : travaillez la vitesse et l'efficacité", en: "🏊 Technical swimming: work on speed and efficiency" },
        { fr: "🧘 1 séance mobilité / semaine pour prévenir les blessures", en: "🧘 1 mobility session / week to prevent injury" },
      ],
    };
  }

  // Priority 5 — BMI-based fallback
  if (bmi !== null) {
    if (bmi >= 30) {
      return {
        emoji: "🌱",
        color: "bg-amber-50 border-amber-200",
        title: {
          fr: "Commencez en douceur — activité à faible impact",
          en: "Start gently — low-impact activity",
        },
        body: {
          fr: "L'important est de bouger régulièrement. Commencez par des activités douces qui ne stressent pas les articulations et augmentez progressivement l'intensité.",
          en: "The important thing is to move regularly. Start with gentle activities that don't stress the joints and progressively increase intensity.",
        },
        activities: [
          { fr: "🚶 Marche quotidienne : commencez par 20 min, augmentez de 5 min / semaine", en: "🚶 Daily walk: start with 20 min, add 5 min / week" },
          { fr: "🏊 Aquagym ou natation douce : idéal pour les articulations", en: "🏊 Aqua gym or gentle swimming: ideal for joints" },
          { fr: "🧘 Yoga ou stretching : améliore la mobilité et réduit les douleurs", en: "🧘 Yoga or stretching: improves mobility and reduces pain" },
        ],
      };
    }
    if (bmi < 18.5) {
      return {
        emoji: "🥩",
        color: "bg-purple-50 border-purple-200",
        title: {
          fr: "IMC bas — priorité prise de masse",
          en: "Low BMI — mass gain priority",
        },
        body: {
          fr: "Votre objectif principal est de construire de la masse musculaire. Combinez musculation et apport calorique suffisant.",
          en: "Your main goal is to build muscle mass. Combine strength training with sufficient caloric intake.",
        },
        activities: [
          { fr: "🏋️ Musculation 4× / semaine : focus sur les mouvements composés", en: "🏋️ Strength training 4× / week: focus on compound movements" },
          { fr: "🍚 Surplus calorique : +300–500 kcal/jour au-dessus de votre métabolisme", en: "🍚 Caloric surplus: +300–500 kcal/day above your metabolism" },
          { fr: "💤 Récupération prioritaire : repos actif entre les séances", en: "💤 Recovery first: active rest between sessions" },
        ],
      };
    }
  }

  // Default — healthy range
  return {
    emoji: "✅",
    color: "bg-emerald-50 border-emerald-200",
    title: {
      fr: "Bonne forme générale — maintenez le cap !",
      en: "Good overall shape — keep it up!",
    },
    body: {
      fr: "Vos données sont dans une bonne fourchette. L'objectif est de maintenir cette composition et de progresser en performance.",
      en: "Your data is in a good range. The goal is to maintain this composition and progress in performance.",
    },
    activities: [
      { fr: "🏊 2–3 séances de natation / semaine pour le cardio et le maintien", en: "🏊 2–3 swimming sessions / week for cardio and maintenance" },
      { fr: "🏋️ 2 séances de musculation / semaine pour maintenir la masse musculaire", en: "🏋️ 2 strength training sessions / week to maintain muscle mass" },
      { fr: "🧘 1 séance de yoga ou stretching pour la récupération et la souplesse", en: "🧘 1 yoga or stretching session for recovery and flexibility" },
    ],
  };
}

interface WeightTipProps {
  entry: WeightEntry;
  onDismiss: () => void;
}

export default function WeightTip({ entry, onDismiss }: WeightTipProps) {
  const { locale } = useLanguage();
  const tip = getTip(entry);

  return (
    <div className={`rounded-xl border ${tip.color} p-5`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{tip.emoji}</span>
          <h3 className="font-semibold text-heading text-sm">
            {locale === "fr" ? tip.title.fr : tip.title.en}
          </h3>
        </div>
        <button
          onClick={onDismiss}
          className="text-gray-400 hover:text-gray-600 flex-shrink-0 text-lg leading-none"
          aria-label="Fermer"
        >
          ×
        </button>
      </div>
      <p className="text-xs text-gray-600 leading-relaxed mb-3">
        {locale === "fr" ? tip.body.fr : tip.body.en}
      </p>
      <ul className="space-y-1.5">
        {tip.activities.map((a, i) => (
          <li key={i} className="text-xs text-gray-700 leading-relaxed">
            {locale === "fr" ? a.fr : a.en}
          </li>
        ))}
      </ul>
    </div>
  );
}
