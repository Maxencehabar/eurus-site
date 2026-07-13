import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { IaPageBody } from "@/components/pages/IaPageBody";

const PAGE_TITLE = "Intégration IA sur mesure pour PME et startups";
const PAGE_DESCRIPTION =
  "Eurus construit des assistants IA connectés à vos outils métier (ERP, Jira, CRM). Pas un chatbot générique — un outil qui connaît votre entreprise. Audit gratuit.";

export const metadata: Metadata = {
  title: `${PAGE_TITLE} — ${SITE_NAME}`,
  description: PAGE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/ia" },
  openGraph: {
    title: `${PAGE_TITLE} — ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/ia`,
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Eurus — Agence de développement" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} — ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Intégration IA sur mesure",
  provider: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
  description: PAGE_DESCRIPTION,
  url: `${SITE_URL}/ia`,
  areaServed: { "@type": "Country", name: "France" },
  serviceType: "Intelligence artificielle",
  offers: {
    "@type": "Offer",
    price: "10000",
    priceCurrency: "EUR",
    description:
      "Audit, développement, déploiement et formation inclus",
  },
};

export default function IAPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IaPageBody />
    </>
  );
}
