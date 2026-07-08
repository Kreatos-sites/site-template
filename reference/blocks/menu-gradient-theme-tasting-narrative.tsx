import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

/**
 * BLOQUE: menu-gradient-theme-tasting-narrative — fondo con gradiente
 * diagonal en el color primary del theme (claro a oscuro), layout centrado
 * tipo narrativa editorial: texto grande sobre la experiencia de
 * degustación acompañado de numerales flotantes (tiempos, duración,
 * maridajes). Tono medio-oscuro, aireado, inmersivo. Úsalo como sección
 * de cierre o de presentación del menú degustación insignia.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, narrative: string,
 *     stats: [{ value: string, label: string }], footnote?: string }
 */
type Stat = {
  value: string;
  label: string;
};

const FLOAT_OFFSET = ["sm:mt-0", "sm:mt-10", "sm:mt-3"];

export function MenuGradientThemeTastingNarrative({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as Stat[];

  return (
    <section className="relative overflow-hidden border-t border-border bg-gradient-to-br from-primary/70 via-primary to-foreground py-(--section-gap)">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-primary-foreground/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full bg-foreground/20 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-4xl px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary-foreground/70 uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-primary-foreground">
              {t("title")}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/80">
              {t("narrative")}
            </p>
          </div>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-10 border-t border-primary-foreground/20 pt-12 text-center sm:grid-cols-3 sm:gap-6">
          {stats.map((stat, i) => (
            <li key={stat.label} className={FLOAT_OFFSET[i % FLOAT_OFFSET.length]}>
              <Reveal delay={i * 80}>
                <p className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-none tracking-tight text-primary-foreground">
                  {stat.value}
                </p>
                <p className="mt-3 text-xs font-medium tracking-[0.2em] text-primary-foreground/70 uppercase">
                  {stat.label}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>

        {t.has("footnote") && (
          <Reveal delay={200}>
            <p className="mt-14 text-center text-sm leading-relaxed text-primary-foreground/60">
              {t("footnote")}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
