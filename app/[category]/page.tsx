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
import { NewsletterCard } from "@/components/shared/newsletter-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { StoryCard } from "@/components/shared/story-card";
import { StoryVisual } from "@/components/shared/story-visual";
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
        <section className="hero-glow motion-enter grid gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(18rem,25rem)] lg:items-center">
          <div className="flex min-w-0 flex-col gap-5">
            <p className="eyebrow">Section front</p>
            <h1 className="font-serif text-[clamp(2.4rem,8vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.08em] text-balance">
              {meta.title}
            </h1>
            <p className="section-copy text-[1rem] leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {meta.description}
            </p>
            <div className="flex flex-wrap gap-2.5 text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground sm:gap-3">
              <span className="rounded-full border border-[color:var(--ghost-border)] bg-white/76 px-3 py-1.5">
                {articles.length} live article{articles.length === 1 ? "" : "s"}
              </span>
              <span className="rounded-full border border-[color:var(--ghost-border)] bg-white/76 px-3 py-1.5">
                {meta.focus}
              </span>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {leadArticle ? (
                <Button asChild size="lg">
                  <Link href={leadArticle.url}>
                    Read the featured guide
                    <ArrowRightIcon data-icon="inline-end" />
                  </Link>
                </Button>
              ) : null}
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Request the next topic</Link>
              </Button>
            </div>
          </div>

          <aside className="paper-panel flex min-w-0 flex-col gap-5 rounded-[2.3rem] p-4 sm:p-5 lg:p-6">
            {leadArticle ? (
              <>
                <Link className="block min-w-0" href={leadArticle.url}>
                  <StoryVisual article={leadArticle} className="w-full" priority variant="row" />
                </Link>
                <div className="flex flex-col gap-3">
                  <p className="eyebrow">Featured in this section</p>
                  <h2 className="font-serif text-[1.75rem] font-medium leading-[0.98] tracking-[-0.06em] text-balance sm:text-[2.2rem]">
                    {leadArticle.title}
                  </h2>
                  <p className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                    {leadArticle.excerpt}
                  </p>
                </div>
                <Button asChild className="w-fit" size="sm">
                  <Link href={leadArticle.url}>
                    Open featured article
                    <ArrowRightIcon data-icon="inline-end" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--ghost-border)] bg-[color:var(--surface-strong)] shadow-[0_18px_40px_rgba(27,28,25,0.07)]">
                  <div className="relative aspect-[4/3]">
                    <Image
                      alt={meta.teaserAlt}
                      className="object-cover"
                      fill
                      sizes="(min-width: 1024px) 28rem, 100vw"
                      src={meta.teaserImage}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent_36%,rgba(21,20,18,0.48))]" />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="eyebrow">What is coming next</p>
                  <h2 className="font-serif text-[1.75rem] font-medium leading-[0.98] tracking-[-0.06em] text-balance sm:text-[2.2rem]">
                    The editorial frame is live, and the next additions can drop in cleanly.
                  </h2>
                  <p className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                    Use the launch ideas below as the next publishing sequence without changing the new front-page rhythm.
                  </p>
                </div>
              </>
            )}
          </aside>
        </section>

        <section className="section-block">
          <Separator className="section-divider" />
          {remainingArticles.length > 0 ? (
            <div className="grid gap-6">
              <SectionHeading
                body="These are the additional reads already live in this section, arranged to feel like an edited sequence instead of another text-heavy dashboard."
                eyebrow="Published now"
                title="More reads in this section."
              />
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {remainingArticles.map((article) => (
                  <StoryCard key={article.url} article={article} visual="thumb" />
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
              <div className="grid gap-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] md:items-start">
                <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--ghost-border)] bg-[color:var(--surface-strong)] shadow-[0_18px_40px_rgba(27,28,25,0.07)]">
                  <div className="relative aspect-[4/3]">
                    <Image
                      alt={meta.teaserAlt}
                      className="object-cover"
                      fill
                      sizes="(min-width: 768px) 28rem, 100vw"
                      src={meta.teaserImage}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),transparent_36%,rgba(16,18,21,0.52))]" />
                  </div>
                </div>
                <div className="paper-panel rounded-[2rem] p-5 sm:p-6">
                  <div className="grid gap-3">
                    {meta.launchIdeas.map((idea) => (
                      <div key={idea} className="rounded-[1.35rem] bg-secondary/72 px-4 py-3">
                        <p className="font-serif text-[1.2rem] font-medium tracking-[-0.05em] text-foreground sm:text-[1.45rem]">
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
              <Alert className="border-[color:var(--ghost-border)] bg-white/78">
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
