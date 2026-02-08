import Link from "next/link";

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-8">
      <div className="bg-white p-12 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-200 text-center max-w-lg w-full">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="font-heading text-3xl font-bold text-heading mb-4">
          Paiement réussi !
        </h1>
        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
          Merci pour votre confiance. Vous recevrez un email de confirmation
          avec tous les détails de votre réservation.
        </p>
        <Link
          href="/"
          className="inline-block bg-gradient-to-br from-brand-blue to-brand-navy text-white py-4 px-10 rounded-lg font-bold text-base transition-all duration-300 no-underline hover:-translate-y-[2px] hover:shadow-[0_8px_25px_rgba(37,99,235,0.3)]"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
