import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { ArticleDocument } from "@/lib/content";
import { categoryMeta } from "@/lib/site-config";
import { formatDate } from "@/lib/utils";
import { StoryVisual } from "@/components/shared/story-visual";

interface LeadStoryProps {
  article: ArticleDocument;
  label?: string;
  titleAs?: "h1" | "h2";
}

export function LeadStory({
  article,
  label = "Lead story",
  titleAs = "h2",
}: LeadStoryProps) {
  const category = categoryMeta[article.category];
  const TitleTag = titleAs;

  return (
    <section className="section-block motion-enter">
      <Separator className="section-divider" />
      <div className="paper-panel overflow-hidden rounded-[2.4rem]">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
          <Link
            className="min-w-0 border-b border-[color:var(--ghost-border)] p-3.5 sm:p-5 lg:border-r lg:border-b-0"
            href={article.url}
          >
            <StoryVisual article={article} priority variant="lead" />
          </Link>
          <div className="flex min-w-0 flex-col gap-5 p-5 sm:gap-6 sm:p-7 lg:p-9">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
              <span>{label}</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>{category.title}</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>{article.readingMinutes} min read</span>
            </div>
            <TitleTag className="font-serif text-[2rem] font-medium leading-[0.95] tracking-[-0.08em] text-balance sm:text-[2.9rem] lg:text-[3.4rem]">
              <Link className="transition hover:text-primary" href={article.url}>
                {article.title}
              </Link>
            </TitleTag>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground text-pretty sm:text-lg sm:leading-8">
              {article.excerpt}
            </p>
            <div className="rounded-[1.6rem] bg-secondary/86 px-5 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                Desk angle
              </p>
              <p className="mt-2 font-serif text-[1.2rem] font-medium leading-[1.14] tracking-[-0.045em] text-foreground sm:text-[1.5rem]">
                {article.hero.mood}
              </p>
            </div>
            <div className="mt-auto flex flex-col gap-3 border-t border-[color:var(--ghost-border)] pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                  Updated
                </span>
                <span className="text-sm text-foreground">{formatDate(article.updatedAt)}</span>
              </div>
              <Button asChild className="w-full justify-center sm:w-auto">
                <Link href={article.url}>
                  Read the feature
                  <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
