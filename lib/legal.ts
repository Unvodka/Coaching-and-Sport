// ─── Legal / Business Information ─────────────────────────────
// Single source of truth for all legal pages (CGV, Mentions Légales,
// Politique de Confidentialité). Update values here once — they
// propagate everywhere automatically.

export const LEGAL_INFO = {
  // ─── Identity ──────────────────────────────────────────────
  name: 'Arnaud Chevallier',
  status: 'Micro-entrepreneur (Entreprise Individuelle)',
  brand: 'Coach-Bluewave',
  activity: 'Coach sportif personnel, Maître-Nageur Sauveteur',
  siret: '82243667100025',
  address: '131 allée des palmiers',
  city: 'Valbonne, 06560, France',
  phone: '0749486203',
  email: 'chevallier.a06@gmail.com',

  // ─── Professional Card ─────────────────────────────────────
  diploma: 'BPJEPS Activités Aquatiques et de la Natation (AAN)',
  carteProNumber: '07520ED0375',
  carteProIssuedBy: 'Préfécture des Alpes-Maritimes (06)',
  carteProExpiry: '19/11/2030',

  // ─── SAP (Services à la Personne) ─────────────────────────
  sapNumber: '[SAP_NUMBER]',

  // ─── Insurance ─────────────────────────────────────────────
  insuranceCompany: 'SNPMNS',
  insurancePolicyNumber: '[INSURANCE_POLICY_NUMBER]',

  // ─── Business Details ──────────────────────────────────────
  maxKmRadius: '25',
  otherPaymentMethods: 'Chėque',

  // ─── Third Parties ─────────────────────────────────────────
  emailjsLocation: 'États-Unis / UE',
} as const;
