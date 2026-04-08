import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, CONTACT_EMAIL, CTA_URL } from "@/lib/constants";
import FadeIn from "@/components/FadeIn";

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

const useCases = [
  {
    number: "01",
    title: "Assistant création de tickets",
    description:
      "Votre équipe décrit un besoin, l'IA crée le ticket Jira automatiquement. De 15 min à 30 sec.",
    tags: ["Jira", "Confluence", "NLP"],
  },
  {
    number: "02",
    title: "Support client automatisé",
    description:
      "L'IA répond aux tickets avec accès à votre doc et historique client. 50% de tickets résolus sans humain.",
    tags: ["Zendesk", "Intercom", "RAG"],
  },
  {
    number: "03",
    title: "Automatisation process",
    description:
      "Commandes, facturation, reporting. L'IA extrait, classe et route automatiquement.",
    tags: ["ERP", "Facturation", "OCR"],
  },
];

const stats = [
  {
    value: "x19",
    label: "Augmentation de l'usage des Custom GPTs en entreprise en 1 an",
    source: "OpenAI",
  },
  {
    value: "97%",
    label: "Réduction du temps de première réponse avec IA intégrée",
    source: "AssemblyAI",
  },
  {
    value: "2x",
    label: "Les équipes avec IA intégrée surpassent leurs objectifs de CA",
    source: "McKinsey",
  },
];

