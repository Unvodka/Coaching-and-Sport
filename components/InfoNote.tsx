export default function InfoNote() {
  return (
    <div className="bg-white p-8 rounded-xl mt-12 border-2 border-gray-200 border-l-4 border-l-brand-blue text-center">
      <p className="my-3 text-gray-600 leading-[1.7]">
        💡 <strong className="text-heading">Tous les programmes incluent :</strong>{" "}
        Bilan initial gratuit • Suivi personnalisé • Conseils nutrition •
        Motivation continue
      </p>
      <p className="my-3 text-gray-600 leading-[1.7]">
        💳 <strong className="text-heading">Paiement sécurisé</strong> • Plusieurs
        moyens de paiement acceptés
      </p>
      <p className="my-3 text-gray-600 leading-[1.7]">
        Les séances peuvent être utilisées pour n&apos;importe quelle activité :
        natation, fitness ou activités extérieures
      </p>
      <p className="my-3 text-gray-600 leading-[1.7]">
        📞 Besoin de conseils pour choisir ?{" "}
        <a
          href="#contact"
          className="text-brand-blue no-underline font-semibold hover:underline"
        >
          Contactez-moi
        </a>{" "}
        pour un entretien gratuit de 15 minutes !
      </p>
    </div>
  );
}
