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
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    const ios =
      /iphone|ipad|ipod/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const chrome = ios && /CriOS/i.test(navigator.userAgent);

    setIsIOS(ios);
    setIsIOSChrome(chrome);

    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") setIsInstalled(true);
    setInstallPrompt(null);
  };

  if (isInstalled || dismissed) return null;
  if (!installPrompt && !isIOS) return null;

  // Android / desktop Chrome — native prompt
  if (installPrompt) {
    return (
      <div className="bg-gradient-to-r from-brand-blue to-brand-navy rounded-xl p-5 text-white mb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25l1.5 1.5 1.5-1.5M12 9.75v5.25" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm">Installer l&apos;application</p>
              <p className="text-white/70 text-xs mt-0.5">Accès rapide, fonctionne hors ligne</p>
            </div>
          </div>
          <button onClick={handleInstall} className="shrink-0 bg-white text-brand-blue font-semibold text-sm px-4 py-2 rounded-lg hover:bg-white/90 transition-colors">
            Installer
          </button>
        </div>
      </div>
    );
  }

  // iOS Chrome — show visual guide immediately, no extra tap needed
  if (isIOSChrome) {
    return (
      <div className="bg-gradient-to-r from-brand-blue to-brand-navy rounded-xl p-5 text-white mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25l1.5 1.5 1.5-1.5M12 9.75v5.25" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm">Installer l&apos;application</p>
              <p className="text-white/60 text-xs">Suivez ces 4 étapes dans Chrome</p>
            </div>
          </div>
          <button onClick={() => setDismissed(true)} className="text-white/40 hover:text-white/70 transition-colors p-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Visual steps */}
        <div className="grid grid-cols-4 gap-2">
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-1.5 text-center">
            <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center">
              {/* Three dots icon */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
              </svg>
            </div>
            <p className="text-[10px] text-white/80 leading-tight">Appuyez sur <strong>⋮</strong> en bas à droite</p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-1.5 text-center">
            <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center">
              {/* Share icon */}
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </div>
            <p className="text-[10px] text-white/80 leading-tight">Appuyez sur <strong>Partager</strong></p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center gap-1.5 text-center">
            <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center">
              {/* Scroll down + home screen icon */}
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0l-4-4m4 4l4-4" />
              </svg>
            </div>
            <p className="text-[10px] text-white/80 leading-tight">Faites défiler et appuyez <strong>Sur l&apos;écran d&apos;accueil</strong></p>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center gap-1.5 text-center">
            <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center">
              {/* Plus / add icon */}
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-[10px] text-white/80 leading-tight">Appuyez sur <strong>Ajouter</strong></p>
          </div>
        </div>
      </div>
    );
  }

  // iOS Safari
  return (
    <div className="bg-gradient-to-r from-brand-blue to-brand-navy rounded-xl p-5 text-white mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25l1.5 1.5 1.5-1.5M12 9.75v5.25" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-sm">Installer l&apos;application</p>
            <p className="text-white/60 text-xs">Suivez ces 3 étapes dans Safari</p>
          </div>
        </div>
        <button onClick={() => setDismissed(true)} className="text-white/40 hover:text-white/70 transition-colors p-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <p className="text-[10px] text-white/80 leading-tight">Appuyez sur <strong>Partager ⎋</strong> en bas</p>
        </div>

        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0l-4-4m4 4l4-4" />
            </svg>
          </div>
          <p className="text-[10px] text-white/80 leading-tight">Faites défiler ↓ puis <strong>Sur l&apos;écran d&apos;accueil</strong></p>
        </div>

        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="text-[10px] text-white/80 leading-tight">Appuyez sur <strong>Ajouter</strong></p>
        </div>
      </div>
    </div>
  );
}
