import { useTranslations } from "next-intl";

import { SmartImage } from "@/components/shared/smart-image";
import { Reveal } from "@/components/shared/reveal";

type Stat = { value: string; label: string };

/**
 * BLOQUE: stat-bg-image — prueba en cifras sobre FONDO DE IMAGEN + overlay.
 * Hermano de `stat-wall`/`stat-band` (fondo plano): úsalo para que las
 * credenciales cuantitativas caigan sobre una foto de operación (escala,
 * flota, obra) — más contundente que cifras sobre fondo liso.
 *
 * ns: { eyebrow?, title, stats: [{ value, label }], image, imageAlt }
 */
export function StatBgImage({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const eyebrow = t.raw("eyebrow") as string | undefined;
  const stats = t.raw("stats") as Stat[];

  return (
    <section className="relative isolate overflow-hidden bg-card py-(--section-gap) text-primary-foreground">
      <SmartImage
        src={t("image")}
        alt={t("imageAlt")}
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-foreground/65"
      />

      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          {eyebrow ? (
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary-foreground/75">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-4 font-display text-[clamp(1.9rem,1.2rem+2.6vw,3.5rem)] leading-[1.05] tracking-tight text-balance">
            {t("title")}
          </h2>
        </Reveal>

        <dl className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 70}>
              <div className="border-t border-primary-foreground/25 pt-5">
                <dd className="font-display text-[clamp(2.5rem,1.5rem+3vw,4rem)] leading-none tabular-nums">
                  {stat.value}
                </dd>
                <dt className="mt-3 text-sm leading-relaxed text-primary-foreground/80">
                  {stat.label}
                </dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
