import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { ArrowUpRight, Compass, MapPin, Navigation } from "lucide-react";

/**
 * BLOQUE: hero-map-location-split — hero a dos columnas: headline, subheadline
 * y dos CTAs a la izquierda; panel de mapa estilizado (líneas de ruta trazadas
 * en SVG, pin de ubicación y tarjeta flotante con dirección/coordenadas) a la
 * derecha en vez de foto de producto. Pensado para empresas con presencia
 * física (logística, distribución, planta). Se apila en mobile.
 *
 * ns: { eyebrow, title, subtitle, primaryCta: {label, href}, secondaryCta:
 *       {label, href}, mapLabel, metrics: {value, label}[3],
 *       floatingCard: {label, address, coordinates} }
 */
export function HeroMapLocationSplit({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const metrics = t.raw("metrics") as { value: string; label: string }[];

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
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
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
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={t("secondaryCta.href")}
                  className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <Navigation className="size-4" aria-hidden="true" />
                  {t("secondaryCta.label")}
                </a>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
                {metrics.map((metric, index) => (
                  <div key={index}>
                    <dt className="font-display text-2xl tracking-tight text-foreground tabular-nums">
                      {metric.value}
                    </dt>
                    <dd className="mt-1.5 text-xs leading-snug tracking-wide text-muted-foreground uppercase">
                      {metric.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Columna mapa estilizado */}
          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <div
                role="img"
                aria-label={t("mapLabel")}
                className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-secondary"
              >
                {/* Retícula de fondo */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 grid grid-cols-6 grid-rows-6"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={`col-${i}`}
                      className="absolute top-0 bottom-0 w-px bg-border"
                      style={{ left: `${((i + 1) / 6) * 100}%` }}
                    />
                  ))}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={`row-${i}`}
                      className="absolute right-0 left-0 h-px bg-border"
                      style={{ top: `${((i + 1) / 6) * 100}%` }}
                    />
                  ))}
                </div>

                {/* Líneas de ruta */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 400 300"
                  preserveAspectRatio="none"
                  className="absolute inset-0 size-full text-primary"
                >
                  <path
                    d="M20,240 C90,220 110,160 180,150 S260,90 340,60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="1 10"
                    className="opacity-70"
                  />
                  <path
                    d="M40,40 C90,80 150,70 190,120 S300,180 380,210"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="1 10"
                    className="opacity-40"
                  />
                </svg>

                {/* Pin de ubicación */}
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm ring-4 ring-background"
                >
                  <MapPin className="size-6" strokeWidth={2} />
                </span>
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 left-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30"
                />

                {/* Insignia de coordenadas */}
                <div className="absolute top-5 right-5 hidden items-center gap-2 rounded-sm border border-border bg-card px-3 py-2 shadow-sm sm:flex">
                  <Compass className="size-4 text-primary" aria-hidden="true" />
                  <span className="text-xs font-medium tracking-wide text-muted-foreground tabular-nums">
                    {t("floatingCard.coordinates")}
                  </span>
                </div>

                {/* Tarjeta flotante de dirección */}
                <div className="absolute bottom-5 left-5 flex max-w-[calc(100%-2.5rem)] items-start gap-3 rounded-sm border border-border bg-card p-4 shadow-sm sm:max-w-xs">
                  <span
                    aria-hidden="true"
                    className="grid size-9 shrink-0 place-items-center rounded-sm bg-primary/10 text-primary"
                  >
                    <MapPin className="size-4" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-xs leading-snug tracking-wide text-muted-foreground uppercase">
                      {t("floatingCard.label")}
                    </p>
                    <p className="mt-1 font-display text-sm leading-snug text-foreground">
                      {t("floatingCard.address")}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
