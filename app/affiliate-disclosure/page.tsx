import { buildPageMetadata } from "@/lib/seo";
import { UtilityPageShell } from "@/components/shared/utility-page-shell";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  title: "Affiliate Disclosure",
  description:
    "How SleepFix Lab uses affiliate links, what that means for readers, and how the editorial process stays independent of advertiser influence.",
  path: "/affiliate-disclosure",
});

export default function AffiliateDisclosurePage() {
  return (
    <UtilityPageShell
      description="How SleepFix Lab uses affiliate links, what that means for readers, and how the editorial process stays independent of advertiser influence."
      eyebrow="Affiliate disclosure"
      title="SleepFix Lab may earn a commission when readers buy through select links."
    >
      <div className="article-prose max-w-4xl">
          <p>{siteConfig.legal.affiliate}</p>
          <p>
            Commission eligibility does not guarantee inclusion. A product still
            needs to fit the reader intent, the price context, and the trade-offs
            we are willing to state publicly on the page.
          </p>
          <p>
            We aim to make the commercial layer obvious. Product modules, buttons,
            and comparison tables are clearly framed, and this disclosure page is
            linked in the global footer so it is easy to find from anywhere on the
            site.
          </p>
      </div>
    </UtilityPageShell>
  );
}
