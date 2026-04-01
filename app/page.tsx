import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LeadStory } from "@/components/shared/lead-story";
import { NewsletterCard } from "@/components/shared/newsletter-card";
import { SectionFront } from "@/components/shared/section-front";
import { StoryRow } from "@/components/shared/story-row";
import { getHomepageEditorialContent } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  title: "Editorial sleep advice for people who are tired of generic wellness noise",
  description: siteConfig.description,
  path: "/",
  keywords: [...siteConfig.keywords],
});

const methodologySteps = [
  "We begin with the real reader decision, not a quota of products to mention.",
  "Recommendations are allowed to say no when habit change, room setup, or medical review is the better move.",
  "Commerce stays visible, but it never outranks context, sources, or next useful reads.",
];

export default function HomePage() {
  const { leadArticle, secondaryArticles, sections } = getHomepageEditorialContent();

  return (
    <div className="pb-24">
      <div className="mx-auto w-full max-w-7xl px-5 pt-10 lg:px-8 lg:pt-12">
        <section className="flex flex-col gap-5">
          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
            {siteConfig.publicationNote}
          </p>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end">
            <div className="flex flex-col gap-3">
              <p className="eyebrow">Front page</p>
              <h1 className="font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.07em] text-balance sm:text-6xl lg:text-[4.3rem]">
                Sleep guidance with the pacing of a good magazine and the clarity of a useful review desk.
              </h1>
            </div>
            <div className="flex flex-col gap-5">
              <p className="max-w-2xl text-lg leading-9 text-muted-foreground">
                SleepFix Lab covers snoring, sleep quality, and product decisions with
                a quieter editorial approach: generous context, clear trade-offs, and
                a commercial layer that stays in proportion to the reader&apos;s actual need.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="sm" variant="outline">
                  <Link href="/methodology">Read the editorial method</Link>
                </Button>
                <Button asChild size="sm" variant="link">
                  <Link href="/contact">
                    Reach the desk
                    <ArrowRightIcon data-icon="inline-end" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <LeadStory article={leadArticle} label="Featured reading" />

        <section className="pt-8">
          <Separator />
          <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
            <div className="flex flex-col gap-4 pt-8">
              <p className="eyebrow">Also on the desk</p>
              <p className="text-base leading-8 text-muted-foreground">
                Two companion reads that widen the frame from single-product
                decisions to routines and long-term sleep trade-offs.
              </p>
            </div>
            <div className="grid gap-6 pt-8 lg:grid-cols-2">
              {secondaryArticles.map((article) => (
                <StoryRow
                  key={article.url}
                  article={article}
                  className="pt-0 before:hidden"
                  ctaLabel="Open reading"
                  image="thumb"
                />
              ))}
            </div>
          </div>
        </section>

        <div className="mt-2">
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

        <section className="pt-10">
          <Separator />
          <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
            <div className="flex flex-col gap-4 pt-10">
              <p className="eyebrow">Editorial method</p>
              <h2 className="font-serif text-4xl font-semibold tracking-[-0.06em] text-balance sm:text-5xl">
                The site should feel edited before it feels optimized.
              </h2>
              <p className="text-base leading-8 text-muted-foreground">
                That means stronger hierarchy, fewer boxes, and a reading flow that
                earns trust before it asks for a click.
              </p>
              <Button asChild className="w-fit" size="sm" variant="link">
                <Link href="/methodology">
                  Read the editorial method
                  <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 pt-10 sm:grid-cols-3">
              {methodologySteps.map((step, index) => (
                <Card key={step} className="bg-card/84">
                  <CardContent className="flex flex-col gap-4 pt-6">
                    <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                      Step {index + 1}
                    </p>
                    <p className="font-serif text-2xl font-semibold tracking-[-0.04em] text-foreground">
                      {step}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="pt-10">
          <Separator />
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
            <div className="pt-10">
              <NewsletterCard />
            </div>
            <div className="pt-10">
              <Alert>
                <AlertTitle>Reader promise</AlertTitle>
                <AlertDescription>
                  <p>
                    We keep the lens practical: how the room feels, what the routine is
                    doing, and whether a product truly deserves a place in the answer.
                  </p>
                  <p>{siteConfig.legal.medical}</p>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
