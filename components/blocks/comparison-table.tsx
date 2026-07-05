import { useTranslations } from "next-intl";
import { Check, Minus } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

/**
 * BLOQUE: comparison-table — tabla comparativa "con nosotros vs sin nosotros"
 * o de capacidades. Filas con label + celdas de valor/estado; líneas finas,
 * la primera columna de datos es la nuestra y va resaltada como un panel que
 * atraviesa toda la tabla. Archetype: comparativa editorial, no grid genérico.
 *
 * ns esperado:
 *   { eyebrow: string, title: string,
 *     columns: string[],              // encabezados de columnas de datos
 *     rows: [{ label: string, values: string[] }] }  // values alineado a columns
 *
 * Convención de celda: el texto "check" / "sí" / "true" se pinta como marca;
 * "—" / "" / "no" / "false" como ausencia; cualquier otro string se muestra tal cual.
 */
type Row = {
  label: string;
  values: string[];
};

const YES = new Set(["check", "sí", "si", "yes", "true", "✓"]);
const NO = new Set(["", "—", "-", "no", "false", "×", "x"]);

function Cell({ value, featured }: { value: string; featured: boolean }) {
  const key = value.trim().toLowerCase();

  if (YES.has(key)) {
    return (
      <span
        className={cn(
          "inline-flex size-6 items-center justify-center rounded-full",
          featured
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground",
        )}
      >
        <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
        <span className="sr-only">Sí</span>
      </span>
    );
  }

  if (NO.has(key)) {
    return (
      <span className="inline-flex size-6 items-center justify-center text-muted-foreground/50">
        <Minus className="size-3.5" strokeWidth={2} aria-hidden="true" />
        <span className="sr-only">No</span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "text-sm leading-snug",
        featured ? "font-medium text-foreground" : "text-muted-foreground",
      )}
    >
      {value}
    </span>
  );
}

export function ComparisonTable({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const columns = t.raw("columns") as string[];
  const rows = t.raw("rows") as Row[];

  return (
    <section className="border-t border-border py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-4 font-display text-[clamp(1.9rem,1.2rem+2.5vw,3.25rem)] leading-[1.05] tracking-tight text-balance">
                {t("title")}
              </h2>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-8" delay={80}>
            <div className="-mx-6 overflow-x-auto px-6 lg:mx-0 lg:px-0">
              <table className="w-full min-w-[36rem] border-collapse text-left">
                <caption className="sr-only">{t("title")}</caption>
                <thead>
                  <tr className="border-b border-border">
                    <th scope="col" className="w-1/3 py-4 pr-4" />
                    {columns.map((col, i) => (
                      <th
                        key={col}
                        scope="col"
                        className={cn(
                          "px-4 py-4 align-bottom text-sm font-medium",
                          i === 0
                            ? "rounded-t-xl bg-primary/[0.06] font-display text-base tracking-tight text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {i === 0 ? (
                          <span className="flex items-center gap-2">
                            <span
                              className="size-1.5 rounded-full bg-primary"
                              aria-hidden="true"
                            />
                            {col}
                          </span>
                        ) : (
                          col
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => {
                    const last = rowIndex === rows.length - 1;
                    return (
                      <tr
                        key={row.label}
                        className={cn(!last && "border-b border-border/70")}
                      >
                        <th
                          scope="row"
                          className="py-5 pr-4 align-middle text-sm font-normal text-foreground"
                        >
                          {row.label}
                        </th>
                        {row.values.map((value, colIndex) => (
                          <td
                            key={columns[colIndex] ?? colIndex}
                            className={cn(
                              "px-4 py-5 align-middle",
                              colIndex === 0 && "bg-primary/[0.06]",
                              colIndex === 0 && last && "rounded-b-xl",
                            )}
                          >
                            <Cell value={value} featured={colIndex === 0} />
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
