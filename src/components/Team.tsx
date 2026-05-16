"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Asset } from "@/components/ui/Asset";
import { team } from "@/data/team";
import { getAsset } from "@/data/assets";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/animations/motion-presets";

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const groupY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={sectionRef}
      id="equipe"
      className="py-24 md:py-32 bg-bg-primary"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={fadeUp}
          className="mb-12 md:mb-16"
        >
          <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
            L&apos;équipe
          </span>
          <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)] max-w-[700px]">
            Trois développeurs, <em className="not-italic text-accent">une seule</em> exigence
          </h2>
        </motion.div>

        <div className="relative mb-16 overflow-hidden rounded-2xl border border-border">
          <motion.div style={{ y: groupY }} className="relative aspect-[21/9]">
            <Asset
              asset={getAsset("team-group")}
              className="absolute inset-0 w-full h-full object-cover"
              sizes="(max-width: 1400px) 100vw, 1400px"
            />
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 md:gap-8"
        >
          {team.map((member) => (
            <motion.article
              key={member.slug}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl bg-bg-card border border-border hover:border-accent/30 transition-colors"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Asset
                  asset={getAsset(member.portraitAssetId)}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {member.expertise.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="text-[0.65rem] px-2 py-0.5 rounded-full bg-white/15 text-white backdrop-blur-sm border border-white/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {member.links.linkedin && (
                      <a
                        href={member.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/80 hover:text-white transition-colors"
                        aria-label={`LinkedIn de ${member.name}`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43A2.07 2.07 0 1 1 5.34 3.3a2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                        </svg>
                      </a>
                    )}
                    {member.links.github && (
                      <a
                        href={member.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/80 hover:text-white transition-colors"
                        aria-label={`GitHub de ${member.name}`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.3v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="heading-editorial text-2xl text-text-primary mb-1">{member.name}</h3>
                <p className="text-sm text-accent font-medium mb-3">{member.role}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{member.bio}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
