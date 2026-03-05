"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPWAButton() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isIOSChrome, setIsIOSChrome] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    const ios =
      /iphone|ipad|ipod/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    setIsIOS(ios);
    setIsIOSChrome(ios && /CriOS/i.test(navigator.userAgent));

    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (isIOS) { setShowIOSGuide(true); return; }
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") setIsInstalled(true);
    setInstallPrompt(null);
  };

  if (isInstalled) return null;
  if (!installPrompt && !isIOS) return null;

  return (
    <div className="bg-gradient-to-r from-brand-blue to-brand-navy rounded-xl p-5 text-white mb-6">
      {/* Header row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            {/* Phone with arrow-down icon */}
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25l1.5 1.5 1.5-1.5M12 9.75v5.25" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-sm">Installer l&apos;application</p>
            <p className="text-white/70 text-xs mt-0.5">Accès rapide, fonctionne hors ligne</p>
          </div>
        </div>
        <button
          onClick={handleInstall}
          className="shrink-0 bg-white text-brand-blue font-semibold text-sm px-4 py-2 rounded-lg hover:bg-white/90 transition-colors"
        >
          Installer
        </button>
      </div>

      {/* iOS guide */}
      {showIOSGuide && (
        <div className="mt-4 pt-4 border-t border-white/20 space-y-3">

          {isIOSChrome ? (
            <>
              <p className="font-semibold text-sm">Installer avec Chrome sur iPhone :</p>
              <ol className="space-y-2 text-white/90 text-sm">
                <li className="flex items-start gap-2">
                  <span className="bg-white/20 rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                  <span>Appuyez sur les <strong>3 points</strong> <span className="font-mono bg-white/20 px-1 rounded">⋮</span> en bas à droite de Chrome</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-white/20 rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                  <span>Appuyez sur <strong>« Partager »</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-white/20 rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                  <span>Faites défiler vers le bas et appuyez sur <strong>« Sur l&apos;écran d&apos;accueil »</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-white/20 rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">4</span>
                  <span>Appuyez sur <strong>« Ajouter »</strong> en haut à droite</span>
                </li>
              </ol>
              <p className="text-white/50 text-xs">
                💡 Vous ne trouvez pas l&apos;option ? Essayez avec <strong>Safari</strong> — c&apos;est plus simple.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-sm">Installer avec Safari sur iPhone :</p>
              <ol className="space-y-2 text-white/90 text-sm">
                <li className="flex items-start gap-2">
                  <span className="bg-white/20 rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                  <span>Appuyez sur le bouton <strong>Partager</strong> <span className="font-mono bg-white/20 px-1 rounded">⎋</span> en bas de l&apos;écran</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-white/20 rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                  <span><strong>Faites défiler vers le bas</strong> dans le menu — l&apos;option est cachée en bas de la liste</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-white/20 rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                  <span>Appuyez sur <strong>« Sur l&apos;écran d&apos;accueil »</strong> <span className="text-white/60">(icône avec un +)</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-white/20 rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">4</span>
                  <span>Appuyez sur <strong>« Ajouter »</strong> en haut à droite</span>
                </li>
              </ol>
              <p className="text-white/50 text-xs">
                💡 Depuis iOS 16, Apple a déplacé cette option plus bas dans le menu de partage. Il faut bien faire défiler.
              </p>
            </>
          )}

          <button
            onClick={() => setShowIOSGuide(false)}
            className="text-white/50 text-xs underline"
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
}
