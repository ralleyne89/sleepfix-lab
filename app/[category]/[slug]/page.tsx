import Link from "next/link";
import { ArrowRightIcon, CircleAlertIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { AuthorCard } from "@/components/article/author-card";
import { FaqList } from "@/components/article/faq-list";
import { SourceList } from "@/components/article/source-list";
import { Toc } from "@/components/article/toc";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { JsonLd } from "@/components/shared/json-ld";
import { NewsletterCard } from "@/components/shared/newsletter-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { StoryCard } from "@/components/shared/story-card";
import { StoryVisual } from "@/components/shared/story-visual";
import {
  getArticleBySlug,
  getArticleStaticParams,
  getFeaturedProducts,
  getRelatedArticles,
} from "@/lib/content";
import { renderArticleMdx } from "@/lib/mdx";
import {
  buildArticleJsonLd,
  buildArticleMetadata,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
} from "@/lib/seo";
import { categoryMeta, isArticleCategory, siteConfig } from "@/lib/site-config";
import { cn, formatDate } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticleStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const article = getArticleBySlug(category, slug);

  if (!article) {
    return {};
  }

  return buildArticleMetadata(article);
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  if (!isArticleCategory(category)) {
    notFound();
  }

  const article = getArticleBySlug(category, slug);

  if (!article) {
    notFound();
  }

  const renderedContent = await renderArticleMdx(article.content);
  const relatedArticles = getRelatedArticles(article);
  const featuredProducts = getFeaturedProducts(article.featuredProductIds);
  const isComparisonArticle = article.category === "comparisons";
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: categoryMeta[article.category].title, path: `/${article.category}` },
    { name: article.title, path: article.url },
  ]);

  return (
    <>
      <JsonLd data={buildArticleJsonLd(article)} />
      <JsonLd data={buildFaqJsonLd(article)} />
      <JsonLd data={breadcrumbJsonLd} />

      <div className="pb-16 sm:pb-20 lg:pb-24">
        <div className="page-shell">
          <Breadcrumb>
            <BreadcrumbList className="flex-wrap gap-y-2 text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground sm:text-[0.72rem]">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${article.category}`}>{categoryMeta[article.category].title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{article.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {isComparisonArticle ? (
            <header className="motion-enter mt-6 space-y-8">
              <div className="mx-auto max-w-5xl space-y-5 text-center">
                <p className="eyebrow">{article.hero.eyebrow}</p>
                <h1 className="font-serif text-[clamp(2.4rem,8vw,5.8rem)] font-medium leading-[0.92] tracking-[-0.08em] text-balance">
                  {article.title}
                </h1>
                <p className="mx-auto max-w-3xl font-serif text-[1.1rem] italic leading-8 tracking-[-0.03em] text-muted-foreground sm:text-[1.45rem] sm:leading-9">
                  {article.excerpt}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Badge variant="secondary">{categoryMeta[article.category].title}</Badge>
                  <Badge variant="outline">{article.readingMinutes} min read</Badge>
                  <Badge variant="outline">Updated {formatDate(article.updatedAt)}</Badge>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] lg:items-start">
                <div className="paper-panel rounded-[2.5rem] p-4 sm:p-5">
                  <StoryVisual article={article} priority variant="lead" />
                </div>
                <div className="paper-panel flex min-w-0 flex-col gap-5 rounded-[2.3rem] p-5 sm:p-6">
                  <div className="flex flex-col gap-3">
                    <p className="eyebrow">Performance matrix</p>
                    <h2 className="font-serif text-[1.65rem] font-medium leading-[0.98] tracking-[-0.06em] text-balance sm:text-[2rem]">
                      {article.hero.accent}
                    </h2>
                    <p className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                      {article.hero.mood}
                    </p>
                  </div>
                  <div className="grid gap-3">
                    {featuredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="rounded-[1.45rem] bg-secondary/78 px-4 py-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-serif text-[1.2rem] font-medium tracking-[-0.05em] text-foreground">
                            {product.name}
                          </p>
                          <Badge variant="outline">{product.priceLabel}</Badge>
                        </div>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                          {product.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </header>
          ) : (
            <header className="motion-enter mt-6 space-y-8">
              <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 text-center">
                <p className="eyebrow">{article.hero.eyebrow}</p>
                <h1 className="font-serif text-[clamp(2.4rem,8vw,5.2rem)] font-medium leading-[0.92] tracking-[-0.08em] text-balance">
                  {article.title}
                </h1>
                <p className="max-w-3xl font-serif text-[1.05rem] italic leading-8 tracking-[-0.03em] text-muted-foreground sm:text-[1.35rem] sm:leading-9">
                  {article.excerpt}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Badge variant="secondary">{categoryMeta[article.category].title}</Badge>
                  <Badge variant="outline">{article.readingMinutes} min read</Badge>
                  <Badge variant="outline">Updated {formatDate(article.updatedAt)}</Badge>
                </div>
                <Alert className="w-full max-w-3xl text-left">
                  <AlertTitle>{article.hero.accent}</AlertTitle>
                  <AlertDescription>{article.hero.mood}</AlertDescription>
                </Alert>
              </div>

              <div className="mx-auto max-w-[78rem]">
                <StoryVisual article={article} priority variant="lead" />
              </div>
            </header>
          )}

          <div className="section-block">
            <Separator className="section-divider" />
            <div
              className={cn(
                "grid gap-6 sm:gap-8 lg:gap-10",
                isComparisonArticle
                  ? "lg:grid-cols-[minmax(0,1fr)_minmax(16rem,18rem)] lg:items-start"
                  : "lg:grid-cols-[minmax(15rem,18rem)_minmax(0,1fr)] lg:items-start",
              )}
            >
              {isComparisonArticle ? (
                <>
                  <div className="flex min-w-0 flex-col gap-5 sm:gap-6">
                    <Alert className="bg-secondary/76">
                      <CircleAlertIcon />
                      <AlertTitle>Affiliate disclosure</AlertTitle>
                      <AlertDescription>
                        {siteConfig.legal.affiliate}
                      </AlertDescription>
                    </Alert>
                    <article className="article-prose">{renderedContent}</article>
                  </div>

                  <aside className="flex min-w-0 flex-col gap-4 sm:gap-5 lg:sticky lg:top-28 lg:self-start">
                    <Toc headings={article.headings} />
                    <NewsletterCard compact />
                  </aside>
                </>
              ) : (
                <>
                  <aside className="order-2 flex min-w-0 flex-col gap-4 sm:gap-5 lg:order-1 lg:sticky lg:top-28 lg:self-start">
                    <Toc headings={article.headings} />
                    <NewsletterCard compact />
                  </aside>

                  <div className="order-1 flex min-w-0 flex-col gap-5 sm:gap-6 lg:order-2">
                    <Alert>
                      <CircleAlertIcon />
                      <AlertTitle>Affiliate disclosure</AlertTitle>
                      <AlertDescription>
                        {siteConfig.legal.affiliate}
                      </AlertDescription>
                    </Alert>
                    <article className="article-prose">{renderedContent}</article>
                  </div>
                </>
              )}
            </div>
          </div>

          <section className="section-block">
            <Separator className="section-divider" />
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,21rem)] xl:items-start">
              <div className="min-w-0 space-y-5">
                <SectionHeading
                  eyebrow="Frequently asked questions"
                  title="Fast answers for readers who want the short version."
                />
                <FaqList items={article.faq} />
              </div>
              <div className="flex min-w-0 flex-col gap-5 sm:gap-6">
                <div className="paper-panel rounded-[2rem] p-5 sm:p-6">
                  <SectionHeading
                    eyebrow="Sources"
                    size="compact"
                    title="What informed this page"
                  />
                  <div className="mt-5">
                    <SourceList sources={article.sources} />
                  </div>
                </div>
                <AuthorCard />
              </div>
            </div>
          </section>

          <section className="section-block">
            <Separator className="section-divider" />
            <div className="grid gap-6">
              <SectionHeading
                eyebrow="Keep reading"
                title="Related pages inside the same editorial system."
              />
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:leading-7">
                  Related pages that keep the same editorial lens but widen the path from this article into adjacent decisions.
                </p>
                <Button asChild className="w-fit" size="sm" variant="link">
                  <Link href={`/${article.category}`}>
                    Browse {categoryMeta[article.category].title}
                    <ArrowRightIcon data-icon="inline-end" />
                  </Link>
                </Button>
              </div>
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {relatedArticles.map((relatedArticle) => (
                  <StoryCard key={relatedArticle.url} article={relatedArticle} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
