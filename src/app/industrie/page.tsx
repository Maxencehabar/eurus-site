import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, CONTACT_EMAIL, CTA_URL } from "@/lib/constants";
import FadeIn from "@/components/FadeIn";

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

const painPoints = [
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 10h18M3 14h18M3 6h18M3 18h18"
      />
    ),
    title: "Planning de production sur Excel",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    ),
    title: "Suivi qualite sur papier en atelier",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
    title: "Commandes clients par email / telephone",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    ),
    title: "Reporting compile a la main chaque semaine",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    ),
    title: "Pas de visibilite temps reel sur la production",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z M8 2v3 M16 2v3 M4 10h16"
      />
    ),
    title: "Donnees dispersees entre ERP, Excel et papier",
  },
];

const solutions = [
  {
    number: "01",
    title: "Dashboard + App terrain",
    price: "15 - 25 k\u20AC",
    description:
      "Dashboard web Next.js + application mobile Flutter pour vos equipes terrain. Remplace vos fichiers Excel et vos fiches papier.",
    tags: ["Next.js", "Flutter", "Firebase", "Temps reel"],
  },
  {
    number: "02",
    title: "Assistant IA metier",
    price: "10 - 25 k\u20AC",
    description:
      "Chatbot branche sur vos outils existants (ERP, Jira, base documentaire). Vos equipes posent des questions, l\u2019IA repond avec vos donnees.",
    tags: ["Claude API", "RAG", "Integration ERP", "NLP"],
  },
  {
    number: "03",
    title: "Portail client B2B",
    price: "30 - 50 k\u20AC",
    description:
      "Commande en ligne, suivi de livraison, pricing par client. Vos clients commandent en autonomie, 24h/24.",
    tags: ["Next.js", "PostgreSQL", "Stripe", "API REST"],
  },
];

const stats = [
  {
    value: "94%",
    label: "des spreadsheets en entreprise contiennent des erreurs",
    source: "Pr. Pak-Lok Poon, 2024",
  },
  {
    value: "159.8%",
    label: "de ROI median pour les projets IA en PME francaises",
    source: null,
  },
  {
    value: "3 sem.",
    label: "temps moyen pour livrer un premier outil cible",
    source: null,
  },
];

const processSteps = [
  {
    number: "01",
    title: "Diagnostic gratuit",
    description:
      "45 min pour cartographier vos flux. On identifie le premier Excel a remplacer.",
    duration: "45 min",
  },
  {
    number: "02",
    title: "Proposition chiffree",
    description:
      "Architecture, planning, budget transparent. Envoye sous 48h, sans engagement.",
    duration: "48h",
  },
  {
    number: "03",
    title: "Developpement",
    description:
      "Sprints courts avec demos regulieres. Vous voyez l\u2019outil prendre forme chaque semaine.",
    duration: "2-4 sem.",
  },
  {
    number: "04",
    title: "Livraison + formation",
    description:
      "Deploiement, formation de vos equipes et maintenance incluse. On ne disparait pas apres la livraison.",
    duration: "Continu",
  },
];

