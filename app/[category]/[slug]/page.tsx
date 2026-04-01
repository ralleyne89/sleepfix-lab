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
import { StoryRow } from "@/components/shared/story-row";
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

      <div className="pb-24">
        <div className="mx-auto w-full max-w-7xl px-5 pt-10 lg:px-8 lg:pt-12">
          <Breadcrumb>
            <BreadcrumbList className="text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground">
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

          <header className="mt-6 pt-8">
            <Separator />
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(280px,1.15fr)] lg:items-start">
              <div className="flex flex-col gap-5 pt-8">
                <p className="eyebrow">{article.hero.eyebrow}</p>
                <h1 className="font-serif text-5xl font-semibold leading-[0.93] tracking-[-0.07em] text-balance sm:text-6xl lg:text-[4.35rem]">
                  {article.title}
                </h1>
                <p className="max-w-3xl text-xl leading-9 text-muted-foreground">{article.excerpt}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{categoryMeta[article.category].title}</Badge>
                  <Badge variant="outline">{article.readingMinutes} min read</Badge>
                  <span className="text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground">
                    Updated {formatDate(article.updatedAt)}
                  </span>
                </div>
                <Alert>
                  <AlertTitle>{article.hero.accent}</AlertTitle>
                  <AlertDescription>{article.hero.mood}</AlertDescription>
                </Alert>
              </div>

              <div className="pt-8">
                <StoryVisual article={article} priority variant="lead" />
              </div>
            </div>
          </header>

          <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_250px] lg:items-start">
            <div className="flex flex-col gap-8">
              <Alert>
                <CircleAlertIcon />
                <AlertTitle>Affiliate disclosure</AlertTitle>
                <AlertDescription>
                {siteConfig.legal.affiliate}
                </AlertDescription>
              </Alert>
              <article className="article-prose">{renderedContent}</article>
            </div>

            <aside className="flex flex-col gap-8 lg:sticky lg:top-40 lg:self-start">
              <Toc headings={article.headings} />
              <NewsletterCard compact />
            </aside>
          </div>

          <section className="mt-14 pt-10">
            <Separator />
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_320px]">
              <div className="flex flex-col gap-5 pt-10">
                <p className="eyebrow">Frequently asked questions</p>
                <h2 className="font-serif text-4xl font-semibold tracking-[-0.06em] text-balance sm:text-5xl">
                  Fast answers for readers who want the short version.
                </h2>
                <FaqList items={article.faq} />
              </div>
              <div className="flex flex-col gap-8 pt-10">
                <div className="flex flex-col gap-5">
                  <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Sources</p>
                  <h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.05em] text-foreground">
                    What informed this page
                  </h2>
                  <SourceList sources={article.sources} />
                </div>
                <AuthorCard />
              </div>
            </div>
          </section>

          <section className="mt-14 pt-10">
            <Separator />
            <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
              <div className="flex flex-col gap-4 pt-10">
                <p className="eyebrow">Keep reading</p>
                <p className="font-serif text-4xl font-semibold tracking-[-0.06em] text-balance sm:text-5xl">
                  Related pages inside the same editorial system.
                </p>
                <Button asChild className="w-fit" size="sm" variant="link">
                  <Link href={`/${article.category}`}>
                    Browse {categoryMeta[article.category].title}
                    <ArrowRightIcon data-icon="inline-end" />
                  </Link>
                </Button>
              </div>
              <div className="pt-10">
                {relatedArticles.map((relatedArticle) => (
                  <StoryRow key={relatedArticle.url} article={relatedArticle} image="thumb" />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
