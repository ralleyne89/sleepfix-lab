import type { ElementType } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  body?: string;
  as?: ElementType;
  size?: "page" | "section" | "compact";
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  bodyClassName?: string;
}

const titleClasses = {
  page: "text-[2.3rem] leading-[0.95] sm:text-[3.85rem]",
  section: "text-[2rem] leading-[0.98] sm:text-[3rem]",
  compact: "text-[1.45rem] leading-[1.02] sm:text-[2.05rem]",
} as const;

export function SectionHeading({
  eyebrow,
  title,
  body,
  as = "h2",
  size = "section",
  className,
  eyebrowClassName,
  titleClassName,
  bodyClassName,
}: SectionHeadingProps) {
  const HeadingTag = as;

  return (
    <div className={cn("max-w-[40rem] min-w-0 space-y-3 sm:space-y-4", className)}>
      <p className={cn("eyebrow", eyebrowClassName)}>{eyebrow}</p>
      <HeadingTag
        className={cn(
          "font-serif font-medium tracking-[-0.065em] text-balance text-foreground",
          titleClasses[size],
          titleClassName,
        )}
      >
        {title}
      </HeadingTag>
      {body ? (
        <p className={cn("max-w-[35rem] text-sm leading-7 text-muted-foreground text-pretty sm:text-base sm:leading-8", bodyClassName)}>
          {body}
        </p>
      ) : null}
    </div>
  );
}