export default function IndustriePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[85vh] overflow-hidden bg-bg-primary flex items-center">
        {/* Background orbs */}
        <div className="absolute top-20 right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent/5 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-orange-200/20 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 pt-32 md:pt-40 pb-20 w-full">
          <FadeIn>
            <span className="inline-flex items-center gap-2 text-sm text-text-secondary mb-8">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              PME industrielles &middot; 20 a 250 salaries
            </span>
          </FadeIn>

          <FadeIn className="delay-100">
            <h1 className="heading-editorial text-[clamp(2.75rem,8vw,5.5rem)] max-w-[900px] mb-8">
              On digitalise les{" "}
              <span className="accent-underline">PME industrielles</span>
            </h1>
          </FadeIn>

          <FadeIn className="delay-200">
            <p className="text-lg md:text-xl text-text-secondary max-w-[600px] mb-12 leading-relaxed">
              Vous pilotez encore votre production avec Excel et du papier ?
              On construit les outils sur mesure qui les remplacent.
              Dashboard, app mobile, IA &mdash; deployes en quelques semaines.
            </p>
          </FadeIn>

          <FadeIn className="delay-300">
            <div className="flex flex-wrap gap-4">
              <a
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-bg-dark text-white px-8 py-4 rounded-full text-[0.95rem] font-medium transition-all hover:gap-4 hover:shadow-xl hover:shadow-black/10"
              >
                Diagnostic gratuit &mdash; 45 min
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#solutions"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[0.95rem] font-medium border border-border-strong text-text-primary transition-all hover:bg-bg-secondary hover:border-text-muted"
              >
                Voir nos offres
              </a>
            </div>
          </FadeIn>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
      </section>

      {/* ── Pain points ── */}
      <section className="bg-bg-secondary py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <FadeIn>
            <div className="mb-16 md:mb-24">
              <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
                Le constat
              </span>
              <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)] max-w-[700px]">
                Ca vous parle&nbsp;?
              </h2>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {painPoints.map((pain, index) => (
              <FadeIn key={index} className={`delay-[${index * 75}ms]`}>
                <div className="group bg-bg-card border border-border rounded-2xl p-8 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 h-full">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                    <svg
                      className="w-5 h-5 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {pain.icon}
                    </svg>
                  </div>
                  <p className="text-text-primary font-medium leading-snug">
                    {pain.title}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solutions ── */}
      <section id="solutions" className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <FadeIn>
            <div className="mb-16 md:mb-24">
              <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
                Nos offres
              </span>
              <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)] max-w-[700px]">
                Des solutions concretes, pas des{" "}
                <em className="not-italic text-accent">slides</em>
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {solutions.map((solution, index) => (
              <FadeIn key={solution.number} className={`delay-[${index * 100}ms]`}>
                <div className="group bg-bg-card border border-border rounded-2xl p-8 md:p-10 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-5xl font-light text-border-strong group-hover:text-accent/30 transition-colors">
                      {solution.number}
                    </span>
                    <span className="text-sm px-3 py-1.5 rounded-full bg-accent/10 text-accent font-medium">
                      {solution.price}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {solution.title}
                  </h3>
                  <p className="text-text-secondary mb-6 leading-relaxed flex-1">
                    {solution.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {solution.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1.5 rounded-full bg-bg-secondary text-text-muted border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-bg-dark py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {stats.map((stat, index) => (
              <FadeIn key={index} className={`delay-[${index * 100}ms]`}>
                <div className="text-center md:text-left">
                  <div className="heading-editorial text-[clamp(2.5rem,6vw,4rem)] text-white mb-3">
                    {stat.value}
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    {stat.label}
                  </p>
                  {stat.source && (
                    <p className="text-white/40 text-sm mt-2">
                      {stat.source}
                    </p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <FadeIn>
            <div className="text-center mb-16 md:mb-20">
              <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
                Notre process
              </span>
              <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)] max-w-[600px] mx-auto">
                Du diagnostic au deploiement
              </h2>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {processSteps.map((step, index) => (
              <FadeIn key={step.number} className={`delay-[${index * 150}ms]`}>
                <div className="relative">
                  {/* Connector line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-px bg-border" />
                  )}

                  <div className="flex items-center gap-4 mb-4">
                    <span className="heading-editorial text-4xl text-accent/30">
                      {step.number}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-medium">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section id="contact" className="bg-bg-secondary py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <FadeIn>
            <div className="max-w-[700px] mx-auto text-center">
              <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
                On commence ?
              </span>
              <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)] mb-6">
                Reservez votre diagnostic gratuit
              </h2>
              <p className="text-text-secondary leading-relaxed mb-10 max-w-md mx-auto">
                45 minutes pour identifier le premier processus a digitaliser.
                Gratuit, sans engagement, en visio ou dans vos locaux.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={CTA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 bg-bg-dark text-white px-8 py-4 rounded-full text-[0.95rem] font-medium transition-all hover:gap-4 hover:shadow-xl hover:shadow-black/10"
                >
                  Prendre rendez-vous
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors text-sm"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
