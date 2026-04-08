"use client";

import { useEffect, useRef, useState } from "react";

interface Service {
  number: string;
  title: string;
  description: string;
  details: string[];
  href?: string;
}

const services: Service[] = [
  {
    number: "01",
    title: "Applications mobiles",
    description:
      "iOS et Android avec une seule base de code. Flutter et React Native pour un développement rapide et des performances natives.",
    details: ["Flutter", "React Native", "iOS", "Android"],
  },
  {
    number: "02",
    title: "Applications web",
    description:
      "Des interfaces modernes et réactives. SPA, SSR, ou sites vitrines complexes avec les meilleurs frameworks du marché.",
    details: ["React", "Next.js", "Vue.js", "TypeScript"],
  },
  {
    number: "03",
    title: "Backend & API",
    description:
      "Architectures robustes qui tiennent la charge. API REST ou GraphQL, bases de données optimisées, intégrations tierces.",
    details: ["Node.js", "Java Spring", "PostgreSQL", "Firebase"],
  },
  {
    number: "04",
    title: "Conseil & Audit",
    description:
      "Besoin d'un regard externe ? Audit de code, choix d'architecture, accompagnement technique pour vos équipes.",
    details: ["Audit technique", "Architecture", "Formation", "CTO as a service"],
  },
  {
    number: "05",
    title: "Industrie & IA",
    description:
      "Outils sur mesure pour PME industrielles : dashboards de production, apps terrain, assistants IA branchés sur vos outils.",
    details: ["Dashboards", "Apps terrain", "Assistants IA", "Portails B2B"],
    href: "/industrie",
  },
];

export default function Services() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = refs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="bg-bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Section header */}
        <div className="mb-16 md:mb-24">
          <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
            Services
          </span>
          <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)] max-w-[700px]">
            Ce que nous faisons, et ce que nous faisons <em className="not-italic text-accent">bien</em>
          </h2>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Wrapper = service.href ? "a" : "div";
            const wrapperProps = service.href ? { href: service.href } : {};
            return (
            <Wrapper
              key={service.number}
              {...wrapperProps}
              ref={(el: HTMLDivElement | HTMLAnchorElement | null) => { refs.current[index] = el as HTMLDivElement | null; }}
              className={`group bg-bg-card border border-border rounded-2xl p-8 md:p-10 transition-all duration-700 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 ${service.href ? "cursor-pointer" : ""} ${
                visibleItems.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-5xl font-light text-border-strong group-hover:text-accent/30 transition-colors">
                  {service.number}
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
                {service.title}
              </h3>
              <p className="text-text-secondary mb-6 leading-relaxed">
                {service.description}
              </p>
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
        </div>
      </div>
    </section>
  );
}
