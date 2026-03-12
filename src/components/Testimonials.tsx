"use client";

import { useEffect, useRef, useState } from "react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Eurus a transformé notre idée en une application mobile performante. Communication fluide, livraison dans les temps, qualité irréprochable.",
    name: "Sophie Martin",
    role: "CEO",
    company: "TravelApp",
  },
  {
    quote:
      "Une équipe réactive et à l'écoute. Notre plateforme SaaS a été livrée avec une qualité technique qui a dépassé nos attentes.",
    name: "Thomas Durand",
    role: "CTO",
    company: "EduConnect",
  },
  {
    quote:
      "Grâce à Eurus, notre back-office est devenu un vrai outil de pilotage. L'interface est intuitive et les performances sont au rendez-vous.",
    name: "Claire Petit",
    role: "Directrice des opérations",
    company: "LogiPro",
  },
];

export default function Testimonials() {
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
      className="bg-bg-dark text-white py-24 md:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Section header */}
        <div
          className={`mb-16 md:mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
            Témoignages
          </span>
          <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)] text-white">
            Ce que disent nos clients
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150 + 200}ms` }}
            >
              {/* Quote mark */}
              <svg
                className="w-10 h-10 text-accent/40 mb-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>

              {/* Quote */}
              <blockquote className="text-lg leading-relaxed text-gray-300 mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-orange-400 flex items-center justify-center text-white font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
