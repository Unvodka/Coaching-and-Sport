import { Metadata } from "next";

const BASE_URL = "https://coach-bluewave.com";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description:
    "Conditions générales de vente des prestations de coaching sportif et cours de natation — Coach-Bluewave, Arnaud Chevallier.",
  alternates: {
    canonical: `${BASE_URL}/cgv`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CGVPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4 font-[family-name:var(--font-playfair)]">
          Conditions Générales de Vente
        </h1>
        <p className="text-sm text-gray-500 mb-12">
          Dernière mise à jour : Mars 2026
        </p>

        {/* Article 1 - Objet */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            Article 1 — Objet
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Les présentes Conditions Générales de Vente (CGV) définissent les
            droits et obligations des parties dans le cadre de la vente de
            prestations de coaching sportif, de cours de natation et de services
            associés proposés par :
          </p>
          <div className="space-y-1 text-gray-700 leading-relaxed">
            <p>
              <strong>Arnaud Chevallier</strong> — Micro-entrepreneur,
              Coach-Bluewave
            </p>
            <p>
              <strong>SIRET :</strong>{" "}
              <span className="text-red-500">[SIRET_NUMBER]</span>
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
            <p>
              <strong>Téléphone :</strong>{" "}
              <span className="text-red-500">[PHONE_NUMBER]</span>
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed mt-3">
            Ci-après dénommé «&nbsp;le Coach&nbsp;». Toute commande de
            prestation implique l&apos;acceptation sans réserve des présentes
            CGV.
          </p>
        </section>

        {/* Article 2 - Prestations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            Article 2 — Prestations proposées
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Le Coach propose les prestations suivantes (liste non exhaustive) :
            coaching sportif individuel à domicile ou en extérieur, cours de
            natation individuels et collectifs (enfants et adultes), programmes
            d&apos;entraînement personnalisés, suivi nutritionnel et conseils
            alimentaires, coaching en ligne (suivi à distance, plans
            personnalisés), forfaits et packs de séances. Les caractéristiques
            essentielles de chaque prestation sont décrites sur le site
            coach-bluewave.com et/ou communiquées au Client avant toute
            commande.
          </p>
        </section>

        {/* Article 3 - Zone */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            Article 3 — Zone d&apos;intervention
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Le Coach intervient principalement à Valbonne, Sophia Antipolis,
            Mougins, Grasse, Antibes, Nice et communes environnantes de la Côte
            d&apos;Azur (06). Des frais de déplacement supplémentaires peuvent
            s&apos;appliquer au-delà d&apos;un rayon de{" "}
            <span className="text-red-500">[MAX_KM_RADIUS]</span> km depuis
            Valbonne. Ces frais sont communiqués au Client avant validation.
          </p>
        </section>

        {/* Article 4 - Tarifs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            Article 4 — Tarifs et modalités de paiement
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Les tarifs sont indiqués en euros (€) TTC (TVA non applicable —
            article 293 B du CGI, régime de la micro-entreprise). Les tarifs en
            vigueur sont consultables sur coach-bluewave.com et/ou communiqués
            sur devis. Le Coach se réserve le droit de modifier ses tarifs à
            tout moment. Les prestations sont facturées au tarif en vigueur au
            moment de la commande.
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">
            Le paiement peut être effectué par : virement bancaire, espèces
            <span className="text-red-500">
              , [OTHER_PAYMENT_METHODS]
            </span>
            . Le paiement est exigible à la séance ou selon les conditions du
            forfait convenu.
          </p>
          <p className="text-gray-700 leading-relaxed">
            En cas de retard de paiement, des pénalités de retard seront
            appliquées au taux de 3 fois le taux d&apos;intérêt légal en
            vigueur (article L.441-10 du Code de commerce). Une indemnité
            forfaitaire de 40 € pour frais de recouvrement pourra être exigée.
          </p>
        </section>

        {/* Article 5 - SAP */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            Article 5 — Crédit d&apos;impôt SAP
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Le Coach est déclaré en tant que prestataire de Services à la
            Personne (SAP) sous le n°{" "}
            <span className="text-red-500">[SAP_NUMBER]</span>. Les prestations
            de coaching réalisées au domicile du Client ouvrent droit à un
            crédit d&apos;impôt de 50% des sommes versées (article 199
            sexdecies du CGI).
          </p>
          <p className="text-gray-700 leading-relaxed">
            Une attestation fiscale annuelle est fournie au Client.{" "}
            <strong>Important :</strong> seules les prestations réalisées au
            domicile du Client sont éligibles. Les séances en extérieur ou en
            piscine publique ne sont pas concernées.
          </p>
        </section>

        {/* Article 6 - Annulation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            Article 6 — Réservation et annulation
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Les séances sont réservées d&apos;un commun accord entre le Coach
            et le Client.
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">
            <strong>Annulation par le Client :</strong> plus de 24h avant la
            séance, annulation gratuite et report ; moins de 24h, la séance est
            due et facturée ; absence sans prévenir, la séance est due et
            facturée.
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">
            <strong>Annulation par le Coach :</strong> en cas d&apos;empêchement
            (maladie, force majeure, intempéries), la séance est reportée sans
            frais.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Conditions météorologiques :</strong> pour les séances en
            extérieur, le Coach se réserve le droit d&apos;annuler ou reporter
            si les conditions rendent la pratique dangereuse.
          </p>
        </section>

        {/* Article 7 - Rétractation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            Article 7 — Droit de rétractation
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Conformément aux articles L.221-18 et suivants du Code de la
            consommation, le Client dispose d&apos;un délai de 14 jours à
            compter de la conclusion du contrat pour exercer son droit de
            rétractation, sans justifier de motif.
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">
            <strong>Exception :</strong> le droit de rétractation ne peut être
            exercé pour les prestations pleinement exécutées avant la fin du
            délai, si le Client a donné son accord préalable (article L.221-28
            du Code de la consommation).
          </p>
          <p className="text-gray-700 leading-relaxed">
            Pour exercer ce droit, contactez{" "}
            <span className="text-red-500">[CONTACT_EMAIL]</span>. Le
            remboursement sera effectué sous 14 jours, déduction faite des
            prestations déjà exécutées.
          </p>
        </section>

        {/* Article 8 - Obligations Coach */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            Article 8 — Obligations du Coach
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Le Coach s&apos;engage à : fournir des prestations conformes et
            adaptées au niveau du Client ; être titulaire des diplômes et
            qualifications requis (BPJEPS AAN, carte professionnelle en cours de
            validité) ; disposer d&apos;une assurance responsabilité civile
            professionnelle ; respecter les horaires convenus ; adapter les
            exercices à la condition physique du Client. La responsabilité du
            Coach est limitée aux dommages directs résultant d&apos;une faute
            prouvée.
          </p>
        </section>

        {/* Article 9 - Obligations Client */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            Article 9 — Obligations du Client
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Le Client s&apos;engage à : communiquer toute information pertinente
            sur son état de santé, blessures ou contre-indications ; fournir un
            certificat médical si demandé ; suivre les consignes de sécurité ;
            prévenir le Coach de tout malaise pendant la séance ; disposer
            d&apos;une tenue adaptée.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Mineurs :</strong> l&apos;inscription aux cours de natation
            pour les mineurs nécessite l&apos;autorisation écrite du
            représentant légal.
          </p>
        </section>

        {/* Article 10 - Assurance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            Article 10 — Assurance
          </h2>
          <div className="space-y-1 text-gray-700 leading-relaxed">
            <p>
              <strong>Assureur :</strong>{" "}
              <span className="text-red-500">[INSURANCE_COMPANY]</span>
            </p>
            <p>
              <strong>Numéro de police :</strong>{" "}
              <span className="text-red-500">[INSURANCE_POLICY_NUMBER]</span>
            </p>
            <p>
              <strong>Garantie :</strong> Responsabilité civile professionnelle —
              Coaching sportif et enseignement de la natation
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed mt-3">
            Il est recommandé au Client de souscrire une assurance individuelle
            accident pour la pratique sportive.
          </p>
        </section>

        {/* Article 11 - Force majeure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            Article 11 — Force majeure
          </h2>
          <p className="text-gray-700 leading-relaxed">
            La responsabilité du Coach ne pourra être engagée si l&apos;exécution
            est empêchée par un cas de force majeure (article 1218 du Code
            civil).
          </p>
        </section>

        {/* Article 12 - PI */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            Article 12 — Propriété intellectuelle
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Les programmes d&apos;entraînement, plans nutritionnels et tout
            contenu créé par le Coach sont protégés par le droit de la propriété
            intellectuelle. Le Client s&apos;interdit de les reproduire, diffuser
            ou commercialiser sans autorisation écrite.
          </p>
        </section>

        {/* Article 13 - Données */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            Article 13 — Protection des données
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Les données personnelles sont traitées conformément à notre{" "}
            <a
              href="/politique-de-confidentialite"
              className="text-brand-blue hover:underline"
            >
              Politique de Confidentialité
            </a>
            .
          </p>
        </section>

        {/* Article 14 - Médiation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            Article 14 — Médiation et litiges
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Pour toute réclamation, contactez{" "}
            <span className="text-red-500">[CONTACT_EMAIL]</span>.
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">
            En cas de litige non résolu à l&apos;amiable, le Client peut
            recourir au médiateur :{" "}
            <span className="text-red-500">[MEDIATOR_NAME]</span> —{" "}
            <span className="text-red-500">[MEDIATOR_WEBSITE]</span>
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">
            Plateforme européenne de résolution des litiges :{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-blue hover:underline"
            >
              ec.europa.eu/consumers/odr
            </a>
          </p>
          <p className="text-gray-700 leading-relaxed">
            Les présentes CGV sont soumises au droit français. À défaut de
            résolution amiable, les tribunaux de Grasse seront compétents.
          </p>
        </section>

        {/* Article 15 - Divers */}
        <section>
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            Article 15 — Acceptation
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Le Client reconnaît avoir pris connaissance des présentes CGV et les
            accepter sans réserve avant toute commande de prestation.
          </p>
        </section>
      </div>
    </main>
  );
}
