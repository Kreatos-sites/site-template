import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import {
  RiHeartPulseLine,
  RiTeamLine,
  RiTimeLine,
  RiThumbUpLine,
  RiArrowUpLine,
  type RemixiconComponentType,
} from "@remixicon/react";

type Metric = {
  icon: string;
  value: string;
  label: string;
  delta: string;
};

const ICONS: Record<string, RemixiconComponentType> = {
  pulse: RiHeartPulseLine,
  team: RiTeamLine,
  time: RiTimeLine,
  thumb: RiThumbUpLine,
};

/**
 * Banda de métricas de la clínica con cifras grandes y una insignia de
 * cambio (delta) por métrica. Sin JS de conteo (el contrato del template
 * prohíbe listeners/animación custom): el impacto lo carga la tipografía
 * display y la entrada escalonada de Reveal, no un contador.
 */
export function ClinicMetricsAnimatedBand({ ns }: { ns: string }) {
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

        <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = ICONS[metric.icon] ?? RiHeartPulseLine;
            return (
              <li key={metric.label} className="contents">
                <Reveal delay={index * 60}>
                  <article className="flex h-full flex-col gap-6 bg-card p-8">
                    <Icon
                      className="size-5 text-primary"
                      aria-hidden="true"
                    />
                    <div className="flex flex-1 flex-col justify-end">
                      <p className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-none tracking-tight text-foreground tabular-nums">
                        {metric.value}
                      </p>
                      <p className="mt-3 text-sm text-muted-foreground">
                        {metric.label}
                      </p>
                      <span className="mt-4 inline-flex w-fit items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                        <RiArrowUpLine className="size-3.5 text-primary" aria-hidden="true" />
                        {metric.delta}
                      </span>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
