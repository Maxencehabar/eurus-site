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
    status: "ready",
    src: "/team/maxence.jpg",
    alt: "Maxence Habar, fondateur d'Eurus",
    width: 800,
    height: 1000,
    briefing: "Portrait pro, plan poitrine, fond uni clair (#F5F3EF), regard caméra, lumière douce naturelle",
  },
  "team-maxence-editorial": {
    id: "team-maxence-editorial",
    status: "ready",
    src: "/team/maxence-editorial.jpg",
    alt: "Maxence Habar au travail",
    width: 1200,
    height: 1500,
    briefing: "Portrait éditorial 3/4, en train de coder, bureau, lumière fenêtre",
  },
  "team-theo-portrait": {
    id: "team-theo-portrait",
    status: "ready",
    src: "/team/theo.jpg",
    alt: "Théo, développeur Eurus",
    width: 800,
    height: 1000,
    briefing: "Même setup que Maxence (cohérence cadrage / lumière obligatoire)",
  },
  "team-leo-portrait": {
    id: "team-leo-portrait",
    status: "ready",
    src: "/team/leo.jpg",
    alt: "Léo, développeur Eurus",
    width: 800,
    height: 1000,
    briefing: "Même setup que Maxence (cohérence cadrage / lumière obligatoire)",
  },
  "team-group": {
    id: "team-group",
    status: "ready",
    src: "/team/group-v4.jpg",
    alt: "L'équipe Eurus",
    width: 2400,
    height: 1029,
    briefing: "Photo équipe à 3 en format cinémascope (21:9), ambiance studio ou bureau",
  },
  "office-setup": {
    id: "office-setup",
    status: "ready",
    src: "/office/setup.jpg",
    alt: "Espace de travail Eurus",
    width: 1600,
    height: 1000,
    briefing: "Setup dev : clavier mécanique + écran avec du vrai code, plongée ou côté",
  },
  "office-ambient": {
    id: "office-ambient",
    status: "ready",
    src: "/office/ambient.jpg",
    alt: "Bureau Eurus",
    width: 1600,
    height: 1000,
    briefing: "Photo large d'un coin de bureau qui respire, lumière naturelle",
  },
  "project-getaway-1": {
    id: "project-getaway-1",
    status: "ready",
    src: "/projects/getaway-1.jpg",
    alt: "Getaway — trouve ton compagnon de voyage",
    width: 1200,
    height: 1500,
    briefing: "Mockup iPhone 15 Pro, écran swipe avec un vrai profil voyageur",
  },
  "project-getaway-2": {
    id: "project-getaway-2",
    status: "ready",
    src: "/projects/getaway-2.jpg",
    alt: "Getaway — organisation du voyage",
    width: 1200,
    height: 1500,
    briefing: "Mockup iPhone, écran match avec animation de connexion",
  },
  "project-getaway-3": {
    id: "project-getaway-3",
    status: "ready",
    src: "/projects/getaway-3.jpg",
    alt: "Getaway — suivi des dépenses de voyage",
    width: 1200,
    height: 1500,
    briefing: "Mockup iPhone, écran chat avec messages",
  },
  "project-youdy-1": {
    id: "project-youdy-1",
    status: "ready",
    src: "/projects/youdy-1.jpg",
    alt: "Youdy — page d'accueil",
    width: 1920,
    height: 1200,
    briefing: "Mockup MacBook 16'', home Youdy avec recherche formateurs",
  },
  "project-youdy-2": {
    id: "project-youdy-2",
    status: "ready",
    src: "/projects/youdy-2.jpg",
    alt: "Youdy — recherche de services avec carte",
    width: 1920,
    height: 1200,
    briefing: "Mockup MacBook, calendrier de résa avec créneaux",
  },
  "project-youdy-3": {
    id: "project-youdy-3",
    status: "ready",
    src: "/projects/youdy-3.jpg",
    alt: "Youdy — version mobile",
    width: 1200,
    height: 1500,
    briefing: "Mockup iPhone, écran paiement Stripe",
  },
  "project-drmilou-1": {
    id: "project-drmilou-1",
    status: "ready",
    src: "/projects/drmilou-1.jpg",
    alt: "My Milou — dashboard vétérinaire",
    width: 1920,
    height: 1200,
    briefing: "Mockup MacBook, dashboard avec graphs temps réel",
  },
  "project-drmilou-2": {
    id: "project-drmilou-2",
    status: "ready",
    src: "/projects/drmilou-2.jpg",
    alt: "My Milou — planning des rendez-vous",
    width: 1920,
    height: 1200,
    briefing: "Mockup MacBook, liste/tableau CRUD",
  },
  "project-drmilou-3": {
    id: "project-drmilou-3",
    status: "ready",
    src: "/projects/drmilou-3.jpg",
    alt: "My Milou — fiche patient mobile",
    width: 1200,
    height: 1500,
    briefing: "Mockup iPhone, vue mobile responsive du dashboard",
  },
  "project-refonte-1": {
    id: "project-refonte-1",
    status: "ready",
    src: "/projects/refonte-1.jpg",
    alt: "Refonte industrielle — dashboard production",
    width: 1920,
    height: 1200,
    briefing: "Mockup MacBook, dashboard KPI/TRS temps réel",
  },
  "project-refonte-2": {
    id: "project-refonte-2",
    status: "ready",
    src: "/projects/refonte-2.jpg",
    alt: "Refonte industrielle — app terrain",
    width: 1200,
    height: 1500,
    briefing: "Mockup iPhone ou tablette, app saisie qualité avec photo non-conformité",
  },
  "project-refonte-3": {
    id: "project-refonte-3",
    status: "ready",
    src: "/projects/refonte-3.jpg",
    alt: "Atelier d'usinage de précision",
    width: 1600,
    height: 1000,
    briefing: "Photo réelle d'atelier (floutée si confidentiel), opérateur tablette en main",
  },
  "og-image-v2": {
    id: "og-image-v2",
    status: "ready",
    src: "/og-image-v2.jpg",
    alt: "Eurus — Agence de développement",
    width: 1200,
    height: 630,
    briefing: "Nouvelle OG image : titre + photo équipe + accent orange, format social",
  },
  "testimonial-elodie": {
    id: "testimonial-elodie",
    status: "ready",
    src: "/testimonials/elodie.jpg",
    alt: "Élodie, co-fondatrice de Youdy",
    width: 200,
    height: 200,
    briefing: "Portrait carré de profil LinkedIn d'Élodie (Youdy)",
  },
  "testimonial-fily": {
    id: "testimonial-fily",
    status: "ready",
    src: "/testimonials/fily.jpg",
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
