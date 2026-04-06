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
          <AccordionTrigger className="py-4 font-serif text-[1.15rem] font-semibold tracking-[-0.04em] text-foreground hover:no-underline sm:py-5 sm:text-2xl">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
            <p>{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
