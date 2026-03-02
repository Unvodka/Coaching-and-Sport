export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_FR: FAQItem[] = [
  {
    question: "Combien coûte un cours particulier ?",
    answer:
      "Un cours particulier (natation, fitness ou musculation) coûte 60€ la séance d'une heure. Des packs dégressifs sont disponibles avec des réductions allant jusqu'à 20%. Le coaching en ligne est à 79€/mois.",
  },
  {
    question: "Où se déroulent les séances ?",
    answer:
      "À Valbonne et ses environs sur la Côte d'Azur (Sophia Antipolis, Mougins, Antibes, Grasse). Natation en piscine, fitness en plein air ou en salle. Coaching en ligne disponible partout en France.",
  },
  {
    question: "Proposez-vous du coaching en ligne ?",
    answer:
      "Oui ! Le coaching en ligne à 79€/mois comprend un programme d'entraînement personnalisé hebdomadaire, un plan alimentaire adapté, des ajustements selon vos résultats et un support illimité par message.",
  },
  {
    question: "Comment réserver une première séance ?",
    answer:
      "Via le formulaire de contact sur ce site ou par téléphone. Un entretien gratuit de 15 minutes est offert pour discuter de vos objectifs avant de commencer.",
  },
];

export const FAQ_EN: FAQItem[] = [
  {
    question: "How much does a private session cost?",
    answer:
      "A private session (swimming, fitness, or weight training) costs €60 per hour. Discounted packs are available with savings up to 20%. Online coaching is €79/month.",
  },
  {
    question: "Where do sessions take place?",
    answer:
      "In Valbonne and surrounding areas on the French Riviera (Sophia Antipolis, Mougins, Antibes, Grasse). Swimming in pools, outdoor or indoor fitness. Online coaching available throughout France.",
  },
  {
    question: "Do you offer online coaching?",
    answer:
      "Yes! Online coaching at €79/month includes a personalized weekly training program, a tailored meal plan, weekly adjustments based on your results, and unlimited message support.",
  },
  {
    question: "How do I book a first session?",
    answer:
      "Through the contact form on this site or by phone. A free 15-minute consultation is offered to discuss your goals before starting.",
  },
];

export function getFAQs(locale: string): FAQItem[] {
  return locale === "en" ? FAQ_EN : FAQ_FR;
}
