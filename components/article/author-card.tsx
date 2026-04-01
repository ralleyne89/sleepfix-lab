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
      <CardHeader className="flex flex-col gap-4">
        <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
          Editorial profile
        </p>
        <div className="flex items-center gap-4">
          <Avatar className="size-14">
            <AvatarFallback>SL</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <CardTitle className="text-3xl tracking-[-0.05em]">
              {siteConfig.author.name}
            </CardTitle>
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
              {siteConfig.author.role}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="text-base leading-8 text-muted-foreground">
          {siteConfig.author.bio}
        </p>
        <div className="flex flex-wrap gap-2">
          {siteConfig.author.credentials.map((item) => (
            <Badge key={item} variant="outline">
              {item}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
