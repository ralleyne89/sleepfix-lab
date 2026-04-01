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
    <Card className="comparison-table my-10 bg-card/84">
      <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
            Comparison table
          </p>
          <CardTitle className="text-2xl tracking-[-0.05em]">{title}</CardTitle>
        </div>
        <CardDescription className="max-w-sm text-sm leading-6">
          Replace placeholder destinations with your live affiliate links before
          launch.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-4">Product</TableHead>
              <TableHead className="px-4 py-4">Best for</TableHead>
              <TableHead className="px-4 py-4">Trade-offs</TableHead>
              <TableHead className="px-4 py-4">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="px-4 py-5 align-top whitespace-normal">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{product.badge}</Badge>
                      <Badge variant="outline">{product.priceLabel}</Badge>
                    </div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="leading-6 text-muted-foreground">{product.summary}</p>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-5 align-top whitespace-normal text-muted-foreground">
                  <ul className="flex flex-col gap-2">
                    {product.pros.map((pro) => (
                      <li key={pro}>{pro}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell className="px-4 py-5 align-top whitespace-normal text-muted-foreground">
                  <ul className="flex flex-col gap-2">
                    {product.cons.map((con) => (
                      <li key={con}>{con}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell className="px-4 py-5 align-top whitespace-normal">
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
      </CardContent>
    </Card>
  );
}
