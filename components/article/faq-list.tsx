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
    <Accordion className="gap-3" collapsible type="single">
      {items.map((item) => (
        <AccordionItem
          key={item.question}
          className="overflow-hidden rounded-[1.5rem] border border-[color:var(--ghost-border)] bg-white/76 px-4 sm:px-5"
          value={item.question}
        >
          <AccordionTrigger className="py-4 font-serif text-[1.15rem] font-semibold tracking-[-0.04em] text-foreground hover:no-underline sm:py-5 sm:text-2xl">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="max-w-2xl pb-4 text-sm leading-7 text-muted-foreground sm:pb-5 sm:text-base sm:leading-8">
            <p>{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
