import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <section className="pt-8">
      <Separator />
      <Card className="mt-8 overflow-hidden border-border/80 bg-card/88 py-0">
        <CardContent className="grid gap-0 px-0 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
          <Link className="border-b border-border/80 lg:border-r lg:border-b-0" href={article.url}>
          <StoryVisual article={article} priority variant="lead" />
        </Link>
          <div className="flex flex-col gap-5 p-6 lg:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{label}</Badge>
              <span className="text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground">
                {category.title} · {article.readingMinutes} min read
              </span>
            </div>
            <TitleTag className="font-serif text-5xl font-semibold leading-[0.94] tracking-[-0.07em] text-balance sm:text-6xl lg:text-[4.45rem]">
              <Link className="transition hover:text-primary" href={article.url}>
                {article.title}
              </Link>
            </TitleTag>
            <p className="max-w-2xl text-lg leading-9 text-muted-foreground">
              {article.excerpt}
            </p>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">
                Updated {formatDate(article.updatedAt)}
              </span>
              <Button asChild variant="link">
                <Link href={article.url}>
                  Read the feature
                  <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
