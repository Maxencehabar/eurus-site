"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Asset } from "@/components/ui/Asset";
import { getAsset } from "@/data/assets";
import { getProjectSummaries } from "@/data/projects";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/animations/motion-presets";

const categories = [
  { id: "all", label: "Tous" },
  { id: "mobile", label: "Mobile" },
  { id: "web", label: "Web" },
  { id: "industrie", label: "Industrie / IA" },
] as const;

type CategoryId = (typeof categories)[number]["id"];

const projects = getProjectSummaries();

export default function Projects() {
  const [filter, setFilter] = useState<CategoryId>("all");
  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projets" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={fadeUp}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6"
        >
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
        </motion.div>

        <div role="tablist" aria-label="Filtrer les projets par catégorie" className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => {
            const active = filter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(cat.id)}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  active ? "text-white" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="category-pill"
                    className="absolute inset-0 bg-bg-dark rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-12 md:space-y-16"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => {
              const reversed = index % 2 === 1;
              return (
                <motion.div
                  key={project.slug}
                  layout
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_ONCE}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Link
                    href={`/projets/${project.slug}`}
                    className={`group grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
                      reversed ? "md:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-border bg-bg-secondary transition-all duration-500 group-hover:border-accent/40 group-hover:shadow-2xl group-hover:shadow-black/10">
                      <motion.div
                        whileHover={{ scale: 1.03, rotate: reversed ? -0.5 : 0.5 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                      >
                        <Asset
                          asset={getAsset(project.heroAssetId)}
                          className="w-full h-auto object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </motion.div>
                    </div>

                    <div>
                      <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium inline-block mb-4">
                        {project.subtitle}
                      </span>
                      <h3 className="heading-editorial text-3xl md:text-4xl text-text-primary mb-4 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-text-secondary leading-relaxed mb-6">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1.5 rounded-full bg-bg-secondary text-text-muted border border-border"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {project.stat && (
                        <p className="heading-editorial text-2xl text-accent mb-6">{project.stat}</p>
                      )}
                      <span className="inline-flex items-center gap-2 text-text-primary font-medium group-hover:gap-3 transition-all">
                        Voir le cas complet
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
