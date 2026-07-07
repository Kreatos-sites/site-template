import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

/**
 * BLOQUE: stat-wall — muro de cifras enormes como protagonista, texto mínimo.
 * Archetype: stat wall. Denso, tipográfico, sin tarjetas. Rompe el ritmo de un
 * sitio lleno de grids.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, stats: [{ value: string, label: string, detail?: string }] }
 */
type Stat = { value: string; label: string; detail?: string };

export function StatWall({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as Stat[];

  return (
    <section className="border-y border-border bg-secondary py-(--section-gap) text-secondary-foreground">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="mb-14 max-w-3xl">
            <p className="text-xs font-medium tracking-[0.28em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,1.2rem+2.5vw,3rem)] leading-[1.05] tracking-tight text-balance">
              {t("title")}
            </h2>
          </div>
        </Reveal>
        <dl className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 60}>
              <div className="border-t-2 border-primary pt-5">
                <dd className="font-display text-[clamp(3rem,2rem+4vw,5.5rem)] leading-none tracking-tight tabular-nums">
                  {stat.value}
                </dd>
                <dt className="mt-4 text-sm font-medium tracking-wide uppercase">
                  {stat.label}
                </dt>
                {stat.detail ? (
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-secondary-foreground/70">
                    {stat.detail}
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
