const fr = {
  // Nav
  "nav.home": "Accueil",
  "nav.services": "Services",
  "nav.offers": "Offres & Tarifs",
  "nav.about": "À Propos",
  "nav.contact": "Contact",

  // Hero
  "hero.subtitle":
    "Maître-nageur et coach sportif spécialisé en perte de poids et remise en forme",
  "hero.cta": "Commencer ma transformation",

  // Services section
  "services.title": "Mes Services",
  "services.subtitle": "Un accompagnement complet adapté à vos objectifs",
  "services.learnMore": "En savoir plus",

  // Offers section
  "offers.title": "Offres & Tarifs",
  "offers.subtitle":
    "Choisissez la formule qui correspond le mieux à vos besoins et objectifs",
  "offers.packsTitle": "Packs Cours Particuliers",
  "offers.packsSubtitle":
    "Réservez vos séances individuelles avec des packs avantageux",
  "offers.checkoutError":
    "Erreur lors de la création de la session de paiement.",
  "offers.connectionError": "Erreur de connexion. Veuillez réessayer.",
  "offers.redirecting": "Redirection...",
  "offers.bookNow": "Réserver maintenant",
  "offers.included": "Inclus",
  "offers.goals": "Objectifs",

  // Info note
  "info.programsInclude": "Tous les programmes incluent :",
  "info.programsDetails":
    "Bilan initial gratuit • Suivi personnalisé • Conseils nutrition • Motivation continue",
  "info.securePayment": "Paiement sécurisé",
  "info.paymentMethods": "Plusieurs moyens de paiement acceptés",
  "info.sessionsNote":
    "Les séances peuvent être utilisées pour n'importe quelle activité : natation, fitness ou activités extérieures",
  "info.needAdvice": "Besoin de conseils pour choisir ?",
  "info.contactMe": "Contactez-moi",
  "info.freeConsult": "pour un entretien gratuit de 15 minutes !",

  // About section
  "about.title": "À Propos",
  "about.heading": "Arnaud Chevallier - Votre Coach Dédié à Votre Réussite",
  "about.p1":
    "Maître-nageur diplômé et coach sportif certifié, je me consacre depuis plusieurs années à accompagner mes clients dans leur parcours de transformation physique.",
  "about.p2":
    "Spécialisé dans la perte de poids et la remise en forme, j'ai développé une approche globale qui combine plusieurs disciplines sportives pour des résultats durables et harmonieux.",
  "about.p3":
    "Ma philosophie : un accompagnement bienveillant, des objectifs réalistes et une progression adaptée à votre rythme. Chaque personne est unique, et votre programme le sera aussi.",
  "about.p4.prefix": "Basé à Valbonne",
  "about.p4.suffix":
    ", j'interviens dans toute la région pour vous offrir le meilleur service possible.",

  // Contact section
  "contact.title": "Contactez-Moi",
  "contact.subtitle": "Prêt à commencer votre transformation ? Parlons-en !",
  "contact.fullName": "Nom Complet",
  "contact.email": "Email",
  "contact.phone": "Téléphone",
  "contact.courseType": "Type de cours souhaité",
  "contact.select": "-- Sélectionnez --",
  "contact.privateLesson": "Cours Particuliers",
  "contact.customProgram": "Programmation Sur Mesure",
  "contact.infoRequest": "Demande d'information",
  "contact.message": "Votre Message",
  "contact.placeholder":
    "Parlez-moi de vos objectifs, votre niveau actuel...",
  "contact.sending": "Envoi en cours...",
  "contact.submit": "Envoyer ma Demande",
  "contact.notConfigured":
    "EmailJS n'est pas configuré. Contactez : chevallier.a06@gmail.com",
  "contact.success": "Message envoyé avec succès !",
  "contact.error":
    "Erreur lors de l'envoi. Contactez : chevallier.a06@gmail.com",
  "contact.notProvided": "Non renseigné",

  // Footer
  "footer.text":
    "Arnaud Chevallier - Coach Sportif & Maître-Nageur - Valbonne - Tous droits réservés",

  // Service detail pages
  "detail.backToServices": "Retour aux services",
  "detail.benefits": "Les Bienfaits",
  "detail.targetAudience": "Pour Qui ?",
  "detail.seeOffers": "Voir les offres & tarifs",

  // Checkout
  "checkout.success.title": "Paiement réussi !",
  "checkout.success.message":
    "Merci pour votre confiance. Vous recevrez un email de confirmation avec tous les détails de votre réservation.",
  "checkout.success.backHome": "Retour à l'accueil",
  "checkout.cancel.title": "Paiement annulé",
  "checkout.cancel.message":
    "Votre paiement a été annulé. Aucun montant n'a été débité. N'hésitez pas à revenir quand vous êtes prêt !",
  "checkout.cancel.seeOffers": "Voir les offres",
} as const;

export type TranslationKey = keyof typeof fr;
export default fr;
