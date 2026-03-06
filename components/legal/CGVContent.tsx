"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";
import { LEGAL_INFO } from "@/lib/legal";

export default function CGVContent() {
  const { locale } = useLanguage();
  const en = locale === "en";

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4 font-[family-name:var(--font-playfair)]">
        {en ? "General Terms and Conditions of Sale" : "Conditions Générales de Vente"}
      </h1>
      <p className="text-sm text-gray-500 mb-12">
        {en ? "Last updated: March 2026" : "Dernière mise à jour : Mars 2026"}
      </p>

      {/* Article 1 — Objet / Purpose */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          {en ? "Article 1 — Purpose" : "Article 1 — Objet"}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          {en
            ? "These General Terms and Conditions of Sale (GTC) define the rights and obligations of the parties in the sale of sports coaching services, swimming lessons and related services offered by:"
            : "Les pr\u00e9sentes Conditions G\u00e9n\u00e9rales de Vente (CGV) d\u00e9finissent les droits et obligations des parties dans le cadre de la vente de prestations de coaching sportif, cours de natation et services associ\u00e9s propos\u00e9s par :"}
        </p>
        <div className="space-y-1 text-gray-700 leading-relaxed">
          <p>
            <strong>{en ? "Name" : "Nom"} :</strong> {LEGAL_INFO.name}
          </p>
          <p>
            <strong>{en ? "Status" : "Statut"} :</strong> {LEGAL_INFO.status}
          </p>
          <p>
            <strong>{en ? "Brand" : "Marque"} :</strong> {LEGAL_INFO.brand}
          </p>
          <p>
            <strong>SIRET :</strong> {LEGAL_INFO.siret}
          </p>
          <p>
            <strong>{en ? "Address" : "Adresse"} :</strong>{" "}
            {LEGAL_INFO.address}, {LEGAL_INFO.city}
          </p>
          <p>
            <strong>Email :</strong> {LEGAL_INFO.email}
          </p>
          <p>
            <strong>{en ? "Phone" : "T\u00e9l\u00e9phone"} :</strong>{" "}
            {LEGAL_INFO.phone}
          </p>
        </div>
        <p className="text-gray-700 leading-relaxed mt-3">
          {en
            ? "Hereinafter referred to as \u2018the Coach\u2019. Any order for services implies unreserved acceptance of these GTC."
            : "Ci-apr\u00e8s d\u00e9nomm\u00e9 \u00ab\u00a0le Coach\u00a0\u00bb. Toute commande de prestation implique l\u2019acceptation sans r\u00e9serve des pr\u00e9sentes CGV."}
        </p>
      </section>

      {/* Article 2 — Prestations proposées / Services Offered */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          {en
            ? "Article 2 — Services Offered"
            : "Article 2 — Prestations propos\u00e9es"}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {en
            ? "The Coach offers the following services (non-exhaustive list): individual sports coaching at home or outdoors, individual and group swimming lessons (children and adults), personalized training programs, nutritional monitoring and dietary advice, online coaching (remote follow-up, personalized plans), session packages and packs. The essential characteristics of each service are described on coach-bluewave.com and/or communicated to the Client before any order."
            : "Le Coach propose les prestations suivantes (liste non exhaustive) : coaching sportif individuel \u00e0 domicile ou en ext\u00e9rieur, cours de natation individuels et collectifs (enfants et adultes), programmes d\u2019entra\u00eenement personnalis\u00e9s, suivi nutritionnel et conseils alimentaires, coaching en ligne (suivi \u00e0 distance, plans personnalis\u00e9s), forfaits et packs de s\u00e9ances. Les caract\u00e9ristiques essentielles de chaque prestation sont d\u00e9crites sur le site coach-bluewave.com et/ou communiqu\u00e9es au Client avant toute commande."}
        </p>
      </section>

      {/* Article 3 — Zone d'intervention / Service Area */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          {en
            ? "Article 3 — Service Area"
            : "Article 3 — Zone d\u2019intervention"}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {en
            ? `The Coach primarily operates in Valbonne, Sophia Antipolis, Mougins, Grasse, Antibes, Nice and surrounding areas of the French Riviera (06). Additional travel charges may apply beyond a radius of ${LEGAL_INFO.maxKmRadius} km from Valbonne. These charges are communicated to the Client before confirmation.`
            : `Le Coach intervient principalement \u00e0 Valbonne, Sophia Antipolis, Mougins, Grasse, Antibes, Nice et communes environnantes de la C\u00f4te d\u2019Azur (06). Des frais de d\u00e9placement suppl\u00e9mentaires peuvent s\u2019appliquer au-del\u00e0 d\u2019un rayon de ${LEGAL_INFO.maxKmRadius} km depuis Valbonne. Ces frais sont communiqu\u00e9s au Client avant validation.`}
        </p>
      </section>

      {/* Article 4 — Tarifs et modalités de paiement / Pricing and Payment */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          {en
            ? "Article 4 — Pricing and Payment"
            : "Article 4 — Tarifs et modalit\u00e9s de paiement"}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          {en
            ? "Prices are in euros (\u20ac) inclusive of all taxes (VAT not applicable \u2014 article 293 B of the French Tax Code, micro-enterprise regime). Current rates are available on coach-bluewave.com and/or provided upon request. The Coach reserves the right to modify prices at any time. Services are invoiced at the rate in effect at the time of order."
            : "Les tarifs sont indiqu\u00e9s en euros (\u20ac) TTC (TVA non applicable \u2014 article 293 B du CGI, r\u00e9gime de la micro-entreprise). Les tarifs en vigueur sont consultables sur coach-bluewave.com et/ou communiqu\u00e9s sur devis. Le Coach se r\u00e9serve le droit de modifier ses tarifs \u00e0 tout moment. Les prestations sont factur\u00e9es au tarif en vigueur au moment de la commande."}
        </p>
        <p className="text-gray-700 leading-relaxed mb-3">
          {en
            ? `Payment may be made by: bank transfer, cash, ${LEGAL_INFO.otherPaymentMethods}. Payment is due per session or according to the agreed package terms.`
            : `Le paiement peut \u00eatre effectu\u00e9 par : virement bancaire, esp\u00e8ces, ${LEGAL_INFO.otherPaymentMethods}. Le paiement est exigible \u00e0 la s\u00e9ance ou selon les conditions du forfait convenu.`}
        </p>
        <p className="text-gray-700 leading-relaxed">
          {en
            ? "In case of late payment, penalties will be applied at a rate of 3 times the current legal interest rate (article L.441-10 of the French Commercial Code). A flat-rate recovery charge of \u20ac40 may be required."
            : "En cas de retard de paiement, des p\u00e9nalit\u00e9s de retard seront appliqu\u00e9es au taux de 3 fois le taux d\u2019int\u00e9r\u00eat l\u00e9gal en vigueur (article L.441-10 du Code de commerce). Une indemnit\u00e9 forfaitaire de 40 \u20ac pour frais de recouvrement pourra \u00eatre exig\u00e9e."}
        </p>
      </section>

      {/* Article 5 — Réservation et annulation / Booking and Cancellation */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          {en
            ? "Article 5 — Booking and Cancellation"
            : "Article 5 — R\u00e9servation et annulation"}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          {en
            ? "Sessions are booked by mutual agreement between the Coach and the Client."
            : "Les s\u00e9ances sont r\u00e9serv\u00e9es d\u2019un commun accord entre le Coach et le Client."}
        </p>
        <p className="text-gray-700 leading-relaxed mb-3">
          <strong>
            {en ? "Cancellation by the Client:" : "Annulation par le Client :"}
          </strong>{" "}
          {en
            ? "more than 24h before the session, free cancellation and rescheduling; less than 24h, the session is due and invoiced; no-show without notice, the session is due and invoiced."
            : "plus de 24h avant la s\u00e9ance, annulation gratuite et report ; moins de 24h, la s\u00e9ance est due et factur\u00e9e ; absence sans pr\u00e9venir, la s\u00e9ance est due et factur\u00e9e."}
        </p>
        <p className="text-gray-700 leading-relaxed mb-3">
          <strong>
            {en ? "Cancellation by the Coach:" : "Annulation par le Coach :"}
          </strong>{" "}
          {en
            ? "in case of inability (illness, force majeure, bad weather), the session is rescheduled at no charge."
            : "en cas d\u2019emp\u00eachement (maladie, force majeure, intemp\u00e9ries), la s\u00e9ance est report\u00e9e sans frais."}
        </p>
        <p className="text-gray-700 leading-relaxed">
          <strong>
            {en
              ? "Weather conditions:"
              : "Conditions m\u00e9t\u00e9orologiques :"}
          </strong>{" "}
          {en
            ? "for outdoor sessions, the Coach reserves the right to cancel or reschedule if conditions make practice dangerous."
            : "pour les s\u00e9ances en ext\u00e9rieur, le Coach se r\u00e9serve le droit d\u2019annuler ou reporter si les conditions rendent la pratique dangereuse."}
        </p>
      </section>

      {/* Article 6 — Droit de rétractation / Right of Withdrawal */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          {en
            ? "Article 6 — Right of Withdrawal"
            : "Article 6 — Droit de r\u00e9tractation"}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          {en
            ? "In accordance with articles L.221-18 et seq. of the French Consumer Code, the Client has 14 days from the conclusion of the contract to exercise their right of withdrawal, without having to justify a reason."
            : "Conform\u00e9ment aux articles L.221-18 et suivants du Code de la consommation, le Client dispose d\u2019un d\u00e9lai de 14 jours \u00e0 compter de la conclusion du contrat pour exercer son droit de r\u00e9tractation, sans justifier de motif."}
        </p>
        <p className="text-gray-700 leading-relaxed mb-3">
          <strong>Exception :</strong>{" "}
          {en
            ? "the right of withdrawal cannot be exercised for services fully performed before the end of the withdrawal period, if the Client has given prior consent (article L.221-28 of the French Consumer Code)."
            : "le droit de r\u00e9tractation ne peut \u00eatre exerc\u00e9 pour les prestations pleinement ex\u00e9cut\u00e9es avant la fin du d\u00e9lai, si le Client a donn\u00e9 son accord pr\u00e9alable (article L.221-28 du Code de la consommation)."}
        </p>
        <p className="text-gray-700 leading-relaxed">
          {en
            ? `To exercise this right, contact ${LEGAL_INFO.email}. Reimbursement will be made within 14 days, minus any services already provided.`
            : `Pour exercer ce droit, contactez ${LEGAL_INFO.email}. Le remboursement sera effectu\u00e9 sous 14 jours, d\u00e9duction faite des prestations d\u00e9j\u00e0 ex\u00e9cut\u00e9es.`}
        </p>
      </section>

      {/* Article 7 — Obligations du Coach / Coach's Obligations */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          {en
            ? "Article 7 — Coach\u2019s Obligations"
            : "Article 7 — Obligations du Coach"}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {en
            ? `The Coach commits to: providing services tailored to the Client\u2019s level; holding the required diplomas and qualifications (${LEGAL_INFO.diploma}, valid professional card); maintaining professional liability insurance; respecting agreed schedules; adapting exercises to the Client\u2019s physical condition. The Coach\u2019s liability is limited to direct damages resulting from proven fault.`
            : `Le Coach s\u2019engage \u00e0 : fournir des prestations conformes et adapt\u00e9es au niveau du Client ; \u00eatre titulaire des dipl\u00f4mes et qualifications requis (${LEGAL_INFO.diploma}, carte professionnelle en cours de validit\u00e9) ; disposer d\u2019une assurance responsabilit\u00e9 civile professionnelle ; respecter les horaires convenus ; adapter les exercices \u00e0 la condition physique du Client. La responsabilit\u00e9 du Coach est limit\u00e9e aux dommages directs r\u00e9sultant d\u2019une faute prouv\u00e9e.`}
        </p>
      </section>

      {/* Article 8 — Obligations du Client / Client's Obligations */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          {en
            ? "Article 8 — Client\u2019s Obligations"
            : "Article 8 — Obligations du Client"}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          {en
            ? "The Client commits to: communicating any relevant information about their health, injuries or contraindications; providing a medical certificate if requested; following safety instructions; notifying the Coach of any discomfort during the session; wearing appropriate attire."
            : "Le Client s\u2019engage \u00e0 : communiquer toute information pertinente sur son \u00e9tat de sant\u00e9, blessures ou contre-indications ; fournir un certificat m\u00e9dical si demand\u00e9 ; suivre les consignes de s\u00e9curit\u00e9 ; pr\u00e9venir le Coach de tout malaise pendant la s\u00e9ance ; disposer d\u2019une tenue adapt\u00e9e."}
        </p>
        <p className="text-gray-700 leading-relaxed">
          <strong>{en ? "Minors:" : "Mineurs :"}</strong>{" "}
          {en
            ? "enrollment in swimming lessons for minors requires written authorization from the legal guardian."
            : "l\u2019inscription aux cours de natation pour les mineurs n\u00e9cessite l\u2019autorisation \u00e9crite du repr\u00e9sentant l\u00e9gal."}
        </p>
      </section>

      {/* Article 9 — Assurance / Insurance */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          {en ? "Article 9 — Insurance" : "Article 9 — Assurance"}
        </h2>
        <div className="space-y-1 text-gray-700 leading-relaxed">
          <p>
            <strong>{en ? "Insurer" : "Assureur"} :</strong>{" "}
            {LEGAL_INFO.insuranceCompany}
          </p>
          <p>
            <strong>
              {en ? "Policy number" : "Num\u00e9ro de police"} :
            </strong>{" "}
            {LEGAL_INFO.insurancePolicyNumber}
          </p>
          <p>
            <strong>{en ? "Coverage" : "Garantie"} :</strong>{" "}
            {en
              ? "Professional liability \u2014 Sports coaching and swimming instruction"
              : "Responsabilit\u00e9 civile professionnelle \u2014 Coaching sportif et enseignement de la natation"}
          </p>
        </div>
        <p className="text-gray-700 leading-relaxed mt-3">
          {en
            ? "The Client is recommended to take out individual accident insurance for sports practice."
            : "Il est recommand\u00e9 au Client de souscrire une assurance individuelle accident pour la pratique sportive."}
        </p>
      </section>

      {/* Article 10 — Force majeure / Force Majeure */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          {en
            ? "Article 10 — Force Majeure"
            : "Article 10 — Force majeure"}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {en
            ? "The Coach\u2019s liability cannot be engaged if performance is prevented by force majeure (article 1218 of the French Civil Code)."
            : "La responsabilit\u00e9 du Coach ne pourra \u00eatre engag\u00e9e si l\u2019ex\u00e9cution est emp\u00each\u00e9e par un cas de force majeure (article 1218 du Code civil)."}
        </p>
      </section>

      {/* Article 11 — Propriété intellectuelle / Intellectual Property */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          {en
            ? "Article 11 — Intellectual Property"
            : "Article 11 — Propri\u00e9t\u00e9 intellectuelle"}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {en
            ? "Training programs, nutritional plans and all content created by the Coach are protected by intellectual property law. The Client shall not reproduce, distribute or commercialize them without written authorization."
            : "Les programmes d\u2019entra\u00eenement, plans nutritionnels et tout contenu cr\u00e9\u00e9 par le Coach sont prot\u00e9g\u00e9s par le droit de la propri\u00e9t\u00e9 intellectuelle. Le Client s\u2019interdit de les reproduire, diffuser ou commercialiser sans autorisation \u00e9crite."}
        </p>
      </section>

      {/* Article 12 — Protection des données / Data Protection */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          {en
            ? "Article 12 — Data Protection"
            : "Article 12 — Protection des donn\u00e9es"}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {en
            ? "Personal data is processed in accordance with our "
            : "Les donn\u00e9es personnelles sont trait\u00e9es conform\u00e9ment \u00e0 notre "}
          <a
            href="/politique-de-confidentialite"
            className="text-brand-blue hover:underline"
          >
            {en ? "Privacy Policy" : "Politique de Confidentialit\u00e9"}
          </a>
          .
        </p>
      </section>

      {/* Article 13 — Acceptation / Acceptance */}
      <section>
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          {en ? "Article 13 — Acceptance" : "Article 13 — Acceptation"}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {en
            ? "The Client acknowledges having read these General Terms and Conditions and accepts them without reservation before any service order."
            : "Le Client reconna\u00eet avoir pris connaissance des pr\u00e9sentes CGV et les accepter sans r\u00e9serve avant toute commande de prestation."}
        </p>
      </section>
    </>
  );
}
