import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-4xl items-center px-5 py-10 lg:px-8">
      <Card className="w-full bg-card/88">
        <CardHeader className="flex flex-col gap-4">
          <p className="eyebrow">Page not found</p>
          <CardTitle className="text-5xl tracking-[-0.06em] text-balance">
            This page is not part of the launch map yet.
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          <p className="max-w-2xl text-base leading-8 text-muted-foreground">
            The public site is intentionally compact in its first release. Head back
            to the home page or browse one of the live categories.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/">
                Go home
                <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/snoring">Browse snoring guides</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
