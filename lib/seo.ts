import type { Metadata } from "next";
import type { ArticleDocument } from "@/lib/content";
import { categoryMeta, siteConfig } from "@/lib/site-config";
import { absoluteUrl, truncate } from "@/lib/utils";

interface MetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogTitle?: string;
}

export function buildOgImage(title: string, eyebrow?: string) {
  const search = new URLSearchParams({
    title,
  });

  if (eyebrow) {
    search.set("eyebrow", eyebrow);
  }

  return absoluteUrl(`/og?${search.toString()}`);
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
  ogTitle,
}: MetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const image = buildOgImage(ogTitle ?? title);

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    keywords,
    openGraph: {
      title: ogTitle ?? title,
      description,
      url,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: ogTitle ?? title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description,
      images: [image],
    },
  };
}

export function buildCategoryMetadata(category: keyof typeof categoryMeta) {
  const meta = categoryMeta[category];
  return buildPageMetadata({
    title: meta.title,
    description: meta.description,
    path: `/${meta.slug}`,
    keywords: [meta.slug, meta.title, "sleep product research"],
    ogTitle: `${meta.title} | ${siteConfig.name}`,
  });
}

export function buildArticleMetadata(article: ArticleDocument): Metadata {
  const description = truncate(article.excerpt, 160);
  const image =
    article.ogImage ??
    (article.coverImage ? absoluteUrl(article.coverImage) : buildOgImage(article.title, article.hero.eyebrow));

  return {
    title: article.title,
    description,
    alternates: {
      canonical: article.url,
    },
    keywords: [article.primaryKeyword, ...article.secondaryKeywords],
    openGraph: {
      title: article.title,
      description,
      url: absoluteUrl(article.url),
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [image],
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildArticleJsonLd(article: ArticleDocument) {
  const image =
    article.ogImage ??
    (article.coverImage ? absoluteUrl(article.coverImage) : buildOgImage(article.title, article.hero.eyebrow));

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: [image],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    mainEntityOfPage: absoluteUrl(article.url),
    articleSection: categoryMeta[article.category].title,
    wordCount: article.wordCount,
    keywords: [article.primaryKeyword, ...article.secondaryKeywords].join(", "),
  };
}

export function buildFaqJsonLd(article: ArticleDocument) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
