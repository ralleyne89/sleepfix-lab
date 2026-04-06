import { getFeaturedProducts } from "@/lib/content";
import { ArrowRightIcon, CircleAlertIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AffiliateCTAProps {
  productId: string;
  title?: string;
  buttonLabel?: string;
}

export function AffiliateCTA({
  productId,
  title = "Our pick for this use case",
  buttonLabel = "See current pricing",
}: AffiliateCTAProps) {
  const [product] = getFeaturedProducts([productId]);

  if (!product) {
    return null;
  }

  return (
    <aside className="my-10">
      <Card className="bg-card/84">
        <CardHeader className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{title}</Badge>
            <Badge variant="outline">{product.badge}</Badge>
            <Badge variant="outline">{product.priceLabel}</Badge>
          </div>
          <CardTitle className="text-[1.9rem] tracking-[-0.06em] sm:text-[2.6rem]">
            {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <p className="max-w-2xl leading-8 text-muted-foreground">{product.summary}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {product.pros.map((pro) => (
              <Alert key={pro} className="bg-secondary/78 shadow-none">
                <CircleAlertIcon />
                <AlertTitle>Why it earns a look</AlertTitle>
                <AlertDescription>{pro}</AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button asChild className="w-full justify-center sm:w-auto">
            <a
              href={product.url}
              rel="noopener noreferrer sponsored nofollow"
              target="_blank"
            >
              {buttonLabel}
              <ArrowRightIcon data-icon="inline-end" />
            </a>
          </Button>
          <p className="max-w-sm text-xs leading-6 text-muted-foreground">{product.disclaimer}</p>
        </CardFooter>
      </Card>
    </aside>
  );
}
