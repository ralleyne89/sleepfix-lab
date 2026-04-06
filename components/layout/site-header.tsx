import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4 lg:px-6 lg:pt-4">
      <div className="paper-panel mx-auto flex max-w-7xl items-center gap-3 rounded-[1.45rem] border-border/70 px-4 py-3 lg:px-5">
        <Link className="shrink-0 font-serif text-[1.45rem] font-semibold tracking-[-0.07em] text-foreground sm:text-[1.6rem]" href="/">
          {siteConfig.name}
        </Link>

        <NavigationMenu
          aria-label="Primary"
          className="hidden flex-1 justify-end lg:flex"
          viewport={false}
        >
          <NavigationMenuList className="gap-1.5">
            {mainNav.slice(1).map((item) => (
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

        <div className="ml-auto lg:hidden">
          <Sheet>
            <SheetTrigger className="inline-flex size-8 items-center justify-center rounded-full border border-border/80 bg-card/88 text-foreground shadow-[0_10px_22px_rgba(33,25,20,0.06)] transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-secondary focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none lg:hidden">
              <MenuIcon className="size-4" />
              <span className="sr-only">Open site navigation</span>
            </SheetTrigger>
            <SheetContent className="border-b border-border/80 bg-background/98" side="top">
              <SheetHeader className="gap-2 border-b border-border/70 px-5 py-5">
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
