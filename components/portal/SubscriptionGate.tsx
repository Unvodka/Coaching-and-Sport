"use client";

import Link from "next/link";
import { useSubscription } from "@/hooks/useSubscription";
import { useLanguage } from "@/lib/i18n/useLanguage";

interface Props {
  children: React.ReactNode;
  /* ghost content shown blurred behind the paywall */
  ghost?: React.ReactNode;
}

export default function SubscriptionGate({ children, ghost }: Props) {
  const status = useSubscription();
  const { locale } = useLanguage();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="w-6 h-6 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "active") {
    return <>{children}</>;
  }

  /* ── Non-subscriber: blurred ghost + lock card ── */
  return (
    <div className="relative min-h-[60vh]">
      {/* Blurred ghost content */}
      {ghost && (
        <div className="select-none pointer-events-none" aria-hidden>
          <div className="blur-sm opacity-40">{ghost}</div>
        </div>
      )}

      {/* Lock overlay */}
      <div
        className={`${ghost ? "absolute inset-0" : ""} flex items-center justify-center`}
        style={{ minHeight: ghost ? undefined : "60vh" }}
      >
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 mx-4 max-w-sm w-full text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-lg font-bold text-heading mb-2">
            {locale === "fr"
              ? "Contenu réservé aux abonnés"
              : "Subscribers only"}
          </h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            {locale === "fr"
              ? "Abonnez-vous pour accéder aux recettes, programmes, conseils du jour et bien plus encore."
              : "Subscribe to access recipes, programs, daily tips, and much more."}
          </p>
          <Link
            href="/packs"
            className="block w-full px-6 py-3 bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            {locale === "fr" ? "Voir les programmes" : "See programs"}
          </Link>
          <p className="text-xs text-gray-400 mt-3">
            {locale === "fr"
              ? "Déjà abonné ? Reconnectez-vous."
              : "Already subscribed? Sign in again."}
          </p>
        </div>
      </div>
    </div>
  );
}
