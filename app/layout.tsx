import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Unbounded } from "next/font/google";
import Atmosphere from "@/components/ks/Atmosphere";
import Footer from "@/components/ks/Footer";
import Header from "@/components/ks/Header";
import Dock from "@/components/ks/Dock";
import { MotionProvider } from "@/components/ks/motion";
import PointerFX from "@/components/ks/PointerFX";
import { OG_IMAGE } from "@/lib/seo";
import { CONTACT, SITE_NAME, SITE_URL, SOCIALS } from "@/lib/site";
import "./globals.css";

// Données structurées : identité du studio pour les moteurs de recherche.
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/ks-logo.png`,
  email: CONTACT.email,
  sameAs: SOCIALS.map((s) => s.href),
};

const display = Unbounded({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });

const description =
  "Vidéos 3D, contenus pédagogiques et films de marque : Kaméléon Studio transforme vos idées en expériences visuelles grâce à l’IA. Production vidéo, BD, sites web, coaching et formations.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kaméléon Studio — Vidéos 3D, contenus pédagogiques et films de marque par IA",
    template: "%s — Kaméléon Studio",
  },
  description,
  keywords: ["studio", "production vidéo", "vidéo IA", "animation 3D", "bande dessinée", "site web", "coaching vidéo IA", "formation IA", "King of IA", "Kaméléon Studio", "Martinique"],
  alternates: { canonical: "/" },
  icons: { icon: "/favicon-ks.png", apple: "/favicon-ks.png" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Kaméléon Studio — Vos idées prennent vie",
    description,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaméléon Studio — Vos idées prennent vie",
    description,
    images: [OG_IMAGE.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" data-motion="on" className={`${display.variable} ${body.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        <MotionProvider>
          <Atmosphere />
          <PointerFX />
          <a href="#contenu" className="skip-link">
            Aller au contenu
          </a>
          <Header />
          <main id="contenu" tabIndex={-1} style={{ position: "relative", zIndex: 1, outline: "none" }}>
            {children}
          </main>
          <Footer />
          <Dock />
        </MotionProvider>
      </body>
    </html>
  );
}
