import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, CircleAlertIcon } from "lucide-react";
import { notFound } from "next/navigation";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LeadStory } from "@/components/shared/lead-story";
import { NewsletterCard } from "@/components/shared/newsletter-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { StoryCard } from "@/components/shared/story-card";
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
    <div className="pb-16 sm:pb-20 lg:pb-24">
      <div className="page-shell">
        <section className="motion-enter max-w-[42rem] space-y-3 sm:space-y-4">
          <p className="eyebrow">Section front</p>
          <h1 className="font-serif text-[2.1rem] font-semibold leading-[0.96] tracking-[-0.07em] text-balance sm:text-[3.25rem] lg:text-[3.8rem]">
            {meta.title}
          </h1>
          <p className="section-copy text-[1.02rem] leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {meta.description}
          </p>
          <div className="flex flex-wrap gap-2.5 text-sm leading-6 text-muted-foreground sm:gap-3">
            <span className="rounded-full border border-border/70 bg-background/76 px-3 py-1.5">
              {articles.length} live article{articles.length === 1 ? "" : "s"}
            </span>
            <span className="rounded-full border border-border/70 bg-background/76 px-3 py-1.5">
              {meta.focus}
            </span>
          </div>
        </section>

        {leadArticle ? <LeadStory article={leadArticle} label="Featured in this section" /> : null}

        <section className="section-block">
          <Separator className="section-divider" />
          {remainingArticles.length > 0 ? (
            <div className="grid gap-6">
              <SectionHeading
                body="These are the additional reads already live in this section, arranged to feel like an edited sequence instead of another text-heavy dashboard."
                eyebrow="Published now"
                title="More reads in this section."
              />
              <div className="grid gap-8 md:grid-cols-2">
                {remainingArticles.map((article) => (
                  <StoryCard key={article.url} article={article} />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
              <SectionHeading
                body={
                  leadArticle
                    ? "This section currently opens with one feature. The next additions should widen the path without changing the tone."
                    : "The route is live, the editorial rhythm is in place, and the next story can drop in without changing the structure."
                }
                eyebrow="On deck"
                title="The next likely stories for this section."
              />
              <div className="grid gap-5 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] md:items-start">
                <div className="relative overflow-hidden rounded-[1.6rem] border border-border/70 bg-[color:var(--night)] shadow-[0_18px_40px_rgba(24,22,19,0.12)]">
                  <div className="relative aspect-[4/3]">
                    <Image
                      alt={meta.teaserAlt}
                      className="object-cover"
                      fill
                      sizes="(min-width: 768px) 28rem, 100vw"
                      src={meta.teaserImage}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,246,240,0.08),transparent_36%,rgba(16,20,28,0.56))]" />
                  </div>
                </div>
                <div className="paper-panel rounded-[1.45rem] border-border/70 p-4 sm:rounded-[1.6rem] sm:p-6">
                  <div className="grid gap-3">
                    {meta.launchIdeas.map((idea) => (
                      <div key={idea} className="border-t border-border/70 pt-3 first:border-t-0 first:pt-0">
                        <p className="font-serif text-[1.2rem] font-semibold tracking-[-0.04em] text-foreground sm:text-[1.45rem]">
                          {idea}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button asChild className="mt-4 w-full justify-center sm:mt-5 sm:w-fit" size="sm" variant="link">
                    <Link href="/contact">
                      Request the next topic
                      <ArrowRightIcon data-icon="inline-end" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="section-block">
          <Separator className="section-divider" />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] lg:items-start">
            <div className="grid min-w-0 gap-6">
              <SectionHeading
                body="Readers rarely stop at one question. These pieces widen the path from products to habits and back again."
                eyebrow="Cross-cluster reading"
                title="Related reading outside this section."
              />
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {crossLinks.map((article) => (
                  <StoryCard key={article.url} article={article} />
                ))}
              </div>
            </div>
            <div className="min-w-0 space-y-3.5 sm:space-y-4">
              <NewsletterCard compact />
              <Alert className="border-border/70 bg-background/76">
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
