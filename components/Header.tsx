"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { getNavLinks } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { useClickOutside } from "@/lib/hooks/useClickOutside";
import LanguageToggle from "./LanguageToggle";
import AuthButton from "./AuthButton";

const navAnimClasses = [
  "animate-nav-item-1",
  "animate-nav-item-2",
  "animate-nav-item-3",
  "animate-nav-item-4",
  "animate-nav-item-5",
  "animate-nav-item-6",
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { locale } = useLanguage();

  const navLinks = getNavLinks(locale);

  useClickOutside(menuRef, () => setMenuOpen(false), toggleRef);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  return (
    <header
      className="text-white py-6 fixed w-full top-0 z-[1000] backdrop-blur-md bg-black/40 max-md:py-3 animate-slideDown"
    >
      <nav aria-label="Navigation principale" className="flex justify-between items-center w-full px-12 max-md:px-2.5">
        <Link href="/" className="flex items-center no-underline shrink-0 max-md:ml-2.5">
          <Image
            src="/images/logo-bluewave-white.png"
            alt="Coach-Bluewave"
            width={200}
            height={45}
            className="h-10 w-auto max-md:h-8"
            priority
          />
        </Link>

        <div className="flex items-center gap-6">
          {/* Mobile overlay backdrop */}
          {menuOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-[998] md:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* Navigation Links */}
          <ul
            ref={menuRef}
            role={menuOpen ? "dialog" : undefined}
            aria-label={menuOpen ? "Navigation menu" : undefined}
            className={`flex list-none gap-8 max-md:fixed max-md:top-0 max-md:flex-col max-md:bg-black/90 max-md:w-[70%] max-md:min-h-screen max-md:pt-20 max-md:pb-8 max-md:transition-all max-md:duration-400 max-md:ease-in-out max-md:shadow-[5px_0_15px_rgba(0,0,0,0.3)] max-md:gap-0 max-md:z-[999] ${
              menuOpen ? "max-md:left-0" : "max-md:left-[-100%]"
            }`}
          >
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                className={`max-md:w-full ${navAnimClasses[i] || "animate-nav-item-6"}`}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white no-underline font-semibold text-[0.95rem] transition-all duration-300 py-2 px-4 rounded-md hover:bg-white/15 max-md:block max-md:py-4 max-md:px-8 max-md:rounded-none"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* WhatsApp CTA — visible desktop only */}
          <a
            href="https://wa.me/33749486203?text=Bonjour%20Arnaud%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20services."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contacter par WhatsApp"
            className="hidden md:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors duration-200 shrink-0"
          >
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="hidden lg:inline">07 49 48 62 03</span>
            <span className="lg:hidden">WhatsApp</span>
          </a>

          {/* Language Toggle */}
          <LanguageToggle />

          {/* Auth Button */}
          <AuthButton />

          {/* Hamburger Toggle */}
          <button
            ref={toggleRef}
            onClick={() => setMenuOpen(!menuOpen)}
            className="hidden max-md:flex flex-col cursor-pointer z-[1001] bg-none border-none p-2"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-7 h-[3px] bg-white my-[3px] rounded transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-x-[8px] translate-y-[8px]" : ""
              }`}
            />
            <span
              className={`block w-7 h-[3px] bg-white my-[3px] rounded transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-7 h-[3px] bg-white my-[3px] rounded transition-all duration-300 ${
                menuOpen ? "-rotate-45 translate-x-[7px] -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>
    </header>
  );
}
