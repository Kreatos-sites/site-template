import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

/**
 * metric-statement-split
 * Split editorial: a la izquierda UNA cifra enorme protagónica (value + label)
 * anclada por una línea-regla; a la derecha una declaración que la explica.
 * Gesto memorable: la cifra desborda hacia el margen con un guarismo fantasma
 * detrás y una regla vertical que cose ambos lados.
 */
export function MetricStatementSplit({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-t border-border bg-card py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* Lado de la cifra */}
          <Reveal>
            <div className="relative">
              {/* Guarismo fantasma detrás, puramente decorativo */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-2 -top-10 select-none font-display text-[clamp(9rem,26vw,20rem)] font-semibold leading-none tracking-tighter text-primary/[0.06]"
              >
                {t("value")}
              </span>

              <div className="relative flex items-start gap-6">
                {/* Regla que ancla y cose el split */}
                <span
                  aria-hidden="true"
                  className="mt-4 hidden h-28 w-px shrink-0 bg-gradient-to-b from-primary/60 to-transparent lg:block"
                />
                <div>
                  <p className="font-display text-[clamp(4.5rem,13vw,9.5rem)] font-semibold leading-[0.86] tracking-tight text-balance text-foreground">
                    {t("value")}
                  </p>
                  <p className="mt-5 max-w-xs text-sm font-medium tracking-[0.2em] text-primary uppercase">
                    {t("label")}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Lado de la declaración */}
          <Reveal delay={120}>
            <div className="relative lg:pl-10">
              <span
                aria-hidden="true"
                className="absolute left-0 top-2 hidden h-full w-px bg-border lg:block"
              />
              <h2 className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-display font-medium leading-snug tracking-tight text-balance text-foreground">
                {t("statement")}
              </h2>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
