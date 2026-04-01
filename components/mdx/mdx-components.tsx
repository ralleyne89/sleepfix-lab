import Link from "next/link";
import {
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { CircleAlertIcon } from "lucide-react";
import { AffiliateCTA } from "@/components/article/affiliate-cta";
import { ComparisonTable } from "@/components/article/comparison-table";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { slugify } from "@/lib/utils";

function getTextFromChildren(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(getTextFromChildren).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(children)) {
    return getTextFromChildren(children.props.children);
  }

  return "";
}

function MdxLink({
  href = "",
  children,
  ...rest
}: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/")) {
    return <Link href={href}>{children}</Link>;
  }

  return (
    <a href={href} rel="noopener noreferrer" target="_blank" {...rest}>
      {children}
    </a>
  );
}

function MdxHeading({
  as: Tag,
  children,
}: {
  as: "h2" | "h3";
  children: ReactNode;
}) {
  const text = getTextFromChildren(children);
  const id = slugify(text);

  return (
    <Tag id={id}>
      {children}
      <a className="anchor-link" href={`#${id}`}>
        #
      </a>
    </Tag>
  );
}

function EditorialNote({ children }: { children: ReactNode }) {
  return (
    <Alert className="my-8">
      <CircleAlertIcon />
      <AlertTitle>Editorial note</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}

export const mdxComponents = {
  h2: ({ children }: { children: ReactNode }) => (
    <MdxHeading as="h2">{children}</MdxHeading>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <MdxHeading as="h3">{children}</MdxHeading>
  ),
  a: MdxLink,
  ComparisonTable,
  AffiliateCTA,
  EditorialNote,
};
