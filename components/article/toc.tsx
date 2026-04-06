import { ChevronDownIcon } from "lucide-react";
import type { TocHeading } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TocProps {
  headings: TocHeading[];
}

export function Toc({ headings }: TocProps) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <>
      <details className="group rounded-[1.2rem] border border-border/70 bg-card/84 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 [&::-webkit-details-marker]:hidden">
          <div className="flex flex-col gap-1">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
              On this page
            </p>
            <p className="font-serif text-[1.2rem] font-semibold tracking-[-0.04em] text-foreground">
              Article guide
            </p>
          </div>
          <ChevronDownIcon className="size-4 text-muted-foreground transition-transform group-open:rotate-180" />
        </summary>
        <div className="border-t border-border/70 px-4 py-3">
          <nav className="flex flex-col gap-1.5" aria-label="Article guide">
            {headings.map((heading) => (
              <Button
                key={heading.id}
                asChild
                className={cn(
                  "justify-start px-0 text-left font-normal whitespace-normal text-muted-foreground",
                  heading.level === 3 ? "pl-4" : "",
                )}
                variant="link"
              >
                <a href={`#${heading.id}`}>
                  {heading.text}
                </a>
              </Button>
            ))}
          </nav>
        </div>
      </details>

      <Card className="hidden bg-card/84 lg:block">
        <CardHeader className="flex flex-col gap-2">
          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
            On this page
          </p>
          <CardTitle className="text-2xl tracking-[-0.04em]">Article guide</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {headings.map((heading) => (
            <Button
              key={heading.id}
              asChild
              className={cn(
                "justify-start px-0 text-left font-normal whitespace-normal text-muted-foreground",
                heading.level === 3 ? "pl-4" : "",
              )}
              variant="link"
            >
              <a href={`#${heading.id}`}>
                {heading.text}
              </a>
            </Button>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
