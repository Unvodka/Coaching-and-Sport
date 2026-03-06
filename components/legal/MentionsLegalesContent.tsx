"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";
import { LEGAL_INFO } from "@/lib/legal";

export default function MentionsLegalesContent() {
  const { locale } = useLanguage();
  const en = locale === "en";

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4 font-[family-name:var(--font-playfair)]">
        {en ? "Legal Notices" : "Mentions Légales"}
      </h1>
      <p className="text-sm text-gray-500 mb-12">
        {en ? "Last updated: March 2026" : "Dernière mise à jour : Mars 2026"}
      </p>

      {/* Section 1 - Éditeur / Site Publisher */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          1. {en ? "Site Publisher" : "Éditeur du site"}
        </h2>
        <div className="space-y-1 text-gray-700 leading-relaxed">
          <p>
            <strong>{en ? "Name" : "Nom"} :</strong> {LEGAL_INFO.name}
          </p>
          <p>
            <strong>{en ? "Status" : "Statut"} :</strong> {LEGAL_INFO.status}
          </p>
          <p>
            <strong>{en ? "Activity" : "Activité"} :</strong>{" "}
            {LEGAL_INFO.activity}
          </p>
          <p>
            <strong>SIRET :</strong> {LEGAL_INFO.siret}
          </p>
          <p>
            <strong>{en ? "Address" : "Adresse"} :</strong>{" "}
            {LEGAL_INFO.address}, {LEGAL_INFO.city}
          </p>
          <p>
            <strong>{en ? "Phone" : "Téléphone"} :</strong> {LEGAL_INFO.phone}
          </p>
          <p>
            <strong>Email :</strong> {LEGAL_INFO.email}
          </p>
          <p>
            <strong>
              {en ? "Publication Director" : "Directeur de la publication"} :
            </strong>{" "}
            {LEGAL_INFO.name}
          </p>
        </div>
      </section>

      {/* Section 2 - Qualification professionnelle / Professional Qualification */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          2. {en ? "Professional Qualification" : "Qualification professionnelle"}
        </h2>
        <p className="text-gray-700 mb-3">
          {en
            ? "In accordance with articles L.212-1 and R.212-85 of the French Sports Code:"
            : "Conformément aux articles L.212-1 et R.212-85 du Code du sport :"}
        </p>
        <div className="space-y-1 text-gray-700 leading-relaxed">
          <p>
            <strong>{en ? "Diploma" : "Diplôme"} :</strong>{" "}
            {LEGAL_INFO.diploma}
          </p>
          <p>
            <strong>
              {en
                ? "Professional Card no."
                : <>Carte professionnelle d&apos;éducateur sportif n°</>}{" "}
              :
            </strong>{" "}
            {LEGAL_INFO.carteProNumber}
          </p>
          <p>
            <strong>{en ? "Issued by" : "Délivrée par"} :</strong>{" "}
            {LEGAL_INFO.carteProIssuedBy}
          </p>
          <p>
            <strong>{en ? "Valid until" : "Date de validité"} :</strong>{" "}
            {LEGAL_INFO.carteProExpiry}
          </p>
        </div>
        <p className="text-gray-600 text-sm mt-3">
          {en
            ? "Verify the validity of this card on the French Ministry of Sports portal:"
            : "Vérifiez la validité de cette carte sur le portail du Ministère des Sports :"}{" "}
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

      {/* Section 3 - Hébergement / Hosting */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          3. {en ? "Hosting" : "Hébergement"}
        </h2>
        <div className="space-y-1 text-gray-700 leading-relaxed">
          <p>
            <strong>{en ? "Host" : "Hébergeur"} :</strong> Vercel Inc.
          </p>
          <p>
            <strong>{en ? "Address" : "Adresse"} :</strong> 440 N Barranca Ave
            #4133, Covina, CA 91723,{" "}
            {en ? "United States" : "États-Unis"}
          </p>
          <p>
            <strong>{en ? "Website" : "Site web"} :</strong>{" "}
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

      {/* Section 4 - Propriété intellectuelle / Intellectual Property */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          4. {en ? "Intellectual Property" : "Propriété intellectuelle"}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {en ? (
            <>
              All content on the coach-bluewave.com website (texts, images,
              videos, logos, graphics, icons) is the exclusive property of{" "}
              {LEGAL_INFO.name} or is used under license. Any reproduction,
              representation, modification, publication or adaptation of all or
              part of the site&apos;s content is prohibited without prior written
              consent. Any unauthorized use shall be considered infringement and
              prosecuted in accordance with articles L.335-2 et seq. of the
              French Intellectual Property Code.
            </>
          ) : (
            <>
              L&apos;ensemble du contenu du site coach-bluewave.com (textes, images,
              vidéos, logos, graphismes, icônes) est la propriété exclusive
              d&apos;{LEGAL_INFO.name} ou fait l&apos;objet d&apos;une autorisation d&apos;utilisation.
              Toute reproduction, représentation, modification, publication ou
              adaptation de tout ou partie des éléments du site est interdite sans
              autorisation écrite préalable. Toute exploitation non autorisée sera
              considérée comme constitutive d&apos;une contrefaçon et poursuivie
              conformément aux articles L.335-2 et suivants du Code de la
              propriété intellectuelle.
            </>
          )}
        </p>
      </section>

      {/* Section 5 - Responsabilité / Liability */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          5. {en ? "Liability" : "Responsabilité"}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          {en
            ? "The information provided on coach-bluewave.com is for general informational purposes only and should not be considered a substitute for medical advice. The publisher cannot guarantee the accuracy, completeness, or currency of the information on the site."
            : <>
                Les informations fournies sur le site coach-bluewave.com sont
                présentées à titre indicatif et général et ne sauraient se
                substituer à un avis médical. L&apos;éditeur ne saurait garantir
                l&apos;exactitude, la complétude et l&apos;actualité des informations
                diffusées sur le site.
              </>}
        </p>
        <p className="text-gray-700 leading-relaxed">
          {en
            ? "The publisher recommends that all individuals consult a physician before starting any sports training program."
            : <>
                L&apos;éditeur recommande à toute personne de consulter un médecin
                avant de commencer un programme d&apos;entraînement sportif.
              </>}
        </p>
      </section>

      {/* Section 6 - Liens hypertextes / Hyperlinks */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          6. {en ? "Hyperlinks" : "Liens hypertextes"}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {en
            ? "The coach-bluewave.com website may contain links to other websites. The publisher has no control over these sites and disclaims all responsibility for their content."
            : <>
                Le site coach-bluewave.com peut contenir des liens vers d&apos;autres
                sites internet. L&apos;éditeur n&apos;exerce aucun contrôle sur ces sites et
                décline toute responsabilité quant à leur contenu.
              </>}
        </p>
      </section>

      {/* Section 7 - Droit applicable / Applicable Law */}
      <section>
        <h2 className="text-xl font-semibold text-brand-dark mb-4">
          7. {en ? "Applicable Law" : "Droit applicable"}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {en
            ? "These legal notices are governed by French law. In case of dispute, and after an attempt at amicable resolution, jurisdiction is attributed to the competent courts of Grasse, France."
            : "Les présentes mentions légales sont régies par le droit français. En cas de litige, et après tentative de résolution amiable, compétence est attribuée aux tribunaux compétents de Grasse."}
        </p>
      </section>
    </>
  );
}
