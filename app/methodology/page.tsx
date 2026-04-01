import { buildPageMetadata } from "@/lib/seo";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { UtilityPageShell } from "@/components/shared/utility-page-shell";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  title: "Editorial Methodology",
  description:
    "How SleepFix Lab reviews products, writes comparisons, and manages affiliate disclosures without leaning on hype or risky health claims.",
  path: "/methodology",
});

const steps = [
  "Start from the reader question, not from a brand list.",
  "Review product positioning, price band, usability, and likely adaptation friction.",
  "Cross-check against evidence-backed sleep and behavior guidance when a claim touches recovery, snoring, or routine change.",
  "Call out when a symptom suggests medical review rather than more shopping.",
  "Keep affiliate relationships disclosed and separate from the ranking logic.",
];

export default function MethodologyPage() {
  return (
    <UtilityPageShell
      description="How SleepFix Lab reviews products, writes comparisons, and manages affiliate disclosures without leaning on hype or risky health claims."
      eyebrow="Methodology"
      title="We design articles the same way a good editor designs a recommendation: with context first."
    >
      <div className="grid gap-4">
          {steps.map((step, index) => (
            <Card key={step} className="bg-card/84">
              <CardContent className="flex flex-col gap-3 pt-6">
                <p className="eyebrow">Step {index + 1}</p>
                <p className="text-base leading-8 text-muted-foreground">{step}</p>
              </CardContent>
            </Card>
          ))}
      </div>
      <p className="mt-8 text-sm leading-7 text-muted-foreground">{siteConfig.legal.medical}</p>
    </UtilityPageShell>
  );
}
