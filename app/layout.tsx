import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kaméléon Studio — Production vidéo & web par IA",
  description:
    "Studio de production vidéo et web premium propulsé par l'intelligence artificielle. Créations sur-mesure, identités visuelles, contenus qui transforment.",
  keywords: ["studio", "production vidéo", "web", "IA", "intelligence artificielle", "Kaméléon"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={cn("dark", inter.variable, syne.variable)}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
