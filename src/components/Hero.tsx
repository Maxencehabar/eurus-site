"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { RevealText } from "@/components/ui/RevealText";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { gsap, useGSAP } from "@/lib/animations/useGsapScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/animations/usePrefersReducedMotion";

const ROTATING_WORDS = ["applications", "outils IA", "dashboards", "apps mobiles"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const rotatingRef = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const orbOneY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const orbTwoY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useGSAP(
    () => {
      if (!rotatingRef.current || reduced) return;
      const tl = gsap.timeline({ repeat: -1, delay: 1.6 });
      ROTATING_WORDS.forEach((word, index) => {
        const next = ROTATING_WORDS[(index + 1) % ROTATING_WORDS.length];
        tl.to(rotatingRef.current, {
          yPercent: -110,
          duration: 0.5,
          ease: "expo.in",
        })
          .set(rotatingRef.current, { textContent: next, yPercent: 110 })
          .to(rotatingRef.current, {
            yPercent: 0,
            duration: 0.5,
            ease: "expo.out",
          })
          .to({}, { duration: 2.4 });
      });
      return () => {
        tl.kill();
      };
    },
    { dependencies: [reduced] },
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen overflow-hidden bg-bg-primary"
    >
      <motion.div
        aria-hidden
        style={{ y: orbOneY }}
        className="absolute top-20 right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent/8 to-transparent blur-3xl pointer-events-none"
      />
      <motion.div
        aria-hidden
        style={{ y: orbTwoY }}
        className="absolute bottom-20 left-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-orange-200/25 to-transparent blur-3xl pointer-events-none"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 pt-32 md:pt-40 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 text-sm text-text-secondary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            2 créneaux disponibles ce mois
          </span>
        </motion.div>

        <h1 className="heading-editorial text-[clamp(2.75rem,8vw,6rem)] max-w-[1000px] mb-8">
          <RevealText className="block">Nous créons des</RevealText>
          <span className="block" style={{ overflow: "hidden" }}>
            <span
              ref={rotatingRef}
              className="text-accent inline-block"
              style={{ willChange: "transform" }}
            >
              {ROTATING_WORDS[0]}
            </span>
          </span>
          <RevealText className="block" delay={0.2}>
            qui <em className="not-italic text-accent">marquent</em>
          </RevealText>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-text-secondary max-w-[600px] mb-12 leading-relaxed"
        >
          Eurus accompagne startups, PME et industriels dans la conception
          d&apos;applications mobiles, web et d&apos;outils IA sur mesure. De l&apos;idée à la production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-4 mb-20"
        >
          <MagneticButton
            href="#contact"
            className="group inline-flex items-center gap-3 bg-bg-dark text-white px-8 py-4 rounded-full text-[0.95rem] font-medium transition-shadow hover:shadow-xl hover:shadow-black/10"
          >
            Discutons de votre projet
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </MagneticButton>
          <MagneticButton
            href="#projets"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[0.95rem] font-medium border border-border-strong text-text-primary transition-colors hover:bg-bg-secondary hover:border-text-muted"
          >
            Voir nos réalisations
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-12 border-t border-border"
        >
          {[
            { value: 12, suffix: "+", label: "Projets livrés" },
            { value: 5, suffix: " ans", label: "D'expérience" },
            { value: 4.8, decimals: 1, suffix: "/5", label: "Satisfaction client" },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="heading-editorial text-3xl md:text-4xl text-text-primary mb-1">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals ?? 0}
                />
              </div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
    </section>
  );
}
