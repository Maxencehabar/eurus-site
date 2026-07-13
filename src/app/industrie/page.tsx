import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { IndustriePageBody } from "@/components/pages/IndustriePageBody";

export const metadata: Metadata = {
  title: `Digitalisation PME industrielles | ${SITE_NAME}`,
  description:
    "Eurus digitalise les PME industrielles : dashboards, apps terrain, IA et portails B2B sur mesure. Remplacez Excel et le papier en atelier. Diagnostic gratuit de 45 min.",
  alternates: { canonical: "/industrie" },
  openGraph: {
    title: `Digitalisation PME industrielles | ${SITE_NAME}`,
    description:
      "On remplace vos fichiers Excel et vos fiches papier par des outils sur mesure. Dashboard, app mobile, IA. Diagnostic gratuit.",
    url: `${SITE_URL}/industrie`,
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Eurus — Agence de développement" }],
  },
};

export default function IndustriePage() {
  return <IndustriePageBody />;
}
