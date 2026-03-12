import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE_NAME} — Agence de développement mobile & web`,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} — Agence de développement mobile & web`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Agence de développement mobile & web`,
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
  email: "maxencehabar@gmail.com",
  foundingDate: "2023",
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
    email: "maxencehabar@gmail.com",
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
      name: "Combien coûte le développement d'une application mobile ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le coût d'une application mobile varie entre 15 000€ et 150 000€+ selon la complexité. Un MVP simple coûte généralement entre 15 000€ et 40 000€, une application moyenne entre 40 000€ et 80 000€, et une application complexe avec fonctionnalités avancées peut dépasser 100 000€.",
      },
    },
    {
      "@type": "Question",
      name: "Combien de temps faut-il pour développer une application ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un MVP peut être développé en 6 à 8 semaines. Une application complète prend généralement 3 à 6 mois. Les délais varient selon la complexité, le nombre de fonctionnalités et les intégrations nécessaires.",
      },
    },
    {
      "@type": "Question",
      name: "Flutter ou React Native : quelle technologie choisir ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Flutter offre de meilleures performances et un contrôle total sur l'UI, idéal pour des apps avec des interfaces complexes. React Native est préférable si votre équipe maîtrise déjà JavaScript/React. Les deux permettent de développer pour iOS et Android avec une seule codebase.",
      },
    },
    {
      "@type": "Question",
      name: "Vaut-il mieux choisir une agence ou un freelance ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Une agence offre une équipe complète (dev, design, PM), une continuité de service et des processus éprouvés — idéal pour des projets complexes. Un freelance convient pour des missions ponctuelles ou des budgets serrés, mais présente des risques de disponibilité.",
      },
    },
    {
      "@type": "Question",
      name: "Qu'est-ce qu'un MVP et pourquoi commencer par là ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un MVP (Minimum Viable Product) est une version minimale de votre application avec uniquement les fonctionnalités essentielles. Il permet de valider votre idée auprès des utilisateurs, de réduire les risques financiers et d'itérer rapidement selon les retours du marché.",
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
      <body className={inter.className}>
        <a href="#main" className="skip-to-content">
          Aller au contenu principal
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <FloatingCTA />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
