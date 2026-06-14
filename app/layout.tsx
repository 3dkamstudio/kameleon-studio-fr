import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/ui/Navbar";
import ScrollToTop from "@/components/ui/ScrollToTop";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ConstellationCanvas from "@/components/ui/ConstellationCanvas";
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
  metadataBase: new URL("https://kameleo-studio.fr"),
  title: "Kaméléon Studio — Production vidéo & web par IA",
  description:
    "Studio de production vidéo et web premium propulsé par l'intelligence artificielle. Créations sur-mesure, identités visuelles, contenus qui transforment.",
  keywords: ["studio", "production vidéo", "web", "IA", "intelligence artificielle", "Kaméléon Studio", "Martinique"],
  icons: {
    icon: "/kame.png",
    apple: "/kame.png",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://kameleo-studio.fr",
    siteName: "Kaméléon Studio",
    title: "Kaméléon Studio — Production vidéo & web par IA",
    description:
      "Studio de production vidéo et web premium propulsé par l'intelligence artificielle. Créations sur-mesure, identités visuelles, contenus qui transforment.",
    images: [
      {
        url: "/banner-ks.png",
        width: 1200,
        height: 630,
        alt: "Kaméléon Studio — Production vidéo & web par IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaméléon Studio — Production vidéo & web par IA",
    description:
      "Studio de production vidéo et web premium propulsé par l'intelligence artificielle.",
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
        <ConstellationCanvas />
        <Navbar />
        {children}
        <ScrollToTop />
        <WhatsAppButton />
      </body>
    </html>
  );
}
