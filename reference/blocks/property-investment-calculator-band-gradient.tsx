import { useTranslations } from "next-intl";
import { ArrowRight, Calculator, Landmark, Percent, TrendingUp } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";

const iconMap = {
  trendingUp: TrendingUp,
  landmark: Landmark,
  percent: Percent,
} as const;

type IconKey = keyof typeof iconMap;

type Input = { label: string; value: string };
type Stat = { icon: IconKey; label: string; value: string; sublabel: string };

export function PropertyInvestmentCalculatorBandGradient({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const inputs = t.raw("inputs") as Input[];
  const stats = t.raw("stats") as Stat[];

  return (
    <section className="relative overflow-hidden border-t border-border bg-primary py-(--section-gap)">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground opacity-10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/3 -right-1/4 h-[28rem] w-[28rem] rounded-full bg-foreground opacity-15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1/3 -left-1/4 h-[28rem] w-[28rem] rounded-full bg-foreground opacity-15 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary-foreground/70 uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-primary-foreground">
              {t("title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-primary-foreground/75 text-pretty">
              {t("description")}
            </p>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="mx-auto mt-14 flex w-full max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-sm border border-primary-foreground/15 bg-primary-foreground/5 px-8 py-5">
            <div className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-primary-foreground/60 uppercase">
              <Calculator className="size-4" strokeWidth={1.75} aria-hidden="true" />
              {t("inputsLabel")}
            </div>
            {inputs.map((input, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <span className="text-xs text-primary-foreground/60">{input.label}</span>
                <span className="font-display text-lg tabular-nums text-primary-foreground">
                  {input.value}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <ul className="mx-auto mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map((stat, i) => {
            const Icon = iconMap[stat.icon];
            return (
              <li key={i}>
                <Reveal delay={160 + i * 60}>
                  <div className="flex h-full flex-col items-center rounded-lg border border-primary-foreground/15 bg-primary-foreground/10 p-8 text-center backdrop-blur-sm">
                    <span className="flex size-11 items-center justify-center rounded-sm border border-primary-foreground/20 bg-primary-foreground/10">
                      <Icon className="size-5 text-primary-foreground" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <p className="mt-6 text-xs font-medium tracking-[0.2em] text-primary-foreground/60 uppercase">
                      {stat.label}
                    </p>
                    <p className="mt-3 font-display text-4xl tabular-nums text-primary-foreground">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm text-primary-foreground/70">{stat.sublabel}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal delay={360}>
          <div className="mt-14 flex justify-center">
            <a
              href={t("cta.href")}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary-foreground px-8 py-4 text-sm font-medium tracking-wide text-primary uppercase transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:outline-none"
            >
              {t("cta.label")}
              <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
