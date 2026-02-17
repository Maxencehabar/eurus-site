import Link from "next/link";
import type { BlogPostSummary } from "@/lib/blog";

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function ArticleCard({ post }: { post: BlogPostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-bg-card transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(59,130,246,0.2)]"
    >
      <div className="p-8">
        <div className="mb-4 flex items-center gap-3 text-xs text-text-muted">
          <time dateTime={post.frontmatter.date}>
            {formatDate(post.frontmatter.date)}
          </time>
          <span>&middot;</span>
          <span>{post.readingTime} de lecture</span>
        </div>
        <h2 className="mb-3 text-xl font-bold transition-colors group-hover:text-accent">
          {post.frontmatter.title}
        </h2>
        <p className="mb-5 text-sm leading-relaxed text-text-secondary">
          {post.frontmatter.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {post.frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[rgba(59,130,246,0.15)] bg-[rgba(59,130,246,0.1)] px-3 py-1 text-xs font-medium text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
