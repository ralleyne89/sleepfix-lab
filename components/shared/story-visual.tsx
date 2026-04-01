import Image from "next/image";
import type { ArticleDocument } from "@/lib/content";
import { categoryMeta } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface StoryVisualProps {
  article: ArticleDocument;
  className?: string;
  priority?: boolean;
  variant?: "lead" | "row" | "thumb";
}

const variantClasses: Record<NonNullable<StoryVisualProps["variant"]>, string> = {
  lead: "aspect-[6/5]",
  row: "aspect-[4/3]",
  thumb: "aspect-[5/4]",
};

export function StoryVisual({
  article,
  className,
  priority = false,
  variant = "row",
}: StoryVisualProps) {
  const category = categoryMeta[article.category];
  const alt = article.coverAlt ?? `${article.title} cover art`;

  if (article.coverImage) {
    return (
      <Card
        className={cn(
          "relative overflow-hidden border-border/80 bg-card/82 py-0 shadow-[0_14px_36px_rgba(39,30,25,0.06)]",
          variantClasses[variant],
          className,
        )}
      >
        <Image
          alt={alt}
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
          fill
          priority={priority}
          sizes={
            variant === "lead"
              ? "(min-width: 1024px) 50vw, 100vw"
              : "(min-width: 1024px) 22rem, 100vw"
          }
          src={article.coverImage}
        />
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-border/80 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--card)_92%,white_8%),color-mix(in_oklab,var(--secondary)_78%,white_22%))] p-6 shadow-[0_14px_36px_rgba(39,30,25,0.06)]",
        variantClasses[variant],
        className,
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(16,13,10,0.03))]" />
      <div className="absolute inset-x-6 top-6 h-px bg-[rgba(24,20,17,0.14)]" />
      <div className="absolute bottom-6 right-6 h-24 w-24 rounded-full border border-[rgba(24,20,17,0.09)]" />
      <div className="absolute bottom-12 right-12 h-10 w-10 rounded-full bg-[rgba(180,140,102,0.22)]" />
      <div className="relative flex h-full flex-col justify-between">
        <Badge className="w-fit" variant="secondary">
          {category.title}
        </Badge>
        <div className="flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.16em] text-muted-foreground">
            SleepFix Editorial
          </p>
          <p
            className={cn(
              "max-w-sm font-serif font-semibold tracking-[-0.05em] text-foreground",
              variant === "lead" ? "text-4xl sm:text-5xl" : "text-3xl",
            )}
          >
            {article.title}
          </p>
        </div>
      </div>
    </Card>
  );
}
