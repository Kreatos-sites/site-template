import { useTranslations } from "next-intl";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import type { SectionOf } from "@/lib/config";

type FaqItem = { question: string; answer: string };

export function Faq({ count, ns }: SectionOf<"faq">) {
  const t = useTranslations(ns ?? "faq");
  const allItems = t.raw("items") as FaqItem[];
  const items = count ? allItems.slice(0, count) : allItems;

  return (
    <section id="preguntas" className="border-t border-border py-(--section-gap)">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <Reveal>
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <Reveal delay={100}>
            <Accordion type="single" collapsible className="w-full">
              {items.map((item, index) => (
                <AccordionItem key={item.question} value={`item-${index}`}>
                  <AccordionTrigger className="py-5 font-display text-base tracking-tight sm:text-lg">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
