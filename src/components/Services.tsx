import type { ServiceCard } from "@/types";
import SectionHeader from "./SectionHeader";
import FadeIn from "./FadeIn";

const services: ServiceCard[] = [
  {
    icon: "\u{1F4F1}",
    title: "Applications mobiles",
    description:
      "Développement d'applications iOS et Android performantes avec Flutter et React Native. De la maquette au store.",
  },
  {
    icon: "\u{1F310}",
    title: "Développement web",
    description:
      "Applications web modernes et réactives avec React, Next.js et Vue.js. SPA, SSR, sites vitrines complexes.",
  },
  {
    icon: "\u2699\uFE0F",
    title: "Backend & API",
    description:
      "Architectures robustes et scalables avec Java Spring Boot, Node.js et Firebase. API REST, microservices, BDD.",
  },
  {
    icon: "\u{1F4A1}",
    title: "Conseil technique",
    description:
      "Audit de code, choix d'architecture, accompagnement CTO. Nous vous aidons à prendre les bonnes décisions techniques.",
  },
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-[1200px] px-8 py-24 max-md:px-6 max-md:py-16">
      <FadeIn>
        <SectionHeader
          label="Services"
          title="Ce que nous faisons"
          description="De la conception à la mise en production, nous couvrons l'ensemble du cycle de développement."
        />
      </FadeIn>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
        {services.map((s) => (
          <FadeIn key={s.title}>
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-bg-card p-8 transition-all duration-300 before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-gradient-to-r before:from-accent before:to-[#8b5cf6] before:opacity-0 before:transition-opacity hover:-translate-y-1 hover:border-[rgba(59,130,246,0.2)] hover:bg-bg-card-hover hover:before:opacity-100">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-glow text-xl">
                {s.icon}
              </div>
              <h3 className="mb-3 text-lg font-semibold">{s.title}</h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {s.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
