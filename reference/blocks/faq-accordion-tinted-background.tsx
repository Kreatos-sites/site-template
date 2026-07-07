import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

type FaqItem = { question: string; answer: string };

export function FaqAccordionTintedBackground({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as FaqItem[];

  return (
    <section className="border-t border-border bg-secondary py-(--section-gap)">
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col gap-3">
          {items.map((item, index) => (
            <Reveal key={index} delay={index * 60}>
              <details className="group rounded-sm border border-border bg-card px-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left">
                  <h3 className="font-display text-base leading-snug tracking-tight text-balance text-foreground sm:text-lg">
                    {item.question}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="relative mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-border text-muted-foreground"
                  >
                    <span className="absolute h-px w-3 bg-current" />
                    <span className="absolute h-3 w-px bg-current transition-opacity duration-200 group-open:opacity-0" />
                  </span>
                </summary>
                <div className="max-w-2xl pr-10 pb-6 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
