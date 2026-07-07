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
  global: RiGlobalLine,
  handshake: RiHandHeartLine,
};

export function AboutMissionCenteredFourMetricsStrip({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const metrics = t.raw("metrics") as Metric[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={60}>
            <p className="mt-6 text-[1.05rem] leading-relaxed text-muted-foreground">
              {t("mission")}
            </p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <ul className="mx-auto mt-16 grid max-w-5xl grid-cols-2 divide-y divide-border border-y border-border sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            {metrics.map((metric, i) => {
              const Icon = ICONS[metric.icon] ?? RiCalendarLine;
              return (
                <li key={metric.label} className="contents">
                  <Reveal delay={i * 60}>
                    <div className="flex flex-col items-center gap-3 px-4 py-10 text-center">
                      <Icon className="size-5 text-primary" aria-hidden="true" />
                      <span className="font-display text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] leading-none tracking-tight text-foreground tabular-nums">
                        {metric.value}
                      </span>
                      <span className="text-xs leading-snug tracking-wide text-muted-foreground uppercase">
                        {metric.label}
                      </span>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
