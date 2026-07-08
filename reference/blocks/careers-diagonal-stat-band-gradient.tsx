import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

/**
 * Banda corta de transición entre el hero de empleo y el listado de
 * vacantes: fondo en degradado del color primario del theme, recortado con
 * un borde diagonal en la orilla inferior mediante clip-path. Eyebrow y
 * título breves anteceden 3-4 cifras oversized (headcount, países,
 * antigüedad promedio, tasa de promoción interna) centradas en fila. Sin
 * imágenes ni iconos: es puro tipo y color para marcar ritmo antes de la
 * siguiente sección.
 */
export function CareersDiagonalStatBandGradient({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as { value: string; label: string }[];

  return (
    <section
      className="relative border-t border-border bg-gradient-to-br from-primary via-primary to-foreground py-(--section-gap)"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 88%, 0 100%)" }}
    >
      <div className="mx-auto w-full max-w-6xl px-6 pb-10 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary-foreground/70 uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.05] tracking-tight text-balance text-primary-foreground">
              {t("title")}
            </h2>
          </div>
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 text-center sm:mt-16 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <li key={i}>
              <Reveal delay={i * 60}>
                <p className="font-display text-[clamp(2.5rem,6vw,4.25rem)] leading-none font-semibold tabular-nums text-primary-foreground">
                  {stat.value}
                </p>
                <p className="mt-3 text-xs font-medium tracking-[0.2em] text-primary-foreground/70 uppercase">
                  {stat.label}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
