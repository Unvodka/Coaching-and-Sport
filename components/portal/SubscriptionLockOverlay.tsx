"use client";

import Link from "next/link";
import { useSubscription } from "@/hooks/useSubscription";
import { useLanguage } from "@/lib/i18n/useLanguage";

interface Props {
  children: React.ReactNode;
}

export default function SubscriptionLockOverlay({ children }: Props) {
  const status = useSubscription();
  const { locale } = useLanguage();

  if (status === "loading" || status === "active") {
    return <>{children}</>;
  }

  return (
    <div className="relative rounded-xl overflow-hidden">
      {/* Blurred content underneath */}
      <div className="blur-sm opacity-40 select-none pointer-events-none" aria-hidden>
        {children}
      </div>

      {/* Lock badge centred on top */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-md px-6 py-5 text-center max-w-[260px]">
          <div className="text-2xl mb-2">🔒</div>
          <p className="text-sm font-semibold text-heading mb-1">
            {locale === "fr" ? "Réservé aux abonnés" : "Subscribers only"}
          </p>
          <p className="text-xs text-gray-500 mb-4">
            {locale === "fr"
              ? "Abonnez-vous pour débloquer vos conseils et programmes personnalisés."
              : "Subscribe to unlock your personalised tips and programs."}
          </p>
          <Link
            href="/packs"
            className="inline-block px-5 py-2 bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            {locale === "fr" ? "Voir les offres" : "See plans"}
          </Link>
        </div>
      </div>
    </div>
  );
}
