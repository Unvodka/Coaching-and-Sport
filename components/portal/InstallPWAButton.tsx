"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPWAButton() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // Already installed as PWA
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // iOS detection
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIsIOS(ios);

    // Android/desktop Chrome install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") setIsInstalled(true);
    setInstallPrompt(null);
  };

  // Already installed — show nothing
  if (isInstalled) return null;

  // Neither Android prompt nor iOS — browser doesn't support install (e.g. desktop Firefox)
  if (!installPrompt && !isIOS) return null;

  return (
    <div className="bg-gradient-to-r from-brand-blue to-brand-navy rounded-xl p-5 text-white mb-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-sm">Installer l&apos;application</p>
            <p className="text-white/70 text-xs mt-0.5">
              Accès rapide depuis votre écran d&apos;accueil, fonctionne hors ligne
            </p>
          </div>
        </div>

        <button
          onClick={handleInstall}
          className="shrink-0 bg-white text-brand-blue font-semibold text-sm px-4 py-2 rounded-lg hover:bg-white/90 transition-colors"
        >
          Installer
        </button>
      </div>

      {/* iOS step-by-step guide */}
      {showIOSGuide && (
        <div className="mt-4 pt-4 border-t border-white/20 text-sm text-white/90 space-y-2">
          <p className="font-semibold">Pour installer sur iPhone / iPad :</p>
          <ol className="list-decimal list-inside space-y-1 text-white/80">
            <li>Appuyez sur le bouton <strong>Partager</strong> <span className="inline-block">⎋</span> en bas de Safari</li>
            <li>Faites défiler et appuyez sur <strong>« Sur l&apos;écran d&apos;accueil »</strong></li>
            <li>Appuyez sur <strong>Ajouter</strong> en haut à droite</li>
          </ol>
          <button
            onClick={() => setShowIOSGuide(false)}
            className="text-white/60 text-xs underline mt-1"
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
}
