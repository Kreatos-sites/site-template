import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

/**
 * BLOQUE: feature-dark-split-numbered-list — Sección en modo oscuro forzado
 * (bg-foreground) con split asimétrico de dos columnas: a la izquierda una
 * columna angosta y sticky con eyebrow, título grande y CTA de texto; a la
 * derecha una columna ancha con una lista vertical de features numeradas en
 * cifras grandes tipo editorial (01, 02, 03...) separadas por líneas
 * divisorias finas, sin iconos ni tarjetas. Tono denso y técnico, tipo
 * memorándum corporativo.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, description: string,
 *     ctaLabel: string, ctaHref: string,
 *     items: [{ title: string, description: string }] }
 */
type Item = { title: string; description: string };

export function FeatureDarkSplitNumberedList({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as Item[];

  return (
    <section className="border-t border-border bg-foreground py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.6fr)] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
                {t("title")}
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-background/60">
                {t("description")}
              </p>
              <a
                href={t("ctaHref")}
                className="mt-8 inline-flex items-center gap-2 border-b border-primary text-sm font-medium text-primary transition-colors duration-300 hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {t("ctaLabel")}
              </a>
            </div>
          </Reveal>

          <div className="border-t border-background/15">
            {items.map((item, index) => (
              <Reveal key={index} delay={index * 60}>
                <div className="grid grid-cols-[3.25rem_1fr] gap-5 border-b border-background/15 py-7 sm:grid-cols-[4rem_1fr] sm:gap-8 sm:py-9">
                  <span className="font-mono text-2xl leading-none text-primary tabular-nums sm:text-3xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-xl leading-tight tracking-tight text-balance text-background sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-background/65 sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
