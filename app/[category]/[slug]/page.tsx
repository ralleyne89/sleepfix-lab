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
import { getArticleBySlug, getArticleStaticParams, getRelatedArticles } from "@/lib/content";
import { renderArticleMdx } from "@/lib/mdx";
import {
  buildArticleJsonLd,
  buildArticleMetadata,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
} from "@/lib/seo";
import { categoryMeta, isArticleCategory, siteConfig } from "@/lib/site-config";
import { formatDate } from "@/lib/utils";

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

          <header className="motion-enter mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,20rem)] lg:items-start">
            <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
              <p className="eyebrow">{article.hero.eyebrow}</p>
              <h1 className="font-serif text-[2.1rem] font-semibold leading-[0.95] tracking-[-0.07em] text-balance sm:text-[3.2rem] lg:text-[3.8rem]">
                {article.title}
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-muted-foreground text-pretty sm:text-lg sm:leading-8">{article.excerpt}</p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{categoryMeta[article.category].title}</Badge>
                <Badge variant="outline">{article.readingMinutes} min read</Badge>
                <span className="hidden text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground sm:inline">
                  Updated {formatDate(article.updatedAt)}
                </span>
              </div>
              <Alert>
                <AlertTitle>{article.hero.accent}</AlertTitle>
                <AlertDescription>{article.hero.mood}</AlertDescription>
              </Alert>
            </div>

            <div>
              <StoryVisual article={article} priority variant="lead" />
            </div>
          </header>

          <div className="section-block">
            <Separator className="section-divider" />
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,18rem)] lg:items-start">
              <div className="flex min-w-0 flex-col gap-5 sm:gap-6">
                <Alert>
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
                <div className="paper-panel rounded-[1.45rem] border-border/70 p-4 sm:rounded-[1.6rem] sm:p-5">
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
