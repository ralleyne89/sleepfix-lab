import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { SectionHeading } from "@/components/shared/section-heading";

interface UtilityPageShellProps {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export function UtilityPageShell({
  eyebrow,
  title,
  description,
  children,
}: UtilityPageShellProps) {
  return (
    <div className="page-shell">
      <div className="paper-panel mx-auto max-w-4xl rounded-[1.5rem] border-border/70 px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-8">
        <SectionHeading
          as="h1"
          body={description}
          eyebrow={eyebrow}
          size="page"
          title={title}
        />
        <Separator />
        <div className="pt-5 sm:pt-6 lg:pt-8">{children}</div>
      </div>
    </div>
  );
}
