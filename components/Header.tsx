"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getNavLinks } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/useLanguage";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { locale } = useLanguage();

  const navLinks = getNavLinks(locale);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        toggleRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !toggleRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
      className="text-white py-6 fixed w-full top-0 z-[1000] backdrop-blur-md bg-black/40"
    >
      <nav className="flex justify-between items-center w-full px-12">
        <Link href="/" className="font-heading text-[1.7rem] font-bold tracking-tight text-white no-underline">
          Coach-Bluewave
        </Link>

        <div className="flex items-center gap-6">
          {/* Navigation Links */}
          <ul
            ref={menuRef}
            className={`flex list-none gap-8 max-md:fixed max-md:top-0 max-md:flex-col max-md:bg-black/90 max-md:w-[70%] max-md:h-screen max-md:pt-20 max-md:pb-8 max-md:transition-all max-md:duration-400 max-md:ease-in-out max-md:shadow-[5px_0_15px_rgba(0,0,0,0.3)] max-md:gap-0 max-md:z-[999] ${
              menuOpen ? "max-md:left-0" : "max-md:left-[-100%]"
            }`}
          >
            {navLinks.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                className="max-md:w-full"
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white no-underline font-semibold text-[0.95rem] transition-all duration-300 py-2 px-4 rounded-md hover:bg-white/15 max-md:block max-md:py-4 max-md:px-8 max-md:rounded-none"
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Language Toggle */}
          <LanguageToggle />

          {/* Hamburger Toggle */}
          <button
            ref={toggleRef}
            onClick={() => setMenuOpen(!menuOpen)}
            className="hidden max-md:flex flex-col cursor-pointer z-[1001] bg-none border-none p-2"
            aria-label="Toggle menu"
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
    </motion.header>
  );
}
