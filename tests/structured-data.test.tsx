import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ArticlePage, {
  generateMetadata as generateArticleMetadata,
} from "@/app/[category]/[slug]/page";

const articleParams = {
  category: "snoring",
  slug: "best-mouthguards-for-snoring-2025",
} as const;

describe("article SEO output", () => {
  it("renders JSON-LD blocks for article, faq, and breadcrumbs", async () => {
    const markup = renderToStaticMarkup(
      await ArticlePage({ params: Promise.resolve(articleParams) }),
    );

    expect(markup).toContain("application/ld+json");
    expect(markup).toContain("\"@type\":\"Article\"");
    expect(markup).toContain("\"@type\":\"FAQPage\"");
    expect(markup).toContain("\"@type\":\"BreadcrumbList\"");
  });

  it("builds canonical metadata for the article route", async () => {
    const metadata = await generateArticleMetadata({
      params: Promise.resolve(articleParams),
    });

    expect(metadata.alternates?.canonical).toBe("/snoring/best-mouthguards-for-snoring-2025");
    expect(metadata.openGraph?.title).toBe("Best Mouthguards for Snoring in 2025");
  });
});
