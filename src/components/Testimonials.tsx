"use client";

import { motion } from "motion/react";
import { Asset } from "@/components/ui/Asset";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { getAsset } from "@/data/assets";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/animations/motion-presets";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  linkedinUrl?: string;
  photoAssetId?: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Maxence a su transformer notre vision en une vraie plateforme. Il comprend les enjeux produit, pas juste le code. Youdy n'existerait pas sans lui.",
    name: "Élodie",
    role: "Co-fondatrice",
    company: "Youdy",
    photoAssetId: "testimonial-elodie",
  },
  {
    quote:
      "Un vrai partenaire technique. L'app Getaway est fluide, rapide, et nos utilisateurs adorent. Le choix de Flutter était le bon.",
    name: "Fily",
    role: "Fondateur",
    company: "Getaway",
    photoAssetId: "testimonial-fily",
  },
];

export default function Testimonials() {
  return (
    <section className="relative bg-bg-dark text-white py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(232,93,4,0.12),transparent_60%)] pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={fadeUp}
          className="mb-16 md:mb-20"
        >
          <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
            Témoignages
          </span>
          <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)] text-white">
            Ce que disent nos clients
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8 max-w-4xl"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.name} variants={fadeUp}>
              <svg
                className="w-10 h-10 text-accent/40 mb-6"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>

              <blockquote className="text-lg leading-relaxed text-gray-200 mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                {testimonial.photoAssetId ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Asset
                      asset={getAsset(testimonial.photoAssetId)}
                      className="w-full h-full object-cover"
                      sizes="48px"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-orange-400 flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
                {testimonial.linkedinUrl && (
                  <a
                    href={testimonial.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-gray-400 hover:text-white p-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
                    aria-label={`Profil LinkedIn de ${testimonial.name}`}
                  >
                    <SocialIcon type="linkedin" className="w-5 h-5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
