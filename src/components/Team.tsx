"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Asset } from "@/components/ui/Asset";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { team } from "@/data/team";
import { getAsset } from "@/data/assets";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/animations/motion-presets";

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const groupY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["-8%", "8%"],
  );

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

        <div className="relative mb-16 overflow-hidden rounded-2xl border border-border aspect-[21/9]">
          <motion.div
            style={{ y: groupY }}
            className="absolute inset-x-0 -top-[10%] -bottom-[10%]"
          >
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
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 transition-all duration-500">
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
                  <div className="flex gap-2">
                    {member.links.linkedin && (
                      <a
                        href={member.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/80 hover:text-white p-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
                        aria-label={`LinkedIn de ${member.name}`}
                      >
                        <SocialIcon type="linkedin" className="w-5 h-5" />
                      </a>
                    )}
                    {member.links.github && (
                      <a
                        href={member.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/80 hover:text-white p-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
                        aria-label={`GitHub de ${member.name}`}
                      >
                        <SocialIcon type="github" className="w-5 h-5" />
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
