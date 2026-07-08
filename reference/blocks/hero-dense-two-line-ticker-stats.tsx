import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";

type TickerStat = { value: string; label: string; trend?: string };

export function HeroDenseTwoLineTickerStats({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as TickerStat[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            <span className="block">{t("titleLine1")}</span>
            <span className="block">{t("titleLine2")}</span>
          </h1>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 overflow-x-auto border-y border-border">
            <dl className="flex w-max min-w-full divide-x divide-border">
              {stats.map((s, i) => (
                <div key={i} className="flex min-w-[9.5rem] flex-1 flex-col gap-1.5 px-6 py-5">
                  <dt className="text-[0.65rem] font-medium tracking-[0.18em] text-muted-foreground uppercase">
                    {s.label}
                  </dt>
                  <dd className="flex items-baseline gap-1.5 font-mono text-2xl tracking-tight text-foreground">
                    {s.value}
                    {s.trend ? (
                      <span className="inline-flex items-center gap-0.5 text-xs font-medium text-primary">
                        <ArrowUpRight className="size-3" strokeWidth={2} />
                        {s.trend}
                      </span>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
