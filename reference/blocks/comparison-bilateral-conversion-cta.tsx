import { useTranslations } from "next-intl";
import { Check, X } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";

/**
 * BLOQUE: comparison-bilateral-conversion-cta — comparativa bilateral
 * (nosotros vs. ellos) en dos tarjetas lado a lado: la tarjeta propia lista
 * ventajas con check y cierra con una CTA primaria de conversión; la tarjeta
 * de la alternativa lista puntos de dolor tachados, sin CTA. Archetype:
 * comparativa bilateral con cierre.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, description?: string,
 *     us: { label: string, badge?: string, items: string[],
 *           ctaLabel: string, ctaHref: string },
 *     them: { label: string, items: string[] },
 *     footnote?: string }
 */
type Side = {
  label: string;
  items: string[];
};

export function ComparisonBilateralConversionCta({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const us = t.raw("us") as Side & { badge?: string; ctaLabel: string; ctaHref: string };
  const them = t.raw("them") as Side;

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

        <div className="mt-16 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
          <Reveal delay={60}>
            <article className="relative flex h-full flex-col gap-8 rounded-lg border border-primary bg-card p-8 sm:p-10">
              {us.badge && (
                <span className="absolute -top-3 left-8 rounded-sm bg-primary px-3 py-1 text-xs font-medium tracking-wide text-primary-foreground uppercase">
                  {us.badge}
                </span>
              )}
              <h3 className="font-display text-xl text-foreground sm:text-2xl">
                {us.label}
              </h3>
              <ul className="flex flex-1 flex-col gap-4">
                {us.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed text-foreground sm:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href={us.ctaHref}
                className="mt-2 inline-flex w-full items-center justify-center rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {us.ctaLabel}
              </a>
            </article>
          </Reveal>

          <Reveal delay={120}>
            <article className="flex h-full flex-col gap-8 rounded-lg border border-border bg-secondary/40 p-8 sm:p-10">
              <h3 className="font-display text-xl text-muted-foreground sm:text-2xl">
                {them.label}
              </h3>
              <ul className="flex flex-1 flex-col gap-4">
                {them.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-muted-foreground/15 text-muted-foreground">
                      <X className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground line-through decoration-muted-foreground/40 sm:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>

        {t.has("footnote") && (
          <Reveal delay={180}>
            <p className="mt-6 text-sm text-muted-foreground">{t("footnote")}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
