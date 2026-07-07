import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { RiAddLine, RiSubtractLine } from "@remixicon/react";

type FaqItem = { question: string; answer: string };

export function FaqAccordionTwoColumnBordered({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as FaqItem[];
  const half = Math.ceil(items.length / 2);
  const columns = [items.slice(0, half), items.slice(half)];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-12 lg:grid-cols-2">
          {columns.map((column, colIndex) => (
            <div
              key={colIndex}
              className="flex flex-col divide-y divide-border border-t border-border first:border-t lg:border-t"
            >
              {column.map((item, index) => {
                const globalIndex = colIndex === 0 ? index : half + index;
                return (
                  <Reveal key={globalIndex} delay={globalIndex * 60}>
                    <details className="group px-1 py-2 [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left">
                        <h3 className="font-display text-base leading-snug tracking-tight text-balance text-foreground sm:text-lg">
                          {item.question}
                        </h3>
                        <span
                          aria-hidden="true"
                          className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-border text-muted-foreground"
                        >
                          <RiAddLine className="size-4 group-open:hidden" />
                          <RiSubtractLine className="hidden size-4 group-open:block" />
                        </span>
                      </summary>
                      <div className="max-w-md pr-10 pb-6 text-sm leading-relaxed text-muted-foreground">
                        {item.answer}
                      </div>
                    </details>
                  </Reveal>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
