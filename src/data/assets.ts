export type AssetStatus = "pending" | "ready";

export interface AssetDefinition {
  id: string;
  status: AssetStatus;
  src?: string;
  alt: string;
  width: number;
  height: number;
  briefing: string;
}

export const assets: Record<string, AssetDefinition> = {
  "team-maxence-portrait": {
    id: "team-maxence-portrait",
    status: "pending",
    alt: "Maxence Habar, fondateur d'Eurus",
    width: 800,
    height: 1000,
    briefing: "Portrait pro, plan poitrine, fond uni clair (#F5F3EF), regard caméra, lumière douce naturelle",
  },
  "team-maxence-editorial": {
    id: "team-maxence-editorial",
    status: "pending",
    alt: "Maxence Habar au travail",
    width: 1200,
    height: 1500,
    briefing: "Portrait éditorial 3/4, en train de coder, bureau, lumière fenêtre",
  },
  "team-theo-portrait": {
    id: "team-theo-portrait",
    status: "pending",
    alt: "Théo, développeur Eurus",
    width: 800,
    height: 1000,
    briefing: "Même setup que Maxence (cohérence cadrage / lumière obligatoire)",
  },
  "team-tom-portrait": {
    id: "team-tom-portrait",
    status: "pending",
    alt: "Tom, développeur Eurus",
    width: 800,
    height: 1000,
    briefing: "Même setup que Maxence (cohérence cadrage / lumière obligatoire)",
  },
  "team-group": {
    id: "team-group",
    status: "pending",
    alt: "L'équipe Eurus",
    width: 2400,
    height: 1029,
    briefing: "Photo équipe à 3 en format cinémascope (21:9), ambiance studio ou bureau",
  },
  "office-setup": {
    id: "office-setup",
    status: "pending",
    alt: "Espace de travail Eurus",
    width: 1600,
    height: 1000,
    briefing: "Setup dev : clavier mécanique + écran avec du vrai code, plongée ou côté",
  },
  "office-ambient": {
    id: "office-ambient",
    status: "pending",
    alt: "Bureau Eurus",
    width: 1600,
    height: 1000,
    briefing: "Photo large d'un coin de bureau qui respire, lumière naturelle",
  },
  "project-getaway-1": {
    id: "project-getaway-1",
    status: "pending",
    alt: "Getaway — écran de swipe",
    width: 1200,
    height: 1500,
    briefing: "Mockup iPhone 15 Pro, écran swipe avec un vrai profil voyageur",
  },
  "project-getaway-2": {
    id: "project-getaway-2",
    status: "pending",
    alt: "Getaway — écran de match",
    width: 1200,
    height: 1500,
    briefing: "Mockup iPhone, écran match avec animation de connexion",
  },
  "project-getaway-3": {
    id: "project-getaway-3",
    status: "pending",
    alt: "Getaway — chat intégré",
    width: 1200,
    height: 1500,
    briefing: "Mockup iPhone, écran chat avec messages",
  },
  "project-youdy-1": {
    id: "project-youdy-1",
    status: "pending",
    alt: "Youdy — page d'accueil",
    width: 1920,
    height: 1200,
    briefing: "Mockup MacBook 16'', home Youdy avec recherche formateurs",
  },
  "project-youdy-2": {
    id: "project-youdy-2",
    status: "pending",
    alt: "Youdy — calendrier de réservation",
    width: 1920,
    height: 1200,
    briefing: "Mockup MacBook, calendrier de résa avec créneaux",
  },
  "project-youdy-3": {
    id: "project-youdy-3",
    status: "pending",
    alt: "Youdy — paiement Stripe mobile",
    width: 1200,
    height: 1500,
    briefing: "Mockup iPhone, écran paiement Stripe",
  },
  "project-drmilou-1": {
    id: "project-drmilou-1",
    status: "pending",
    alt: "DrMilou — dashboard analytics",
    width: 1920,
    height: 1200,
    briefing: "Mockup MacBook, dashboard avec graphs temps réel",
  },
  "project-drmilou-2": {
    id: "project-drmilou-2",
    status: "pending",
    alt: "DrMilou — gestion CRUD",
    width: 1920,
    height: 1200,
    briefing: "Mockup MacBook, liste/tableau CRUD",
  },
  "project-drmilou-3": {
    id: "project-drmilou-3",
    status: "pending",
    alt: "DrMilou — vue mobile",
    width: 1200,
    height: 1500,
    briefing: "Mockup iPhone, vue mobile responsive du dashboard",
  },
  "project-refonte-1": {
    id: "project-refonte-1",
    status: "pending",
    alt: "Refonte industrielle — dashboard production",
    width: 1920,
    height: 1200,
    briefing: "Mockup MacBook, dashboard KPI/TRS temps réel",
  },
  "project-refonte-2": {
    id: "project-refonte-2",
    status: "pending",
    alt: "Refonte industrielle — app terrain",
    width: 1200,
    height: 1500,
    briefing: "Mockup iPhone ou tablette, app saisie qualité avec photo non-conformité",
  },
  "project-refonte-3": {
    id: "project-refonte-3",
    status: "pending",
    alt: "Atelier d'usinage de précision",
    width: 1600,
    height: 1000,
    briefing: "Photo réelle d'atelier (floutée si confidentiel), opérateur tablette en main",
  },
  "og-image-v2": {
    id: "og-image-v2",
    status: "pending",
    alt: "Eurus — Agence de développement",
    width: 1200,
    height: 630,
    briefing: "Nouvelle OG image : titre + photo équipe + accent orange, format social",
  },
  "testimonial-elodie": {
    id: "testimonial-elodie",
    status: "pending",
    alt: "Élodie, co-fondatrice de Youdy",
    width: 200,
    height: 200,
    briefing: "Portrait carré de profil LinkedIn d'Élodie (Youdy)",
  },
  "testimonial-fily": {
    id: "testimonial-fily",
    status: "pending",
    alt: "Fily, fondateur de Getaway",
    width: 200,
    height: 200,
    briefing: "Portrait carré de profil LinkedIn de Fily (Getaway)",
  },
};

export function getAsset(id: string): AssetDefinition {
  const asset = assets[id];
  if (!asset) {
    throw new Error(`Asset not found: ${id}`);
  }
  return asset;
}

export function listPendingAssets(): AssetDefinition[] {
  return Object.values(assets).filter((a) => a.status === "pending");
}
