"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";
import CoachContactButton from "@/components/portal/CoachContactButton";

export interface WeightEntry {
  weight_kg: number;
  body_fat_pct?: number | null;
  visceral_fat?: number | null;
  muscle_mass_kg?: number | null;
  water_pct?: number | null;
  bmi?: number | null;
}

interface Activity {
  fr: string;
  en: string;
}

interface Tip {
  emoji: string;
  title: { fr: string; en: string };
  body: { fr: string; en: string };
  activities: Activity[];
  color: string;
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
        fr: "Graisse viscérale élevée — priorité cardio outdoor",
        en: "High visceral fat — outdoor cardio priority",
      },
      body: {
        fr: "Le cardio modéré en plein air est la méthode la plus efficace pour réduire la graisse viscérale. Visez 4 séances / semaine.",
        en: "Moderate outdoor cardio is the most effective method to reduce visceral fat. Aim for 4 sessions / week.",
      },
      activities: [
        { fr: "🚶 Marche rapide en extérieur — 45 min × 2/semaine (brûleur de graisse viscérale n°1)", en: "🚶 Brisk outdoor walk — 45 min × 2/week (visceral fat burner #1)" },
        { fr: "🚴 Vélo en plein air ou piste cyclable — 40 min × 1/semaine à rythme modéré", en: "🚴 Outdoor cycling or bike path — 40 min × 1/week at moderate pace" },
        { fr: "🏃 Footing léger en forêt ou parc — 30 min × 1/semaine, pas de sprint", en: "🏃 Light jog in forest or park — 30 min × 1/week, no sprinting" },
        { fr: "🏊 Option natation : cours particulier ou nage libre — 30 min × 1/semaine (remplace le vélo ou le footing)", en: "🏊 Swimming option: private lesson or free swim — 30 min × 1/week (replaces cycling or jogging)" },
      ],
    };
  }

  // Priority 2 — Low muscle mass (< 30% of body weight)
  if (muscle !== null && entry.weight_kg > 0 && (muscle / entry.weight_kg) < 0.30) {
    return {
      emoji: "💪",
      color: "bg-blue-50 border-blue-200",
      title: {
        fr: "Masse musculaire faible — force + activités outdoor",
        en: "Low muscle mass — strength + outdoor activities",
      },
      body: {
        fr: "Combinez renforcement musculaire et activités en plein air pour bâtir votre masse tout en restant actif. 4 séances / semaine idéales.",
        en: "Combine strength training and outdoor activities to build mass while staying active. 4 sessions / week ideal.",
      },
      activities: [
        { fr: "🏋️ Renforcement musculaire (salle ou parc) — 45 min × 2/semaine : squats, tractions, pompes", en: "🏋️ Strength training (gym or park) — 45 min × 2/week: squats, pull-ups, push-ups" },
        { fr: "🧗 Escalade en plein air ou bloc — 1h × 1/semaine : excellent pour la force fonctionnelle", en: "🧗 Outdoor climbing or bouldering — 1h × 1/week: excellent for functional strength" },
        { fr: "🚴 Vélo en côte — 40 min × 1/semaine : renforce les jambes et le cardio", en: "🚴 Uphill cycling — 40 min × 1/week: strengthens legs and cardio" },
        { fr: "🏊 Option natation : cours particulier — 30 min × 1/semaine pour le gainage et la coordination", en: "🏊 Swimming option: private lesson — 30 min × 1/week for core and coordination" },
      ],
    };
  }

  // Priority 3 — High body fat (≥ 28%)
  if (fat !== null && fat >= 28) {
    return {
      emoji: "🏃",
      color: "bg-orange-50 border-orange-200",
      title: {
        fr: "Taux de graisse élevé — mix outdoor + renforcement",
        en: "High body fat — outdoor mix + strength",
      },
      body: {
        fr: "Alternez cardio outdoor et renforcement pour perdre de la graisse durablement. 4 séances / semaine, jamais deux jours de cardio consécutifs.",
        en: "Alternate outdoor cardio and strength to lose fat sustainably. 4 sessions / week, never two consecutive cardio days.",
      },
      activities: [
        { fr: "🚶 Marche nordique ou trail débutant — 50 min × 2/semaine : brûle les graisses et tonifie", en: "🚶 Nordic walking or beginner trail — 50 min × 2/week: burns fat and tones" },
        { fr: "🏋️ Circuit training en plein air (parc) — 35 min × 1/semaine : pompes, fentes, squats, abdos", en: "🏋️ Outdoor circuit training (park) — 35 min × 1/week: push-ups, lunges, squats, abs" },
        { fr: "🚴 Vélo ou randonnée — 45 min × 1/semaine à intensité modérée", en: "🚴 Cycling or hiking — 45 min × 1/week at moderate intensity" },
        { fr: "🏊 Option natation : cours particulier ou aquagym — 30 min × 1/semaine (remplace le vélo)", en: "🏊 Swimming option: private lesson or aqua gym — 30 min × 1/week (replaces cycling)" },
      ],
    };
  }

  // Priority 4 — Athletic body fat (< 18%) → performance
  if (fat !== null && fat < 18) {
    return {
      emoji: "⚡",
      color: "bg-green-50 border-green-200",
      title: {
        fr: "Composition athlétique — performance outdoor",
        en: "Athletic composition — outdoor performance",
      },
      body: {
        fr: "Vous êtes dans la zone athlétique. Maximisez votre performance avec des activités outdoor exigeantes. 4 séances / semaine dont 1 récupération.",
        en: "You're in the athletic zone. Maximize performance with demanding outdoor activities. 4 sessions / week including 1 recovery.",
      },
      activities: [
        { fr: "🏃 Trail ou fractionné en extérieur — 45 min × 1/semaine : sprints en côte ou interval running", en: "🏃 Trail or outdoor intervals — 45 min × 1/week: hill sprints or interval running" },
        { fr: "🧗 Escalade ou accrobranche — 1h × 1/semaine : puissance et gainage fonctionnel", en: "🧗 Climbing or high ropes — 1h × 1/week: power and functional core" },
        { fr: "🚴 Vélo de route ou VTT — 1h × 1/semaine à haute intensité", en: "🚴 Road cycling or mountain biking — 1h × 1/week at high intensity" },
        { fr: "🏊 Option natation : cours particulier technique — 45 min × 1/semaine (récupération active + technique)", en: "🏊 Swimming option: technical private lesson — 45 min × 1/week (active recovery + technique)" },
      ],
    };
  }

  // Priority 5 — BMI ≥ 30 → gentle start
  if (bmi !== null && bmi >= 30) {
    return {
      emoji: "🌱",
      color: "bg-amber-50 border-amber-200",
      title: {
        fr: "Démarrez en douceur — activités outdoor à faible impact",
        en: "Start gently — low-impact outdoor activities",
      },
      body: {
        fr: "L'important est de bouger régulièrement dehors. Commencez doucement et augmentez de 5 min / semaine. 3–4 séances / semaine.",
        en: "The key is to move regularly outdoors. Start gently and increase by 5 min / week. 3–4 sessions / week.",
      },
      activities: [
        { fr: "🚶 Marche en plein air — 25 min × 2/semaine : augmentez de 5 min chaque semaine", en: "🚶 Outdoor walk — 25 min × 2/week: increase by 5 min each week" },
        { fr: "🚴 Vélo plat (bord de mer ou piste cyclable) — 30 min × 1/semaine, rythme confortable", en: "🚴 Flat cycling (seafront or bike path) — 30 min × 1/week, comfortable pace" },
        { fr: "🧘 Yoga ou stretching en plein air — 30 min × 1/semaine : mobilité et bien-être", en: "🧘 Outdoor yoga or stretching — 30 min × 1/week: mobility and well-being" },
        { fr: "🏊 Option natation : aquagym ou cours débutant — 30 min × 1/semaine (zéro impact articulaire)", en: "🏊 Swimming option: aqua gym or beginner lesson — 30 min × 1/week (zero joint impact)" },
      ],
    };
  }

  // Priority 6 — BMI < 18.5 → mass gain
  if (bmi !== null && bmi < 18.5) {
    return {
      emoji: "🥩",
      color: "bg-purple-50 border-purple-200",
      title: {
        fr: "IMC bas — prise de masse + activités outdoor douces",
        en: "Low BMI — mass gain + gentle outdoor activities",
      },
      body: {
        fr: "Priorité à la musculation et à l'apport calorique. Limitez le cardio pour ne pas brûler vos réserves. 3–4 séances / semaine.",
        en: "Priority is strength training and caloric intake. Limit cardio to avoid burning reserves. 3–4 sessions / week.",
      },
      activities: [
        { fr: "🏋️ Musculation (salle ou parc) — 50 min × 2/semaine : focus mouvements composés", en: "🏋️ Strength training (gym or park) — 50 min × 2/week: focus on compound movements" },
        { fr: "🚶 Marche en nature — 40 min × 1/semaine : récupération active sans dépense excessive", en: "🚶 Nature walk — 40 min × 1/week: active recovery without excessive calorie burn" },
        { fr: "🧗 Escalade débutant — 45 min × 1/semaine : développe la force fonctionnelle naturellement", en: "🧗 Beginner climbing — 45 min × 1/week: naturally develops functional strength" },
        { fr: "🏊 Option natation : cours particulier — 30 min × 1/semaine max (technique, pas d'endurance)", en: "🏊 Swimming option: private lesson — 30 min × 1/week max (technique, not endurance)" },
      ],
    };
  }

  // Default — healthy range
  return {
    emoji: "✅",
    color: "bg-emerald-50 border-emerald-200",
    title: {
      fr: "Bonne forme — maintenez avec des activités outdoor",
      en: "Good shape — maintain with outdoor activities",
    },
    body: {
      fr: "Vos données sont dans une bonne fourchette. Maintenez votre forme avec 4 séances / semaine en plein air.",
      en: "Your data is in a good range. Maintain your fitness with 4 outdoor sessions / week.",
    },
    activities: [
      { fr: "🏃 Jogging ou trail léger — 35 min × 1/semaine en forêt ou bord de mer", en: "🏃 Jogging or light trail — 35 min × 1/week in forest or by the sea" },
      { fr: "🚴 Vélo ou randonnée — 45 min × 1/semaine : entretien cardio et endurance", en: "🚴 Cycling or hiking — 45 min × 1/week: cardio and endurance maintenance" },
      { fr: "🏋️ Renforcement musculaire (parc ou salle) — 40 min × 1/semaine : maintien de la masse", en: "🏋️ Strength training (park or gym) — 40 min × 1/week: muscle maintenance" },
      { fr: "🏊 Option natation : cours particulier ou nage libre — 40 min × 1/semaine (récupération + cardio doux)", en: "🏊 Swimming option: private lesson or free swim — 40 min × 1/week (recovery + gentle cardio)" },
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
          className="text-gray-400 hover:text-gray-600 flex-shrink-0 text-xl leading-none"
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
    <CoachContactButton />
    </div>
  );
}
