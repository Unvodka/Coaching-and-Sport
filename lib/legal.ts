// ─── Legal / Business Information ─────────────────────────────
// Single source of truth for all legal pages (CGV, Mentions Légales,
// Politique de Confidentialité). Update values here once — they
// propagate everywhere automatically.

export const LEGAL_INFO = {
  // ─── Identity ──────────────────────────────────────────────
  name: 'Arnaud Chevallier',
  status: 'Micro-entrepreneur (Entreprise Individuelle)',
  brand: 'Coach-Bluewave',
  activity: 'Éducateur sportif personnel, Maître-Nageur Sauveteur',
  siret: '822 436 671 00025',
  address: '265 Avenue Maréchal Alphonse Juin',
  city: 'Mougins, 06250, France',
  phone: '0749486203',
  email: 'chevallier.a06@gmail.com',

  // ─── Professional Card ─────────────────────────────────────
  diploma: 'BPJEPS Activités Aquatiques et de la Natation (AAN)',
  carteProNumber: '07520ED0375',
  carteProIssuedBy: 'Préfécture des Alpes-Maritimes (06)',
  carteProExpiry: '19/11/2030',

  // ─── SAP (Services à la Personne) ─────────────────────────
  sapNumber: 'SAP822436671',
  sapDeclarationDate: '24/02/2026',
  sapAddress: '265 Avenue Maréchal Alphonse Juin, 06250 Mougins',

  // ─── Insurance ─────────────────────────────────────────────
  insuranceCompany: 'SNPMNS',
  insurancePolicyNumber: '639 7892 90 000',

  // ─── Business Details ──────────────────────────────────────
  maxKmRadius: '25',
  otherPaymentMethods: 'Chèque',

  // ─── Mediation ─────────────────────────────────────────────
  mediatorName: 'CM2C – Centre de la Médiation de la Consommation de Conciliateurs de Justice',
  mediatorAddress: '49 rue de Ponthieu, 75008 Paris',
  mediatorUrl: 'https://cm2c.net',
  odrUrl: 'https://ec.europa.eu/consumers/odr',

  // ─── Third Parties ─────────────────────────────────────────
  emailjsLocation: 'États-Unis / UE',
} as const;
