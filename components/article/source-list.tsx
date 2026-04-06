import type { ArticleSource } from "@/lib/site-config";

interface SourceListProps {
  sources: ArticleSource[];
}

export function SourceList({ sources }: SourceListProps) {
  return (
    <ol className="flex flex-col gap-3 text-sm leading-6 text-muted-foreground sm:gap-4 sm:leading-7">
      {sources.map((source) => (
        <li
          key={source.url}
          className="rounded-[1.4rem] border border-[color:var(--ghost-border)] bg-white/72 px-4 py-4 sm:px-5 sm:py-5"
        >
          <a
            className="font-medium text-foreground underline decoration-border underline-offset-4 transition hover:text-primary"
            href={source.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {source.title}
          </a>
          <p className="mt-2 text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
            {source.publisher}
          </p>
        </li>
      ))}
    </ol>
  );
}
