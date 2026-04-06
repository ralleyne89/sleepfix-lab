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
  page: "text-[2rem] leading-[0.97] sm:text-[3.35rem]",
  section: "text-[1.7rem] leading-[1] sm:text-[2.5rem]",
  compact: "text-[1.35rem] leading-[1.03] sm:text-[1.9rem]",
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
    <div className={cn("max-w-[38rem] min-w-0 space-y-2.5 sm:space-y-3", className)}>
      <p className={cn("eyebrow", eyebrowClassName)}>{eyebrow}</p>
      <HeadingTag
        className={cn(
          "font-serif font-semibold tracking-[-0.06em] text-balance",
          titleClasses[size],
          titleClassName,
        )}
      >
        {title}
      </HeadingTag>
      {body ? (
        <p className={cn("max-w-[34rem] text-sm leading-6 text-muted-foreground text-pretty sm:text-base sm:leading-7", bodyClassName)}>
          {body}
        </p>
      ) : null}
    </div>
  );
}
