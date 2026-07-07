import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  RiTruckLine,
  RiTimeLine,
  RiUserSmileLine,
  RiMapPin2Line,
  RiArrowUpSFill,
  RiArrowDownSFill,
} from "@remixicon/react";

type Metric = {
  icon: string;
  value: string;
  label: string;
  delta: string;
  trend: "up" | "down";
};

const ICONS: Record<string, typeof RiTruckLine> = {
  truck: RiTruckLine,
  time: RiTimeLine,
  user: RiUserSmileLine,
  pin: RiMapPin2Line,
};

export function StatsMetricBandCountupAnimated({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const metrics = t.raw("metrics") as Metric[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <dl className="mt-16 grid grid-cols-1 divide-y divide-border border-t border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {metrics.map((metric, i) => {
            const Icon = ICONS[metric.icon] ?? RiTruckLine;
            const TrendIcon = metric.trend === "up" ? RiArrowUpSFill : RiArrowDownSFill;
            return (
              <Reveal key={metric.label} delay={i * 60}>
                <div className="flex h-full flex-col gap-6 px-2 py-8 sm:px-8">
                  <Icon className="size-5 text-primary" aria-hidden="true" />
                  <div>
                    <dd className="font-display text-[clamp(2rem,1.4rem+2vw,3rem)] leading-none tracking-tight text-foreground tabular-nums">
                      {metric.value}
                    </dd>
                    <dt className="mt-3 text-sm leading-snug text-muted-foreground">
                      {metric.label}
                    </dt>
                  </div>
                  <span
                    className={cn(
                      "inline-flex w-fit items-center gap-0.5 rounded-sm bg-secondary px-2 py-1 text-xs font-medium tabular-nums",
                      metric.trend === "up" ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    <TrendIcon className="size-3.5" aria-hidden="true" />
                    {metric.delta}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
