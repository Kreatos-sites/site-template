import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * Fondo a sangre completa: fotografía de operación/planta con overlay
 * oscuro degradado (transparente arriba, negro/95 abajo). Layout split
 * asimétrico: titular+eyebrow anclados abajo-izquierda sobre la imagen;
 * a la derecha, columna vertical de cifras grandes separadas por líneas
 * hairline translúcidas. Tono editorial-fotográfico, denso abajo, aireado
 * arriba.
 */

type Stat = { value: string; label: string };

export function StatsFullbleedImageDarkOverlaySplit({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as Stat[];

  return (
    <section className="relative overflow-hidden border-t border-border bg-foreground py-(--section-gap)">
      <SmartImage
        src={t("image")}
        alt={t("imageAlt")}
        className="absolute inset-0"
        sizes="100vw"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-foreground/10 via-foreground/70 to-foreground/95"
      />

      <div className="relative mx-auto flex min-h-[32rem] w-full max-w-6xl flex-col justify-end px-6 lg:px-8">
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
              {t("title")}
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-background/70">
              {t("description")}
            </p>
          </Reveal>

          <dl className="border-t border-background/20">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="border-b border-background/20 py-6 first:pt-0 last:border-b-0 last:pb-0"
              >
                <Reveal delay={i * 60}>
                  <dd className="font-display text-[clamp(2.25rem,1.6rem+2.2vw,3.5rem)] leading-none tracking-tight text-background tabular-nums">
                    {stat.value}
                  </dd>
                  <dt className="mt-3 text-sm font-medium text-background/70">
                    {stat.label}
                  </dt>
                </Reveal>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
