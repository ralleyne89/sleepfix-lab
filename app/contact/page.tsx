import { buildPageMetadata } from "@/lib/seo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UtilityPageShell } from "@/components/shared/utility-page-shell";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Reach the SleepFix Lab editorial desk for launch feedback, topic suggestions, or partnership conversations.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <UtilityPageShell
      description="Reach the SleepFix Lab editorial desk for launch feedback, topic suggestions, or partnership conversations."
      eyebrow="Contact"
      title="Reach the editorial desk."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Card className="bg-card/84">
          <CardHeader className="flex flex-col gap-3">
            <p className="eyebrow">Email</p>
            <CardTitle className="text-3xl tracking-[-0.05em]">
              <a className="text-primary" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </CardTitle>
            <CardDescription className="text-sm leading-7">
              For launch feedback, topic requests, or reader questions about an
              article we published.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-card/84">
          <CardHeader className="flex flex-col gap-3">
            <p className="eyebrow">Best use cases</p>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm leading-7 text-muted-foreground">
            <p>Suggest a comparison or guide for the next batch.</p>
            <p>Flag a link that needs updating before launch.</p>
            <p>Ask about partnerships that fit the editorial standards.</p>
          </CardContent>
        </Card>
      </div>
    </UtilityPageShell>
  );
}
