import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { Ruler, Compass, Cog } from "lucide-react";

export function HeroPatternGridTechnicalBlueprint({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as { value: string; label: string }[];

  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-(--section-gap)">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "var(--foreground)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-3 py-1.5">
              <Compass className="size-3.5 text-primary" strokeWidth={1.75} />
              <p className="font-mono text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.03] tracking-tight text-balance text-foreground">
              {t("title")}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground text-pretty">
              {t("subtitle")}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={t("primaryCta.href")}
                className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground uppercase transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                {t("primaryCta.label")}
              </a>
              <a
                href={t("secondaryCta.href")}
                className="inline-flex items-center justify-center rounded-sm border border-border px-8 py-4 text-sm font-medium tracking-wide text-foreground uppercase transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                {t("secondaryCta.label")}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={320}>
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 bg-background px-6 py-8 text-center"
              >
                {i === 0 ? (
                  <Ruler className="size-4 text-primary" strokeWidth={1.75} />
                ) : i === 1 ? (
                  <Cog className="size-4 text-primary" strokeWidth={1.75} />
                ) : (
                  <Compass className="size-4 text-primary" strokeWidth={1.75} />
                )}
                <p className="font-mono text-2xl text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs tracking-wide text-muted-foreground uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
