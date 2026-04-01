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
}

export function NewsletterCard({
  compact = false,
  id = "newsletter",
}: NewsletterCardProps) {
  const subscribeUrl =
    process.env.NEXT_PUBLIC_BEEHIIV_SUBSCRIBE_URL ||
    process.env.BEEHIIV_SUBSCRIBE_URL;

  return (
    <Card
      id={id}
      className={cn(
        "border-border/80 bg-card/88",
        compact ? "gap-4" : "gap-6",
      )}
    >
      <CardHeader className={cn("flex flex-col", compact ? "gap-2" : "gap-3")}>
        <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
          {siteConfig.newsletterLabel}
        </p>
        <CardTitle className="max-w-3xl text-3xl tracking-[-0.06em] text-balance sm:text-4xl">
          A quieter weekly note on sleep habits, comparisons, and what is worth your attention.
        </CardTitle>
        <CardDescription className="max-w-3xl text-base leading-8">
          We send one concise editorial dispatch with new reads, useful comparisons,
          and the occasional product note that actually earns its place.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {subscribeUrl ? (
          <form
            action={subscribeUrl}
            className={cn(
              "flex gap-3",
              compact ? "flex-col" : "flex-col sm:flex-row sm:items-end",
            )}
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
                  placeholder="Enter your email"
                  required
                  type="email"
                />
              </Field>
            </FieldGroup>
            <Button className="sm:min-w-44" type="submit">
              Join the newsletter
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
          </form>
        ) : (
          <Alert>
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
        )}
      </CardContent>
    </Card>
  );
}
