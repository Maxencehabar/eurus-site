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
      authors: [post.frontmatter.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
    },
  };
}

// Extract FAQ from content (questions starting with ### in FAQ section)
function extractFAQ(content: string): { question: string; answer: string }[] {
  const faqSection = content.split(/^## FAQ/im)[1];
  if (!faqSection) return [];

  const faqs: { question: string; answer: string }[] = [];
  const lines = faqSection.split("\n");
  let currentQuestion = "";
  let currentAnswer = "";

  for (const line of lines) {
    if (line.startsWith("### ")) {
      if (currentQuestion && currentAnswer) {
        faqs.push({
          question: currentQuestion,
          answer: currentAnswer.trim(),
        });
      }
      currentQuestion = line.replace("### ", "").trim();
      currentAnswer = "";
    } else if (line.startsWith("## ")) {
      // New H2 section, stop parsing FAQ
      break;
    } else if (currentQuestion) {
      currentAnswer += line + " ";
    }
  }

  // Push last FAQ item
  if (currentQuestion && currentAnswer) {
    faqs.push({
      question: currentQuestion,
      answer: currentAnswer.trim(),
    });
  }

  return faqs;
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

  const faqs = extractFAQ(post.content);

  // JSON-LD Article Schema (enhanced)
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}`,
    },
    url: `${SITE_URL}/blog/${slug}`,
    keywords: post.frontmatter.tags.join(", "),
    articleSection: "Blog",
    inLanguage: "fr-FR",
  };

  // JSON-LD FAQ Schema (if FAQs exist)
  const faqJsonLd = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  // BreadcrumbList Schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.frontmatter.title,
        item: `${SITE_URL}/blog/${slug}`,
      },
    ],
  };

  return (
    <section className="mx-auto max-w-3xl px-8 pt-32 pb-24 max-md:px-6 max-md:pt-24">
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      
      {/* FAQ Schema */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb navigation */}
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-text-muted">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-accent transition-colors">
              Accueil
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/blog" className="hover:text-accent transition-colors">
              Blog
            </Link>
          </li>
          <li>/</li>
          <li className="text-text-secondary truncate max-w-[200px]">
            {post.frontmatter.title}
          </li>
        </ol>
      </nav>

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
