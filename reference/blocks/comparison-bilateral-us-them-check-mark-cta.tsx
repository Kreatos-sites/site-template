import { useTranslations } from "next-intl";
import { RiCheckLine, RiCloseLine } from "@remixicon/react";

import { Reveal } from "@/components/shared/reveal";

/**
 * BLOQUE: comparison-bilateral-us-them-check-mark-cta — comparativa bilateral
 * "nosotros vs. ellos" fila por fila: una sola lista de puntos de comparación,
 * cada uno resuelto con marca (check) del lado propio y tache (cross) del
 * lado de la competencia, dentro de dos columnas encabezadas y cerrando con
 * una CTA de conversión. Archetype: comparativa bilateral con cierre.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, description?: string,
 *     us: { label: string, badge?: string },
 *     them: { label: string },
 *     points: string[],
 *     cta: { label: string, href: string },
 *     footnote?: string }
 */
type Sides = {
  us: { label: string; badge?: string };
  them: { label: string };
};

export function ComparisonBilateralUsThemCheckMarkCta({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const us = t.raw("us") as Sides["us"];
  const them = t.raw("them") as Sides["them"];
  const points = t.raw("points") as string[];
  const cta = t.raw("cta") as { label: string; href: string };

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
          {t.has("description") && (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          )}
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-16 overflow-hidden rounded-lg border border-border">
            <div className="grid grid-cols-2">
              <div className="relative border-b border-r border-border bg-primary px-5 py-5 sm:px-8">
                {us.badge && (
                  <span className="absolute -top-3 left-5 rounded-sm bg-foreground px-3 py-1 text-[10px] font-medium tracking-wide text-background uppercase sm:left-8">
                    {us.badge}
                  </span>
                )}
                <h3 className="font-display text-base text-primary-foreground sm:text-xl">
                  {us.label}
                </h3>
              </div>
              <div className="border-b border-border bg-secondary/40 px-5 py-5 sm:px-8">
                <h3 className="font-display text-base text-muted-foreground sm:text-xl">
                  {them.label}
                </h3>
              </div>
            </div>

            <ul>
              {points.map((point, i) => (
                <li key={i} className="grid grid-cols-2">
                  <div className="flex items-start gap-3 border-r border-border bg-card px-5 py-4 sm:px-8">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <RiCheckLine className="size-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed text-foreground sm:text-base">
                      {point}
                    </span>
                  </div>
                  <div className="flex items-start gap-3 bg-background px-5 py-4 sm:px-8">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-muted-foreground/15 text-muted-foreground">
                      <RiCloseLine className="size-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground line-through decoration-muted-foreground/40 sm:text-base">
                      {point}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            {t.has("footnote") && (
              <p className="text-sm text-muted-foreground">{t("footnote")}</p>
            )}
            <a
              href={cta.href}
              className="inline-flex items-center justify-center rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:ml-auto"
            >
              {cta.label}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
