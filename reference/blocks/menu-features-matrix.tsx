import { useTranslations } from "next-intl";
import { RiCheckLine, RiSubtractLine } from "@remixicon/react";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

/**
 * BLOQUE: menu-features-matrix — tabla de comparación con secciones agrupadas
 * para contrapesar paquetes/categorías (p. ej. planes de hospedaje, menús o
 * niveles de servicio). Cada grupo tiene un encabezado que atraviesa la tabla
 * y, debajo, filas de característica con celdas por columna (paquete/plan).
 * La primera columna de datos se resalta como la recomendada.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, description?: string,
 *     columns: string[],                          // encabezados de columnas (paquetes/planes)
 *     groups: [{ title: string, rows: [{ label: string, values: string[] }] }] }
 *
 * Convención de celda: "check"/"sí"/"si"/"yes"/"true"/"✓" se pinta como marca;
 * ""/"—"/"-"/"no"/"false"/"×"/"x" como ausencia; cualquier otro string se
 * muestra tal cual (p. ej. "bajo pedido").
 */
type Row = {
  label: string;
  values: string[];
};

type Group = {
  title: string;
  rows: Row[];
};

const YES = new Set(["check", "sí", "si", "yes", "true", "✓"]);
const NO = new Set(["", "—", "-", "no", "false", "×", "x"]);

function Cell({ value, featured }: { value: string; featured: boolean }) {
  const tCommon = useTranslations("common");
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
        <RiCheckLine className="size-3.5" aria-hidden="true" />
        <span className="sr-only">{tCommon("yes")}</span>
      </span>
    );
  }

  if (NO.has(key)) {
    return (
      <span className="inline-flex size-6 items-center justify-center text-muted-foreground/50">
        <RiSubtractLine className="size-3.5" aria-hidden="true" />
        <span className="sr-only">{tCommon("no")}</span>
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

export function MenuFeaturesMatrix({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const columns = t.raw("columns") as string[];
  const groups = t.raw("groups") as Group[];

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

        <Reveal delay={80}>
          <div className="mt-14 -mx-6 overflow-x-auto px-6 lg:mx-0 lg:px-0">
            <table className="w-full min-w-[42rem] border-collapse text-left">
              <caption className="sr-only">{t("title")}</caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="sticky left-0 w-1/3 bg-background py-4 pr-4" />
                  {columns.map((col, i) => (
                    <th
                      key={col}
                      scope="col"
                      className={cn(
                        "px-4 py-4 align-bottom text-sm font-medium",
                        i === 0
                          ? "rounded-t-md bg-primary/[0.06] font-display text-base tracking-tight text-foreground"
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
              {groups.map((group, groupIndex) => {
                const lastGroup = groupIndex === groups.length - 1;
                return (
                  <tbody key={group.title}>
                    <tr>
                      <th
                        colSpan={columns.length + 1}
                        scope="colgroup"
                        className="sticky left-0 bg-background pt-8 pb-3 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase"
                      >
                        {group.title}
                      </th>
                    </tr>
                    {group.rows.map((row, rowIndex) => {
                      const lastRow = rowIndex === group.rows.length - 1;
                      const lastOfTable = lastGroup && lastRow;
                      return (
                        <tr
                          key={row.label}
                          className={cn(!lastRow && "border-b border-border/70")}
                        >
                          <th
                            scope="row"
                            className="sticky left-0 bg-background py-5 pr-4 align-middle text-sm font-normal text-foreground"
                          >
                            {row.label}
                          </th>
                          {row.values.map((value, colIndex) => (
                            <td
                              key={columns[colIndex] ?? colIndex}
                              className={cn(
                                "px-4 py-5 align-middle",
                                colIndex === 0 && "bg-primary/[0.06]",
                                colIndex === 0 && lastOfTable && "rounded-b-md",
                              )}
                            >
                              <Cell value={value} featured={colIndex === 0} />
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                );
              })}
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
