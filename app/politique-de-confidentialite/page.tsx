import { Metadata } from "next";

const BASE_URL = "https://coach-bluewave.com";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description:
    "Politique de confidentialité et protection des données personnelles du site Coach-Bluewave — Conformité RGPD.",
  alternates: {
    canonical: `${BASE_URL}/politique-de-confidentialite`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4 font-[family-name:var(--font-playfair)]">
          Politique de Confidentialité
        </h1>
        <p className="text-sm text-gray-500 mb-12">
          Dernière mise à jour : Mars 2026
        </p>

        {/* Section 1 - Introduction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            1. Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            La présente politique de confidentialité a pour but d&apos;informer les
            utilisateurs du site coach-bluewave.com des modalités de collecte,
            de traitement et de protection de leurs données personnelles,
            conformément au Règlement Général sur la Protection des Données
            (RGPD — Règlement UE 2016/679) et à la loi Informatique et Libertés
            du 6 janvier 1978 modifiée.
          </p>
          <div className="space-y-1 text-gray-700">
            <p>
              <strong>Responsable du traitement :</strong> Arnaud Chevallier
            </p>
            <p>
              <strong>Statut :</strong> Micro-entrepreneur — Coach-Bluewave
            </p>
            <p>
              <strong>Adresse :</strong>{" "}
              <span className="text-red-500">[BUSINESS_ADDRESS]</span>,
              Valbonne, 06560, France
            </p>
            <p>
              <strong>Email :</strong>{" "}
              <span className="text-red-500">[CONTACT_EMAIL]</span>
            </p>
          </div>
        </section>

        {/* Section 2 - Données collectées */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            2. Données collectées
          </h2>

          <h3 className="text-lg font-medium text-brand-dark mb-2 mt-6">
            2.1 Via le formulaire de contact
          </h3>
          <p className="text-gray-700 leading-relaxed mb-2">
            Données collectées : nom, prénom, adresse email, numéro de téléphone
            (facultatif), contenu du message.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Base légale :</strong> Consentement (article 6.1.a du RGPD)
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Finalité :</strong> Répondre aux demandes d&apos;information et
            de prise de contact.
          </p>

          <h3 className="text-lg font-medium text-brand-dark mb-2 mt-6">
            2.2 Via l&apos;application de coaching (espace client)
          </h3>
          <p className="text-gray-700 leading-relaxed mb-2">
            Données collectées : nom, prénom, adresse email, données de suivi
            sportif (poids, masse grasse, masse musculaire, objectifs), données
            du journal de bien-être (notes personnelles, humeur, activités),
            programmes d&apos;entraînement et plans nutritionnels personnalisés,
            historique des séances.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Base légale :</strong> Exécution du contrat de coaching
            (article 6.1.b du RGPD)
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Finalité :</strong> Personnalisation du suivi sportif et
            nutritionnel, suivi de progression.
          </p>

          <h3 className="text-lg font-medium text-brand-dark mb-2 mt-6">
            2.3 Données de navigation
          </h3>
          <p className="text-gray-700 leading-relaxed mb-2">
            Données collectées : adresse IP (anonymisée), type de navigateur et
            système d&apos;exploitation, pages consultées et durée de visite, source
            de trafic.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Base légale :</strong> Intérêt légitime (article 6.1.f du
            RGPD)
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Finalité :</strong> Analyse statistique et amélioration de
            l&apos;expérience utilisateur.
          </p>
        </section>

        {/* Section 3 - Données de santé */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            3. Données de santé
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Certaines données collectées dans le cadre du suivi sportif (poids,
            composition corporelle, objectifs de santé) peuvent être considérées
            comme des données sensibles au sens de l&apos;article 9 du RGPD.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Le traitement de ces données est fondé sur le consentement explicite
            de l&apos;utilisateur (article 9.2.a du RGPD), recueilli lors de la
            création de son espace personnel. Ces données sont utilisées
            exclusivement dans le cadre de la relation de coaching et ne sont
            jamais partagées avec des tiers.
          </p>
        </section>

        {/* Section 4 - Destinataires */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            4. Destinataires des données
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Les données personnelles collectées sont destinées uniquement à
            Arnaud Chevallier en tant que coach sportif. Certains sous-traitants
            techniques peuvent avoir accès aux données :
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700 border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 pr-4 font-semibold">
                    Sous-traitant
                  </th>
                  <th className="text-left py-2 pr-4 font-semibold">
                    Service
                  </th>
                  <th className="text-left py-2 font-semibold">
                    Localisation
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Vercel Inc.</td>
                  <td className="py-2 pr-4">Hébergement du site</td>
                  <td className="py-2">États-Unis</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Supabase Inc.</td>
                  <td className="py-2 pr-4">Base de données / Authentification</td>
                  <td className="py-2">États-Unis / UE</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">EmailJS</td>
                  <td className="py-2 pr-4">Envoi des formulaires</td>
                  <td className="py-2">
                    <span className="text-red-500">[EMAILJS_LOCATION]</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 leading-relaxed mt-4 text-sm">
            Pour les transferts hors de l&apos;Union Européenne, les garanties
            appropriées sont assurées par les clauses contractuelles types de la
            Commission Européenne ou le cadre EU-US Data Privacy Framework.
          </p>
        </section>

        {/* Section 5 - Durée de conservation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            5. Durée de conservation des données
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700 border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 pr-4 font-semibold">
                    Type de données
                  </th>
                  <th className="text-left py-2 font-semibold">Durée</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Formulaire de contact</td>
                  <td className="py-2">12 mois après le dernier contact</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">
                    Données de coaching (espace client)
                  </td>
                  <td className="py-2">
                    Durée de la relation contractuelle + 3 ans
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Données de facturation</td>
                  <td className="py-2">10 ans (obligation légale)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Cookies de navigation</td>
                  <td className="py-2">13 mois maximum</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 6 - Droits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            6. Vos droits
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Conformément au RGPD et à la loi Informatique et Libertés, vous
            disposez des droits suivants sur vos données personnelles :
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Droit d&apos;accès</strong> (article 15 RGPD) : obtenir la
              confirmation que vos données sont traitées et en obtenir une copie
            </li>
            <li>
              <strong>Droit de rectification</strong> (article 16 RGPD) :
              corriger des données inexactes ou incomplètes
            </li>
            <li>
              <strong>Droit à l&apos;effacement</strong> (article 17 RGPD) :
              demander la suppression de vos données
            </li>
            <li>
              <strong>Droit à la limitation</strong> (article 18 RGPD) :
              restreindre le traitement de vos données
            </li>
            <li>
              <strong>Droit à la portabilité</strong> (article 20 RGPD) :
              recevoir vos données dans un format structuré
            </li>
            <li>
              <strong>Droit d&apos;opposition</strong> (article 21 RGPD) : vous
              opposer au traitement de vos données
            </li>
            <li>
              <strong>Droit de retrait du consentement</strong> : retirer votre
              consentement à tout moment
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            Pour exercer ces droits, contactez-nous à :{" "}
            <span className="text-red-500">[CONTACT_EMAIL]</span>
          </p>
          <p className="text-gray-700 leading-relaxed mt-2">
            Nous nous engageons à répondre dans un délai maximum de 30 jours.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
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
          </p>
        </section>

        {/* Section 7 - Cookies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            7. Cookies
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Un cookie est un petit fichier texte déposé sur votre terminal lors
            de la visite d&apos;un site web. Ce site utilise des cookies strictement
            nécessaires au fonctionnement du site (session, préférences de
            langue).
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">
            Lors de votre première visite, un bandeau vous informe de la
            présence de cookies et recueille votre consentement pour les cookies
            non essentiels. Vous pouvez à tout moment modifier vos préférences
            via les paramètres de votre navigateur.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Le refus des cookies de mesure d&apos;audience n&apos;affecte pas votre
            navigation sur le site.
          </p>
        </section>

        {/* Section 8 - Sécurité */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            8. Sécurité des données
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Nous mettons en œuvre des mesures techniques et organisationnelles
            appropriées pour protéger vos données personnelles : transmission
            via protocole HTTPS (chiffrement SSL/TLS), accès limité au seul
            responsable du traitement, hébergement sur infrastructure sécurisée
            (Vercel), authentification sécurisée via Supabase.
          </p>
        </section>

        {/* Section 9 - Mineurs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            9. Mineurs
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Le site et les services de coaching peuvent s&apos;adresser à des mineurs
            dans le cadre des cours de natation. Dans ce cas, le consentement du
            représentant légal (parent ou tuteur) est requis pour tout
            traitement de données personnelles d&apos;un mineur de moins de 15 ans,
            conformément à l&apos;article 8 du RGPD et à la loi Informatique et
            Libertés.
          </p>
        </section>

        {/* Section 10 - Modifications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            10. Modification de cette politique
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Nous nous réservons le droit de modifier la présente politique à tout
            moment. Toute modification sera publiée sur cette page avec la date
            de mise à jour.
          </p>
        </section>

        {/* Section 11 - Contact */}
        <section>
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            11. Contact
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Pour toute question relative à la présente politique ou pour exercer
            vos droits :{" "}
            <span className="text-red-500">[CONTACT_EMAIL]</span> —{" "}
            <span className="text-red-500">[BUSINESS_ADDRESS]</span>, Valbonne,
            06560, France.
          </p>
        </section>
      </div>
    </main>
  );
}
