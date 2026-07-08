import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { ArrowRight } from "lucide-react";

/**
 * BLOQUE: hero-diagonal-color-block-typographic — hero muy gráfico, sin
 * fotografía: un bloque de color diagonal (bg-primary) corta la franja del
 * título en ángulo. El título grande se renderiza dos veces, exactamente
 * superpuesto: una copia visible en text-foreground (fondo claro) y una
 * copia decorativa en text-primary-foreground recortada con el MISMO
 * clip-path que el bloque de color. Como ambas capas comparten la misma
 * caja de referencia, el corte diagonal atraviesa literalmente las letras
 * con el color correcto a cada lado, sin JS ni medición en runtime.
 *
 * ns: { eyebrow, titleLine1, titleLine2, subtitle, primaryCta: {label, href},
 *       secondaryCta: {label, href}, stats: { value, label }[] (3 items) }
 */
export function HeroDiagonalColorBlockTypographic({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as { value: string; label: string }[];

  const clip =
    "[clip-path:polygon(0_62%,100%_28%,100%_100%,0_100%)] lg:[clip-path:polygon(38%_0,100%_0,100%_100%,10%_100%)]";

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
        </Reveal>

        {/* Caja de referencia compartida por el bloque de color y las dos capas de título */}
        <Reveal delay={60}>
          <div className="relative mt-6 py-6">
            <div
              className={`absolute inset-0 bg-primary ${clip}`}
              aria-hidden="true"
            />

            <h1 className="relative font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] font-medium tracking-tight text-balance text-foreground">
              <span className="block">{t("titleLine1")}</span>
              <span className="block">{t("titleLine2")}</span>
            </h1>

            <h1
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] font-medium tracking-tight text-balance text-primary-foreground ${clip}`}
            >
              <span className="block">{t("titleLine1")}</span>
              <span className="block">{t("titleLine2")}</span>
            </h1>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <p className="max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
                {t("subtitle")}
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={t("primaryCta.href")}
                  className="inline-flex items-center gap-2 bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  {t("primaryCta.label")}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={t("secondaryCta.href")}
                  className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {t("secondaryCta.label")}
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={240}>
              <dl className="grid grid-cols-3 gap-6 border-t border-border pt-6">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <dt className="font-display text-2xl tracking-tight text-foreground sm:text-3xl">
                      {stat.value}
                    </dt>
                    <dd className="mt-1 text-xs text-muted-foreground">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
