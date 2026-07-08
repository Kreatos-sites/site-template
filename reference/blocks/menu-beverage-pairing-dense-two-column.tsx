import { useTranslations } from "next-intl";
import { GlassWater, Wine } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

/**
 * BLOQUE: menu-beverage-pairing-dense-two-column — grid denso de dos columnas
 * para carta de maridaje (vinos o coctelería). Cada fila combina un icono
 * lineal de copa/botella, el nombre de la bebida, una nota de sabor breve y
 * el precio, sin fotografía. Fondo claro sólido, tono técnico de carta de
 * bar, pensado para muchas filas visibles a la vez.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, description?: string,
 *     columns: [
 *       { title: string, items: [{ icon: "wine"|"glass", name: string, note: string, price: string }] }
 *     ] }
 */
type Item = {
  icon: "wine" | "glass";
  name: string;
  note: string;
  price: string;
};

type Column = {
  title: string;
  items: Item[];
};

const ICONS = {
  wine: Wine,
  glass: GlassWater,
} as const;

export function MenuBeveragePairingDenseTwoColumn({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const columns = t.raw("columns") as Column[];

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
          {t.has("description") && (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          )}
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-2">
          {columns.map((column, colIndex) => (
            <Reveal key={column.title} delay={colIndex * 80}>
              <h3 className="border-b border-border pb-3 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                {column.title}
              </h3>
              <ul>
                {column.items.map((item, i) => {
                  const Icon = ICONS[item.icon];
                  return (
                    <li
                      key={item.name}
                      className={cn(
                        "flex items-start gap-3 py-3",
                        i !== column.items.length - 1 && "border-b border-border/60",
                      )}
                    >
                      <Icon
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="truncate text-sm font-medium text-foreground">
                            {item.name}
                          </span>
                          <span className="shrink-0 text-sm tabular-nums text-foreground">
                            {item.price}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                          {item.note}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
