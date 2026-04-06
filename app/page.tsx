import Link from "next/link";
import {
  ArrowRightIcon,
  MicroscopeIcon,
  MoonStarIcon,
  NotebookPenIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { NewsletterCard } from "@/components/shared/newsletter-card";
import { StoryCard } from "@/components/shared/story-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionFront } from "@/components/shared/section-front";
import { StoryVisual } from "@/components/shared/story-visual";
import { getHomepageEditorialContent } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { formatDate } from "@/lib/utils";

export const metadata = buildPageMetadata({
  title: "Editorial sleep advice for people who are tired of generic wellness noise",
  description: siteConfig.description,
  path: "/",
  keywords: [...siteConfig.keywords],
});

const methodologySteps = [
  "Start with the real sleep decision, not a quota of products.",
  "Let habit or room changes win when they are the better answer.",
  "Keep commerce visible, but behind context, sourcing, and next reads.",
];

const deskSignals = [
  {
    title: "Evidence-led",
    description: "Each story starts from the decision a tired reader actually needs to make.",
    Icon: MicroscopeIcon,
  },
  {
    title: "Calm pacing",
    description: "The browse flow stays edited and calm instead of sounding mass-produced.",
    Icon: MoonStarIcon,
  },
  {
    title: "Honest commerce",
    description: "Affiliate context stays visible without outranking practical guidance.",
    Icon: NotebookPenIcon,
  },
] as const;

export default function HomePage() {
  const { leadArticle, secondaryArticles, sections } = getHomepageEditorialContent();
  const totalArticles = sections.reduce((count, section) => count + section.articleCount, 0);
  const editionStats = [
    { label: "Live reads", value: totalArticles.toString().padStart(2, "0") },
    { label: "Editorial beats", value: sections.length.toString().padStart(2, "0") },
    { label: "Updated", value: formatDate(leadArticle.updatedAt) },
  ] as const;

  return (
    <div className="pb-16 sm:pb-20 lg:pb-24">
      <div className="page-shell">
        <section className="hero-glow motion-enter relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,28rem)] lg:items-start xl:gap-10">
          <div className="flex min-w-0 flex-col gap-5 sm:gap-7">
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <p className="eyebrow">{siteConfig.publicationNote}</p>
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-primary">
                {siteConfig.tagline}
              </p>
              <h1 className="max-w-5xl font-serif text-[clamp(2.3rem,11vw,4.85rem)] font-semibold leading-[0.94] tracking-[-0.08em] text-balance">
                Sleep guidance for people who want a better night, not another generic wellness funnel.
              </h1>
            </div>
            <p className="section-copy text-[1.02rem] leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              SleepFix Lab covers snoring, sleep quality, and product decisions with a
              quieter editorial approach: clear trade-offs, useful context, and a commercial layer
              that stays in proportion to the reader&apos;s actual need.
            </p>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
              <Button asChild className="w-full justify-center sm:w-auto" size="lg">
                <Link href="/methodology">Read the editorial method</Link>
              </Button>
              <Button asChild className="w-full justify-center sm:w-auto" size="lg" variant="outline">
                <Link href="/contact">
                  Reach the desk
                  <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-3 border-t border-border/70 pt-4 sm:grid-cols-3 sm:gap-4 sm:pt-5">
              {deskSignals.map(({ title, description, Icon }) => (
                <div key={title} className="flex min-w-0 flex-col gap-2.5">
                  <Icon className="size-4 text-primary" />
                  <div className="flex flex-col gap-1.5">
                    <p className="font-serif text-[1.15rem] font-semibold tracking-[-0.04em] text-foreground sm:text-[1.35rem]">
                      {title}
                    </p>
                    <p className="text-sm leading-6 text-muted-foreground">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="paper-panel motion-enter-delay-1 flex min-w-0 flex-col gap-4 rounded-[1.7rem] border-border/70 p-4 sm:gap-5 sm:p-5 lg:p-6">
            <Link className="block min-w-0" href={leadArticle.url}>
              <StoryVisual article={leadArticle} className="w-full" priority variant="row" />
            </Link>
            <div className="flex flex-col gap-3.5 sm:gap-4">
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                Current desk
              </p>
              <h2 className="font-serif text-[1.45rem] font-semibold tracking-[-0.06em] text-foreground sm:text-[1.85rem]">
                What the desk is tracking right now.
              </h2>
              <p className="text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                A clear lead read, a few strong companions, and section fronts that widen the decision instead of repeating the same box pattern.
              </p>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-3 lg:grid-cols-3">
              {editionStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.1rem] border border-border/70 bg-background/76 p-3.5 sm:rounded-[1.2rem] sm:p-4"
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-2 font-serif text-[1.7rem] font-semibold tracking-[-0.05em] text-foreground sm:text-3xl">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-border/70 pt-4">
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                Reading tracks
              </p>
              <div className="mt-3 grid gap-2 sm:mt-4">
                {sections.slice(0, 4).map((section) => (
                  <Link
                    key={section.category.slug}
                    className="flex items-center justify-between rounded-full border border-border/70 px-3.5 py-2.5 text-sm text-foreground transition hover:bg-secondary sm:px-4 sm:py-3"
                    href={`/${section.category.slug}`}
                  >
                    <span>{section.category.title}</span>
                    <ArrowRightIcon className="size-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="section-block">
          <Separator className="section-divider" />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-start">
            <article className="paper-panel overflow-hidden rounded-[2.5rem]">
              <div className="grid gap-0 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                <Link
                  className="block min-w-0 border-b border-[color:var(--ghost-border)] p-3.5 sm:p-5 xl:border-r xl:border-b-0"
                  href={leadArticle.url}
                >
                  <StoryVisual article={leadArticle} className="w-full" priority variant="lead" />
                </Link>
                <div className="flex min-w-0 flex-col gap-5 p-5 sm:gap-6 sm:p-7 xl:p-8">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                    <span>Current edition</span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span>Featured reading</span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span>{leadArticle.readingMinutes} min read</span>
                  </div>
                  <div className="space-y-3">
                    <h2 className="max-w-3xl font-serif text-[2rem] font-medium leading-[0.95] tracking-[-0.08em] text-balance text-foreground sm:text-[2.8rem]">
                      <Link className="transition hover:text-primary" href={leadArticle.url}>
                        {leadArticle.title}
                      </Link>
                    </h2>
                    <p className="max-w-2xl text-sm leading-7 text-muted-foreground text-pretty sm:text-base sm:leading-8">
                      {leadArticle.excerpt}
                    </p>
                  </div>
                  <div className="rounded-[1.6rem] bg-secondary/82 px-5 py-4">
                    <p className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                      Desk angle
                    </p>
                    <p className="mt-2 font-serif text-[1.2rem] font-medium leading-[1.14] tracking-[-0.045em] text-foreground sm:text-[1.5rem]">
                      {leadArticle.hero.mood}
                    </p>
                  </div>
                  <div className="mt-auto flex flex-col gap-3 border-t border-[color:var(--ghost-border)] pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                        Updated
                      </span>
                      <span className="text-sm text-foreground">{formatDate(leadArticle.updatedAt)}</span>
                    </div>
                    <Button asChild className="w-full justify-center sm:w-auto">
                      <Link href={leadArticle.url}>
                        Read the feature
                        <ArrowRightIcon data-icon="inline-end" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </article>

            <div className="grid gap-6">
              <SectionHeading
                body={
                  "These pieces move from products into habits, measurement, and longer-term sleep trade-offs without losing the slower editorial pace."
                }
                eyebrow="Also on the desk"
                title="Companion reads that widen the frame."
              />
              <div className="grid gap-8">
                {secondaryArticles.map((article) => (
                  <StoryCard key={article.url} article={article} visual="thumb" />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-block">
          <Separator className="section-divider" />
          <div className="grid gap-6">
            <SectionHeading
              body="Each front keeps the same editorial rhythm while changing the emphasis, so readers can move from one problem space to the next without feeling like the site resets."
              eyebrow="Browse the journal"
              title="Reading tracks built around real sleep decisions."
            />
            <div className="grid gap-5">
              {sections.map((section) => (
                <SectionFront
                  key={section.category.slug}
                  articleCount={section.articleCount}
                  category={section.category}
                  leadArticle={section.leadArticle}
                  supportingArticles={section.supportingArticles}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section-block">
          <Separator className="section-divider" />
          <div
            id="newsletter"
            className="dispatch-band motion-enter overflow-hidden rounded-[2rem] border border-border/70"
          >
            <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,28rem)]">
              <div className="min-w-0 border-b border-border/70 px-4 py-5 sm:px-6 sm:py-6 lg:border-r lg:border-b-0 lg:px-7 lg:py-7">
                <NewsletterCard id="newsletter-signup" variant="plain" />
              </div>
              <div className="dispatch-band-side flex min-w-0 flex-col gap-5 px-4 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7">
                <Link className="block min-w-0" href={secondaryArticles[0]?.url ?? leadArticle.url}>
                  <StoryVisual
                    article={secondaryArticles[0] ?? leadArticle}
                    className="w-full"
                    variant="row"
                  />
                </Link>
                <SectionHeading
                  body="The read should feel lighter before it ever asks for a click."
                  bodyClassName="text-[rgba(241,233,220,0.76)]"
                  eyebrow="Editorial method"
                  eyebrowClassName="text-[rgba(245,239,228,0.68)]"
                  size="compact"
                  title="Edited to earn trust before it asks for action."
                  titleClassName="text-[rgba(250,245,237,0.98)]"
                />
                <div className="grid gap-3">
                  {methodologySteps.map((step, index) => (
                    <div key={step} className="border-t border-white/10 pt-3">
                      <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[rgba(245,239,228,0.62)]">
                        Step {index + 1}
                      </p>
                      <p className="mt-2 font-serif text-[1.08rem] font-semibold leading-[1.14] tracking-[-0.035em] text-[rgba(250,245,237,0.98)] sm:text-[1.3rem]">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-sm leading-6 text-[rgba(241,233,220,0.68)] sm:leading-7">
                  {siteConfig.legal.medical}
                </p>
                <Button asChild className="w-fit" size="sm" variant="outlineInverse">
                  <Link href="/methodology">
                    Read the editorial method
                    <ArrowRightIcon data-icon="inline-end" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
