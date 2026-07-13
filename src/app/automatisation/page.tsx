import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { AutomatisationPageBody } from "@/components/pages/AutomatisationPageBody";

export const metadata: Metadata = {
  title: `Automatisation & agents IA pour PME | ${SITE_NAME}`,
  description:
    "Eurus automatise vos process : relances de factures, traitement de documents, back-office. Des agents IA branchés sur vos outils, livrés en quelques semaines. Diagnostic gratuit de 45 min.",
  alternates: { canonical: "/automatisation" },
  openGraph: {
    title: `Automatisation & agents IA pour PME | ${SITE_NAME}`,
    description:
      "Relances de factures, ressaisies, reporting : on automatise les tâches qui mangent vos journées. Agents IA et outils internes sur mesure. Diagnostic gratuit.",
    url: `${SITE_URL}/automatisation`,
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Eurus — Agence de développement" }],
  },
};

export default function AutomatisationPage() {
  return <AutomatisationPageBody />;
}
