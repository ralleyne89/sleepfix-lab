import Link from "next/link";
import type { ArticleDocument } from "@/lib/content";
import { categoryMeta } from "@/lib/site-config";
import { formatDate } from "@/lib/utils";

interface ArticleCardProps {
  article: ArticleDocument;
  variant?: "feature" | "list";
}

export function ArticleCard({
  article,
  variant = "feature",
}: ArticleCardProps) {
  const category = categoryMeta[article.category];

  if (variant === "list") {
    return (
      <article className="editorial-rule group relative py-6 transition">
        <div className="grid gap-5 lg:grid-cols-[170px_minmax(0,1fr)_140px] lg:items-start">
          <div className="space-y-2 pt-3 text-sm text-muted">
            <p className="eyebrow">{category.title}</p>
            <p>{article.readingMinutes} min read</p>
          </div>
          <div className="space-y-3">
            <h3 className="font-serif text-3xl font-semibold tracking-[-0.05em] text-balance sm:text-[2.2rem]">
              <Link href={article.url} className="transition group-hover:text-accent-strong">
                {article.title}
              </Link>
            </h3>
            <p className="max-w-3xl text-base leading-8 text-muted">
              {article.excerpt}
            </p>
          </div>
          <div className="pt-3 text-sm text-muted lg:text-right">
            <p>Updated {formatDate(article.updatedAt)}</p>
            <p className="mt-4 font-medium text-accent-strong">Read article</p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-border/80 bg-white/58 p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/35">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent via-accent-soft to-transparent" />
      <div className="flex items-center justify-between gap-4 text-sm text-muted">
        <p className="eyebrow">{category.title}</p>
        <span>{article.readingMinutes} min read</span>
      </div>
      <div className="mt-8 space-y-4">
        <h3 className="font-serif text-[2.2rem] font-semibold leading-[1.02] tracking-[-0.06em] text-balance">
          <Link href={article.url} className="after:absolute after:inset-0 transition group-hover:text-accent-strong">
            {article.title}
          </Link>
        </h3>
        <p className="max-w-xl text-base leading-8 text-muted">{article.excerpt}</p>
      </div>
      <div className="mt-10 flex items-center justify-between gap-4 border-t border-border/70 pt-5 text-sm text-muted">
        <span>Updated {formatDate(article.updatedAt)}</span>
        <span className="font-medium text-accent-strong">Open reading</span>
      </div>
    </article>
  );
}
