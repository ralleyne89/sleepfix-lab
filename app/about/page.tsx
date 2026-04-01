import { buildPageMetadata } from "@/lib/seo";
import { UtilityPageShell } from "@/components/shared/utility-page-shell";

export const metadata = buildPageMetadata({
  title: "About SleepFix Lab",
  description:
    "Why SleepFix Lab exists, what the site is trying to improve in the sleep content landscape, and how the editorial desk thinks about trust.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <UtilityPageShell
      description="Why SleepFix Lab exists, what the site is trying to improve in the sleep content landscape, and how the editorial desk thinks about trust."
      eyebrow="About"
      title="SleepFix Lab is an editorial project for people trying to sleep better without drowning in fluff."
    >
      <div className="article-prose max-w-4xl">
          <p>
            The sleep category is crowded with two extremes: clinical content that
            never gets practical, and affiliate pages that rush straight to the
            “best product” without explaining the trade-offs. SleepFix Lab is built
            to sit between those extremes.
          </p>
          <p>
            We publish clear, reader-first articles about snoring, sleep quality,
            and the products people are already researching. The editorial lens is
            simple: show the buying context, describe where a product helps, and
            say plainly when the better answer is routine change, room setup, or
            professional support.
          </p>
          <p>
            This version of the site is the public-facing launch foundation. The
            admin tooling and AI publishing workflow come later. Right now, the job
            is trust, structure, and clean SEO fundamentals.
          </p>
      </div>
    </UtilityPageShell>
  );
}
