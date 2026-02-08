"use client";

import FadeInWhenVisible from "./animations/FadeInWhenVisible";

export default function Footer() {
  return (
    <FadeInWhenVisible>
      <footer className="bg-gradient-to-br from-brand-dark to-brand-navy text-white text-center py-10 px-16 text-[0.95rem]">
        <p>
          &copy; {new Date().getFullYear()} Arnaud Chevallier - Coach Sportif &amp;
          Maître-Nageur - Valbonne - Tous droits réservés
        </p>
      </footer>
    </FadeInWhenVisible>
  );
}
