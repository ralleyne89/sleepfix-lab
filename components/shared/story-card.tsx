import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import type { ArticleDocument } from "@/lib/content";
import { categoryMeta } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { StoryVisual } from "@/components/shared/story-visual";

interface StoryCardProps {
  article: ArticleDocument;
  className?: string;
  showCategory?: boolean;
  visual?: "row" | "thumb";
}

export function StoryCard({
  article,
  className,
  showCategory = true,
  visual = "row",
}: StoryCardProps) {
  const category = categoryMeta[article.category];

  return (
    <article className={cn("group flex min-w-0 flex-col gap-4", className)}>
      <Link className="block min-w-0" href={article.url}>
        <StoryVisual article={article} className="w-full" variant={visual} />
      </Link>
      <div className="flex min-w-0 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
          {showCategory ? <span>{category.title}</span> : null}
          {showCategory ? <span className="h-1 w-1 rounded-full bg-border" /> : null}
          <span>{article.readingMinutes} min read</span>
        </div>
        <h3 className="max-w-2xl font-serif text-[1.45rem] font-semibold leading-[1.02] tracking-[-0.055em] text-balance text-foreground sm:text-[1.85rem]">
          <Link className="transition hover:text-primary" href={article.url}>
            {article.title}
          </Link>
        </h3>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground text-pretty sm:text-base sm:leading-7">
          {article.excerpt}
        </p>
        <Button asChild className="w-fit px-0" size="sm" variant="link">
          <Link href={article.url}>
            Read the story
            <ArrowRightIcon data-icon="inline-end" />
          </Link>
        </Button>
      </div>
    </article>
  );
}
