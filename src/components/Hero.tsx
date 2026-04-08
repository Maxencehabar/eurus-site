"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-bg-primary"
    >
      {/* Subtle gradient orb */}
      <div className="absolute top-20 right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-orange-200/20 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 pt-32 md:pt-40 pb-20">
        {/* Availability badge */}
        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-2 text-sm text-text-secondary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            2 créneaux disponibles ce mois
          </span>
        </div>

        {/* Main heading */}
        <h1
          className={`heading-editorial text-[clamp(2.75rem,8vw,6rem)] max-w-[900px] mb-8 transition-all duration-1000 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Nous créons des{" "}
          <span className="accent-underline">applications</span> qui{" "}
          <em className="not-italic text-accent">marquent</em>
        </h1>

        {/* Subheading */}
        <p
          className={`text-lg md:text-xl text-text-secondary max-w-[600px] mb-12 leading-relaxed transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Eurus accompagne startups, PME et industriels dans la conception
          d&apos;applications mobiles, web et d&apos;outils IA sur mesure. De l&apos;idée à la production.
        </p>

        {/* CTA buttons */}
        <div
          className={`flex flex-wrap gap-4 mb-20 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 bg-bg-dark text-white px-8 py-4 rounded-full text-[0.95rem] font-medium transition-all hover:gap-4 hover:shadow-xl hover:shadow-black/10"
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
          </a>
          <a
            href="#projets"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[0.95rem] font-medium border border-border-strong text-text-primary transition-all hover:bg-bg-secondary hover:border-text-muted"
          >
            Voir nos réalisations
          </a>
        </div>

        {/* Stats row */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-12 border-t border-border transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {[
            { value: "5+", label: "Projets livrés" },
            { value: "3", label: "Années d'expertise" },
            { value: "700+", label: "Utilisateurs actifs" },
            { value: "100%", label: "Clients satisfaits" },
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="heading-editorial text-3xl md:text-4xl text-text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
    </section>
  );
}
