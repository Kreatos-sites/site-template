import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";

type Stat = { numeral: string; label: string; description: string };

export function StatsSplitSidebarTintedNumeralList({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as Stat[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="border-b border-border bg-secondary px-6 py-12 sm:px-10 sm:py-16 lg:border-r lg:border-b-0 lg:py-20">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
              <h2 className="mt-5 max-w-sm font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">{t("description")}</p>
            </Reveal>
          </div>

          <div className="px-6 py-12 sm:px-10 sm:py-16 lg:py-20">
            <ul className="divide-y divide-border">
              {stats.map((s, i) => (
                <li key={i}>
                  <Reveal delay={i * 60}>
                    <div className="flex flex-col gap-4 py-8 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-10">
                      <span className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-none tabular-nums text-foreground sm:w-40 sm:shrink-0">
                        {s.numeral}
                      </span>
                      <div>
                        <p className="text-sm font-medium tracking-[0.05em] text-foreground uppercase">{s.label}</p>
                        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                          {s.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
