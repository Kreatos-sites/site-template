import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { RiArrowRightLine, RiBarChartBoxLine } from "@remixicon/react";

type StatCard = { value: string; label: string };
type ChartPoint = { label: string; value: number };
type TableRow = { name: string; status: string; value: string };

export function HeroSplitDashboardScreenshotDualCtaLeft({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const stats = t.raw("screenshot.stats") as StatCard[];
  const chart = t.raw("screenshot.chart") as ChartPoint[];
  const rows = t.raw("screenshot.rows") as TableRow[];
  const maxValue = Math.max(...chart.map((point) => point.value));

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Columna texto */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h1 className="mt-5 font-display text-[clamp(2.25rem,1.4rem+3.6vw,3.75rem)] leading-[1.03] tracking-tight text-balance text-foreground">
                {t("title")}
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
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
                  <RiArrowRightLine className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={t("secondaryCta.href")}
                  className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {t("secondaryCta.label")}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Columna dashboard enmarcado */}
          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <div className="rounded-sm border border-border bg-card shadow-sm">
                <div className="flex items-center gap-2 border-b border-border px-5 py-3">
                  <span className="size-2.5 rounded-full bg-muted-foreground/25" />
                  <span className="size-2.5 rounded-full bg-muted-foreground/25" />
                  <span className="size-2.5 rounded-full bg-muted-foreground/25" />
                  <span className="ml-3 flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground">
                    <RiBarChartBoxLine className="size-3.5" aria-hidden="true" />
                    {t("screenshot.label")}
                  </span>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-3 gap-4">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-sm bg-secondary p-4"
                      >
                        <p className="font-display text-xl tracking-tight text-foreground tabular-nums">
                          {stat.value}
                        </p>
                        <p className="mt-1 text-[0.65rem] font-medium tracking-wide text-muted-foreground uppercase">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex h-32 items-end gap-3 border-b border-border pb-1">
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

                  <table className="mt-8 w-full border-t border-border pt-2 text-left">
                    <caption className="sr-only">
                      {t("screenshot.tableCaption")}
                    </caption>
                    <thead>
                      <tr>
                        <th className="pt-4 pb-2 text-[0.65rem] font-medium tracking-wide text-muted-foreground uppercase">
                          {t("screenshot.headers.name")}
                        </th>
                        <th className="pt-4 pb-2 text-[0.65rem] font-medium tracking-wide text-muted-foreground uppercase">
                          {t("screenshot.headers.status")}
                        </th>
                        <th className="pt-4 pb-2 text-right text-[0.65rem] font-medium tracking-wide text-muted-foreground uppercase">
                          {t("screenshot.headers.value")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row) => (
                        <tr key={row.name} className="border-t border-border">
                          <td className="py-3 text-sm text-foreground">
                            {row.name}
                          </td>
                          <td className="py-3 text-sm text-muted-foreground">
                            {row.status}
                          </td>
                          <td className="py-3 text-right text-sm text-foreground tabular-nums">
                            {row.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
