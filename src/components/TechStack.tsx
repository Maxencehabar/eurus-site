"use client";

const technologies = [
  "Flutter",
  "React",
  "Next.js",
  "Vue.js",
  "React Native",
  "Java Spring Boot",
  "Node.js",
  "Firebase",
  "Firestore",
  "PostgreSQL",
  "Stripe",
  "Vercel",
  "Docker",
  "Git",
];

export default function TechStack() {
  return (
    <section className="py-16 border-y border-border overflow-hidden">
      <div className="flex animate-[marquee_30s_linear_infinite]">
        {[...technologies, ...technologies].map((tech, index) => (
          <span
            key={index}
            className="flex-shrink-0 px-8 text-text-muted text-sm font-medium tracking-wide"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
