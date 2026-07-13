"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Asset } from "@/components/ui/Asset";
import { getAsset } from "@/data/assets";
import { GalleryScroll } from "@/components/projects/GalleryScroll";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { fadeUp, VIEWPORT_ONCE } from "@/lib/animations/motion-presets";
import type { ProjectDetail } from "@/data/projects";

interface ProjectDetailBodyProps {
  project: ProjectDetail;
}

export function ProjectDetailBody({ project }: ProjectDetailBodyProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Link
            href="/#projets"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour aux projets
          </Link>
          <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
            {project.subtitle}
          </span>
          <h1 className="heading-editorial text-[clamp(2.5rem,7vw,5rem)] mb-6 max-w-[900px]">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-[700px] leading-relaxed mb-12">
            {project.heroDescription}
          </p>
          <div className="rounded-2xl overflow-hidden border border-border bg-bg-secondary">
            <Asset
              asset={getAsset(project.heroAssetId)}
              className="w-full h-auto object-cover"
              sizes="(max-width: 1400px) 100vw, 1400px"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-8 pb-12 max-md:px-6">
        {/* Contexte */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={fadeUp}
          className="mb-12 rounded-2xl border border-border bg-bg-card p-8"
        >
          <h2 className="mb-4 text-2xl font-bold">Le contexte</h2>
          <p className="leading-relaxed text-text-secondary">{project.problem}</p>
        </motion.div>

        {/* Solution */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={fadeUp}
          className="mb-12"
        >
          <h2 className="mb-4 text-2xl font-bold">Notre solution</h2>
          <p className="mb-6 leading-relaxed text-text-secondary">
            {project.solution.approach}
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {project.solution.features.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 rounded-xl border border-border bg-bg-card p-4"
              >
                <span className="mt-0.5 text-accent">&#10003;</span>
                <span className="text-sm text-text-secondary">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <GalleryScroll assetIds={project.galleryAssetIds} />
      </section>

      <section className="mx-auto max-w-4xl px-8 pb-12 max-md:px-6">
        {/* Tech Stack */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={fadeUp}
          className="mb-12"
        >
          <h2 className="mb-6 text-2xl font-bold">Stack technique</h2>
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            {project.techStack.map((category) => (
              <div
                key={category.label}
                className="rounded-xl border border-border bg-bg-card p-6"
              >
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
                  {category.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[rgba(59,130,246,0.15)] bg-[rgba(59,130,246,0.1)] px-3 py-1 text-xs font-medium text-accent"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Résultats */}
      <section className="py-24 bg-bg-secondary">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={fadeUp}
          >
            <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
              Résultats
            </span>
            <h2 className="heading-editorial text-[clamp(2rem,5vw,3rem)] mb-12 max-w-[700px]">
              Des chiffres qui parlent
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {project.results.map((result, index) => {
              const numericMatch = result.value.match(/^(-?[\d.]+)(.*)$/);
              const numeric = numericMatch ? parseFloat(numericMatch[1]) : null;
              const suffix = numericMatch ? numericMatch[2] : "";
              const decimals = suffix.includes("/") || (numeric !== null && !Number.isInteger(numeric)) ? 1 : 0;

              return (
                <motion.div
                  key={result.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="heading-editorial text-4xl md:text-5xl text-accent mb-2">
                    {numeric !== null && !Number.isNaN(numeric) ? (
                      <AnimatedCounter value={numeric} suffix={suffix} decimals={decimals} />
                    ) : (
                      result.value
                    )}
                  </div>
                  <div className="text-sm text-text-muted">{result.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-8 pb-24 pt-12 max-md:px-6">
        <div className="rounded-2xl border border-border bg-bg-card p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold">
            Un projet similaire en t&ecirc;te&nbsp;?
          </h2>
          <p className="mb-6 text-text-secondary">
            Discutons de votre id&eacute;e et voyons comment la concr&eacute;tiser.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3 font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  );
}
