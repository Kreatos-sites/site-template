import { useTranslations } from "next-intl";
import { Check, X } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

/**
 * BLOQUE: competitive-advantage-comparison — layout de dos columnas
 * "nosotros vs. la alternativa": tarjeta propia con puntos a favor (check) y
 * CTA primario, junto a una tarjeta de la competencia/status quo con puntos
 * en contra (tachados). Archetype: comparativa directa de ventaja competitiva.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, description?: string,
 *     us: { name: string, points: string[], cta: string, href: string },
 *     them: { name: string, points: string[] } }
 */
type Side = {
  name: string;
  points: string[];
};

type UsSide = Side & {
  cta: string;
  href: string;
};

export function CompetitiveAdvantageComparison({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const us = t.raw("us") as UsSide;
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

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal delay={60}>
            <article className="flex h-full flex-col gap-8 rounded-lg border border-primary/30 bg-card p-8 shadow-sm lg:p-10">
              <div className="flex items-center gap-2">
                <span
                  className="size-1.5 rounded-full bg-primary"
                  aria-hidden="true"
                />
                <h3 className="font-display text-xl text-foreground">
                  {us.name}
                </h3>
              </div>
              <ul className="flex flex-col gap-4">
                {us.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check
                        className="size-3"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-sm leading-relaxed text-foreground">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href={us.href}
                className="mt-auto inline-flex w-fit items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {us.cta}
              </a>
            </article>
          </Reveal>

          <Reveal delay={120}>
            <article className="flex h-full flex-col gap-8 rounded-lg border border-border bg-secondary/40 p-8 lg:p-10">
              <div className="flex items-center gap-2">
                <span
                  className="size-1.5 rounded-full bg-muted-foreground/40"
                  aria-hidden="true"
                />
                <h3 className="font-display text-xl text-muted-foreground">
                  {them.name}
                </h3>
              </div>
              <ul className="flex flex-col gap-4">
                {them.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-muted-foreground/15 text-muted-foreground">
                      <X
                        className="size-3"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                    </span>
                    <span
                      className={cn(
                        "text-sm leading-relaxed text-muted-foreground line-through decoration-muted-foreground/50",
                      )}
                    >
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
