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
    <Card className="bg-card/84">
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
              "justify-start px-0 text-left font-normal text-muted-foreground",
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
  );
}
