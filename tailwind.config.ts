import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-blue": "#2563eb",
        "brand-dark": "#1e3a8a",
        "brand-navy": "#1e40af",
        heading: "#1a2a56",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        heading: [
          "var(--font-playfair)",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
        elegant: [
          "var(--font-cormorant)",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInUpDelay: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        navItemFade: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.8s ease forwards",
        "hero-title": "fadeInUpDelay 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.2s both",
        "hero-cta": "fadeInUpDelay 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.4s both",
        slideDown: "slideDown 0.6s cubic-bezier(0.25,0.1,0.25,1) 0.2s both",
        "nav-item-1": "navItemFade 0.4s ease 0.4s both",
        "nav-item-2": "navItemFade 0.4s ease 0.5s both",
        "nav-item-3": "navItemFade 0.4s ease 0.6s both",
        "nav-item-4": "navItemFade 0.4s ease 0.7s both",
        "nav-item-5": "navItemFade 0.4s ease 0.8s both",
        "nav-item-6": "navItemFade 0.4s ease 0.9s both",
      },
    },
  },
  plugins: [],
};
export default config;