const steps = [
  {
    number: "01",
    title: "Audit de vos outils et process",
    description:
      "On cartographie vos workflows, vos outils et vos points de friction. Gratuit, sans engagement.",
    duration: "Gratuit",
  },
  {
    number: "02",
    title: "Construction de l'assistant",
    description:
      "On développe un assistant IA connecté à votre stack existante. Tests, itérations, validation avec vos équipes.",
    duration: "2-3 sem.",
  },
  {
    number: "03",
    title: "Déploiement et formation",
    description:
      "Mise en production, formation de vos équipes, documentation. Vous êtes autonomes dès le jour 1.",
    duration: "1 sem.",
  },
];

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

      {/* Hero */}
      <section className="relative min-h-[85vh] overflow-hidden bg-bg-primary flex items-center">
        <div className="absolute top-20 right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent/5 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-orange-200/20 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 pt-32 md:pt-40 pb-20">
          <FadeIn>
            <span className="inline-flex items-center gap-2 text-sm text-text-secondary mb-8">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Nouvelle offre — Intégration IA
            </span>
          </FadeIn>

          <FadeIn className="delay-100">
            <h1 className="heading-editorial text-[clamp(2.5rem,7vw,5rem)] max-w-[900px] mb-8">
              L&apos;IA branchée sur{" "}
              <span className="accent-underline">vos outils</span>, pas sur
              ChatGPT
            </h1>
          </FadeIn>

          <FadeIn className="delay-200">
            <p className="text-lg md:text-xl text-text-secondary max-w-[650px] mb-12 leading-relaxed">
              On construit des assistants IA connectés à votre ERP, votre Jira,
              votre base documentaire. Pas un chatbot générique — un outil qui
              connaît votre métier.
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
                Réserver un audit gratuit
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
                href="#cas-usage"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[0.95rem] font-medium border border-border-strong text-text-primary transition-all hover:bg-bg-secondary hover:border-text-muted"
              >
                Voir les cas d&apos;usage
              </a>
            </div>
          </FadeIn>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
      </section>

      {/* Problem / Solution */}
      <section className="bg-bg-secondary py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <FadeIn>
            <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
              Le constat
            </span>
            <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)] max-w-[800px] mb-6">
              91% des entreprises utilisent l&apos;IA.{" "}
              <em className="not-italic text-accent">
                Moins de 40%
              </em>{" "}
              ont dépassé le stade pilote.
            </h2>
            <p className="text-sm text-text-muted mb-16">Source : McKinsey, 2024</p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <FadeIn>
              <div className="bg-bg-card border border-border rounded-2xl p-8 md:p-10 h-full">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Ce que font la plupart des entreprises
                </h3>
                <p className="text-text-secondary leading-relaxed mb-6">
                  ChatGPT en onglet. Copier-coller de données confidentielles.
                  Prompts bricolés par chacun. Aucune connexion avec les outils
                  existants. Zéro traçabilité.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Copier-coller", "Pas de contexte", "Zéro intégration", "Données non sécurisées"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1.5 rounded-full bg-red-500/5 text-red-500/80 border border-red-500/10"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </FadeIn>

            <FadeIn className="delay-150">
              <div className="bg-bg-card border border-accent/20 rounded-2xl p-8 md:p-10 h-full">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                  <svg
                    className="w-5 h-5 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Ce que nous construisons
                </h3>
                <p className="text-text-secondary leading-relaxed mb-6">
                  Des assistants sur mesure, branchés sur vos outils existants.
                  Ils connaissent votre base documentaire, vos process, vos
                  clients. Déployés dans votre environnement, sécurisés.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Connecté à vos outils", "Contexte métier", "Sécurisé", "Traçable"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1.5 rounded-full bg-accent/5 text-accent border border-accent/10"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="cas-usage" className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <FadeIn>
            <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
              Cas d&apos;usage
            </span>
            <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)] max-w-[700px] mb-16 md:mb-24">
              Des assistants qui{" "}
              <em className="not-italic text-accent">travaillent</em>, pas qui
              bavardent
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {useCases.map((useCase, index) => (
              <FadeIn
                key={useCase.number}
                className={index === 1 ? "delay-100" : index === 2 ? "delay-200" : ""}
              >
                <div className="group bg-bg-card border border-border rounded-2xl p-8 md:p-10 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 h-full">
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-5xl font-light text-border-strong group-hover:text-accent/30 transition-colors">
                      {useCase.number}
                    </span>
                    <svg
                      className="w-6 h-6 text-text-muted group-hover:text-accent transition-all group-hover:translate-x-1 group-hover:-translate-y-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M7 17L17 7M17 7H7M17 7V17"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {useCase.title}
                  </h3>
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {useCase.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.tags.map((tag) => (
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

      {/* Stats */}
      <section className="bg-bg-dark py-20 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {stats.map((stat, index) => (
              <FadeIn
                key={index}
                className={index === 1 ? "delay-100" : index === 2 ? "delay-200" : ""}
              >
                <div className="text-center md:text-left">
                  <div className="heading-editorial text-[clamp(3rem,6vw,4.5rem)] text-white mb-3">
                    {stat.value}
                  </div>
                  <p className="text-white/70 leading-relaxed mb-2">
                    {stat.label}
                  </p>
                  <span className="text-xs text-white/40">
                    Source : {stat.source}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <FadeIn>
            <div className="text-center mb-16 md:mb-20">
              <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
                Notre process
              </span>
              <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)] max-w-[600px] mx-auto">
                Comment ça marche
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <FadeIn
                key={step.number}
                className={index === 1 ? "delay-100" : index === 2 ? "delay-200" : ""}
              >
                <div className="relative">
                  {index < steps.length - 1 && (
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

      {/* Pricing */}
      <section className="bg-bg-secondary py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <FadeIn>
            <div className="max-w-[800px] mx-auto text-center">
              <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
                Tarif
              </span>
              <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)] mb-6">
                À partir de{" "}
                <em className="not-italic text-accent">10 000&euro;</em>
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-10">
                Un tarif tout compris. Audit, développement, déploiement et
                formation de vos équipes inclus. Pas de surprise, pas
                d&apos;abonnement caché.
              </p>

              <div className="bg-bg-card border border-border rounded-2xl p-8 md:p-10 text-left">
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    {
                      icon: (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        />
                      ),
                      text: "Audit de vos process et outils",
                    },
                    {
                      icon: (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      ),
                      text: "Développement de l'assistant",
                    },
                    {
                      icon: (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      ),
                      text: "Déploiement dans votre environnement",
                    },
                    {
                      icon: (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      ),
                      text: "Formation de vos équipes",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                        <svg
                          className="w-4 h-4 text-accent"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {item.icon}
                        </svg>
                      </div>
                      <span className="text-text-secondary">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section id="contact-ia" className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <FadeIn>
            <div className="max-w-[800px] mx-auto text-center">
              <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
                Prochaine étape
              </span>
              <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)] mb-6">
                Montrez-nous votre process le plus{" "}
                <em className="not-italic text-accent">pénible</em>
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-10 max-w-[600px] mx-auto">
                On vous dit en 30 minutes si l&apos;IA peut le résoudre. Gratuit,
                sans engagement, sans bullshit.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={CTA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 bg-bg-dark text-white px-8 py-4 rounded-full text-[0.95rem] font-medium transition-all hover:gap-4 hover:shadow-xl hover:shadow-black/10"
                >
                  Réserver un appel découverte
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
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[0.95rem] font-medium border border-border-strong text-text-primary transition-all hover:bg-bg-secondary hover:border-text-muted"
                >
                  Retour au site
                </a>
              </div>
              <p className="text-sm text-text-muted mt-8">
                Ou écrivez-nous directement :{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-accent hover:text-accent-hover transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
