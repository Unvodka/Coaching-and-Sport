import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-7xl font-bold text-brand-blue mb-4 font-[family-name:var(--font-playfair)]">
          404
        </p>
        <h1 className="text-2xl font-bold text-brand-dark mb-3">
          Page introuvable
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-block bg-gradient-to-br from-brand-blue to-brand-navy text-white py-3 px-8 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
