import Link from "next/link";
import type { CategoryMeta } from "@/lib/site-config";

interface CategoryCardProps {
  category: CategoryMeta;
  count: number;
}

export function CategoryCard({ category, count }: CategoryCardProps) {
  return (
    <Link
      href={`/${category.slug}`}
      className="editorial-rule group relative block py-6 transition"
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_160px] lg:items-end">
        <div className="space-y-4">
          <p className="eyebrow">{category.slug.replace("-", " ")}</p>
          <h3 className="font-serif text-[2.45rem] font-semibold tracking-[-0.06em] text-balance transition group-hover:text-accent-strong">
            {category.title}
          </h3>
          <p className="max-w-2xl text-base leading-8 text-muted">
            {category.description}
          </p>
        </div>
        <div className="space-y-3 text-sm text-muted lg:text-right">
          <p>{count} live article{count === 1 ? "" : "s"}</p>
          <p className="font-medium text-accent-strong transition group-hover:translate-x-1">
            Enter the section
          </p>
        </div>
      </div>
    </Link>
  );
}
