import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

/**
 * Franja HORIZONTAL de cifras (3-4) separadas por divisores verticales.
 * Compacta, de una sola línea en desktop, sobre bg-card. Deliberadamente
 * distinta del stat-wall vertical: aquí las métricas se leen como un pulso
 * continuo, no como tarjetas apiladas. El gesto memorable es la fina línea
 * primary que sangra desde el borde izquierdo y ancla la banda.
 *
 * Copy: ns = { eyebrow?, stats: [{ value, label }] }.
 */
export function StatBand({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  type Stat = { value: string; label: string };
  const stats = t.raw("stats") as Stat[];

  return (
    <section className="border-y border-border bg-card py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal className="relative flex flex-col gap-10 md:flex-row md:items-stretch md:gap-0">
          {/* Filo primary que ancla la banda: el gesto */}
          <span
            aria-hidden="true"
            className="absolute top-0 -left-6 h-8 w-px bg-primary md:-left-8 md:h-full md:w-0.5"
          />

          <h2 className="sr-only">{t("eyebrow")}</h2>

          <p className="shrink-0 self-start pr-0 text-xs font-medium tracking-[0.25em] text-primary uppercase md:max-w-32 md:self-center md:pr-10">
            {t("eyebrow")}
          </p>

          <dl className="grid grid-cols-2 gap-y-8 md:flex md:flex-1 md:grid-cols-none">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col justify-center md:flex-1 md:px-8 lg:px-10",
                  index % 2 === 1 && "border-l border-border pl-8 md:pl-8 lg:pl-10",
                  index % 2 === 0 && "pr-4",
                  "md:border-l md:border-border md:pr-8 md:pl-8 lg:pr-10 lg:pl-10",
                  "md:first:border-l-0 md:first:pl-0",
                )}
              >
                <dd className="font-display text-[clamp(2.5rem,5vw,3.75rem)] leading-none font-semibold tracking-tight text-balance text-foreground tabular-nums">
                  {stat.value}
                </dd>
                <dt className="mt-3 text-sm leading-snug text-muted-foreground">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
