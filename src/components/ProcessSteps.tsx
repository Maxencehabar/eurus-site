"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/animations/motion-presets";

const steps = [
  {
    number: "01",
    title: "Appel découverte",
    description:
      "30 minutes pour comprendre votre besoin, vos objectifs et vos contraintes. Gratuit et sans engagement.",
    duration: "30 min",
  },
  {
    number: "02",
    title: "Proposition technique",
    description:
      "Nous vous envoyons un plan détaillé : architecture, technologies, planning et devis transparent.",
    duration: "48h",
  },
  {
    number: "03",
    title: "Développement",
    description:
      "Sprints courts avec démos régulières. Vous suivez l'avancement en temps réel jusqu'à la mise en production.",
    duration: "6-12 sem.",
  },
];

export default function ProcessSteps() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.6"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={fadeUp}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
            Notre process
          </span>
          <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)] max-w-[600px] mx-auto">
            Comment ça marche
          </h2>
        </motion.div>

        <div className="relative">
          <svg
            className="hidden md:block absolute top-8 left-[16.67%] w-[66.66%] h-2 pointer-events-none"
            viewBox="0 0 800 4"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line x1="0" y1="2" x2="800" y2="2" stroke="var(--color-border)" strokeWidth="2" />
            <motion.line
              x1="0"
              y1="2"
              x2="800"
              y2="2"
              stroke="var(--color-accent)"
              strokeWidth="2"
              style={{ pathLength }}
            />
          </svg>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 md:gap-12"
          >
            {steps.map((step) => (
              <motion.div key={step.number} variants={fadeUp} className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <span className="heading-editorial text-4xl text-accent/30 bg-bg-primary relative z-10 pr-2">
                    {step.number}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-medium">
                    {step.duration}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">{step.title}</h3>
                <p className="text-text-secondary leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
