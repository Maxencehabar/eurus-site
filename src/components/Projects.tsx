"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  color: string;
}

const projects: Project[] = [
  {
    slug: "drmilou",
    title: "DrMilou",
    category: "Application vétérinaire",
    description:
      "Gestion complète de cabinet vétérinaire : dossiers patients, ordonnances, facturation. Utilisé par des centaines de praticiens.",
    technologies: ["Java Spring Boot", "React", "PostgreSQL"],
    color: "from-emerald-500/10 to-teal-500/10",
  },
  {
    slug: "youdy",
    title: "Youdy",
    category: "Plateforme sociale",
    description:
      "Mise en relation intelligente entre apprentis et entreprises. Matching, messagerie temps réel, gestion des candidatures.",
    technologies: ["React", "Firebase", "Node.js"],
    color: "from-blue-500/10 to-indigo-500/10",
  },
  {
    slug: "getaway",
    title: "Getaway",
    category: "Application voyage",
    description:
      "Carnet de voyage mobile avec gestion photos offline, géolocalisation, et partage d'itinéraires entre voyageurs.",
    technologies: ["Flutter", "Firebase", "Cloud Functions"],
    color: "from-orange-500/10 to-amber-500/10",
  },
];

export default function Projects() {
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
      { threshold: 0.15 }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projets" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20 gap-6">
          <div>
            <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
              Portfolio
            </span>
            <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)]">
              Nos réalisations
            </h2>
          </div>
          <p className="text-text-secondary max-w-md">
            Des projets concrets, livrés en production, pour des clients qui nous font confiance.
          </p>
        </div>

        {/* Projects list */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projets/${project.slug}`}
            >
              <div
                ref={(el) => { refs.current[index] = el; }}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-bg-card transition-all duration-700 hover:border-accent/30 hover:shadow-xl hover:shadow-black/5 ${
                  visibleItems.has(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                  {/* Project info */}
                  <div className="flex-1">
                    <span className="text-sm text-accent font-medium mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="heading-editorial text-2xl md:text-3xl text-text-primary mb-3">
                      {project.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed max-w-lg">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 md:w-64">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1.5 rounded-full bg-bg-secondary text-text-muted border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-border group-hover:border-accent group-hover:bg-accent transition-all">
                    <svg
                      className="w-5 h-5 text-text-muted group-hover:text-white transition-colors"
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
