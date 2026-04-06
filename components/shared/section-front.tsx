import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ArticleDocument } from "@/lib/content";
import type { CategoryMeta } from "@/lib/site-config";
import { StoryCard } from "@/components/shared/story-card";
import { StoryRow } from "@/components/shared/story-row";
import { cn } from "@/lib/utils";

interface SectionFrontProps {
  articleCount: number;
  category: CategoryMeta;
  leadArticle: ArticleDocument | null;
  supportingArticles: ArticleDocument[];
}

export function SectionFront({
  articleCount,
  category,
  leadArticle,
  supportingArticles,
}: SectionFrontProps) {
  return (
    <section className="paper-panel rounded-[2.3rem] p-5 sm:p-7 lg:p-8">
      <div className="grid gap-7 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:items-start">
        <div className="flex min-w-0 flex-col gap-4 lg:border-r lg:border-[color:var(--ghost-border)] lg:pr-8">
          <div className={cn("h-1.5 w-16 rounded-full bg-gradient-to-r", category.accent)} />
          <p className="eyebrow">{category.slug.replace("-", " ")}</p>
          <div className="flex flex-col gap-3">
            <h3 className="font-serif text-[1.7rem] font-medium tracking-[-0.065em] text-balance sm:text-[2.25rem]">
              {category.title}
            </h3>
            <p className="text-sm leading-7 text-muted-foreground text-pretty sm:text-base sm:leading-8">
              {category.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5 text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground sm:gap-3">
            <span className="rounded-full border border-[color:var(--ghost-border)] bg-white/76 px-3 py-1.5">
              {articleCount.toString().padStart(2, "0")} live reads
            </span>
            <span className="rounded-full border border-[color:var(--ghost-border)] bg-white/76 px-3 py-1.5">
              {category.focus}
            </span>
          </div>
          <Button asChild className="w-full justify-center sm:w-fit" size="sm">
            <Link href={`/${category.slug}`}>
              Browse the section
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        </div>

        <div className="flex min-w-0 flex-col gap-3.5 sm:gap-4">
          {leadArticle ? (
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(15rem,18rem)] xl:items-start">
              <StoryCard
                article={leadArticle}
                className="border-0 pt-0"
                showCategory={false}
                visual="row"
              />
              <div className="flex min-w-0 flex-col gap-3.5 rounded-[1.8rem] bg-secondary/82 px-4 py-4 xl:border-t-0 xl:px-5 xl:py-5">
                <p className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                  Supporting reads
                </p>
                {supportingArticles.length > 0 ? (
                  <div className="lined-list">
                    {supportingArticles.map((article) => (
                      <StoryRow
                        key={article.url}
                        article={article}
                        ctaLabel="Open article"
                        image="none"
                        showExcerpt={false}
                        showCategory={false}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="max-w-sm text-sm leading-6 text-muted-foreground sm:leading-7">
                    More reads will land here as the section fills out, without changing the front-page rhythm.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] md:items-start">
              <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--ghost-border)] bg-[color:var(--surface-strong)] shadow-[0_18px_40px_rgba(27,28,25,0.07)]">
                <div className="relative aspect-[4/3]">
                  <Image
                    alt={category.teaserAlt}
                    className="object-cover"
                    fill
                    sizes="(min-width: 768px) 28rem, 100vw"
                    src={category.teaserImage}
                  />
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-18", category.accent)} />
                </div>
              </div>
              <div className="flex min-w-0 flex-col gap-4">
                <div className="space-y-2.5">
                  <p className="eyebrow">On deck</p>
                  <h4 className="font-serif text-[1.55rem] font-medium tracking-[-0.06em] text-balance sm:text-[2rem]">
                    The next stories for this section.
                  </h4>
                  <p className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                    The structure is live. These are the next reads that would widen the path without reverting to a text-only placeholder wall.
                  </p>
                </div>
                <div className="grid gap-3">
                  {supportingArticles.map((article) => (
                    <StoryRow
                      key={article.url}
                      article={article}
                      image="none"
                      showExcerpt={false}
                      showCategory={false}
                    />
                  ))}
                  {category.launchIdeas.map((idea) => (
                    <div key={idea} className="rounded-[1.35rem] bg-secondary/72 px-4 py-3">
                      <p className="font-serif text-[1.1rem] font-medium tracking-[-0.04em] sm:text-[1.35rem]">
                        {idea}
                      </p>
                    </div>
                  ))}
                  <Button asChild className="w-full justify-center sm:w-fit" size="sm" variant="link">
                    <Link href="/contact">
                      Request the next topic
                      <ArrowRightIcon data-icon="inline-end" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
