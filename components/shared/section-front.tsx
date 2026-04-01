import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ArticleDocument } from "@/lib/content";
import type { CategoryMeta } from "@/lib/site-config";
import { StoryRow } from "@/components/shared/story-row";

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
    <section className="pt-8">
      <Separator />
      <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="flex flex-col gap-4 pt-8">
          <p className="eyebrow">{category.slug.replace("-", " ")}</p>
          <div className="flex flex-col gap-3">
            <h2 className="font-serif text-4xl font-semibold tracking-[-0.06em] text-balance sm:text-5xl">
              {category.title}
            </h2>
            <p className="text-base leading-8 text-muted-foreground">{category.description}</p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <p>{articleCount} live article{articleCount === 1 ? "" : "s"}</p>
            <p>{category.focus}</p>
          </div>
          <Button asChild className="w-fit" size="sm" variant="link">
            <Link href={`/${category.slug}`}>
              Browse the section
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        </div>

        <div className="pt-8">
          {leadArticle ? (
            <>
              <StoryRow
                article={leadArticle}
                ctaLabel="Open article"
                image="row"
                titleSize="large"
              />
              {supportingArticles.length > 0 ? (
                <div>
                  {supportingArticles.map((article) => (
                    <StoryRow
                      key={article.url}
                      article={article}
                      image="none"
                      showExcerpt={false}
                      showCategory={false}
                    />
                ))}
                </div>
              ) : null}
            </>
          ) : (
            <Card className="bg-card/84">
              <CardHeader className="flex flex-col gap-3">
                <p className="eyebrow">On deck</p>
                <CardTitle className="text-3xl tracking-[-0.05em]">
                  The next cluster of stories
                </CardTitle>
                <CardDescription className="text-base leading-7">
                  The section is live and ready for the next article drop without changing the front-page rhythm.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {category.launchIdeas.map((idea) => (
                  <div key={idea} className="flex flex-col gap-4">
                    <Separator />
                    <p className="font-serif text-2xl font-semibold tracking-[-0.04em]">{idea}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
