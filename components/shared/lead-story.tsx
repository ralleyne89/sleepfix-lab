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
      <div className="paper-panel overflow-hidden rounded-[1.8rem] border-border/70">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)]">
          <Link
            className="min-w-0 border-b border-border/70 p-3.5 sm:p-5 lg:border-r lg:border-b-0"
            href={article.url}
          >
            <StoryVisual article={article} priority variant="lead" />
          </Link>
          <div className="flex min-w-0 flex-col gap-4 p-4 sm:gap-5 sm:p-6 lg:p-7">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
              <span>{label}</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>{category.title}</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>{article.readingMinutes} min read</span>
            </div>
            <TitleTag className="font-serif text-[1.85rem] font-semibold leading-[0.97] tracking-[-0.07em] text-balance sm:text-[2.7rem] lg:text-[3.2rem]">
              <Link className="transition hover:text-primary" href={article.url}>
                {article.title}
              </Link>
            </TitleTag>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground text-pretty sm:text-lg sm:leading-7">
              {article.excerpt}
            </p>
            <div className="border-l-2 border-primary/28 pl-4 sm:pl-5">
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                Desk angle
              </p>
              <p className="mt-2 font-serif text-[1.12rem] font-semibold leading-[1.18] tracking-[-0.035em] text-foreground sm:text-[1.4rem]">
                {article.hero.mood}
              </p>
            </div>
            <div className="mt-auto flex flex-col gap-3 border-t border-border/70 pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
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
