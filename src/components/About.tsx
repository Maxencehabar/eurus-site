"use client";

import { motion } from "motion/react";
import { Asset } from "@/components/ui/Asset";
import { getAsset } from "@/data/assets";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/animations/motion-presets";

const values = [
  {
    title: "Communication",
    desc: "Transparence totale sur l'avancement et les décisions",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: "Efficacité",
    desc: "Premier outil livré en 2-4 semaines. Itérations rapides.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Pragmatisme",
    desc: "L'outil qui résout votre problème, pas un ERP à 200k€.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Expertise terrain",
    desc: "On comprend vos contraintes — atelier, production, logistique.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01" />
      </svg>
    ),
  },
];

export default function About() {
  return (
    <section
      id="apropos"
      className="relative py-24 md:py-32 bg-bg-secondary overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <Asset
          asset={getAsset("office-ambient")}
          className="w-full h-full object-cover"
          sizes="100vw"
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={fadeUp}
          >
            <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
              À propos
            </span>
            <h2 className="heading-editorial text-[clamp(2rem,5vw,3rem)] mb-6">
              Une agence qui comprend les enjeux des créateurs de produits
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Maxence développe depuis 2018. Après une prépa ingé et plusieurs missions
                en freelance, il crée Eurus en 2021 avec une conviction : le développement
                sur mesure ne devrait pas être réservé aux grandes entreprises.
              </p>
              <p>
                Avec Théo et Tom, on construit des applications mobiles, des outils web
                et des assistants IA pour des startups et des PME industrielles. On parle
                votre langue — qu&apos;il s&apos;agisse de React ou de traçabilité qualité
                en atelier.
              </p>
              <p className="text-text-primary font-medium">
                Basés en France, nous accompagnons startups et PME industrielles depuis 2021.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={staggerContainer}
            className="grid grid-cols-2 gap-4"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                className="bg-bg-card border border-border rounded-xl p-6 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-accent mb-3">{value.icon}</div>
                <h3 className="font-semibold text-text-primary mb-2">{value.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
