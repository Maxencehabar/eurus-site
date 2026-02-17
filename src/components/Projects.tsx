import Link from "next/link";
import { getProjectSummaries } from "@/data/projects";
import SectionHeader from "./SectionHeader";
import FadeIn from "./FadeIn";

const projects = getProjectSummaries();

export default function Projects() {
  return (
    <section id="projets" className="mx-auto max-w-[1200px] px-8 py-24 max-md:px-6 max-md:py-16">
      <FadeIn>
        <SectionHeader
          label="Portfolio"
          title="Nos réalisations"
          description="Des projets concrets, livrés en production, pour des clients satisfaits."
        />
      </FadeIn>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-6 max-md:grid-cols-1">
        {projects.map((p) => (
          <FadeIn key={p.number}>
            <Link
              href={`/projets/${p.slug}`}
              className="group block overflow-hidden rounded-2xl border border-border bg-bg-card transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(59,130,246,0.2)]"
            >
              <div className="flex items-start justify-between px-8 pt-8">
                <span className="bg-gradient-to-br from-accent to-[#8b5cf6] bg-clip-text text-5xl font-bold leading-none text-transparent opacity-30">
                  {p.number}
                </span>
                {p.stat && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(34,197,94,0.15)] bg-[rgba(34,197,94,0.1)] px-3 py-1 text-xs font-medium text-green-500">
                    {p.stat}
                  </span>
                )}
              </div>
              <div className="px-8 pt-4 pb-8">
                <h3 className="mb-2 text-xl font-bold">{p.title}</h3>
                <p className="mb-4 text-sm font-medium text-accent">
                  {p.subtitle}
                </p>
                <p className="mb-5 text-sm leading-relaxed text-text-secondary">
                  {p.description}
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[rgba(59,130,246,0.15)] bg-[rgba(59,130,246,0.1)] px-3 py-1 text-xs font-medium text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  Voir le projet &rarr;
                </span>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
