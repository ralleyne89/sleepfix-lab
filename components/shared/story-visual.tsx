import Image from "next/image";
import type { ArticleDocument } from "@/lib/content";
import { categoryMeta } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface StoryVisualProps {
  article: ArticleDocument;
  className?: string;
  priority?: boolean;
  variant?: "lead" | "row" | "thumb";
}

const variantClasses: Record<NonNullable<StoryVisualProps["variant"]>, string> = {
  lead: "aspect-[7/5] sm:aspect-[6/5] lg:aspect-[5/4]",
  row: "aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3]",
  thumb: "aspect-[4/5] sm:aspect-[5/4]",
};

export function StoryVisual({
  article,
  className,
  priority = false,
  variant = "row",
}: StoryVisualProps) {
  const category = categoryMeta[article.category];
  const imageSrc = article.coverImage ?? category.teaserImage;
  const alt = article.coverAlt ?? category.teaserAlt ?? `${article.title} cover art`;

  return (
    <div
      className={cn(
        "relative isolate min-w-0 overflow-hidden rounded-[2rem] border border-[color:var(--ghost-border)] bg-[color:var(--surface-strong)] shadow-[0_20px_40px_rgba(27,28,25,0.07)]",
        variantClasses[variant],
        className,
      )}
    >
      <Image
        alt={alt}
        className="object-cover transition duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
        fill
        priority={priority}
        sizes={
          variant === "lead"
            ? "(min-width: 1024px) 50vw, 100vw"
            : "(min-width: 1024px) 24rem, 100vw"
        }
        src={imageSrc}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),transparent_34%,rgba(24,24,22,0.56))]" />
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-20", category.accent)} />
      <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3 sm:inset-x-5 sm:top-5">
        <span className="rounded-full border border-white/18 bg-[rgba(255,250,242,0.16)] px-3 py-1 text-[0.58rem] uppercase tracking-[0.22em] text-[rgba(255,248,240,0.95)] backdrop-blur-sm sm:text-[0.64rem]">
          {category.title}
        </span>
        {variant !== "thumb" ? (
          <span className="hidden text-[0.62rem] uppercase tracking-[0.22em] text-[rgba(247,241,231,0.72)] sm:inline">
            SleepFix Lab
          </span>
        ) : null}
      </div>
      <div className="absolute inset-x-4 bottom-4 flex flex-col gap-1.5 sm:inset-x-5 sm:bottom-5 sm:gap-2">
        <p className="max-w-md text-[0.6rem] uppercase tracking-[0.2em] text-[rgba(247,241,231,0.8)] sm:text-[0.66rem]">
          {variant === "lead" ? article.hero.accent : article.hero.eyebrow}
        </p>
        {variant === "lead" ? (
          <p className="max-w-md font-serif text-[1.6rem] font-medium leading-[1.02] tracking-[-0.06em] text-[rgba(250,245,237,0.96)] sm:text-3xl">
            {article.title}
          </p>
        ) : null}
      </div>
    </div>
  );
}
