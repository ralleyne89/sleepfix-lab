import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    <div className="mx-auto max-w-5xl px-5 py-10 lg:px-8">
      <Card className="bg-card/88">
        <CardHeader className="flex flex-col gap-4">
          <p className="eyebrow">{eyebrow}</p>
          <CardTitle className="text-5xl tracking-[-0.06em] text-balance sm:text-6xl">
            {title}
          </CardTitle>
          {description ? (
            <CardDescription className="max-w-3xl text-base leading-8">
              {description}
            </CardDescription>
          ) : null}
        </CardHeader>
        <Separator />
        <CardContent className="pt-8">{children}</CardContent>
      </Card>
    </div>
  );
}
