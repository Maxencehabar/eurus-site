"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/animations/motion-presets";

interface Service {
  number: string;
  title: string;
  description: string;
  details: string[];
  href?: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    number: "01",
    title: "Automatisation & agents IA",
    description:
      "Relances de factures, traitement de documents, tâches répétitives : des agents IA branchés sur vos outils qui font le travail à votre place.",
    details: ["Agents IA", "Recouvrement", "Back-office", "Claude API"],
    href: "/automatisation",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
        <path d="M13 2L3 14h8l-1 8 11-14h-8l0-6z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Outils métier & dashboards",
    description:
      "Apps terrain, portails B2B, gestion interne : les outils sur mesure qui remplacent Excel, le papier et les ressaisies.",
    details: ["Dashboards", "Apps terrain", "Portails B2B", "Intégration ERP"],
    href: "/industrie",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
        <path d="M2 20h20M4 20V8l4-2v14M12 20V4l4-2v18M20 20V12l-4-2" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Applications web",
    description:
      "Des interfaces modernes et réactives. SPA, SSR, ou sites vitrines complexes avec les meilleurs frameworks du marché.",
    details: ["React", "Next.js", "Vue.js", "TypeScript"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Applications mobiles",
    description:
      "iOS et Android avec une seule base de code. Flutter et React Native pour un développement rapide et des performances natives.",
    details: ["Flutter", "React Native", "iOS", "Android"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <line x1="11" y1="18" x2="13" y2="18" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Conseil & Audit",
    description:
      "Besoin d'un regard externe ? Audit de code, choix d'architecture, accompagnement technique pour vos équipes.",
    details: ["Audit technique", "Architecture", "Formation", "CTO as a service"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={fadeUp}
          className="mb-16 md:mb-24"
        >
          <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
            Services
          </span>
          <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)] max-w-[700px]">
            Ce que nous faisons, et ce que nous faisons{" "}
            <em className="not-italic text-accent">bien</em>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6 md:gap-8"
        >
          {services.map((service) => {
            const Wrapper = service.href ? motion.a : motion.div;
            const wrapperProps = service.href ? { href: service.href } : {};
            return (
              <Wrapper
                key={service.number}
                {...wrapperProps}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative bg-bg-card border border-border rounded-2xl p-8 md:p-10 transition-colors hover:border-accent/30 ${
                  service.href ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-5xl font-light text-border-strong group-hover:text-accent/30 transition-colors">
                    {service.number}
                  </span>
                  <div className="text-text-muted group-hover:text-accent transition-colors">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">{service.title}</h3>
                <p className="text-text-secondary mb-6 leading-relaxed">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.details.map((detail) => (
                    <span
                      key={detail}
                      className="text-xs px-3 py-1.5 rounded-full bg-bg-secondary text-text-muted border border-border"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </Wrapper>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
