import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ArticlePage from "@/app/[category]/[slug]/page";
import CategoryPage, { generateStaticParams as generateCategoryParams } from "@/app/[category]/page";
import HomePage from "@/app/page";
import { getArticleStaticParams } from "@/lib/content";
import { categoryMeta } from "@/lib/site-config";

describe("public routes", () => {
  it("renders the home page hero and featured reading section", () => {
    const markup = renderToStaticMarkup(<HomePage />);

    expect(markup).toContain("Sleep guidance with the pacing of a good magazine");
    expect(markup).toContain("Featured reading");
  });

  it("renders all category pages from static params", async () => {
    for (const param of generateCategoryParams()) {
      const markup = renderToStaticMarkup(
        await CategoryPage({ params: Promise.resolve(param) }),
      );

      expect(markup).toContain(categoryMeta[param.category].title);
    }
  });

  it("renders all seeded article routes", async () => {
    for (const param of getArticleStaticParams()) {
      const markup = renderToStaticMarkup(
        await ArticlePage({ params: Promise.resolve(param) }),
      );

      expect(markup).toContain("Frequently asked questions");
      expect(markup).toContain("Related pages inside the same editorial system.");
    }
  });
});
