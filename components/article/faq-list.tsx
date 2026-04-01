import type { ArticleFAQItem } from "@/lib/site-config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqListProps {
  items: ArticleFAQItem[];
}

export function FaqList({ items }: FaqListProps) {
  return (
    <Accordion collapsible type="single">
      {items.map((item) => (
        <AccordionItem key={item.question} value={item.question}>
          <AccordionTrigger className="py-5 font-serif text-2xl font-semibold tracking-[-0.04em] text-foreground hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="max-w-2xl text-base leading-8 text-muted-foreground">
            <p>{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
