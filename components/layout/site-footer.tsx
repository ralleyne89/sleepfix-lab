import Link from "next/link";
import { MailIcon, MoveRightIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mainNav, siteConfig, utilityNav } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-background/72">
      <Separator />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <Card className="bg-card/82">
            <CardHeader className="flex flex-col gap-3">
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                {siteConfig.publicationNote}
              </p>
              <CardTitle className="text-4xl tracking-[-0.07em] sm:text-5xl">
                {siteConfig.name}
              </CardTitle>
              <CardDescription className="max-w-2xl text-base leading-8">
                Sleep advice that reads like an editorial desk, not a product funnel.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm leading-7 text-muted-foreground sm:grid-cols-2">
              <p>{siteConfig.legal.medical}</p>
              <p>{siteConfig.legal.affiliate}</p>
            </CardContent>
          </Card>
          <Card className="bg-card/78">
            <CardHeader className="flex flex-col gap-3">
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                Contact
              </p>
              <CardTitle className="text-3xl tracking-[-0.05em]">
                Reach the editorial desk.
              </CardTitle>
              <CardDescription className="text-base leading-7">
                We answer launch feedback, topic suggestions, and editorial-fit partnerships.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button asChild className="w-fit" variant="outline">
                <Link href={`mailto:${siteConfig.email}`}>
                  <MailIcon data-icon="inline-start" />
                  {siteConfig.email}
                </Link>
              </Button>
              <Button asChild className="w-fit" variant="link">
                <Link href="#newsletter">
                  Join the newsletter
                  <MoveRightIcon data-icon="inline-end" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="hidden gap-8 lg:grid lg:grid-cols-3">
          <FooterColumn items={mainNav.slice(1)} title="Sections" />
          <FooterColumn items={utilityNav} title="Desk notes" />
          <div className="flex flex-col gap-3">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
              Desk timing
            </p>
            <p className="text-sm leading-7 text-muted-foreground">
              Editorial desk responses within two business days.
            </p>
          </div>
        </div>

        <div className="lg:hidden">
          <Accordion collapsible type="single">
            <AccordionItem value="sections">
              <AccordionTrigger className="text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
                Sections
              </AccordionTrigger>
              <AccordionContent>
                <FooterLinkList items={mainNav.slice(1)} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="desk-notes">
              <AccordionTrigger className="text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
                Desk notes
              </AccordionTrigger>
              <AccordionContent>
                <FooterLinkList items={utilityNav} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="desk-timing">
              <AccordionTrigger className="text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
                Desk timing
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm leading-7 text-muted-foreground">
                  Editorial desk responses within two business days.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: readonly { href: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </p>
      <FooterLinkList items={items} />
    </div>
  );
}

function FooterLinkList({
  items,
}: {
  items: readonly { href: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
      {items.map((item) => (
        <Link
          key={item.href}
          className="transition hover:text-foreground"
          href={item.href}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
