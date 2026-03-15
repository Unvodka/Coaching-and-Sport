"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";
import { LEGAL_INFO } from "@/lib/legal";

export default function PrivacyContent() {
  const { locale } = useLanguage();
  const en = locale === "en";

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4 font-[family-name:var(--font-playfair)]">
        {en ? "Privacy Policy" : "Politique de Confidentialité"}
      </h1>
      <p className="text-sm text-gray-500 mb-12">
        {en ? "Last updated: March 2026" : "Dernière mise à jour : Mars 2026"}
      </p>

      {/* Section 1 - Introduction */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          1. Introduction
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          {en
            ? "This privacy policy aims to inform users of the coach-bluewave.com website about the collection, processing and protection of their personal data, in accordance with the General Data Protection Regulation (GDPR — EU Regulation 2016/679) and the French Data Protection Act of January 6, 1978, as amended."
            : "La présente politique de confidentialité a pour but d\u2019informer les utilisateurs du site coach-bluewave.com des modalités de collecte, de traitement et de protection de leurs données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée."}
        </p>
        <div className="space-y-1 text-gray-700">
          <p>
            <strong>
              {en ? "Data Controller" : "Responsable du traitement"} :
            </strong>{" "}
            {LEGAL_INFO.name}
          </p>
          <p>
            <strong>{en ? "Status" : "Statut"} :</strong> {LEGAL_INFO.status}
          </p>
          <p>
            <strong>{en ? "Address" : "Adresse"} :</strong>{" "}
            {LEGAL_INFO.address}, {LEGAL_INFO.city}
          </p>
          <p>
            <strong>Email :</strong> {LEGAL_INFO.email}
          </p>
        </div>
      </section>

      {/* Section 2 - Données collectées / Data Collected */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          2. {en ? "Data Collected" : "Données collectées"}
        </h2>

        {/* 2.1 */}
        <h3 className="text-lg font-medium text-brand-dark mb-2 mt-6">
          2.1{" "}
          {en ? "Via the contact form" : "Via le formulaire de contact"}
        </h3>
        <p className="text-gray-700 leading-relaxed mb-2">
          {en
            ? "Data collected: last name, first name, email address, phone number (optional), message content."
            : "Données collectées : nom, prénom, adresse email, numéro de téléphone (facultatif), contenu du message."}
        </p>
        <p className="text-gray-700 leading-relaxed mb-2">
          {en
            ? "Legal basis: Consent (article 6.1.a of the GDPR)"
            : "Base légale : Consentement (article 6.1.a du RGPD)"}
        </p>
        <p className="text-gray-700 leading-relaxed">
          {en
            ? "Purpose: Responding to information requests and contact inquiries."
            : "Finalité : Répondre aux demandes d\u2019information et de prise de contact."}
        </p>

        {/* 2.2 */}
        <h3 className="text-lg font-medium text-brand-dark mb-2 mt-6">
          2.2{" "}
          {en
            ? "Via the coaching application (client portal)"
            : "Via l\u2019application de coaching (espace client)"}
        </h3>
        <p className="text-gray-700 leading-relaxed mb-2">
          {en
            ? "Data collected: last name, first name, email address, fitness tracking data (weight, body fat, muscle mass, goals), wellness journal data (personal notes, mood, activities), personalized training programs and nutritional plans, session history."
            : "Données collectées : nom, prénom, adresse email, données de suivi sportif (poids, masse grasse, masse musculaire, objectifs), données du journal de bien-être (notes personnelles, humeur, activités), programmes d\u2019entraînement et plans nutritionnels personnalisés, historique des séances."}
        </p>
        <p className="text-gray-700 leading-relaxed mb-2">
          {en
            ? "Legal basis: Performance of the coaching contract (article 6.1.b of the GDPR)"
            : "Base légale : Exécution du contrat de coaching (article 6.1.b du RGPD)"}
        </p>
        <p className="text-gray-700 leading-relaxed">
          {en
            ? "Purpose: Personalization of fitness and nutritional monitoring, progress tracking."
            : "Finalité : Personnalisation du suivi sportif et nutritionnel, suivi de progression."}
        </p>

        {/* 2.3 */}
        <h3 className="text-lg font-medium text-brand-dark mb-2 mt-6">
          2.3 {en ? "Browsing data" : "Données de navigation"}
        </h3>
        <p className="text-gray-700 leading-relaxed mb-2">
          {en
            ? "Data collected: IP address (anonymized), browser type and operating system, pages viewed and visit duration, traffic source."
            : "Données collectées : adresse IP (anonymisée), type de navigateur et système d\u2019exploitation, pages consultées et durée de visite, source de trafic."}
        </p>
        <p className="text-gray-700 leading-relaxed mb-2">
          {en
            ? "Legal basis: Legitimate interest (article 6.1.f of the GDPR)"
            : "Base légale : Intérêt légitime (article 6.1.f du RGPD)"}
        </p>
        <p className="text-gray-700 leading-relaxed">
          {en
            ? "Purpose: Statistical analysis and improvement of user experience."
            : "Finalité : Analyse statistique et amélioration de l\u2019expérience utilisateur."}
        </p>
      </section>

      {/* Section 3 - Données de santé / Health Data */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          3. {en ? "Health Data" : "Données de santé"}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          {en
            ? "Certain data collected as part of fitness monitoring (weight, body composition, health goals) may be considered sensitive data within the meaning of article 9 of the GDPR."
            : "Certaines données collectées dans le cadre du suivi sportif (poids, composition corporelle, objectifs de santé) peuvent être considérées comme des données sensibles au sens de l\u2019article 9 du RGPD."}
        </p>
        <p className="text-gray-700 leading-relaxed">
          {en ? (
            <>
              The processing of this data is based on the explicit consent of
              the user (article 9.2.a of the GDPR), obtained during the
              creation of their personal account. This data is used exclusively
              within the coaching relationship and is never shared with third
              parties.
            </>
          ) : (
            <>
              Le traitement de ces données est fondé sur le consentement
              explicite de l&apos;utilisateur (article 9.2.a du RGPD), recueilli
              lors de la création de son espace personnel. Ces données sont
              utilisées exclusivement dans le cadre de la relation de coaching
              et ne sont jamais partagées avec des tiers.
            </>
          )}
        </p>
      </section>

      {/* Section 4 - Destinataires des données / Data Recipients */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          4. {en ? "Data Recipients" : "Destinataires des données"}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          {en
            ? `Personal data collected is intended solely for ${LEGAL_INFO.name} as a sports coach. Certain technical sub-processors may have access to the data:`
            : `Les données personnelles collectées sont destinées uniquement à ${LEGAL_INFO.name} en tant que éducateur sportif. Certains sous-traitants techniques peuvent avoir accès aux données :`}
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700 border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 pr-4 font-semibold">
                  {en ? "Sub-processor" : "Sous-traitant"}
                </th>
                <th className="text-left py-2 pr-4 font-semibold">
                  Service
                </th>
                <th className="text-left py-2 font-semibold">
                  {en ? "Location" : "Localisation"}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4">Vercel Inc.</td>
                <td className="py-2 pr-4">
                  {en ? "Website hosting" : "Hébergement du site"}
                </td>
                <td className="py-2">
                  {en ? "United States" : "États-Unis"}
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4">Supabase Inc.</td>
                <td className="py-2 pr-4">
                  {en
                    ? "Database / Authentication"
                    : "Base de données / Authentification"}
                </td>
                <td className="py-2">
                  {en ? "United States / EU" : "États-Unis / UE"}
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4">Stripe Inc.</td>
                <td className="py-2 pr-4">
                  {en ? "Online payment processing" : "Traitement des paiements en ligne"}
                </td>
                <td className="py-2">{en ? "United States" : "États-Unis"}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4">EmailJS</td>
                <td className="py-2 pr-4">
                  {en ? "Form delivery" : "Envoi des formulaires"}
                </td>
                <td className="py-2">{LEGAL_INFO.emailjsLocation}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-700 leading-relaxed mt-4 text-sm">
          {en
            ? "For transfers outside the European Union, appropriate safeguards are ensured by the European Commission\u2019s Standard Contractual Clauses or the EU-US Data Privacy Framework."
            : "Pour les transferts hors de l\u2019Union Européenne, les garanties appropriées sont assurées par les clauses contractuelles types de la Commission Européenne ou le cadre EU-US Data Privacy Framework."}
        </p>
      </section>

      {/* Section 5 - Durée de conservation / Data Retention */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          5.{" "}
          {en
            ? "Data Retention Period"
            : "Durée de conservation des données"}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700 border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 pr-4 font-semibold">
                  {en ? "Data Type" : "Type de données"}
                </th>
                <th className="text-left py-2 font-semibold">
                  {en ? "Duration" : "Durée"}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4">
                  {en ? "Contact form" : "Formulaire de contact"}
                </td>
                <td className="py-2">
                  {en
                    ? "12 months after last contact"
                    : "12 mois après le dernier contact"}
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4">
                  {en
                    ? "Coaching data (client portal)"
                    : "Données de coaching (espace client)"}
                </td>
                <td className="py-2">
                  {en
                    ? "Duration of contractual relationship + 3 years"
                    : "Durée de la relation contractuelle + 3 ans"}
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4">
                  {en ? "Billing data" : "Données de facturation"}
                </td>
                <td className="py-2">
                  {en
                    ? "10 years (legal requirement)"
                    : "10 ans (obligation légale)"}
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4">
                  {en ? "Browsing cookies" : "Cookies de navigation"}
                </td>
                <td className="py-2">
                  {en ? "13 months maximum" : "13 mois maximum"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 6 - Vos droits / Your Rights */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          6. {en ? "Your Rights" : "Vos droits"}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          {en
            ? "In accordance with the GDPR and the French Data Protection Act, you have the following rights regarding your personal data:"
            : "Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants sur vos données personnelles :"}
        </p>
        <ul className="space-y-2 text-gray-700">
          <li>
            <strong>
              {en
                ? "Right of access (article 15 GDPR)"
                : "Droit d\u2019accès (article 15 RGPD)"}
              {" "}:
            </strong>{" "}
            {en
              ? "obtain confirmation that your data is being processed and receive a copy"
              : "obtenir la confirmation que vos données sont traitées et en obtenir une copie"}
          </li>
          <li>
            <strong>
              {en
                ? "Right to rectification (article 16 GDPR)"
                : "Droit de rectification (article 16 RGPD)"}
              {" "}:
            </strong>{" "}
            {en
              ? "correct inaccurate or incomplete data"
              : "corriger des données inexactes ou incomplètes"}
          </li>
          <li>
            <strong>
              {en
                ? "Right to erasure (article 17 GDPR)"
                : "Droit à l\u2019effacement (article 17 RGPD)"}
              {" "}:
            </strong>{" "}
            {en
              ? "request the deletion of your data"
              : "demander la suppression de vos données"}
          </li>
          <li>
            <strong>
              {en
                ? "Right to restriction (article 18 GDPR)"
                : "Droit à la limitation (article 18 RGPD)"}
              {" "}:
            </strong>{" "}
            {en
              ? "restrict the processing of your data"
              : "restreindre le traitement de vos données"}
          </li>
          <li>
            <strong>
              {en
                ? "Right to data portability (article 20 GDPR)"
                : "Droit à la portabilité (article 20 RGPD)"}
              {" "}:
            </strong>{" "}
            {en
              ? "receive your data in a structured format"
              : "recevoir vos données dans un format structuré"}
          </li>
          <li>
            <strong>
              {en
                ? "Right to object (article 21 GDPR)"
                : "Droit d\u2019opposition (article 21 RGPD)"}
              {" "}:
            </strong>{" "}
            {en
              ? "object to the processing of your data"
              : "vous opposer au traitement de vos données"}
          </li>
          <li>
            <strong>
              {en
                ? "Right to withdraw consent"
                : "Droit de retrait du consentement"}
              {" "}:
            </strong>{" "}
            {en
              ? "withdraw your consent at any time"
              : "retirer votre consentement à tout moment"}
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-4">
          {en
            ? `To exercise these rights, contact us at: ${LEGAL_INFO.email}`
            : `Pour exercer ces droits, contactez-nous à : ${LEGAL_INFO.email}`}
        </p>
        <p className="text-gray-700 leading-relaxed mb-3">
          {en
            ? "We commit to responding within a maximum of 30 days."
            : "Nous nous engageons à répondre dans un délai maximum de 30 jours."}
        </p>
        <p className="text-gray-700 leading-relaxed">
          {en ? (
            <>
              You also have the right to file a complaint with the{" "}
              <a
                href="https://www.cnil.fr/fr/plaintes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue hover:underline"
              >
                French Data Protection Authority (CNIL)
              </a>
              , 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, France.
            </>
          ) : (
            <>
              Vous disposez également du droit d&apos;introduire une réclamation
              auprès de la{" "}
              <a
                href="https://www.cnil.fr/fr/plaintes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue hover:underline"
              >
                Commission Nationale de l&apos;Informatique et des Libertés (CNIL)
              </a>
              , 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.
            </>
          )}
        </p>
      </section>

      {/* Section 7 - Cookies */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          7. Cookies
        </h2>
        <p className="text-gray-700 leading-relaxed mb-2">
          {en
            ? "A cookie is a small text file stored on your device when visiting a website. This site uses cookies strictly necessary for the operation of the site (session, language preferences)."
            : "Un cookie est un petit fichier texte déposé sur votre terminal lors de la visite d\u2019un site web. Ce site utilise des cookies strictement nécessaires au fonctionnement du site (session, préférences de langue)."}
        </p>
        <p className="text-gray-700 leading-relaxed mb-2">
          {en
            ? "On your first visit, a banner informs you of the use of cookies and collects your consent for non-essential cookies. You can modify your preferences at any time through your browser settings."
            : "Lors de votre première visite, un bandeau vous informe de la présence de cookies et recueille votre consentement pour les cookies non essentiels. Vous pouvez à tout moment modifier vos préférences via les paramètres de votre navigateur."}
        </p>
        <p className="text-gray-700 leading-relaxed">
          {en
            ? "Refusing audience measurement cookies does not affect your browsing experience on the site."
            : "Le refus des cookies de mesure d\u2019audience n\u2019affecte pas votre navigation sur le site."}
        </p>
      </section>

      {/* Section 8 - Sécurité des données / Data Security */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          8. {en ? "Data Security" : "Sécurité des données"}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {en
            ? "We implement appropriate technical and organizational measures to protect your personal data: transmission via HTTPS protocol (SSL/TLS encryption), access limited to the data controller only, hosting on secure infrastructure (Vercel), secure authentication via Supabase."
            : "Nous mettons en \u0153uvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles : transmission via protocole HTTPS (chiffrement SSL/TLS), accès limité au seul responsable du traitement, hébergement sur infrastructure sécurisée (Vercel), authentification sécurisée via Supabase."}
        </p>
      </section>

      {/* Section 9 - Mineurs / Minors */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          9. {en ? "Minors" : "Mineurs"}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {en ? (
            <>
              The website and coaching services may be aimed at minors in the
              context of swimming lessons. In this case, the consent of the
              legal guardian (parent or tutor) is required for any processing of
              personal data of a minor under 15 years of age, in accordance
              with article 8 of the GDPR and the French Data Protection Act.
            </>
          ) : (
            <>
              Le site et les services de coaching peuvent s&apos;adresser à des
              mineurs dans le cadre des cours de natation. Dans ce cas, le
              consentement du représentant légal (parent ou tuteur) est requis
              pour tout traitement de données personnelles d&apos;un mineur de moins
              de 15 ans, conformément à l&apos;article 8 du RGPD et à la loi
              Informatique et Libertés.
            </>
          )}
        </p>
      </section>

      {/* Section 10 - Modification de cette politique / Changes to This Policy */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          10. {en ? "Changes to This Policy" : "Modification de cette politique"}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {en
            ? "We reserve the right to modify this policy at any time. Any changes will be published on this page with the update date."
            : "Nous nous réservons le droit de modifier la présente politique à tout moment. Toute modification sera publiée sur cette page avec la date de mise à jour."}
        </p>
      </section>

      {/* Section 11 - Contact */}
      <section>
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          11. Contact
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {en
            ? `For any questions regarding this policy or to exercise your rights: ${LEGAL_INFO.email} — ${LEGAL_INFO.address}, ${LEGAL_INFO.city}.`
            : `Pour toute question relative à la présente politique ou pour exercer vos droits : ${LEGAL_INFO.email} — ${LEGAL_INFO.address}, ${LEGAL_INFO.city}.`}
        </p>
      </section>
    </>
  );
}
