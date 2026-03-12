"use client";

import { useEffect, useRef, useState } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="apropos"
      className="py-24 md:py-32 bg-bg-secondary"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left column - Text */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
              À propos
            </span>
            <h2 className="heading-editorial text-[clamp(2rem,5vw,3rem)] mb-6">
              Une agence qui comprend les enjeux des créateurs de produits
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Eurus est née d&apos;une conviction : le développement d&apos;applications 
                ne devrait pas être un parcours du combattant. Trop de projets 
                échouent par manque de communication, de compréhension métier, 
                ou simplement de rigueur technique.
              </p>
              <p>
                Notre approche est différente. Nous prenons le temps de comprendre 
                votre vision avant d&apos;écrire la première ligne de code. Nous 
                privilégions les solutions pragmatiques aux usines à gaz. Et nous 
                restons à vos côtés bien après la mise en production.
              </p>
              <p className="text-text-primary font-medium">
                Basés en France, nous accompagnons startups et PME depuis 2021.
              </p>
            </div>
          </div>

          {/* Right column - Values */}
          <div
            className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {[
              {
                icon: "💬",
                title: "Communication",
                desc: "Transparence totale sur l'avancement et les décisions",
              },
              {
                icon: "⚡",
                title: "Efficacité",
                desc: "MVP en 6 semaines, itérations rapides",
              },
              {
                icon: "🎯",
                title: "Pragmatisme",
                desc: "Les bonnes solutions, pas les plus complexes",
              },
              {
                icon: "🤝",
                title: "Engagement",
                desc: "Votre succès est notre priorité",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="bg-bg-card border border-border rounded-xl p-6 hover:border-accent/30 transition-colors"
              >
                <span className="text-2xl mb-3 block">{value.icon}</span>
                <h3 className="font-semibold text-text-primary mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
