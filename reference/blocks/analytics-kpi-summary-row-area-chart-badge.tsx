import { useTranslations } from "next-intl";
import { TrendUpIcon, TrendDownIcon } from "@phosphor-icons/react/dist/ssr";

import { Reveal } from "@/components/shared/reveal";

type ChartPoint = {
  label: string;
  value: number;
};

type Kpi = {
  label: string;
  value: string;
};

const VIEWBOX_WIDTH = 600;
const VIEWBOX_HEIGHT = 180;
const PADDING_X = 12;
const PADDING_Y = 12;

function buildPath(points: number[]) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const step = (VIEWBOX_WIDTH - PADDING_X * 2) / (points.length - 1);

  const coords = points.map((value, i) => {
    const x = PADDING_X + i * step;
    const y =
      VIEWBOX_HEIGHT -
      PADDING_Y -
      ((value - min) / range) * (VIEWBOX_HEIGHT - PADDING_Y * 2);
    return { x, y };
  });

  const line = coords
    .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
    .join(" ");

  const area = `${line} L ${coords[coords.length - 1].x.toFixed(1)} ${VIEWBOX_HEIGHT - PADDING_Y} L ${coords[0].x.toFixed(1)} ${VIEWBOX_HEIGHT - PADDING_Y} Z`;

  return { line, area, coords };
}

export function AnalyticsKpiSummaryRowAreaChartBadge({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const chart = t.raw("chart") as ChartPoint[];
  const kpis = t.raw("kpis") as Kpi[];
  const growthUp = t("growth.direction") === "up";
  const values = chart.map((point) => point.value);
  const { line, area, coords } = buildPath(values);

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-12 rounded-lg border border-border bg-card p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {t("cardTitle")}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("cardSubtitle")}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 self-start rounded-md bg-secondary px-3 py-1.5">
                {growthUp ? (
                  <TrendUpIcon className="size-4 text-primary" weight="bold" />
                ) : (
                  <TrendDownIcon
                    className="size-4 text-muted-foreground"
                    weight="bold"
                  />
                )}
                <span className="text-sm font-medium text-secondary-foreground">
                  {t("growth.value")}
                </span>
                <span className="text-xs text-muted-foreground">
                  {t("growth.label")}
                </span>
              </div>
            </div>

            <ul className="mt-8 grid grid-cols-1 divide-y divide-border border-t border-b border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {kpis.map((kpi, i) => (
                <li
                  key={i}
                  className="py-5 first:pt-5 sm:px-6 sm:first:pl-0 sm:last:pr-0"
                >
                  <p className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
                    {kpi.label}
                  </p>
                  <p className="mt-2 font-display text-2xl text-foreground sm:text-3xl">
                    {kpi.value}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <svg
                viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
                className="h-40 w-full sm:h-48"
                preserveAspectRatio="none"
                role="img"
                aria-label={t("chartLabel")}
              >
                <defs>
                  <linearGradient id={`${ns}-fill`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={area} fill={`url(#${ns}-fill)`} stroke="none" />
                <path
                  d={line}
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {coords.map((c, i) => (
                  <circle
                    key={i}
                    cx={c.x}
                    cy={c.y}
                    r={i === coords.length - 1 ? 4 : 2.5}
                    fill="var(--primary)"
                  />
                ))}
              </svg>
              <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                <span>{chart[0]?.label}</span>
                <span>{chart[chart.length - 1]?.label}</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
