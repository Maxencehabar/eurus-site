"use client";

import { motion } from "motion/react";
import { fadeUp, VIEWPORT_ONCE } from "@/lib/animations/motion-presets";
import { CONTACT_EMAIL, CTA_URL } from "@/lib/constants";

const painPoints = [
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
    title: "Relances de factures écrites une par une",
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
    title: "Paiements pointés à la main dans le relevé bancaire",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 7h12m0 0l-4-4m4 4l-4 4M16 17H4m0 0l4 4m-4-4l4-4"
      />
    ),
    title: "Ressaisies entre le mail, Excel et le logiciel métier",
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
    title: "Reporting compilé à la main chaque semaine",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    title: "Devis, bons de commande et formulaires traités à la main",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    ),
    title: "Un process entier qui repose sur une seule personne",
  },
];

const solutions = [
  {
    number: "01",
    title: "Agent de recouvrement",
    description:
      "Relances de factures par paliers, rapprochement des paiements, courriers de mise en demeure. Votre équipe supervise, l'agent exécute.",
    tags: ["Relances auto", "Rapprochement bancaire", "Claude API", "Outlook"],
  },
  {
    number: "02",
    title: "Traitement de documents",
    description:
      "Extraction, classement et saisie automatique de vos devis, factures, bons de commande et formulaires. Fini les ressaisies.",
    tags: ["OCR + IA", "Extraction", "Intégration ERP", "Zéro ressaisie"],
  },
  {
    number: "03",
    title: "Assistant IA métier",
    description:
      "Un assistant branché sur vos outils (ERP, base documentaire, mails). Vos équipes posent des questions, il répond avec vos données.",
    tags: ["Claude API", "RAG", "Vos données", "Sécurisé"],
  },
];

const caseStudyPoints = [
  {
    title: "Le contexte",
    text: "Une PME industrielle française, des centaines de factures clients à suivre, des relances faites à la main par l'équipe comptable entre deux urgences.",
  },
  {
    title: "Ce qu'on a construit",
    text: "Un agent de recouvrement sur mesure : relances par paliers de ton, rapprochement automatique des virements reçus, courriers générés. L'équipe garde la main sur chaque envoi.",
  },
  {
    title: "Le résultat",
    text: "Des journées de relances ramenées à une session hebdomadaire supervisée. Aucun client relancé à tort : en dessous de 100 % de certitude, l'humain tranche.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Diagnostic gratuit",
    description:
      "45 min pour cartographier vos process. On identifie la tâche répétitive qui coûte le plus cher.",
    duration: "45 min",
  },
  {
    number: "02",
    title: "Proposition chiffrée",
    description:
      "Périmètre, planning, budget transparent. Envoyé sous 48h, sans engagement.",
    duration: "48h",
  },
  {
    number: "03",
    title: "Développement",
    description:
      "Sprints courts avec démos régulières. Vous voyez l'outil tourner sur vos vraies données chaque semaine.",
    duration: "2-4 sem.",
  },
  {
    number: "04",
    title: "Livraison + formation",
    description:
      "Déploiement, formation de vos équipes et maintenance incluse. On ne disparaît pas après la livraison.",
    duration: "Continu",
  },
];

export function AutomatisationPageBody() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[85vh] overflow-hidden bg-bg-primary flex items-center">
        {/* Background orbs */}
        <div className="absolute top-20 right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent/5 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-orange-200/20 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 pt-32 md:pt-40 pb-20 w-full">
          <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} variants={fadeUp}>
            <span className="inline-flex items-center gap-2 text-sm text-text-secondary mb-8">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              PME &amp; professionnels &middot; tous secteurs
            </span>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} variants={fadeUp}>
            <h1 className="heading-editorial text-[clamp(2.75rem,8vw,5.5rem)] max-w-[900px] mb-8">
              On automatise votre{" "}
              <span className="accent-underline">back-office</span>
            </h1>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} variants={fadeUp}>
            <p className="text-lg md:text-xl text-text-secondary max-w-[600px] mb-12 leading-relaxed">
              Relances de factures, ressaisies, documents, reporting : ces
              tâches mangent vos journées sans faire avancer votre métier. On
              construit les agents IA et les outils qui les font à votre place
              &mdash; sous votre contrôle.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} variants={fadeUp}>
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
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
      </section>

      {/* ── Pain points ── */}
      <section className="bg-bg-secondary py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} variants={fadeUp}>
            <div className="mb-16 md:mb-24">
              <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
                Le constat
              </span>
              <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)] max-w-[700px]">
                Ça vous parle&nbsp;?
              </h2>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {painPoints.map((pain, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                variants={fadeUp}
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solutions ── */}
      <section id="solutions" className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} variants={fadeUp}>
            <div className="mb-16 md:mb-24">
              <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
                Nos offres
              </span>
              <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)] max-w-[700px]">
                Des agents qui travaillent, pas des{" "}
                <em className="not-italic text-accent">démos</em>
              </h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {solutions.map((solution) => (
              <motion.div
                key={solution.number}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                variants={fadeUp}
              >
                <div className="group bg-bg-card border border-border rounded-2xl p-8 md:p-10 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-5xl font-light text-border-strong group-hover:text-accent/30 transition-colors">
                      {solution.number}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case study ── */}
      <section className="bg-bg-dark py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} variants={fadeUp}>
            <div className="mb-14 md:mb-16">
              <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
                Cas réel
              </span>
              <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)] max-w-[750px] text-white">
                Un agent de recouvrement en production
              </h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {caseStudyPoints.map((point, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                variants={fadeUp}
              >
                <div>
                  <h3 className="text-white font-semibold text-lg mb-3">
                    {point.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">{point.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} variants={fadeUp}>
            <div className="text-center mb-16 md:mb-20">
              <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
                Notre process
              </span>
              <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)] max-w-[600px] mx-auto">
                Du diagnostic au déploiement
              </h2>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                variants={fadeUp}
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section id="contact" className="bg-bg-secondary py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} variants={fadeUp}>
            <div className="max-w-[700px] mx-auto text-center">
              <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
                On commence ?
              </span>
              <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)] mb-6">
                Réservez votre diagnostic gratuit
              </h2>
              <p className="text-text-secondary leading-relaxed mb-10 max-w-md mx-auto">
                45 minutes pour identifier le premier process à automatiser.
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
          </motion.div>
        </div>
      </section>
    </>
  );
}
