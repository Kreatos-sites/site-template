import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

/**
 * BLOQUE: menu-editorial-typographic-ledger-light — lista de menú puramente
 * tipográfica sobre fondo claro sólido, sin imágenes ni iconos. Nombre del
 * platillo en serif itálica, línea punteada conectora hasta el precio en
 * monospace, agrupada por categoría con separadores finos. Máxima densidad
 * de texto, aireado en el espaciado vertical entre categorías; motivo
 * editorial minimalista tipo carta de restaurante fino.
 *
 * ns: {
 *   eyebrow, title, description,
 *   categories: [{ name, note?, items: [{ name, price, description? }] }]
 * }
 */
type LedgerItem = {
  name: string;
  price: string;
  description?: string;
};

type LedgerCategory = {
  name: string;
  note?: string;
  items: LedgerItem[];
};

export function MenuEditorialTypographicLedgerLight({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const categories = t.raw("categories") as LedgerCategory[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 text-center font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-center text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col gap-16">
          {categories.map((category, ci) => (
            <Reveal key={ci} delay={ci * 80}>
              <div>
                <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                  <h3 className="text-xs font-medium tracking-[0.3em] text-foreground uppercase">
                    {category.name}
                  </h3>
                  {category.note ? (
                    <span className="shrink-0 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                      {category.note}
                    </span>
                  ) : null}
                </div>
                <ul className="mt-6 flex flex-col gap-5">
                  {category.items.map((item, ii) => (
                    <li key={ii}>
                      <div className="flex items-baseline gap-3">
                        <span className="shrink-0 font-display text-lg italic tracking-tight text-foreground">
                          {item.name}
                        </span>
                        <span
                          aria-hidden="true"
                          className="min-w-0 flex-1 border-b border-dotted border-border"
                        />
                        <span className="shrink-0 font-mono text-sm text-primary">
                          {item.price}
                        </span>
                      </div>
                      {item.description ? (
                        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">
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
    </section>
  );
}
