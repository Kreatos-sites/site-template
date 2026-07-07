import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import {
  RiCalendarLine,
  RiTeamLine,
  RiGlobalLine,
  RiHandHeartLine,
} from "@remixicon/react";

type Metric = { icon: string; value: string; label: string };

const ICONS: Record<string, typeof RiCalendarLine> = {
  calendar: RiCalendarLine,
  team: RiTeamLine,
  globe: RiGlobalLine,
  handshake: RiHandHeartLine,
};

export function AboutSectionCenteredEyebrowMissionMetrics({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const metrics = t.raw("metrics") as Metric[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-primary uppercase">
              {t("eyebrow")}
            </span>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("mission")}
            </h2>
          </Reveal>
          <Reveal delay={60}>
            <p className="mt-6 text-[1.05rem] leading-relaxed text-muted-foreground">
              {t("body")}
            </p>
          </Reveal>
        </div>

        <dl className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-4">
          {metrics.map((metric, i) => {
            const Icon = ICONS[metric.icon] ?? RiCalendarLine;
            return (
              <Reveal key={metric.label} delay={i * 60}>
                <div className="flex h-full flex-col items-center gap-3 bg-card px-6 py-10 text-center">
                  <Icon className="size-5 text-primary" aria-hidden="true" />
                  <dd className="font-display text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] leading-none tracking-tight text-foreground tabular-nums">
                    {metric.value}
                  </dd>
                  <dt className="text-xs leading-snug tracking-wide text-muted-foreground uppercase">
                    {metric.label}
                  </dt>
                </div>
              </Reveal>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
