import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { ArrowUpRight, TrendingUp } from "lucide-react";

type Stat = { value: string; label: string };
type ChartPoint = { label: string; value: number };
type Metric = { label: string; value: string };

export function HeroWithAnalyticsDashboard({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as Stat[];
  const chart = t.raw("chart") as ChartPoint[];
  const metrics = t.raw("dashboard.metrics") as Metric[];
  const maxValue = Math.max(...chart.map((point) => point.value));

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Columna texto */}
          <div className="lg:col-span-6">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h1 className="mt-5 font-display text-[clamp(2.25rem,1.4rem+3.6vw,3.75rem)] leading-[1.03] tracking-tight text-balance text-foreground">
                {t("title")}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
                {t("subtitle")}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={t("primaryCta.href")}
                  className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {t("primaryCta.label")}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={t("secondaryCta.href")}
                  className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {t("secondaryCta.label")}
                </a>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <dl className="mt-14 grid grid-cols-3 gap-x-6 border-t border-border pt-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-display text-[clamp(1.5rem,1.1rem+1.2vw,2.1rem)] leading-none tracking-tight text-foreground tabular-nums">
                      {stat.value}
                    </dd>
                    <p className="mt-2 text-xs leading-snug tracking-wide text-muted-foreground uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Columna dashboard */}
          <div className="lg:col-span-6">
            <Reveal delay={80}>
              <div className="rounded-sm border border-border bg-card p-6 shadow-sm sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                      {t("dashboard.label")}
                    </p>
                    <p className="mt-2 font-display text-3xl tracking-tight text-foreground tabular-nums">
                      {t("dashboard.value")}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-sm bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                    <TrendingUp className="size-3.5" aria-hidden="true" />
                    {t("dashboard.delta")}
                  </span>
                </div>

                {/* Chart de barras en CSS puro */}
                <div className="mt-8 flex h-40 items-end gap-3 border-b border-border pb-1">
                  {chart.map((point, index) => (
                    <div
                      key={point.label}
                      className="flex flex-1 flex-col items-center gap-2"
                    >
                      <div
                        className={
                          index === chart.length - 1
                            ? "w-full rounded-t-sm bg-primary transition-[height]"
                            : "w-full rounded-t-sm bg-primary/15 transition-[height]"
                        }
                        style={{
                          height: `${Math.max((point.value / maxValue) * 100, 6)}%`,
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex gap-3">
                  {chart.map((point) => (
                    <span
                      key={point.label}
                      className="flex-1 text-center text-[0.65rem] font-medium tracking-wide text-muted-foreground uppercase"
                    >
                      {point.label}
                    </span>
                  ))}
                </div>

                <ul className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
                  {metrics.map((metric) => (
                    <li key={metric.label}>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        {metric.label}
                      </p>
                      <p className="mt-1 font-display text-lg tracking-tight text-foreground tabular-nums">
                        {metric.value}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
