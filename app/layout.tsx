import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import Navbar from "@/components/ui/Navbar";
import MotionProvider from "@/components/ui/MotionProvider";
import RevealObserver from "@/components/ui/RevealObserver";

// Footer : toujours sous le pli — chunk différé (SSR conservé)
const Footer = dynamic(() => import("@/components/sections/Footer"));
import ScrollToTop from "@/components/ui/ScrollToTop";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CelestialBackground from "@/components/ui/CelestialBackground";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kingofia.fr"),
  title: "King of IA — Vidéo, BD & web par IA",
  description:
    "Studio de production vidéo, BD et web premium propulsé par l'intelligence artificielle. Créations sur-mesure, identités visuelles, contenus qui transforment.",
  keywords: ["studio", "production vidéo", "web", "IA", "intelligence artificielle", "King of IA", "kingofia", "Martinique"],
  icons: {
    icon: "/favicon-ks.png",
    apple: "/favicon-ks.png",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://kingofia.fr",
    siteName: "King of IA",
    title: "King of IA — Vidéo, BD & web par IA",
    description:
      "Studio de production vidéo, BD et web premium propulsé par l'intelligence artificielle. Créations sur-mesure, identités visuelles, contenus qui transforment.",
    images: [
      {
        url: "/banner-ks.png",
        width: 1200,
        height: 630,
        alt: "King of IA — Vidéo, BD & web par IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "King of IA — Vidéo, BD & web par IA",
    description:
      "Studio de production vidéo, BD et web premium propulsé par l'intelligence artificielle.",
    images: ["/banner-ks.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={cn("dark", inter.variable, outfit.variable)}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground antialiased font-sans">
        <MotionProvider>
          <RevealObserver />
          <CelestialBackground />
          <Navbar />
          {children}
          <Footer />
          <ScrollToTop />
          <WhatsAppButton />
        </MotionProvider>
      </body>
    </html>
  );
}
