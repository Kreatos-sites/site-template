import { useTranslations } from "next-intl";
import { ArrowRight, PlayCircle } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";

export function HeroDarkGradientRadialGlow({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as { value: string; label: string }[];

  return (
    <section className="relative overflow-hidden border-t border-border bg-foreground py-(--section-gap)">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-30 blur-2xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-sm border border-background/15 bg-background/5 px-3 py-1 text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-tight text-balance text-background">
              {t("title")}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 text-lg leading-relaxed text-background/70 text-pretty">
              {t("subtitle")}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={t("primaryCta.href")}
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground uppercase transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                {t("primaryCta.label")}
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </a>
              <a
                href={t("secondaryCta.href")}
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-background/20 px-8 py-4 text-sm font-medium tracking-wide text-background uppercase transition-colors hover:bg-background/10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <PlayCircle className="size-4" strokeWidth={1.75} />
                {t("secondaryCta.label")}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={320}>
          <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-8 border-t border-background/10 pt-10 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <dt className="font-display text-3xl text-background">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs font-medium tracking-[0.2em] text-background/50 uppercase">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
