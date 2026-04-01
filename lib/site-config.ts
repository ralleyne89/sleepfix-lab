export const ARTICLE_CATEGORIES = [
  "snoring",
  "sleep-quality",
  "sleep-products",
  "comparisons",
  "guides",
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export interface ArticleFAQItem {
  question: string;
  answer: string;
}

export interface ArticleSource {
  title: string;
  url: string;
  publisher: string;
}

export interface ArticleHero {
  eyebrow: string;
  accent: string;
  mood: string;
}

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  category: ArticleCategory;
  excerpt: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  featuredProductIds: string[];
  faq: ArticleFAQItem[];
  sources: ArticleSource[];
  hero: ArticleHero;
  coverImage?: string;
  coverAlt?: string;
  ogImage?: string;
}

export interface AffiliateProduct {
  id: string;
  name: string;
  merchant: string;
  url: string;
  category: ArticleCategory;
  badge: string;
  priceLabel: string;
  summary: string;
  pros: string[];
  cons: string[];
  disclaimer: string;
}

export interface TocHeading {
  id: string;
  level: 2 | 3;
  text: string;
}

export interface CategoryMeta {
  slug: ArticleCategory;
  title: string;
  description: string;
  focus: string;
  accent: string;
  launchIdeas: string[];
}

export interface HomepageEditorialConfig {
  leadArticleSlug: string;
  secondaryArticleSlugs: string[];
  homepageSectionOrder: ArticleCategory[];
}

export const siteConfig = {
  name: "SleepFix Lab",
  shortName: "SleepFix",
  tagline: "Quiet nights, clearer mornings",
  publicationNote: "An editorial journal for better sleep decisions",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://sleepfixlab.com",
  description:
    "Calm, research-grounded guides on snoring, sleep quality, and sleep products that help readers make better choices without the wellness noise.",
  keywords: [
    "sleep improvement",
    "snoring solutions",
    "sleep product reviews",
    "sleep quality guides",
    "wellness editorial",
  ],
  email: "hello@sleepfixlab.com",
  newsletterLabel: "Quiet Mornings Dispatch",
  author: {
    name: "SleepFix Editorial Desk",
    role: "Sleep and recovery research team",
    bio: "SleepFix Lab translates product research, habit science, and sleep-environment best practices into practical buying and behavior guidance for adults trying to sleep better.",
    credentials: [
      "Consumer sleep product reviews",
      "Evidence-backed habit analysis",
      "Affiliate disclosure-first editorial process",
    ],
  },
  legal: {
    medical:
      "Our content is educational only and should not replace medical advice. If snoring is paired with choking, gasping, or daytime breathing concerns, speak with a licensed clinician.",
    affiliate:
      "SleepFix Lab may earn a commission when readers buy through select links, at no extra cost to them. Recommendations are made independently of advertiser control.",
  },
} as const;

export const categoryMeta: Record<ArticleCategory, CategoryMeta> = {
  snoring: {
    slug: "snoring",
    title: "Snoring Remedies",
    description:
      "Device reviews, lifestyle fixes, and plain-language explainers for adults trying to quiet the night without guesswork.",
    focus: "Commercial-intent product research with realistic sleep and airway context.",
    accent: "from-accent-soft/70 via-white to-rose/30",
    launchIdeas: [
      "Best anti-snoring mouthguards",
      "Does alcohol make snoring worse?",
      "How to choose nasal dilators",
    ],
  },
  "sleep-quality": {
    slug: "sleep-quality",
    title: "Sleep Quality",
    description:
      "Evidence-aware habit guides, supplement explainers, and routines that support deeper and more consistent sleep.",
    focus: "Actionable behavior and supplement content for light sleepers and routine builders.",
    accent: "from-sand/45 via-white to-accent-soft/25",
    launchIdeas: [
      "Magnesium glycinate for sleep",
      "Best bedtime routines",
      "How to fix middle-of-the-night wakeups",
    ],
  },
  "sleep-products": {
    slug: "sleep-products",
    title: "Sleep Products",
    description:
      "Thoughtful reviews of trackers, sound devices, pillows, and ambient gear that shape how a room feels at night.",
    focus: "High-AOV product discovery with practical setup advice and expectation setting.",
    accent: "from-accent-soft/60 via-white to-sand/30",
    launchIdeas: [
      "Best sleep trackers under $100",
      "White noise machines that blend into a bedroom",
      "Weighted blanket buying guide",
    ],
  },
  comparisons: {
    slug: "comparisons",
    title: "Head-to-Head Comparisons",
    description:
      "Decision-ready matchups for readers choosing between two products with similar promises but different trade-offs.",
    focus: "Fast, comparison-first pages designed to convert high-intent searchers.",
    accent: "from-rose/30 via-white to-accent-soft/35",
    launchIdeas: [
      "ZQuiet vs SnoreRx",
      "Oura Ring vs Fitbit for sleep",
      "Hatch Restore vs white noise machine",
    ],
  },
  guides: {
    slug: "guides",
    title: "Deep Guides",
    description:
      "Long-form pillar articles that stitch together causes, protocols, product choices, and next-step resources.",
    focus: "Topical authority pages that support the rest of the internal linking system.",
    accent: "from-sand/40 via-white to-rose/18",
    launchIdeas: [
      "Ultimate guide to stopping snoring",
      "How to fix your sleep schedule",
      "Sleep environment optimization checklist",
    ],
  },
};

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/snoring", label: "Snoring" },
  { href: "/sleep-quality", label: "Sleep Quality" },
  { href: "/sleep-products", label: "Sleep Products" },
  { href: "/comparisons", label: "Comparisons" },
  { href: "/guides", label: "Guides" },
] as const;

export const utilityNav = [
  { href: "/about", label: "About" },
  { href: "/methodology", label: "Methodology" },
  { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
  { href: "/privacy", label: "Privacy" },
  { href: "/contact", label: "Contact" },
] as const;

export const homepageEditorial: HomepageEditorialConfig = {
  leadArticleSlug: "best-mouthguards-for-snoring-2025",
  secondaryArticleSlugs: [
    "oura-ring-vs-fitbit-for-sleep",
    "magnesium-glycinate-for-sleep-full-guide",
  ],
  homepageSectionOrder: [
    "snoring",
    "sleep-quality",
    "comparisons",
    "sleep-products",
    "guides",
  ],
};

export function isArticleCategory(value: string): value is ArticleCategory {
  return ARTICLE_CATEGORIES.includes(value as ArticleCategory);
}
