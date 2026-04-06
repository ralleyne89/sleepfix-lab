import { getFeaturedProducts } from "@/lib/content";
import { ArrowRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ComparisonTableProps {
  productIds: string[];
  title?: string;
}

export function ComparisonTable({
  productIds,
  title = "Quick comparison",
}: ComparisonTableProps) {
  const products = getFeaturedProducts(productIds);

  return (
    <Card className="comparison-table my-12 bg-card/88" data-comparison-table>
      <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
            Comparison table
          </p>
          <CardTitle className="text-[1.9rem] tracking-[-0.06em] sm:text-[2.4rem]">{title}</CardTitle>
        </div>
        <CardDescription className="max-w-sm text-sm leading-7">
          Replace placeholder destinations with your live affiliate links before
          launch.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="grid gap-4 md:hidden">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-[1.6rem] border border-[color:var(--ghost-border)] bg-white/76 p-4"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{product.badge}</Badge>
                  <Badge variant="outline">{product.priceLabel}</Badge>
                </div>
                <div className="space-y-1.5">
                  <p className="font-serif text-[1.35rem] font-medium tracking-[-0.05em] text-foreground">{product.name}</p>
                  <p className="text-sm leading-7 text-muted-foreground">{product.summary}</p>
                </div>
                <div className="grid gap-3.5">
                  <div className="space-y-2">
                    <p className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                      Best for
                    </p>
                    <ul className="grid gap-2 pl-4 text-sm leading-6 text-muted-foreground">
                      {product.pros.map((pro) => (
                        <li key={pro} className="list-disc">
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                      Trade-offs
                    </p>
                    <ul className="grid gap-2 pl-4 text-sm leading-6 text-muted-foreground">
                      {product.cons.map((con) => (
                        <li key={con} className="list-disc">
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Button asChild className="w-full justify-center" size="sm" variant="outline">
                  <a
                    href={product.url}
                    rel="noopener noreferrer sponsored nofollow"
                    target="_blank"
                  >
                    View details
                    <ArrowRightIcon data-icon="inline-end" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block">
          <Table className="comparison-table-grid">
            <TableHeader>
              <TableRow className="border-transparent hover:bg-transparent">
                <TableHead className="px-5 py-4">Product</TableHead>
                <TableHead className="px-5 py-4">Best for</TableHead>
                <TableHead className="px-5 py-4">Trade-offs</TableHead>
                <TableHead className="px-5 py-4">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="comparison-row">
                  <TableCell className="px-5 py-6 align-top whitespace-normal">
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">{product.badge}</Badge>
                        <Badge variant="outline">{product.priceLabel}</Badge>
                      </div>
                      <p className="font-serif text-[1.45rem] font-medium tracking-[-0.05em] text-foreground">{product.name}</p>
                      <p className="leading-7 text-muted-foreground">{product.summary}</p>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-6 align-top whitespace-normal text-muted-foreground">
                    <ul className="flex flex-col gap-2">
                      {product.pros.map((pro) => (
                        <li key={pro}>{pro}</li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell className="px-5 py-6 align-top whitespace-normal text-muted-foreground">
                    <ul className="flex flex-col gap-2">
                      {product.cons.map((con) => (
                        <li key={con}>{con}</li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell className="px-5 py-6 align-top whitespace-normal">
                    <Button asChild size="sm" variant="outline">
                      <a
                        href={product.url}
                        rel="noopener noreferrer sponsored nofollow"
                        target="_blank"
                      >
                        View details
                        <ArrowRightIcon data-icon="inline-end" />
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
