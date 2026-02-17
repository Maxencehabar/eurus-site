import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, getAllProjectSlugs } from "@/data/projects";
import { SITE_URL } from "@/lib/constants";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.metaTitle,
    description: project.metaDescription,
    alternates: { canonical: `/projets/${slug}` },
    openGraph: {
      title: project.metaTitle,
      description: project.metaDescription,
      url: `${SITE_URL}/projets/${slug}`,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <section className="mx-auto max-w-4xl px-8 pt-32 pb-24 max-md:px-6 max-md:pt-24">
      {/* Hero */}
      <div className="mb-16">
        <Link
          href="/#projets"
          className="mb-6 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
        >
          &larr; Retour aux projets
        </Link>
        <div className="mb-4 flex items-center gap-4">
          <span className="bg-gradient-to-br from-accent to-[#8b5cf6] bg-clip-text text-6xl font-bold leading-none text-transparent opacity-30">
            {project.number}
          </span>
          {project.stat && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(34,197,94,0.15)] bg-[rgba(34,197,94,0.1)] px-3 py-1 text-xs font-medium text-green-500">
              {project.stat}
            </span>
          )}
        </div>
        <h1 className="mb-3 text-4xl font-bold max-md:text-3xl">{project.title}</h1>
        <p className="mb-4 text-lg font-medium text-accent">{project.subtitle}</p>
        <p className="text-lg leading-relaxed text-text-secondary">
          {project.heroDescription}
        </p>
      </div>

      {/* Contexte */}
      <div className="mb-12 rounded-2xl border border-border bg-bg-card p-8">
        <h2 className="mb-4 text-2xl font-bold">Le contexte</h2>
        <p className="leading-relaxed text-text-secondary">{project.problem}</p>
      </div>

      {/* Solution */}
      <div className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">Notre solution</h2>
        <p className="mb-6 leading-relaxed text-text-secondary">
          {project.solution.approach}
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {project.solution.features.map((feature) => (
            <div
              key={feature}
              className="flex items-start gap-3 rounded-xl border border-border bg-bg-card p-4"
            >
              <span className="mt-0.5 text-accent">&#10003;</span>
              <span className="text-sm text-text-secondary">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Stack technique</h2>
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          {project.techStack.map((category) => (
            <div
              key={category.label}
              className="rounded-xl border border-border bg-bg-card p-6"
            >
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
                {category.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[rgba(59,130,246,0.15)] bg-[rgba(59,130,246,0.1)] px-3 py-1 text-xs font-medium text-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Résultats */}
      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">R&eacute;sultats</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {project.results.map((result) => (
            <div
              key={result.label}
              className="rounded-xl border border-border bg-bg-card p-6 text-center"
            >
              <p className="mb-1 text-2xl font-bold text-accent">{result.value}</p>
              <p className="text-xs text-text-secondary">{result.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-border bg-bg-card p-8 text-center">
        <h2 className="mb-3 text-2xl font-bold">
          Un projet similaire en t&ecirc;te&nbsp;?
        </h2>
        <p className="mb-6 text-text-secondary">
          Discutons de votre id&eacute;e et voyons comment la concr&eacute;tiser.
        </p>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3 font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Nous contacter
        </Link>
      </div>
    </section>
  );
}
