import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, CONTACT_EMAIL, FOUNDING_YEAR } from "@/lib/constants";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { PageTransition } from "@/components/providers/PageTransition";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: `${SITE_NAME} — Automatisation & outils sur mesure pour les pros`,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} — Automatisation & outils sur mesure pour les pros`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Eurus — Agence de développement" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Automatisation & outils sur mesure pour les pros`,
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  logo: `${SITE_URL}/favicon.svg`,
  email: CONTACT_EMAIL,
  foundingDate: String(FOUNDING_YEAR),
  address: {
    "@type": "PostalAddress",
    addressCountry: "FR",
  },
  sameAs: [
    "https://www.linkedin.com/company/eurus-agency",
    "https://github.com/eurus-agency",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: CONTACT_EMAIL,
    contactType: "sales",
    availableLanguage: ["French", "English"],
  },
  areaServed: {
    "@type": "Country",
    name: "France",
  },
  knowsAbout: [
    "Développement mobile",
    "Applications Flutter",
    "React Native",
    "Développement web",
    "React",
    "Next.js",
    "Vue.js",
    "MVP",
    "Startup",
    "Applications sur mesure",
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qui est Eurus et que faites-vous ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eurus est une agence de développement de 3 personnes basée en France, spécialisée dans les applications mobiles, web et les outils IA sur mesure pour les startups et PME industrielles.",
      },
    },
    {
      "@type": "Question",
      name: "Travaillez-vous avec des PME industrielles ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, nous développons des dashboards de production, des applications terrain et des assistants IA pour les PME industrielles de 20 à 250 salariés. Consultez notre page dédiée.",
      },
    },
    {
      "@type": "Question",
      name: "Combien coûte un projet chez Eurus ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un MVP démarre à 15 000€, une application complète entre 40 000€ et 80 000€, et un outil industriel avec IA entre 10 000€ et 50 000€. Chaque projet est chiffré sur mesure après un appel découverte gratuit.",
      },
    },
    {
      "@type": "Question",
      name: "Quel est le délai pour un projet ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un premier outil ciblé est livré en 2 à 4 semaines. Un MVP complet en 6 à 12 semaines. Nous travaillons en sprints courts avec des démos régulières.",
      },
    },
    {
      "@type": "Question",
      name: "Proposez-vous un diagnostic gratuit ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, nous proposons un appel découverte de 30 minutes gratuit et sans engagement pour comprendre votre besoin et vous proposer une solution adaptée.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className={`${instrumentSerif.variable} ${dmSans.variable} font-sans`}>
        <a href="#main" className="skip-to-content">
          Aller au contenu principal
        </a>
        <Navbar />
        <SmoothScrollProvider>
          <main id="main">
            <PageTransition>{children}</PageTransition>
          </main>
        </SmoothScrollProvider>
        <Footer />
        <FloatingCTA />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
