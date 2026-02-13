"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";
import FadeInWhenVisible from "./animations/FadeInWhenVisible";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <FadeInWhenVisible>
      <footer className="bg-gradient-to-br from-brand-dark to-brand-navy text-white text-center py-10 px-16 text-[0.95rem]">
        <p>
          &copy; {new Date().getFullYear()} {t("footer.text")}
        </p>
      </footer>
    </FadeInWhenVisible>
  );
}
