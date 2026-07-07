import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

type Stat = {
  value: string;
  label: string;
};

/**
 * Banda minimalista de cuatro cifras clave: números grandes en tipografía
 * display, labels cortos debajo, separadas por líneas divisorias delgadas.
 * Sin iconos ni tarjetas: el peso visual lo cargan solo el número y el
 * espacio en blanco.
 */
export function StatsBandMinimalFourColumn({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as Stat[];

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
        </Reveal>

        <ul className="mt-16 grid grid-cols-2 divide-y divide-border border-t border-border sm:grid-cols-4 sm:divide-x sm:divide-y-0 sm:border-t-0">
          {stats.map((stat, index) => (
            <li key={stat.label} className="contents">
              <Reveal delay={index * 60}>
                <article className="flex flex-col gap-2 px-2 py-8 first:pl-0 sm:px-8">
                  <p className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-none tracking-tight text-foreground tabular-nums">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
