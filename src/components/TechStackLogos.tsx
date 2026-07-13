"use client";

import Image from "next/image";

const technologies = [
  { name: "Flutter", file: "flutter.svg" },
  { name: "React", file: "react.svg" },
  { name: "Next.js", file: "nextjs.svg" },
  { name: "Vue.js", file: "vuejs.svg" },
  { name: "TypeScript", file: "typescript.svg" },
  { name: "Spring Boot", file: "spring.svg" },
  { name: "Node.js", file: "nodejs.svg" },
  { name: "Firebase", file: "firebase.svg" },
  { name: "PostgreSQL", file: "postgresql.svg" },
  { name: "Stripe", file: "stripe.svg" },
  { name: "Vercel", file: "vercel.svg" },
  { name: "Docker", file: "docker.svg" },
];

export default function TechStackLogos() {
  const doubled = [...technologies, ...technologies];
  return (
    <section className="py-16 border-y border-border overflow-hidden bg-bg-primary" aria-label="Technologies utilisées">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" aria-hidden="true" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" aria-hidden="true" />
        <div className="flex animate-[marquee_40s_linear_infinite]">
          {doubled.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex-shrink-0 px-8 md:px-12 flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
            >
              <Image
                src={`/logos/tech/${tech.file}`}
                alt=""
                width={32}
                height={32}
                className="w-8 h-8"
                aria-hidden="true"
              />
              <span className="text-text-muted text-sm font-medium tracking-wide">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
