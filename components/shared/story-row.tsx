import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ArticleDocument } from "@/lib/content";
import { categoryMeta } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { StoryVisual } from "@/components/shared/story-visual";

interface StoryRowProps {
  article: ArticleDocument;
  className?: string;
  image?: "thumb" | "row" | "none";
  showExcerpt?: boolean;
  showCategory?: boolean;
  titleSize?: "large" | "medium";
  ctaLabel?: string;
}

export function StoryRow({
  article,
  className,
  image = "thumb",
  showExcerpt = true,
  showCategory = true,
  titleSize = "medium",
  ctaLabel = "Read article",
}: StoryRowProps) {
  const category = categoryMeta[article.category];

  return (
    <article
      className={cn(
        "group relative flex min-w-0 flex-col gap-3 py-4 sm:gap-4 sm:py-5",
        image === "none"
          ? ""
          : "grid gap-3 sm:gap-4 md:grid-cols-[minmax(11rem,13rem)_minmax(0,1fr)] md:items-start lg:gap-5",
        className,
      )}
    >
      {image !== "none" ? (
        <Link className="min-w-0" href={article.url}>
          <StoryVisual
            article={article}
            className="w-full"
            variant={image === "row" ? "row" : "thumb"}
          />
        </Link>
      ) : null}
      <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
          {showCategory ? <span>{category.title}</span> : null}
          {showCategory ? <span className="h-1 w-1 rounded-full bg-border" /> : null}
          <span className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground sm:text-[0.66rem]">
            {article.readingMinutes} min read
          </span>
        </div>
        <h3
          className={cn(
            "max-w-4xl font-serif font-medium leading-[1.02] tracking-[-0.06em] text-balance text-foreground",
            titleSize === "large"
              ? "text-[1.7rem] sm:text-[2.3rem] lg:text-[2.7rem]"
              : "text-[1.35rem] sm:text-[1.8rem]",
          )}
        >
          <Link className="transition hover:text-primary" href={article.url}>
            {article.title}
          </Link>
        </h3>
        {showExcerpt ? (
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground text-pretty sm:text-base sm:leading-8">
            {article.excerpt}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center gap-2.5 pt-0.5 sm:gap-3">
          <Button asChild className="w-fit px-0" size="sm" variant="link">
            <Link href={article.url}>
              {ctaLabel}
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
