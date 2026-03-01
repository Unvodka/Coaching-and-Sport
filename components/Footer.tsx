"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import FadeInWhenVisible from "./animations/FadeInWhenVisible";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <FadeInWhenVisible>
      <footer className="bg-gradient-to-br from-brand-dark to-brand-navy text-white text-center py-10 px-6 md:px-16 text-[0.95rem]">
        <p>
          &copy; {new Date().getFullYear()} {t("footer.text")}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/60">
          <Link
            href="/mentions-legales"
            className="hover:text-white/90 transition-colors"
          >
            {t("footer.legal")}
          </Link>
          <Link
            href="/politique-de-confidentialite"
            className="hover:text-white/90 transition-colors"
          >
            {t("footer.privacy")}
          </Link>
          <Link
            href="/cgv"
            className="hover:text-white/90 transition-colors"
          >
            {t("footer.cgv")}
          </Link>
        </div>
      </footer>
    </FadeInWhenVisible>
  );
}
