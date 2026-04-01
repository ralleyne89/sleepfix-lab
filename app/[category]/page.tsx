import Link from "next/link";
import { ArrowRightIcon, CircleAlertIcon } from "lucide-react";
import { notFound } from "next/navigation";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LeadStory } from "@/components/shared/lead-story";
import { NewsletterCard } from "@/components/shared/newsletter-card";
import { StoryRow } from "@/components/shared/story-row";
import { getAllArticles, getArticlesByCategory, getCategoryStaticParams } from "@/lib/content";
import { buildCategoryMetadata } from "@/lib/seo";
import { categoryMeta, isArticleCategory, siteConfig } from "@/lib/site-config";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategoryStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!isArticleCategory(category)) {
    return {};
  }

  return buildCategoryMetadata(category);
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!isArticleCategory(category)) {
    notFound();
  }

  const meta = categoryMeta[category];
  const articles = getArticlesByCategory(category);
  const [leadArticle, ...remainingArticles] = articles;
  const crossLinks = getAllArticles()
    .filter((article) => article.category !== category)
    .slice(0, 3);

  return (
    <div className="pb-24">
      <div className="mx-auto w-full max-w-7xl px-5 pt-10 lg:px-8 lg:pt-12">
        <section className="flex flex-col gap-5">
          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
            Section front
          </p>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-end">
            <div className="flex flex-col gap-3">
              <p className="eyebrow">{meta.slug.replace("-", " ")}</p>
              <h1 className="font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.07em] text-balance sm:text-6xl lg:text-[4.15rem]">
                {meta.title}
              </h1>
            </div>
            <div className="flex flex-col gap-4">
              <p className="max-w-2xl text-lg leading-9 text-muted-foreground">
                {meta.description}
              </p>
              <div className="flex flex-wrap gap-4 text-sm uppercase tracking-[0.16em] text-muted-foreground">
                <span>{articles.length} live article{articles.length === 1 ? "" : "s"}</span>
                <span>{meta.focus}</span>
              </div>
            </div>
          </div>
        </section>

        {leadArticle ? (
          <>
            <LeadStory article={leadArticle} label="Featured in this section" />

            <section className="pt-8">
              <Separator />
              <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
                <div className="flex flex-col gap-4 pt-8">
                  <p className="eyebrow">Published now</p>
                  <p className="text-base leading-8 text-muted-foreground">
                    The current stories already carry FAQs, sources, and commerce
                    modules, but they are arranged to feel like reading, not a shelf
                    of widgets.
                  </p>
                </div>
                <div className="pt-8">
                  {remainingArticles.length > 0 ? (
                    remainingArticles.map((article) => (
                      <StoryRow
                        key={article.url}
                        article={article}
                        image="thumb"
                      />
                    ))
                  ) : (
                    <Card className="bg-card/84">
                      <CardHeader className="flex flex-col gap-3">
                        <p className="eyebrow">Next likely topics</p>
                        <CardTitle className="text-3xl tracking-[-0.05em]">
                          The next likely stories for this section
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-4">
                        {meta.launchIdeas.map((idea) => (
                          <div key={idea} className="flex flex-col gap-4">
                            <Separator />
                            <p className="font-serif text-2xl font-semibold tracking-[-0.04em] text-foreground">
                              {idea}
                            </p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </section>
          </>
        ) : (
          <section className="pt-8">
            <Separator />
            <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
              <div className="flex flex-col gap-4 pt-8">
                <p className="eyebrow">On deck</p>
                <p className="text-base leading-8 text-muted-foreground">
                  The route is live, the editorial rhythm is in place, and the next
                  story can drop into the section without changing the structure.
                </p>
              </div>
              <Card className="bg-card/84">
                <CardHeader className="flex flex-col gap-3">
                  <CardTitle className="text-3xl tracking-[-0.05em]">
                    Commission the next topic
                  </CardTitle>
                  <CardDescription className="text-base leading-7">
                    These are the pages that would widen the section without changing the reading rhythm.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                {meta.launchIdeas.map((idea) => (
                  <div key={idea} className="flex flex-col gap-4">
                    <Separator />
                    <p className="font-serif text-2xl font-semibold tracking-[-0.04em] text-foreground">
                      {idea}
                    </p>
                  </div>
                ))}
                  <Button asChild className="mt-2 w-fit" size="sm" variant="link">
                    <Link href="/contact">
                      Request the next topic
                      <ArrowRightIcon data-icon="inline-end" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        <section className="pt-10">
          <Separator />
          <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
            <div className="flex flex-col gap-4 pt-10">
              <p className="eyebrow">Cross-cluster reading</p>
              <p className="text-base leading-8 text-muted-foreground">
                Readers rarely stop at one question. These pieces widen the path
                from products to habits and back again.
              </p>
            </div>
            <div className="pt-10">
              {crossLinks.map((article) => (
                <StoryRow key={article.url} article={article} image="thumb" />
              ))}
            </div>
          </div>
        </section>

        <section className="pt-10">
          <Separator />
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
            <div className="pt-10">
              <NewsletterCard compact />
            </div>
            <div className="pt-10">
              <Alert>
                <CircleAlertIcon />
                <AlertTitle>Trust notes</AlertTitle>
                <AlertDescription>
                  <p>{siteConfig.legal.medical}</p>
                  <Button asChild className="mt-4 w-fit" size="sm" variant="link">
                    <Link href="/methodology">
                      Review the methodology
                      <ArrowRightIcon data-icon="inline-end" />
                    </Link>
                  </Button>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
