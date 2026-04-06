import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNav, siteConfig, utilityNav } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4 lg:px-6 lg:pt-4">
      <div className="glass-nav mx-auto flex max-w-[88rem] items-center gap-4 rounded-[1.85rem] px-4 py-3.5 sm:px-5 lg:px-7 lg:py-4">
        <Link className="shrink-0 font-serif text-[1.55rem] font-semibold tracking-[-0.07em] text-foreground sm:text-[1.85rem]" href="/">
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          {mainNav.slice(1).map((item) => (
            <Link
              key={item.href}
              className="border-b border-transparent pb-1 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground transition hover:border-foreground/20 hover:text-foreground"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild size="sm" variant="outline">
            <Link href="/methodology">Editorial method</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/#newsletter">Latest updates</Link>
          </Button>
        </div>

        <div className="ml-auto lg:hidden">
          <Sheet>
            <SheetTrigger className="inline-flex size-9 items-center justify-center rounded-full border border-[color:var(--ghost-border)] bg-white/78 text-foreground shadow-[0_10px_22px_rgba(27,28,25,0.06)] transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-secondary focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20 focus-visible:outline-none lg:hidden">
              <MenuIcon className="size-4" />
              <span className="sr-only">Open site navigation</span>
            </SheetTrigger>
            <SheetContent className="border-b border-[color:var(--ghost-border)] bg-background/98" side="top">
              <SheetHeader className="gap-2 border-b border-[color:var(--ghost-border)] px-5 py-5">
                <SheetTitle>SleepFix Lab</SheetTitle>
                <SheetDescription>
                  {siteConfig.publicationNote}. {siteConfig.tagline}.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-6 px-4 py-5 sm:px-5 sm:py-6">
                <div className="flex flex-col gap-2">
                  <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                    Sections
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {mainNav.map((item) => (
                      <Button key={item.href} asChild className="justify-start" variant="ghost">
                        <Link href={item.href}>{item.label}</Link>
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="section-divider" />
                <div className="grid gap-2">
                  <Button asChild className="justify-start" variant="outline">
                    <Link href="/#newsletter">Latest updates</Link>
                  </Button>
                  <Button asChild className="justify-start" variant="ghost">
                    <Link href="/methodology">Editorial method</Link>
                  </Button>
                </div>
                <div className="section-divider" />
                <div className="flex flex-col gap-2">
                  <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                    Desk notes
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {utilityNav.map((item) => (
                      <Button key={item.href} asChild className="justify-start" variant="ghost">
                        <Link href={item.href}>{item.label}</Link>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
