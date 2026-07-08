import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * BLOQUE: menu-split-dark-panel-ledger — split de dos columnas sobre fondo
 * oscuro (bg-foreground). Panel izquierdo tipo libro mayor: lista densa de
 * platillos (nombre + línea punteada + precio, sin imágenes), agrupada por
 * categoría. Panel derecho: una sola fotografía a sangre de altura completa.
 * Denso en texto, aireado en lo visual; tono elegante y de noche. Úsalo para
 * el menú principal de un restaurante o bar con identidad sobria.
 *
 * ns: {
 *   eyebrow, title, description, image, imageAlt,
 *   categories: [{ name, items: [{ name, price, description? }] }]
 * }
 */
type LedgerItem = {
  name: string;
  price: string;
  description?: string;
};

type LedgerCategory = {
  name: string;
  items: LedgerItem[];
};

export function MenuSplitDarkPanelLedger({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const categories = t.raw("categories") as LedgerCategory[];

  return (
    <section className="border-t border-border bg-foreground py-(--section-gap)">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:gap-0 lg:px-8">
        <div className="flex flex-col lg:pr-16">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-background/70">
              {t("description")}
            </p>
          </Reveal>

          <div className="mt-12 flex flex-col gap-10">
            {categories.map((category, ci) => (
              <Reveal key={ci} delay={ci * 80}>
                <div>
                  <h3 className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                    {category.name}
                  </h3>
                  <ul className="mt-5 flex flex-col gap-5 border-t border-background/15 pt-5">
                    {category.items.map((item, ii) => (
                      <li key={ii}>
                        <div className="flex items-baseline gap-3">
                          <span className="shrink-0 font-display text-base tracking-tight text-background">
                            {item.name}
                          </span>
                          <span
                            aria-hidden="true"
                            className="min-w-0 flex-1 border-b border-dotted border-background/30"
                          />
                          <span className="shrink-0 text-sm font-medium tracking-wide text-primary">
                            {item.price}
                          </span>
                        </div>
                        {item.description ? (
                          <p className="mt-1.5 text-sm leading-relaxed text-background/60">
                            {item.description}
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={120}>
          <SmartImage
            src={t("image")}
            alt={t("imageAlt")}
            className="aspect-[4/5] rounded-sm lg:aspect-auto lg:h-full"
          />
        </Reveal>
      </div>
    </section>
  );
}
