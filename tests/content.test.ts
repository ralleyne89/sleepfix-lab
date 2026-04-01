import { describe, expect, it } from "vitest";
import {
  getAllArticles,
  getArticleStaticParams,
  getCategoryStaticParams,
  getHomepageEditorialContent,
} from "@/lib/content";
import { homepageEditorial } from "@/lib/site-config";

describe("content model", () => {
  it("loads and validates all seeded articles", () => {
    const articles = getAllArticles();

    expect(articles).toHaveLength(3);
    expect(new Set(articles.map((article) => article.url)).size).toBe(articles.length);

    for (const article of articles) {
      expect(article.faq.length).toBeGreaterThanOrEqual(2);
      expect(article.sources.length).toBeGreaterThanOrEqual(2);
      expect(article.featuredProductIds.length).toBeGreaterThan(0);
      expect(article.headings.length).toBeGreaterThanOrEqual(3);
      expect(article.internalLinks.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("exposes a valid homepage curation model with mixed cover-image support", () => {
    const { leadArticle, secondaryArticles, sections } = getHomepageEditorialContent();
    const articles = getAllArticles();

    expect(leadArticle.slug).toBe(homepageEditorial.leadArticleSlug);
    expect(secondaryArticles).toHaveLength(2);
    expect(sections).toHaveLength(homepageEditorial.homepageSectionOrder.length);
    expect(articles.some((article) => Boolean(article.coverImage))).toBe(true);
    expect(articles.some((article) => !article.coverImage)).toBe(true);
  });

  it("exposes the expected static params for categories and articles", () => {
    expect(getCategoryStaticParams()).toHaveLength(5);
    expect(getArticleStaticParams()).toHaveLength(3);
  });
});
