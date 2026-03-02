// ─── Legal / Business Information ─────────────────────────────
// Single source of truth for all legal pages (CGV, Mentions Légales,
// Politique de Confidentialité). Update values here once — they
// propagate everywhere automatically.

export const LEGAL_INFO = {
  // ─── Identity ──────────────────────────────────────────────
  name: "Arnaud Chevallier",
  status: "Micro-entrepreneur (Entreprise Individuelle)",
  brand: "Coach-Bluewave",
  activity: "Coach sportif personnel, Maître-Nageur Sauveteur",
  siret: "[SIRET_NUMBER]",
  address: "[BUSINESS_ADDRESS]",
  city: "Valbonne, 06560, France",
  phone: "[PHONE_NUMBER]",
  email: "[CONTACT_EMAIL]",

  // ─── Professional Card ─────────────────────────────────────
  diploma: "BPJEPS Activités Aquatiques et de la Natation (AAN)",
  carteProNumber: "[CARTE_PRO_NUMBER]",
  carteProIssuedBy: "SDJES des Alpes-Maritimes (06)",
  carteProExpiry: "[CARTE_PRO_EXPIRY_DATE]",

  // ─── SAP (Services à la Personne) ─────────────────────────
  sapNumber: "[SAP_NUMBER]",

  // ─── Insurance ─────────────────────────────────────────────
  insuranceCompany: "[INSURANCE_COMPANY]",
  insurancePolicyNumber: "[INSURANCE_POLICY_NUMBER]",

  // ─── Business Details ──────────────────────────────────────
  maxKmRadius: "[MAX_KM_RADIUS]",
  otherPaymentMethods: "[OTHER_PAYMENT_METHODS]",

  // ─── Mediation ─────────────────────────────────────────────
  mediatorName: "[MEDIATOR_NAME]",
  mediatorWebsite: "[MEDIATOR_WEBSITE]",
  mediatorEmail: "[MEDIATOR_EMAIL]",

  // ─── Third Parties ─────────────────────────────────────────
  emailjsLocation: "[EMAILJS_LOCATION]",
} as const;
