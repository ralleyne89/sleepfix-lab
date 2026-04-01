import "server-only";

import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";
import { affiliateProducts } from "@/data/affiliate-products";
import {
  ARTICLE_CATEGORIES,
  type AffiliateProduct,
  type ArticleCategory,
  type ArticleFrontmatter,
  type TocHeading,
  homepageEditorial,
  categoryMeta,
  isArticleCategory,
} from "@/lib/site-config";
import { absoluteUrl, slugify } from "@/lib/utils";

const articlesDirectory = path.join(process.cwd(), "content", "articles");

const isoDateSchema = z
  .union([z.string(), z.date()])
  .transform((value) => {
    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) {
      throw new Error(`Invalid date value: ${String(value)}`);
    }

    return date.toISOString().slice(0, 10);
  });

const articleFrontmatterSchema = z.object({
  title: z.string().min(12),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  category: z.enum(ARTICLE_CATEGORIES),
  excerpt: z.string().min(80),
  primaryKeyword: z.string().min(4),
  secondaryKeywords: z.array(z.string().min(3)).min(3),
  author: z.string().min(3),
  publishedAt: isoDateSchema,
  updatedAt: isoDateSchema,
  featuredProductIds: z.array(z.string().min(3)).min(1),
  faq: z
    .array(
      z.object({
        question: z.string().min(8),
        answer: z.string().min(20),
      }),
    )
    .min(2),
  sources: z
    .array(
      z.object({
        title: z.string().min(6),
        url: z.string().url(),
        publisher: z.string().min(2),
      }),
    )
    .min(2),
  hero: z.object({
    eyebrow: z.string().min(4),
    accent: z.string().min(4),
    mood: z.string().min(4),
  }),
  coverImage: z.string().min(2).optional(),
  coverAlt: z.string().min(4).optional(),
  ogImage: z.string().optional(),
});

export interface ArticleDocument extends ArticleFrontmatter {
  content: string;
  url: string;
  headings: TocHeading[];
  wordCount: number;
  readingMinutes: number;
  internalLinks: string[];
}

function readDirectoryRecursively(directory: string): string[] {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return readDirectoryRecursively(fullPath);
    }

    return fullPath.endsWith(".mdx") ? [fullPath] : [];
  });
}

function extractHeadings(source: string): TocHeading[] {
  return source
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("##"))
    .map((line) => {
      const level = line.startsWith("###") ? 3 : 2;
      const text = line.replace(/^###?\s+/, "").trim();
      return {
        id: slugify(text),
        level,
        text,
      } satisfies TocHeading;
    })
    .filter((heading) => heading.text.length > 0);
}

function extractInternalLinks(source: string) {
  const matches = [...source.matchAll(/\[[^\]]+\]\((\/[^)]+)\)/g)];
  return [...new Set(matches.map((match) => match[1]))];
}

function readArticleFile(filePath: string): ArticleDocument {
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const frontmatter = articleFrontmatterSchema.parse(data) satisfies ArticleFrontmatter;
  const cleanContent = content.trim();
  const internalLinks = extractInternalLinks(cleanContent);

  for (const productId of frontmatter.featuredProductIds) {
    if (!affiliateProducts.find((product) => product.id === productId)) {
      throw new Error(
        `Article ${frontmatter.slug} references unknown product "${productId}".`,
      );
    }
  }

  return {
    ...frontmatter,
    content: cleanContent,
    url: `/${frontmatter.category}/${frontmatter.slug}`,
    headings: extractHeadings(cleanContent),
    wordCount: cleanContent.split(/\s+/).filter(Boolean).length,
    readingMinutes: Math.max(1, Math.ceil(readingTime(cleanContent).minutes)),
    internalLinks,
  };
}

const loadArticles = cache(() => {
  const files = readDirectoryRecursively(articlesDirectory);
  const articles = files.map(readArticleFile);
  const seen = new Set<string>();

  for (const article of articles) {
    if (seen.has(article.url)) {
      throw new Error(`Duplicate article route detected: ${article.url}`);
    }
    seen.add(article.url);
  }

  return articles.sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
  );
});

export function getAllArticles() {
  return loadArticles();
}

export function getArticleBySlug(category: string, slug: string) {
  if (!isArticleCategory(category)) {
    return null;
  }

  return loadArticles().find(
    (article) => article.category === category && article.slug === slug,
  ) ?? null;
}

export function getArticlesByCategory(category: ArticleCategory) {
  return loadArticles().filter((article) => article.category === category);
}

export function getFeaturedProducts(productIds: string[]): AffiliateProduct[] {
  return productIds
    .map((id) => affiliateProducts.find((product) => product.id === id))
    .filter((product): product is AffiliateProduct => Boolean(product));
}

function getArticleByStandaloneSlug(slug: string) {
  return loadArticles().find((article) => article.slug === slug) ?? null;
}

export function getRelatedArticles(article: ArticleDocument, limit = 3) {
  const siblings = loadArticles().filter(
    (candidate) => candidate.url !== article.url && candidate.category === article.category,
  );
  const alternates = loadArticles().filter(
    (candidate) => candidate.url !== article.url && candidate.category !== article.category,
  );

  return [...siblings, ...alternates].slice(0, limit);
}

export function getCategoryStaticParams() {
  return ARTICLE_CATEGORIES.map((category) => ({ category }));
}

export function getArticleStaticParams() {
  return loadArticles().map((article) => ({
    category: article.category,
    slug: article.slug,
  }));
}

export function getHomepageEditorialContent() {
  const leadArticle = getArticleByStandaloneSlug(homepageEditorial.leadArticleSlug);

  if (!leadArticle) {
    throw new Error(
      `Homepage lead article "${homepageEditorial.leadArticleSlug}" was not found.`,
    );
  }

  const seenSecondarySlugs = new Set<string>();
  const secondaryArticles = homepageEditorial.secondaryArticleSlugs.map((slug) => {
    if (seenSecondarySlugs.has(slug)) {
      throw new Error(`Duplicate homepage secondary slug "${slug}" found.`);
    }

    seenSecondarySlugs.add(slug);

    const article = getArticleByStandaloneSlug(slug);

    if (!article) {
      throw new Error(`Homepage secondary article "${slug}" was not found.`);
    }

    if (article.slug === leadArticle.slug) {
      throw new Error(`Homepage article "${slug}" cannot be both lead and secondary.`);
    }

    return article;
  });

  const curatedUrls = new Set([
    leadArticle.url,
    ...secondaryArticles.map((article) => article.url),
  ]);

  const sections = homepageEditorial.homepageSectionOrder.map((category) => {
    const articles = getArticlesByCategory(category);
    const lead = articles.find((article) => !curatedUrls.has(article.url)) ?? articles[0] ?? null;
    const supporting = articles
      .filter((article) => article.url !== lead?.url)
      .slice(0, 2);

    return {
      category: categoryMeta[category],
      articleCount: articles.length,
      leadArticle: lead,
      supportingArticles: supporting,
    };
  });

  return {
    leadArticle,
    secondaryArticles,
    sections,
  };
}

export function getAllPublicPaths() {
  return loadArticles().map((article) => absoluteUrl(article.url));
}
