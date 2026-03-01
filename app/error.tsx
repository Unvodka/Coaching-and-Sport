"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-5xl mb-4">⚠️</p>
        <h1 className="text-2xl font-bold text-brand-dark mb-3">
          Une erreur est survenue
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Quelque chose s&apos;est mal passé. Veuillez réessayer.
        </p>
        <button
          onClick={reset}
          className="inline-block bg-gradient-to-br from-brand-blue to-brand-navy text-white py-3 px-8 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          Réessayer
        </button>
      </div>
    </main>
  );
}
