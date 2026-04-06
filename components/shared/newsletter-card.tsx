import Link from "next/link";
import { ArrowRightIcon, CircleAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface NewsletterCardProps {
  compact?: boolean;
  id?: string;
  variant?: "card" | "plain";
}

export function NewsletterCard({
  compact = false,
  id = "newsletter",
  variant = "card",
}: NewsletterCardProps) {
  const subscribeUrl =
    process.env.NEXT_PUBLIC_BEEHIIV_SUBSCRIBE_URL ||
    process.env.BEEHIIV_SUBSCRIBE_URL;

  const titleClassName = cn(
    "max-w-3xl font-serif tracking-[-0.075em] text-balance text-foreground",
    compact
      ? "text-[1.45rem] leading-[1] sm:text-[1.95rem]"
      : variant === "plain"
        ? "text-[2.05rem] leading-[0.95] sm:text-[3.1rem]"
        : "text-[1.8rem] leading-[0.98] sm:text-[2.7rem]",
  );

  const descriptionClassName = cn(
    "max-w-2xl text-sm leading-7 text-pretty text-muted-foreground",
    compact ? "sm:text-[0.98rem] sm:leading-7" : "sm:text-base sm:leading-8",
  );

  const form = subscribeUrl ? (
    <form
      action={subscribeUrl}
      className="flex flex-col gap-3 sm:flex-row sm:items-end"
      method="post"
      target="_blank"
    >
      <FieldGroup className="flex-1">
        <Field>
          <FieldLabel className="sr-only" htmlFor={`${id}-email`}>
            Email address
          </FieldLabel>
          <Input
            aria-label="Email address"
            id={`${id}-email`}
            name="email"
            className="h-11 rounded-full border-[color:var(--ghost-border)] bg-white/84 px-5"
            placeholder="Email address"
            required
            type="email"
          />
        </Field>
      </FieldGroup>
      <Button className="w-full justify-center sm:min-w-44 sm:w-auto" size="lg" type="submit">
        Join the newsletter
        <ArrowRightIcon data-icon="inline-end" />
      </Button>
    </form>
  ) : (
    <Alert className={cn("border-[color:var(--ghost-border)] bg-secondary/72", variant === "plain" ? "bg-white/78" : "")}>
      <CircleAlertIcon />
      <AlertTitle>Provider-ready newsletter</AlertTitle>
      <AlertDescription>
        Newsletter signup is provider-ready and will turn on when Beehiiv is
        connected. For now, use the{" "}
        <Link className="font-medium text-primary" href="/contact">
          contact page
        </Link>{" "}
        if you want first access to new guides.
      </AlertDescription>
    </Alert>
  );

  if (variant === "plain") {
    return (
      <div className={cn("flex min-w-0 flex-col gap-5", compact ? "gap-4" : "gap-5")}>
        <div className={cn("flex flex-col", compact ? "gap-2" : "gap-2.5 sm:gap-3")}>
          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
            {siteConfig.newsletterLabel}
          </p>
          <h2 className={titleClassName}>
            A weekly sleep note for readers who want signal, not more self-optimization theater.
          </h2>
          <p className={descriptionClassName}>
            We send one concise dispatch with newly published reads, honest comparisons,
            and the occasional product note that truly earns a place in the inbox.
          </p>
        </div>
        <div>{form}</div>
      </div>
    );
  }

  return (
    <Card
      id={id}
      className={cn(
        "paper-panel",
        compact ? "gap-4" : "gap-5",
      )}
    >
      <CardHeader className={cn("flex flex-col", compact ? "gap-2" : "gap-2.5 sm:gap-3")}>
        <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
          {siteConfig.newsletterLabel}
        </p>
        <CardTitle className={titleClassName}>
          A weekly sleep note for readers who want signal, not more self-optimization theater.
        </CardTitle>
        <CardDescription className={descriptionClassName}>
          We send one concise dispatch with newly published reads, honest comparisons,
          and the occasional product note that truly earns a place in the inbox.
        </CardDescription>
      </CardHeader>
      <CardContent>{form}</CardContent>
    </Card>
  );
}
