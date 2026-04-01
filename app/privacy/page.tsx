import { buildPageMetadata } from "@/lib/seo";
import { UtilityPageShell } from "@/components/shared/utility-page-shell";

export const metadata = buildPageMetadata({
  title: "Privacy",
  description:
    "Launch-stage privacy notes for SleepFix Lab covering analytics, newsletter signup, and reader contact requests.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <UtilityPageShell
      description="Launch-stage privacy notes for SleepFix Lab covering analytics, newsletter signup, and reader contact requests."
      eyebrow="Privacy"
      title="A simple launch-stage privacy policy."
    >
      <div className="article-prose max-w-4xl">
          <p>
            SleepFix Lab collects minimal data. Standard analytics tools may record
            page visits, referring pages, and device information to help us
            understand which guides are useful.
          </p>
          <p>
            If newsletter signup is enabled, email addresses are handled by the
            connected provider. If you contact us directly, your email is used only
            to respond to your request.
          </p>
          <p>
            This launch version does not include reader accounts, comment profiles,
            or behavioral personalization. If that changes later, this page should
            be expanded before those features go live.
          </p>
      </div>
    </UtilityPageShell>
  );
}
