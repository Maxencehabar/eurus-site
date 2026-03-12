"use client";

import { useEffect, useRef, useState } from "react";

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
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Section header */}
        <div
          className={`text-center mb-16 md:mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
            Notre process
          </span>
          <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)] max-w-[600px] mx-auto">
            Comment ça marche
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150 + 200}ms` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-px bg-border" />
              )}

              {/* Step content */}
              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <span className="heading-editorial text-4xl text-accent/30">
                    {step.number}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-medium">
                    {step.duration}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
