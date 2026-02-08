import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import AOSProvider from "@/components/AOSProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Arnaud Chevallier - Coach Sportif & Maître-Nageur Valbonne",
  description:
    "Maître-nageur et coach sportif spécialisé en perte de poids et remise en forme à Valbonne.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.className} ${playfair.variable} leading-[1.7] text-gray-800 overflow-x-hidden bg-white`}
      >
        <AOSProvider>{children}</AOSProvider>
      </body>
    </html>
  );
}
