"use client";

import Link from "next/link";
import type { Route } from "next";
import { motion } from "motion/react";
import { fadeUp, VIEWPORT_ONCE } from "@/lib/animations/motion-presets";

const plans = [
  {
    name: "Automatisation / agent IA",
    description:
      "Agent IA ou outil interne sur mesure : recouvrement, back-office, app terrain. Remplace Excel, le papier et les ressaisies.",
    features: [
      "2-4 semaines",
      "Connecté à vos outils (ERP, mail…)",
      "Formation incluse",
    ],
    popular: true,
    caseStudySlug: "refonte-industrielle",
  },
  {
    name: "MVP / App simple",
    description:
      "Application mobile ou web avec les fonctionnalités essentielles. Idéal pour valider une idée.",
    features: [
      "6-12 semaines",
      "Design + Dev + Déploiement",
      "1 plateforme (web ou mobile)",
    ],
    popular: false,
    caseStudySlug: "getaway",
  },
  {
    name: "Application complète",
    description:
      "Application multi-plateforme avec backend, intégrations et panel admin. Pour les projets ambitieux.",
    features: [
      "3-6 mois",
      "Web + Mobile + Backend",
      "Intégrations tierces (Stripe, etc.)",
    ],
    popular: false,
    caseStudySlug: "youdy",
  },
];

export default function Pricing() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <section id="tarifs" className="py-24 md:py-32 bg-bg-secondary">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={fadeUp}
        >
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
              Offres
            </span>
            <h2 className="heading-editorial text-[clamp(2rem,5vw,3rem)] mb-4">
              Nos offres
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Chaque projet est chiffré sur mesure après un appel découverte,
              avec un budget transparent et sans surprise.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              variants={fadeUp}
            >
              <div
                className={`relative bg-bg-card border rounded-xl p-8 h-full flex flex-col ${
                  plan.popular
                    ? "border-accent shadow-lg shadow-accent/10"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-6 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Populaire
                  </span>
                )}
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {plan.name}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {plan.description}
                </p>
                <ul className="space-y-3 mt-auto">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-text-secondary"
                    >
                      <svg
                        className="w-4 h-4 text-accent flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/projets/${plan.caseStudySlug}` as Route}
                  className="mt-6 text-sm text-accent font-medium inline-flex items-center gap-1 hover:gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                >
                  Voir un cas concret →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={fadeUp}
        >
          <div className="text-center mt-12">
            <a
              href={calendlyUrl || "#contact"}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-medium px-8 py-3 rounded-lg transition-colors"
            >
              Réserver un appel découverte gratuit
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
