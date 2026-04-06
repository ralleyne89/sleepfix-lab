import { siteConfig } from "@/lib/site-config";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AuthorCard() {
  return (
    <Card className="bg-card/84">
      <CardHeader className="flex flex-col gap-3.5">
        <p className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
          Editorial profile
        </p>
        <div className="flex items-center gap-3.5 sm:gap-4">
          <Avatar className="size-14 rounded-full border border-[color:var(--ghost-border)] bg-secondary sm:size-16">
            <AvatarFallback>SL</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <CardTitle className="text-[1.7rem] tracking-[-0.06em] sm:text-[2.2rem]">
              {siteConfig.author.name}
            </CardTitle>
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground sm:text-[0.72rem]">
              {siteConfig.author.role}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
          {siteConfig.author.bio}
        </p>
        <div className="flex flex-wrap gap-2">
          {siteConfig.author.credentials.map((item) => (
            <Badge
              key={item}
              className="h-auto max-w-full whitespace-normal px-3 py-1 text-center leading-5 tracking-[0.18em]"
              variant="outline"
            >
              {item}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
