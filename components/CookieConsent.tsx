"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
    if (consent === "accepted") {
      grantConsent();
    }
  }, []);

  function grantConsent() {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  }

  function handleAccept() {
    localStorage.setItem("cookie-consent", "accepted");
    grantConsent();
    setVisible(false);
  }

  function handleRefuse() {
    localStorage.setItem("cookie-consent", "refused");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-4 md:p-6 animate-fadeInUp">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-1 text-sm text-gray-600 leading-relaxed">
          <p>
            {t("cookies.text")}{" "}
            <Link
              href="/politique-de-confidentialite"
              className="text-brand-blue hover:underline"
            >
              {t("cookies.learnMore")}
            </Link>
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleRefuse}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {t("cookies.refuse")}
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2.5 text-sm font-medium text-white bg-brand-blue hover:bg-brand-navy rounded-lg transition-colors"
          >
            {t("cookies.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
