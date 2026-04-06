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
  row: "aspect-[3/2] sm:aspect-[5/4] lg:aspect-[4/3]",
  thumb: "aspect-[3/2] sm:aspect-[5/4]",
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
        "relative isolate min-w-0 overflow-hidden rounded-[1.6rem] border border-border/70 bg-[color:var(--night)] shadow-[0_18px_46px_rgba(24,22,19,0.14)]",
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
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,246,240,0.08),transparent_30%,rgba(16,20,28,0.7))]" />
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-28", category.accent)} />
      <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3 sm:inset-x-5 sm:top-5">
        <span className="rounded-full border border-white/14 bg-[rgba(250,246,240,0.14)] px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-[rgba(247,241,231,0.94)] backdrop-blur-sm sm:text-[0.66rem]">
          {category.title}
        </span>
        {variant !== "thumb" ? (
          <span className="hidden text-[0.62rem] uppercase tracking-[0.22em] text-[rgba(247,241,231,0.72)] sm:inline">
            SleepFix Lab
          </span>
        ) : null}
      </div>
      <div className="absolute inset-x-4 bottom-4 flex flex-col gap-1.5 sm:inset-x-5 sm:bottom-5 sm:gap-2">
        <p className="max-w-md text-[0.62rem] uppercase tracking-[0.18em] text-[rgba(247,241,231,0.76)] sm:text-[0.68rem]">
          {variant === "lead" ? article.hero.accent : article.hero.eyebrow}
        </p>
        {variant === "lead" ? (
          <p className="max-w-md font-serif text-[1.6rem] font-semibold leading-[1.02] tracking-[-0.05em] text-[rgba(250,245,237,0.96)] sm:text-3xl">
            {article.title}
          </p>
        ) : null}
      </div>
    </div>
  );
}
