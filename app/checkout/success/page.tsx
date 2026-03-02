import { Metadata } from "next";
import Link from "next/link";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Paiement confirmé - Coach-Bluewave",
  robots: { index: false },
};

interface Props {
  searchParams: { session_id?: string };
}

async function getSession(sessionId: string | undefined) {
  if (!sessionId) return null;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session.payment_status === "paid" ? session : null;
  } catch {
    return null;
  }
}

export default async function CheckoutSuccess({ searchParams }: Props) {
  const session = await getSession(searchParams.session_id);

  // If no valid paid session, show a generic fallback
  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-8">
        <div className="bg-white p-12 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-200 text-center max-w-lg w-full">
          <div className="text-6xl mb-6">⚠️</div>
          <h1 className="font-heading text-3xl font-bold text-heading mb-4">
            Session introuvable
          </h1>
          <p className="text-gray-500 text-lg mb-6 leading-relaxed">
            Nous n&apos;avons pas pu vérifier votre paiement. Si vous avez été
            débité, contactez-nous.
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-gradient-to-br from-brand-blue to-brand-navy text-white py-4 px-10 rounded-lg font-bold text-base transition-all duration-300 no-underline hover:-translate-y-[2px] hover:shadow-[0_8px_25px_rgba(37,99,235,0.3)]"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-8">
      <div className="bg-white p-12 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-200 text-center max-w-lg w-full">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="font-heading text-3xl font-bold text-heading mb-4">
          Paiement confirmé !
        </h1>
        <p className="text-gray-500 text-lg mb-2 leading-relaxed">
          Merci pour votre achat. Vous recevrez un e-mail de confirmation
          sous peu.
        </p>
        {session.amount_total && (
          <p className="text-2xl font-bold text-heading mb-6">
            {(session.amount_total / 100).toFixed(2).replace(".", ",")}€
          </p>
        )}
        <p className="text-[0.8rem] text-gray-400 mb-8 flex items-center justify-center gap-2">
          🔒 Paiement sécurisé par Stripe
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
