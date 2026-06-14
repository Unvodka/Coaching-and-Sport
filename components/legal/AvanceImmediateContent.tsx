"use client";

import { LEGAL_INFO } from "@/lib/legal";

export default function AvanceImmediateContent() {
  return (
    <>
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4 font-[family-name:var(--font-playfair)]">
        Avance Immédiate du Crédit d&apos;Impôt
      </h1>
      <p className="text-sm text-gray-500 mb-2">
        Service mis en place par l&apos;<strong>Urssaf</strong> et la{" "}
        <strong>Direction générale des Finances publiques (DGFiP)</strong>
      </p>
      <p className="text-sm text-gray-500 mb-12">
        Dernière mise à jour : Mai 2026
      </p>

      {/* Info box */}
      <div className="bg-blue-50 border-l-4 border-brand-blue rounded-r-lg p-5 mb-10">
        <p className="text-brand-dark font-semibold mb-1">
          Qu&apos;est-ce que l&apos;Avance Immédiate ?
        </p>
        <p className="text-gray-700 leading-relaxed text-sm">
          L&apos;Avance Immédiate du crédit d&apos;impôt est un service
          optionnel qui vous permet de bénéficier de votre crédit d&apos;impôt
          pour l&apos;emploi d&apos;un service à la personne{" "}
          <strong>au moment même du paiement</strong>, sans attendre votre
          déclaration de revenus annuelle.
        </p>
      </div>

      {/* Section 1 — Présentation */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          1. Présentation du service
        </h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p>
            L&apos;Avance Immédiate est un service numérique développé par
            l&apos;<strong>Urssaf</strong> et la{" "}
            <strong>Direction générale des Finances publiques (DGFiP)</strong>.
            Il s&apos;adresse aux particuliers ayant recours à des{" "}
            <strong>Services à la Personne (SAP)</strong> et souhaitant
            profiter immédiatement de leur crédit d&apos;impôt, sans attendre
            la déclaration annuelle.
          </p>
          <p>
            En tant qu&apos;organisme de services à la personne agréé (numéro
            SAP : <strong>{LEGAL_INFO.sapNumber}</strong>), Coach Bluewave
            propose ce dispositif à ses clients éligibles pour les prestations
            de cours de sport à domicile.
          </p>
        </div>
      </section>

      {/* Section 2 — Caractère non obligatoire */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          2. Caractère non obligatoire
        </h2>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-gray-700 leading-relaxed space-y-2">
          <p>
            ⚠️ L&apos;Avance Immédiate est un service{" "}
            <strong>entièrement facultatif</strong>. Vous n&apos;êtes en aucun
            cas obligé(e) d&apos;y adhérer pour bénéficier des prestations de
            Coach Bluewave. Le paiement classique reste disponible à tout
            moment.
          </p>
          <p>
            💶 Ce service est <strong>entièrement gratuit</strong> pour le
            client. Aucun frais supplémentaire n&apos;est appliqué au titre de
            l&apos;utilisation de l&apos;Avance Immédiate.
          </p>
        </div>
      </section>

      {/* Section 3 — Conditions d'accès */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          3. Conditions d&apos;accès et d&apos;utilisation
        </h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p>Pour bénéficier de l&apos;Avance Immédiate, vous devez :</p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-gray-700">
            <li>
              Être un <strong>particulier</strong> domicilié en France
            </li>
            <li>
              Avoir recours à un service à la personne éligible (ex. : cours de
              sport à domicile)
            </li>
            <li>
              Être <strong>éligible au crédit d&apos;impôt</strong> pour
              l&apos;emploi d&apos;un salarié à domicile (50 % des dépenses
              dans la limite d&apos;un plafond annuel)
            </li>
            <li>
              Disposer d&apos;un compte sur le portail dédié de l&apos;Urssaf
            </li>
          </ul>
          <p className="text-sm text-gray-500 mt-2">
            Pour vérifier vos plafonds de crédit d&apos;impôt applicables,
            consultez la page officielle :{" "}
            <a
              href="https://www.impots.gouv.fr/portail/particulier/emploi-domicile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-blue underline hover:text-brand-dark transition-colors"
            >
              impots.gouv.fr — Emploi à domicile
            </a>
          </p>
        </div>
      </section>

      {/* Section 4 — Fonctionnement / Parcours d'activation */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          4. Fonctionnement et parcours d&apos;activation
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Voici comment fonctionne l&apos;Avance Immédiate, étape par étape :
        </p>

        <ol className="space-y-5">
          {[
            {
              step: "1",
              title: "Activation de votre compte",
              desc: "Vous activez votre compte client sur le portail dédié de l'Urssaf (lien transmis par Coach Bluewave lors de votre inscription au dispositif).",
            },
            {
              step: "2",
              title: "Réception de la demande de paiement",
              desc: "Après chaque prestation, Coach Bluewave émet une demande de paiement sur votre compte Urssaf. Vous recevez une notification.",
            },
            {
              step: "3",
              title: "Validation sous 48h",
              desc: "Vous disposez de 48 heures pour valider ou contester la demande de paiement directement depuis votre espace.",
            },
            {
              step: "4",
              title: "Déduction immédiate",
              desc: "Le crédit d'impôt est automatiquement déduit de la somme que vous avez à régler. Vous ne payez que 50 % du montant TTC (dans la limite des plafonds légaux).",
            },
          ].map(({ step, title, desc }) => (
            <li key={step} className="flex gap-4">
              <span className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold text-sm">
                {step}
              </span>
              <div>
                <p className="font-semibold text-brand-dark mb-1">{title}</p>
                <p className="text-gray-700 leading-relaxed text-sm">{desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Section 5 — Interlocuteur */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          5. Votre interlocuteur
        </h2>
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-gray-700 leading-relaxed">
          <p>
            En cas de question sur une prestation, un paiement ou le
            fonctionnement du service,{" "}
            <strong>
              votre interlocuteur reste Coach Bluewave (Arnaud Chevallier)
            </strong>{" "}
            — et non l&apos;Urssaf directement.
          </p>
          <p className="mt-3">
            📞 Téléphone :{" "}
            <a
              href={`tel:+33${LEGAL_INFO.phone.replace(/^0/, "")}`}
              className="text-brand-blue hover:text-brand-dark transition-colors"
            >
              {LEGAL_INFO.phone}
            </a>
            <br />
            ✉️ Email :{" "}
            <a
              href={`mailto:${LEGAL_INFO.email}`}
              className="text-brand-blue hover:text-brand-dark transition-colors"
            >
              {LEGAL_INFO.email}
            </a>
          </p>
        </div>
      </section>

      {/* Section 6 — Lien officiel plafonds */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          6. Plafonds du crédit d&apos;impôt
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Les plafonds annuels du crédit d&apos;impôt pour l&apos;emploi
          d&apos;un salarié à domicile sont fixés par la loi et varient selon
          votre situation (célibataire, en couple, avec enfants à charge, etc.).
        </p>
        <p className="text-gray-700">
          Consultez les informations officielles sur les plafonds applicables
          directement sur le site des impôts :
        </p>
        <a
          href="https://www.impots.gouv.fr/portail/particulier/emploi-domicile"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-3 px-5 py-3 bg-brand-dark text-white rounded-lg hover:bg-brand-navy transition-colors text-sm font-medium"
        >
          → impots.gouv.fr — Emploi à domicile
        </a>
      </section>
    </>
  );
}
