import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import {
  RiBarChartBoxLine,
  RiTeamLine,
  RiTimeLine,
  RiAwardLine,
} from "@remixicon/react";

/**
 * BLOQUE: hero-split-stat-band-bottom — hero a dos columnas (texto a la
 * izquierda, imagen a la derecha) que se corta por abajo con una banda de
 * estadísticas de ancho completo cruzando ambas columnas, conectando el
 * bloque de texto con la imagen. Fondo claro, composición densa.
 *
 * ns: { eyebrow, title, subtitle, primaryCta: {label, href}, secondaryCta:
 *       {label, href}, image, imageAlt, stats: [{icon, value, label}] (4 items) }
 */
export function HeroSplitStatBandBottom({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as { icon: string; value: string; label: string }[];

  const ICONS: Record<string, typeof RiBarChartBoxLine> = {
    chart: RiBarChartBoxLine,
    team: RiTeamLine,
    time: RiTimeLine,
    award: RiAwardLine,
  };

  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 pt-(--section-gap) lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Columna texto */}
          <div className="lg:col-span-6">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h1 className="mt-5 font-display text-[clamp(2.25rem,1.4rem+3.6vw,3.75rem)] leading-[1.03] tracking-tight text-balance text-foreground">
                {t("title")}
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
                {t("subtitle")}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={t("primaryCta.href")}
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  {t("primaryCta.label")}
                </a>
                <a
                  href={t("secondaryCta.href")}
                  className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  {t("secondaryCta.label")}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Columna imagen */}
          <div className="lg:col-span-6">
            <Reveal delay={80}>
              <SmartImage
                src={t("image")}
                alt={t("imageAlt")}
                className="aspect-[4/5] rounded-sm"
              />
            </Reveal>
          </div>
        </div>
      </div>

      {/* Banda de estadísticas de ancho completo, cruza ambas columnas */}
      <Reveal delay={160}>
        <div className="mt-12 border-y border-border bg-secondary">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 divide-y divide-border px-6 sm:grid-cols-4 sm:divide-y-0 sm:divide-x lg:px-8">
            {stats.map((stat) => {
              const Icon = ICONS[stat.icon] ?? RiBarChartBoxLine;
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 py-7 pr-4 not-first:pl-4 sm:pr-6 sm:not-first:pl-6"
                >
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-sm bg-background text-primary">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-2xl leading-none tracking-tight text-foreground tabular-nums">
                      {stat.value}
                    </p>
                    <p className="mt-1.5 text-xs leading-snug tracking-wide text-muted-foreground uppercase">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      <div className="pb-(--section-gap)" />
    </section>
  );
}
