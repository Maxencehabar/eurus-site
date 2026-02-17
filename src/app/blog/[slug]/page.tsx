import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog";
import MdxContent from "@/components/blog/MdxContent";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.frontmatter.title} — ${SITE_NAME}`,
    description: post.frontmatter.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: `${SITE_URL}/blog/${slug}`,
      type: "article",
      publishedTime: post.frontmatter.date,
    },
  };
}

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    author: { "@type": "Person", name: post.frontmatter.author },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    url: `${SITE_URL}/blog/${slug}`,
  };

  return (
    <section className="mx-auto max-w-3xl px-8 pt-32 pb-24 max-md:px-6 max-md:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
      >
        &larr; Retour au blog
      </Link>

      <header className="mb-12">
        <div className="mb-4 flex items-center gap-3 text-sm text-text-muted">
          <time dateTime={post.frontmatter.date}>
            {formatDate(post.frontmatter.date)}
          </time>
          <span>&middot;</span>
          <span>{post.readingTime} de lecture</span>
        </div>
        <h1 className="mb-4 text-4xl font-bold leading-tight max-md:text-3xl">
          {post.frontmatter.title}
        </h1>
        <p className="text-lg text-text-secondary">
          {post.frontmatter.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[rgba(59,130,246,0.15)] bg-[rgba(59,130,246,0.1)] px-3 py-1 text-xs font-medium text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <MdxContent source={post.content} />

      {/* CTA */}
      <div className="mt-16 rounded-2xl border border-border bg-bg-card p-8 text-center">
        <h2 className="mb-3 text-2xl font-bold">
          Besoin d&apos;accompagnement&nbsp;?
        </h2>
        <p className="mb-6 text-text-secondary">
          Discutons de votre projet et voyons comment Eurus peut vous aider.
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
