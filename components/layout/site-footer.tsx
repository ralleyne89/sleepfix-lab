import Link from "next/link";
import { MailIcon, MoveRightIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { mainNav, siteConfig, utilityNav } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer-band mt-[var(--section-gap)] pb-6 lg:pb-10">
      <div className="mx-auto max-w-[88rem] px-4 py-10 sm:px-5 sm:py-11 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,25rem)] lg:items-start">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-3">
              <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[rgba(246,239,228,0.7)]">
                {siteConfig.publicationNote}
              </p>
              <h2 className="font-serif text-4xl tracking-[-0.08em] text-[rgba(250,245,237,0.98)] sm:text-[3.2rem]">
                {siteConfig.name}
              </h2>
              <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[rgba(246,239,228,0.64)]">
                {siteConfig.tagline}
              </p>
              <p className="max-w-2xl text-sm leading-7 text-[rgba(240,232,220,0.78)] sm:text-base sm:leading-8">
                Sleep advice with editorial restraint, practical trade-offs, and a calmer tone than most wellness media.
              </p>
            </div>
            <div className="grid gap-4 text-sm leading-7 text-[rgba(240,232,220,0.7)] sm:grid-cols-2">
              <p>{siteConfig.legal.medical}</p>
              <p>{siteConfig.legal.affiliate}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-5 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
            <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[rgba(246,239,228,0.7)]">
              Contact
            </p>
            <h3 className="font-serif text-[1.9rem] font-semibold tracking-[-0.06em] text-[rgba(250,245,237,0.98)] sm:text-[2.35rem]">
              Reach the editorial desk.
            </h3>
            <p className="text-sm leading-7 text-[rgba(240,232,220,0.76)] sm:text-base sm:leading-8">
              We answer launch feedback, topic suggestions, and editorial-fit partnerships within two business days.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="w-fit" variant="outlineInverse">
                <Link href={`mailto:${siteConfig.email}`}>
                  <MailIcon data-icon="inline-start" />
                  {siteConfig.email}
                </Link>
              </Button>
              <Button asChild className="w-fit" variant="linkInverse">
                <Link href="#newsletter">
                  Join the newsletter
                  <MoveRightIcon data-icon="inline-end" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 hidden border-t border-white/10 pt-8 lg:grid lg:grid-cols-3 lg:gap-10">
          <FooterColumn items={mainNav.slice(1)} muted title="Sections" />
          <FooterColumn items={utilityNav} muted title="Desk notes" />
          <div className="flex flex-col gap-3">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[rgba(246,239,228,0.68)]">
              Desk timing
            </p>
            <p className="text-sm leading-7 text-[rgba(240,232,220,0.72)]">
              Editorial desk responses within two business days.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 lg:hidden">
          <Accordion collapsible type="single">
            <AccordionItem value="sections">
              <AccordionTrigger className="text-[0.72rem] uppercase tracking-[0.18em] text-[rgba(246,239,228,0.74)]">
                Sections
              </AccordionTrigger>
              <AccordionContent>
                <FooterLinkList items={mainNav.slice(1)} muted />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="desk-notes">
              <AccordionTrigger className="text-[0.72rem] uppercase tracking-[0.18em] text-[rgba(246,239,228,0.74)]">
                Desk notes
              </AccordionTrigger>
              <AccordionContent>
                <FooterLinkList items={utilityNav} muted />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="desk-timing">
              <AccordionTrigger className="text-[0.72rem] uppercase tracking-[0.18em] text-[rgba(246,239,228,0.74)]">
                Desk timing
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm leading-7 text-[rgba(240,232,220,0.72)]">
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
  muted = false,
}: {
  title: string;
  items: readonly { href: string; label: string }[];
  muted?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p
        className={
          muted
            ? "text-[0.68rem] uppercase tracking-[0.18em] text-[rgba(246,239,228,0.68)]"
            : "text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground"
        }
      >
        {title}
      </p>
      <FooterLinkList items={items} muted={muted} />
    </div>
  );
}

function FooterLinkList({
  items,
  muted = false,
}: {
  items: readonly { href: string; label: string }[];
  muted?: boolean;
}) {
  return (
    <div
      className={
        muted
          ? "flex flex-col gap-2 text-sm text-[rgba(240,232,220,0.72)]"
          : "flex flex-col gap-2 text-sm text-muted-foreground"
      }
    >
      {items.map((item) => (
        <Link
          key={item.href}
          className={muted ? "transition hover:text-white" : "transition hover:text-foreground"}
          href={item.href}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
