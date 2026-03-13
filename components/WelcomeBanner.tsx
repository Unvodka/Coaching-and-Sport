"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function WelcomeBanner() {
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (searchParams.get("welcome") === "1") {
      setVisible(true);
      // Scroll to offers section
      setTimeout(() => {
        document.getElementById("offres")?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
  }, [searchParams]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
      <div className="bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-2xl shadow-xl px-6 py-4 max-w-lg w-full pointer-events-auto flex items-start gap-4">
        <span className="text-2xl flex-shrink-0">👋</span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm leading-snug">
            Bienvenue sur Coach Bluewave !
          </p>
          <p className="text-xs text-white/80 mt-0.5 leading-relaxed">
            Découvrez nos programmes ci-dessous pour débloquer toutes les fonctionnalités de votre portail.
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-white/60 hover:text-white text-xl leading-none flex-shrink-0 mt-0.5"
          aria-label="Fermer"
        >
          ×
        </button>
      </div>
    </div>
  );
}
