import type { ArticleSource } from "@/lib/site-config";
import { Separator } from "@/components/ui/separator";

interface SourceListProps {
  sources: ArticleSource[];
}

export function SourceList({ sources }: SourceListProps) {
  return (
    <ol className="flex flex-col gap-4 text-sm leading-7 text-muted-foreground">
      {sources.map((source) => (
        <li key={source.url} className="flex flex-col gap-4">
          <Separator />
          <a
            className="font-medium text-foreground underline decoration-border underline-offset-4 transition hover:text-primary"
            href={source.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {source.title}
          </a>
          <span> · {source.publisher}</span>
        </li>
      ))}
    </ol>
  );
}
