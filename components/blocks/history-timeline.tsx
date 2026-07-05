import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

type Milestone = { year: string; text: string };

export function HistoryTimeline({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const milestones = t.raw("milestones") as Milestone[];

  return (
    <section className="border-t border-border bg-secondary py-(--section-gap) text-secondary-foreground">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[0.95] tracking-tight text-balance">
                {t("title")}
              </h2>
              <div className="mt-8 hidden h-px w-24 bg-primary/40 lg:block" aria-hidden="true" />
            </div>
          </Reveal>

          <ol className="relative border-l border-border/70 pl-8 sm:pl-12">
            {milestones.map((milestone, index) => (
              <li
                key={milestone.year}
                className="relative pb-14 last:pb-0"
              >
                <Reveal delay={index * 70}>
                  <span
                    aria-hidden="true"
                    className="absolute -left-[calc(2rem+1px)] top-2 size-2.5 -translate-x-1/2 rounded-full bg-primary ring-4 ring-secondary sm:-left-[calc(3rem+1px)]"
                  />
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-8">
                    <span className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-none tabular-nums tracking-tight text-primary/70">
                      {milestone.year}
                    </span>
                    <p className="max-w-md text-base leading-relaxed text-secondary-foreground/80">
                      {milestone.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
