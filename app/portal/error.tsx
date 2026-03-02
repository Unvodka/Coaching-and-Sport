"use client";

import { useEffect } from "react";

export default function PortalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Portal error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Une erreur est survenue
        </h2>
        <p className="text-gray-500 mb-6">
          Quelque chose s&apos;est mal passé dans votre espace client. Veuillez
          réessayer.
        </p>
        <button
          onClick={reset}
          className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
