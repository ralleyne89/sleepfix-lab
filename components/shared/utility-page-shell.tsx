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
      <div className="paper-panel mx-auto max-w-4xl rounded-[2.4rem] px-5 py-5 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <SectionHeading
          as="h1"
          body={description}
          eyebrow={eyebrow}
          size="page"
          title={title}
        />
        <Separator />
        <div className="pt-6 sm:pt-7 lg:pt-9">{children}</div>
      </div>
    </div>
  );
}
