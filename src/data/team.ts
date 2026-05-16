export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  links: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  portraitAssetId: string;
}

export const team: TeamMember[] = [
  {
    slug: "maxence",
    name: "Maxence Habar",
    role: "Fondateur & Lead Developer",
    bio: "Code depuis 2018. Prépa ingé puis freelance avant Eurus. Spécialiste full-stack et IA appliquée.",
    expertise: ["Next.js", "Flutter", "Firebase", "Claude API", "PostgreSQL"],
    links: {
      linkedin: "https://www.linkedin.com/in/maxencehabar/",
      github: "https://github.com/Maxencehabar",
    },
    portraitAssetId: "team-maxence-portrait",
  },
  {
    slug: "theo",
    name: "Théo",
    role: "Backend & DevOps",
    bio: "Expert architectures distribuées et infrastructure cloud. Garant de la fiabilité et de la sécurité.",
    expertise: ["Spring Boot", "PostgreSQL", "Docker", "AWS", "CI/CD"],
    links: {},
    portraitAssetId: "team-theo-portrait",
  },
  {
    slug: "tom",
    name: "Tom",
    role: "Mobile & Frontend",
    bio: "Spécialiste applications mobiles natives et cross-platform. Obsédé par la qualité d'UX.",
    expertise: ["Flutter", "React Native", "iOS", "Android", "Figma"],
    links: {},
    portraitAssetId: "team-tom-portrait",
  },
];
