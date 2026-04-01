import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/content";
import { categoryMeta, utilityNav } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    ...Object.keys(categoryMeta).map((slug) => `/${slug}`),
    ...utilityNav.map((item) => item.href),
  ];

  return [
    ...staticPaths.map((path) => ({
      url: absoluteUrl(path),
      lastModified: new Date(),
    })),
    ...getAllArticles().map((article) => ({
      url: absoluteUrl(article.url),
      lastModified: new Date(article.updatedAt),
    })),
  ];
}
