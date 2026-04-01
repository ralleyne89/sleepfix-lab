import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { ArticleDocument } from "@/lib/content";
import { categoryMeta } from "@/lib/site-config";
import { cn, formatDate } from "@/lib/utils";
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
        "group flex flex-col gap-6 py-6",
        image === "none" ? "" : "grid gap-6 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-start",
        className,
      )}
    >
      <Separator />
      {image !== "none" ? (
        <Link href={article.url}>
          <StoryVisual
            article={article}
            className="w-full"
            variant={image === "row" ? "row" : "thumb"}
          />
        </Link>
      ) : null}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {showCategory ? <Badge variant="secondary">{category.title}</Badge> : null}
          <span className="text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground">
            {article.readingMinutes} min read
          </span>
          <span className="text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground">
            Updated {formatDate(article.updatedAt)}
          </span>
        </div>
        <h3
          className={cn(
            "font-serif font-semibold tracking-[-0.05em] text-balance",
            titleSize === "large" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-[2.45rem]",
          )}
        >
          <Link className="transition hover:text-primary" href={article.url}>
            {article.title}
          </Link>
        </h3>
        {showExcerpt ? (
          <p className="max-w-3xl text-[1.02rem] leading-8 text-muted-foreground">
            {article.excerpt}
          </p>
        ) : null}
        <Button asChild className="w-fit" size="sm" variant="link">
          <Link href={article.url}>
            {ctaLabel}
            <ArrowRightIcon data-icon="inline-end" />
          </Link>
        </Button>
      </div>
    </article>
  );
}
