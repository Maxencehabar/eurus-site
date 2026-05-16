export interface ProjectSummary {
  number: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  category: "mobile" | "web" | "industrie";
  stat?: string;
  heroAssetId: string;
}

export interface TechCategory {
  label: string;
  items: string[];
}

export interface ProjectDetail extends ProjectSummary {
  heroDescription: string;
  problem: string;
  solution: {
    approach: string;
    features: string[];
  };
  techStack: TechCategory[];
  results: { value: string; label: string }[];
  galleryAssetIds: string[];
  metaTitle: string;
  metaDescription: string;
}

const projects: ProjectDetail[] = [
  {
    number: "01",
    slug: "getaway",
    title: "Getaway",
    subtitle: "Application mobile — Rencontre entre voyageurs",
    description:
      "App de matching qui met en relation des voyageurs partageant les mêmes destinations et dates. Disponible sur iOS avec plus de 700 utilisateurs actifs.",
    tags: ["Flutter", "Firebase", "iOS"],
    category: "mobile",
    stat: "700+ utilisateurs",
    heroAssetId: "project-getaway-1",
    heroDescription:
      "Une application mobile de matching qui connecte les voyageurs partageant les mêmes destinations et dates de voyage. Swipez, matchez, voyagez ensemble.",
    problem:
      "Voyager seul peut être intimidant, et trouver des compagnons de voyage fiables avec des plans compatibles est un vrai défi. Les forums et groupes Facebook manquent de structure et ne permettent pas de filtrer efficacement par destination, dates et centres d'intérêt.",
    solution: {
      approach:
        "Nous avons conçu une expérience de swipe intuitive inspirée des apps de rencontre, mais dédiée au voyage. L'algorithme de matching prend en compte la destination, les dates, le budget et les centres d'intérêt pour proposer des profils pertinents.",
      features: [
        "Système de swipe avec matching en temps réel",
        "Filtrage par destination, dates et budget",
        "Chat intégré après matching",
        "Profils voyageurs détaillés avec préférences",
        "Notifications push pour les nouveaux matchs",
        "Recherche géolocalisée des voyageurs à proximité",
      ],
    },
    techStack: [
      { label: "Mobile", items: ["Flutter", "Dart"] },
      { label: "Backend", items: ["Firebase", "Cloud Functions v2"] },
      { label: "Base de données", items: ["Firestore", "Algolia"] },
      { label: "Infrastructure", items: ["Firebase Auth", "FCM", "Cloud Storage"] },
    ],
    results: [
      { value: "700+", label: "Utilisateurs actifs" },
      { value: "iOS", label: "Disponible sur App Store" },
      { value: "4.6/5", label: "Note moyenne" },
      { value: "<200ms", label: "Temps de réponse API" },
    ],
    galleryAssetIds: ["project-getaway-1", "project-getaway-2", "project-getaway-3"],
    metaTitle: "Getaway — Application de matching voyage | Eurus",
    metaDescription:
      "Découvrez Getaway, l'application mobile de matching entre voyageurs développée par Eurus. Flutter, Firebase, 700+ utilisateurs actifs.",
  },
  {
    number: "02",
    slug: "youdy",
    title: "Youdy",
    subtitle: "Plateforme SaaS — Mise en relation apprenants/formateurs",
    description:
      "Système complet de réservation avec paiement Stripe, gestion de calendrier et notifications. Architecture full-stack moderne.",
    tags: ["React", "Next.js", "Spring Boot", "Firestore", "Stripe"],
    category: "web",
    stat: "Livré en 3 mois",
    heroAssetId: "project-youdy-1",
    heroDescription:
      "Une plateforme SaaS complète de mise en relation entre apprenants et formateurs, avec réservation, paiement et gestion de calendrier intégrés.",
    problem:
      "Le marché de la formation individuelle manque d'outils centralisés. Les formateurs jonglent entre plusieurs plateformes pour gérer leur planning, leurs paiements et leur communication avec les apprenants, ce qui génère des frictions et des pertes de temps.",
    solution: {
      approach:
        "Nous avons développé une plateforme tout-en-un qui centralise la recherche de formateurs, la réservation de créneaux, le paiement sécurisé et le suivi des sessions. L'architecture full-stack assure performance et scalabilité.",
      features: [
        "Recherche et filtrage de formateurs par compétence",
        "Calendrier de disponibilité en temps réel",
        "Réservation et paiement sécurisé via Stripe",
        "Système de notifications email et push",
        "Tableau de bord formateur avec analytics",
        "Gestion des avis et recommandations",
      ],
    },
    techStack: [
      { label: "Frontend", items: ["React", "Next.js", "TypeScript"] },
      { label: "Backend", items: ["Spring Boot", "Java"] },
      { label: "Base de données", items: ["Firestore"] },
      { label: "Services", items: ["Stripe", "Firebase Auth", "FCM"] },
    ],
    results: [
      { value: "3 mois", label: "De l'idée à la production" },
      { value: "100%", label: "Couverture fonctionnelle" },
      { value: "Stripe", label: "Paiements sécurisés" },
      { value: "99.9%", label: "Uptime garanti" },
    ],
    galleryAssetIds: ["project-youdy-1", "project-youdy-2", "project-youdy-3"],
    metaTitle: "Youdy — Plateforme SaaS formation | Eurus",
    metaDescription:
      "Découvrez Youdy, la plateforme de mise en relation apprenants/formateurs développée par Eurus. React, Next.js, Stripe, livrée en 3 mois.",
  },
  {
    number: "03",
    slug: "drmilou",
    title: "DrMilou",
    subtitle: "Back-office — Gestion d'entreprise",
    description:
      "Application de gestion complète : données métier, tableaux de bord interactifs, exports analytics. Interface fluide et performante.",
    tags: ["Spring Boot", "Vue.js", "PostgreSQL"],
    category: "web",
    stat: "5x plus rapide",
    heroAssetId: "project-drmilou-1",
    heroDescription:
      "Un back-office sur mesure pour la gestion d'entreprise : données métier, tableaux de bord interactifs et exports analytics en temps réel.",
    problem:
      "L'entreprise gérait ses données via des fichiers Excel dispersés et des processus manuels, entraînant des erreurs, des doublons et un manque de visibilité sur les indicateurs clés. Le temps passé à consolider les données empêchait l'équipe de se concentrer sur son cœur de métier.",
    solution: {
      approach:
        "Nous avons développé un back-office centralisé avec une interface intuitive, des tableaux de bord temps réel et des exports automatisés. La migration depuis Excel a été réalisée sans perte de données.",
      features: [
        "Tableaux de bord interactifs avec graphiques temps réel",
        "Gestion CRUD complète des données métier",
        "Exports CSV et PDF automatisés",
        "Système de rôles et permissions",
        "Recherche et filtrage avancés",
        "Historique et audit trail des modifications",
      ],
    },
    techStack: [
      { label: "Frontend", items: ["Vue.js", "Vuetify"] },
      { label: "Backend", items: ["Spring Boot", "Java"] },
      { label: "Base de données", items: ["PostgreSQL"] },
      { label: "Infrastructure", items: ["Docker", "Nginx"] },
    ],
    results: [
      { value: "5x", label: "Gain de productivité" },
      { value: "0", label: "Erreurs de saisie" },
      { value: "< 1s", label: "Temps de chargement" },
      { value: "100%", label: "Données migrées" },
    ],
    galleryAssetIds: ["project-drmilou-1", "project-drmilou-2", "project-drmilou-3"],
    metaTitle: "DrMilou — Back-office gestion d'entreprise | Eurus",
    metaDescription:
      "Découvrez DrMilou, le back-office de gestion d'entreprise développé par Eurus. Vue.js, Spring Boot, PostgreSQL, 5x plus rapide.",
  },
  {
    number: "04",
    slug: "refonte-industrielle",
    title: "Refonte digitale PME industrielle",
    subtitle: "Dashboard + App terrain — Usinage de précision",
    description:
      "Digitalisation complète du suivi de production pour une PME de 50 salariés",
    tags: ["Next.js", "Flutter", "PostgreSQL", "Firebase"],
    category: "industrie",
    stat: "40% de temps de saisie en moins",
    heroAssetId: "project-refonte-1",
    heroDescription:
      "Une PME d'usinage de précision de 50 salariés en Île-de-France. Planning de production sur Excel, fiches qualité sur papier, reporting compilé à la main. Aucune visibilité temps réel sur l'atelier.",
    problem:
      "Le planning de production tournait sur un fichier Excel modifié par 3 personnes. Les conflits de version étaient quotidiens. Les fiches qualité étaient remplies sur papier en atelier, puis ressaisies le lendemain dans un autre Excel. Le reporting direction prenait 3 heures par semaine à compiler. 94% des spreadsheets en entreprise contiennent des erreurs (étude Poon, 2024). Ici, ce n'était pas une statistique — c'était le quotidien.",
    solution: {
      approach:
        "On a construit deux outils ciblés en 3 semaines. Un dashboard web (Next.js) pour le planning et le reporting, connecté en temps réel à la production. Et une application mobile (Flutter) pour les opérateurs en atelier : saisie qualité, photos des non-conformités, horodatage automatique. Le tout synchronisé avec leur ERP existant via API.",
      features: [
        "Dashboard temps réel KPI/TRS",
        "App mobile terrain offline-first",
        "Saisie qualité avec photos",
        "Reporting automatique direction",
        "Connexion ERP existant",
        "Formation opérateurs incluse",
      ],
    },
    techStack: [
      { label: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS"] },
      { label: "Mobile", items: ["Flutter", "Dart"] },
      { label: "Backend", items: ["PostgreSQL", "Firebase", "REST API"] },
      { label: "Infrastructure", items: ["Vercel", "Docker"] },
    ],
    results: [
      { value: "-40%", label: "temps de saisie" },
      { value: "0", label: "papier en atelier" },
      { value: "3 sem.", label: "de développement" },
      { value: "Temps réel", label: "visibilité direction" },
    ],
    galleryAssetIds: ["project-refonte-1", "project-refonte-2", "project-refonte-3"],
    metaTitle: "Refonte digitale PME industrielle — Dashboard & App terrain | Eurus",
    metaDescription:
      "Digitalisation complète d'une PME d'usinage : dashboard Next.js, app Flutter terrain, reporting automatique. -40% de temps de saisie en 3 semaines.",
  },
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getProjectSummaries(): ProjectSummary[] {
  return projects.map(({ number, slug, title, subtitle, description, tags, category, stat, heroAssetId }) => ({
    number,
    slug,
    title,
    subtitle,
    description,
    tags,
    category,
    stat,
    heroAssetId,
  }));
}
