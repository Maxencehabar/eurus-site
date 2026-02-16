import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";

const techs = [
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
    <div className="border-y border-border bg-bg-secondary px-8 py-16">
      <FadeIn className="mx-auto max-w-[1200px] text-center">
        <SectionHeader
          label="Technologies"
          title="Notre stack technique"
          center
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {techs.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-bg-card px-5 py-2.5 text-sm font-medium text-text-secondary transition-all hover:border-accent hover:bg-accent-glow hover:text-text-primary"
            >
              {tech}
            </span>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
