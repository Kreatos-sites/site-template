import { useTranslations } from "next-intl";
import { RiCheckLine, RiCloseLine } from "@remixicon/react";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

/**
 * BLOQUE: comparison-us-vs-them-check-cross-duality — matriz de comparación
 * lado a lado (nosotros vs. ellos) por renglón de criterio, con check/cruz
 * como contraste visual para resaltar ventajas propias frente a los puntos
 * de dolor de la alternativa/competencia. Archetype: matriz de comparación.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, description?: string,
 *     usLabel: string, themLabel: string,
 *     rows: { label: string, us: boolean, them: boolean }[],
 *     footnote?: string }
 */
type Row = {
  label: string;
  us: boolean;
  them: boolean;
};

export function ComparisonUsVsThemCheckCrossDuality({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const rows = t.raw("rows") as Row[];

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
            <div className="grid grid-cols-[1fr_auto_auto] items-center bg-secondary/50 sm:grid-cols-[1fr_10rem_10rem]">
              <div className="px-5 py-4 sm:px-8" />
              <div className="px-3 py-4 text-center sm:px-8">
                <span className="font-display text-sm font-medium text-foreground sm:text-base">
                  {t("usLabel")}
                </span>
              </div>
              <div className="px-3 py-4 text-center sm:px-8">
                <span className="text-sm font-medium text-muted-foreground sm:text-base">
                  {t("themLabel")}
                </span>
              </div>
            </div>

            <ul className="divide-y divide-border">
              {rows.map((row, i) => (
                <li key={i} className="contents">
                  <div
                    className={cn(
                      "grid grid-cols-[1fr_auto_auto] items-center sm:grid-cols-[1fr_10rem_10rem]",
                      i % 2 === 1 && "bg-card",
                    )}
                  >
                    <span className="px-5 py-5 text-sm leading-snug text-foreground sm:px-8 sm:text-base">
                      {row.label}
                    </span>
                    <div className="flex justify-center px-3 py-5 sm:px-8">
                      {row.us ? (
                        <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <RiCheckLine
                            className="size-4"
                            aria-hidden="true"
                          />
                        </span>
                      ) : (
                        <span className="inline-flex size-7 items-center justify-center rounded-full bg-muted-foreground/15 text-muted-foreground">
                          <RiCloseLine
                            className="size-4"
                            aria-hidden="true"
                          />
                        </span>
                      )}
                    </div>
                    <div className="flex justify-center px-3 py-5 sm:px-8">
                      {row.them ? (
                        <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <RiCheckLine
                            className="size-4"
                            aria-hidden="true"
                          />
                        </span>
                      ) : (
                        <span className="inline-flex size-7 items-center justify-center rounded-full bg-muted-foreground/15 text-muted-foreground">
                          <RiCloseLine
                            className="size-4"
                            aria-hidden="true"
                          />
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {t.has("footnote") && (
          <Reveal delay={120}>
            <p className="mt-6 text-sm text-muted-foreground">
              {t("footnote")}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
