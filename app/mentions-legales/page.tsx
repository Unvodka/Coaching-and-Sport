import { BASE_URL } from "@/lib/config";
import { LEGAL_INFO } from "@/lib/legal";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Mentions Légales",
  description:
    "Mentions légales du site Coach-Bluewave — Arnaud Chevallier, coach sportif et maître-nageur diplômé à Valbonne.",
  alternates: {
    canonical: `${BASE_URL}/mentions-legales`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4 font-[family-name:var(--font-playfair)]">
          Mentions Légales
        </h1>
        <p className="text-sm text-gray-500 mb-12">
          Dernière mise à jour : Mars 2026
        </p>

        {/* Section 1 - Éditeur */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            1. Éditeur du site
          </h2>
          <div className="space-y-1 text-gray-700 leading-relaxed">
            <p>
              <strong>Nom :</strong> {LEGAL_INFO.name}
            </p>
            <p>
              <strong>Statut :</strong> {LEGAL_INFO.status}
            </p>
            <p>
              <strong>Activité :</strong> {LEGAL_INFO.activity}
            </p>
            <p>
              <strong>SIRET :</strong> {LEGAL_INFO.siret}
            </p>
            <p>
              <strong>Adresse :</strong> {LEGAL_INFO.address},{" "}
              {LEGAL_INFO.city}
            </p>
            <p>
              <strong>Téléphone :</strong> {LEGAL_INFO.phone}
            </p>
            <p>
              <strong>Email :</strong> {LEGAL_INFO.email}
            </p>
            <p>
              <strong>Directeur de la publication :</strong> {LEGAL_INFO.name}
            </p>
          </div>
        </section>

        {/* Section 2 - Qualification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            2. Qualification professionnelle
          </h2>
          <p className="text-gray-700 mb-3">
            Conformément aux articles L.212-1 et R.212-85 du Code du sport :
          </p>
          <div className="space-y-1 text-gray-700 leading-relaxed">
            <p>
              <strong>Diplôme :</strong> {LEGAL_INFO.diploma}
            </p>
            <p>
              <strong>Carte professionnelle d&apos;éducateur sportif n° :</strong>{" "}
              {LEGAL_INFO.carteProNumber}
            </p>
            <p>
              <strong>Délivrée par :</strong> {LEGAL_INFO.carteProIssuedBy}
            </p>
            <p>
              <strong>Date de validité :</strong> {LEGAL_INFO.carteProExpiry}
            </p>
          </div>
          <p className="text-gray-600 text-sm mt-3">
            Vérifiez la validité de cette carte sur le portail du Ministère des
            Sports :{" "}
            <a
              href="https://eaps.sports.gouv.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-blue hover:underline"
            >
              eaps.sports.gouv.fr
            </a>
          </p>
        </section>

        {/* Section 3 - SAP */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            3. Déclaration SAP (Services à la Personne)
          </h2>
          <div className="space-y-1 text-gray-700 leading-relaxed">
            <p>
              <strong>Numéro de déclaration SAP :</strong>{" "}
              {LEGAL_INFO.sapNumber}
            </p>
            <p>
              Déclaration effectuée via le portail NOVA auprès de la
              DDETS des Alpes-Maritimes.
            </p>
            <p>
              Les prestations de coaching à domicile ouvrent droit à un crédit
              d&apos;impôt de 50% conformément à l&apos;article 199 sexdecies du Code
              général des impôts.
            </p>
          </div>
        </section>

        {/* Section 4 - Hébergement */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            4. Hébergement
          </h2>
          <div className="space-y-1 text-gray-700 leading-relaxed">
            <p>
              <strong>Hébergeur :</strong> Vercel Inc.
            </p>
            <p>
              <strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA
              91723, États-Unis
            </p>
            <p>
              <strong>Site web :</strong>{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue hover:underline"
              >
                vercel.com
              </a>
            </p>
          </div>
        </section>

        {/* Section 5 - Propriété intellectuelle */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            5. Propriété intellectuelle
          </h2>
          <p className="text-gray-700 leading-relaxed">
            L&apos;ensemble du contenu du site coach-bluewave.com (textes, images,
            vidéos, logos, graphismes, icônes) est la propriété exclusive
            d&apos;{LEGAL_INFO.name} ou fait l&apos;objet d&apos;une autorisation d&apos;utilisation.
            Toute reproduction, représentation, modification, publication ou
            adaptation de tout ou partie des éléments du site est interdite sans
            autorisation écrite préalable. Toute exploitation non autorisée sera
            considérée comme constitutive d&apos;une contrefaçon et poursuivie
            conformément aux articles L.335-2 et suivants du Code de la
            propriété intellectuelle.
          </p>
        </section>

        {/* Section 6 - Responsabilité */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            6. Responsabilité
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Les informations fournies sur le site coach-bluewave.com sont
            présentées à titre indicatif et général et ne sauraient se
            substituer à un avis médical. L&apos;éditeur ne saurait garantir
            l&apos;exactitude, la complétude et l&apos;actualité des informations
            diffusées sur le site.
          </p>
          <p className="text-gray-700 leading-relaxed">
            L&apos;éditeur recommande à toute personne de consulter un médecin
            avant de commencer un programme d&apos;entraînement sportif.
          </p>
        </section>

        {/* Section 7 - Liens hypertextes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            7. Liens hypertextes
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Le site coach-bluewave.com peut contenir des liens vers d&apos;autres
            sites internet. L&apos;éditeur n&apos;exerce aucun contrôle sur ces sites et
            décline toute responsabilité quant à leur contenu.
          </p>
        </section>

        {/* Section 8 - Droit applicable */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            8. Droit applicable
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Les présentes mentions légales sont régies par le droit français. En
            cas de litige, et après tentative de résolution amiable, compétence
            est attribuée aux tribunaux compétents de Grasse.
          </p>
        </section>

        {/* Section 9 - Médiation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand-dark mb-4">
            9. Médiation de la consommation
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Conformément aux articles L.616-1 et R.616-1 du Code de la
            consommation, un dispositif de médiation de la consommation est mis
            en place. Le consommateur peut recourir gratuitement au service de
            médiation suivant :
          </p>
          <div className="space-y-1 text-gray-700 leading-relaxed">
            <p>
              <strong>Médiateur :</strong> {LEGAL_INFO.mediatorName}
            </p>
            <p>
              <strong>Site web :</strong> {LEGAL_INFO.mediatorWebsite}
            </p>
            <p>
              <strong>Email :</strong> {LEGAL_INFO.mediatorEmail}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
