import Link from "next/link";
import {
  BookOpenTextIcon,
  MailIcon,
  MenuIcon,
  MoveRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNav, siteConfig, utilityNav } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/92 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-2.5 lg:px-8">
        <p className="truncate text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
          {siteConfig.publicationNote}
        </p>
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground transition hover:text-foreground"
            href="/methodology"
          >
            Methodology
          </Link>
          <Link
            className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground transition hover:text-foreground"
            href="/contact"
          >
            Contact
          </Link>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="lg:hidden"
              size="icon-sm"
              variant="outline"
            >
              <MenuIcon />
              <span className="sr-only">Open site navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            className="border-b border-border/80 bg-background/97"
            side="top"
          >
            <SheetHeader className="gap-2 border-b border-border/70 px-5 py-5">
              <SheetTitle>SleepFix Lab</SheetTitle>
              <SheetDescription>
                Browse the live sections and desk notes for the launch edition.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-6 px-5 py-6">
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
              <Separator />
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

      <Separator />

      <div className="mx-auto w-full max-w-7xl px-5 py-6 lg:px-8 lg:py-7">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div className="hidden items-center gap-3 lg:flex">
            <BookOpenTextIcon className="text-muted-foreground" data-icon="inline-start" />
            <Link
              className="text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground transition hover:text-foreground"
              href="/about"
            >
              About the journal
            </Link>
          </div>
          <Link className="block text-center" href="/">
            <span className="block text-[0.66rem] uppercase tracking-[0.28em] text-muted-foreground">
              The journal of
            </span>
            <span className="block font-serif text-[2.8rem] font-semibold tracking-[-0.08em] text-foreground sm:text-[4.1rem]">
              {siteConfig.name}
            </span>
            <span className="block text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
              {siteConfig.tagline}
            </span>
          </Link>
          <div className="hidden items-center justify-end gap-4 lg:flex">
            <Button asChild size="sm" variant="link">
              <Link href="#newsletter">
                Newsletter
                <MoveRightIcon data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href={`mailto:${siteConfig.email}`}>
                <MailIcon data-icon="inline-start" />
                Reach us
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Separator className="hidden lg:block" />

      <NavigationMenu
        aria-label="Primary"
        className="mx-auto hidden w-full max-w-7xl justify-center px-5 py-3 lg:flex lg:px-8"
        viewport={false}
      >
        <NavigationMenuList className="gap-2">
          {mainNav.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  "h-auto rounded-full bg-transparent px-3 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <Link href={item.href}>{item.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
