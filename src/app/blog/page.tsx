import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import ArticleCard from "@/components/blog/ArticleCard";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Blog — ${SITE_NAME}`,
  description:
    "Conseils, guides et retours d'expérience sur le développement mobile, web et la création d'applications sur mesure.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-4xl px-8 pt-32 pb-24 max-md:px-6 max-md:pt-24">
      <div className="mb-12">
        <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
          Blog
        </span>
        <h1 className="mb-4 text-4xl font-bold max-md:text-3xl">
          Articles &amp; Ressources
        </h1>
        <p className="text-lg text-text-secondary">
          Guides pratiques, retours d&apos;exp&eacute;rience et conseils pour
          r&eacute;ussir votre projet digital.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
