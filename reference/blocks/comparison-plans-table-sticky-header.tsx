import { useTranslations } from "next-intl";
import { RiCheckLine, RiSubtractLine } from "@remixicon/react";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

/**
 * BLOQUE: comparison-plans-table-sticky-header — tabla comparativa de tres
 * planes con secciones agrupadas por categoría de característica, encabezado
 * de planes sticky y una columna destacada para el plan recomendado. Cada
 * grupo tiene un subencabezado (p. ej. "Soporte", "Seguridad") y debajo sus
 * filas de características con celdas de check, guion o valor de texto libre.
 * Archetype: matriz de comparación de features entre 3 planes, agrupada por
 * categoría, con encabezado fijo al hacer scroll.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, description?: string,
 *     featureColumnLabel: string, highlightedLabel: string,
 *     plans: [{ name: string, price: string, period?: string, highlighted?: boolean, cta: string, href: string }] (3 elementos),
 *     groups: [{ name: string, rows: [{ feature: string, values: (boolean | string)[] }] }] }
 */
type Plan = {
  name: string;
  price: string;
  period?: string;
  highlighted?: boolean;
  cta: string;
  href: string;
};

type Row = {
  feature: string;
  values: (boolean | string)[];
};

type Group = {
  name: string;
  rows: Row[];
};

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
        <RiCheckLine className="size-3.5" aria-hidden="true" />
      </span>
    ) : (
      <span className="inline-flex size-6 items-center justify-center text-muted-foreground/40">
        <RiSubtractLine className="size-3.5" aria-hidden="true" />
      </span>
    );
  }
  return <span className="text-sm text-foreground">{value}</span>;
}

export function ComparisonPlansTableStickyHeader({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const plans = t.raw("plans") as Plan[];
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
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          )}
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-16 overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead className="sticky top-0 z-10 bg-card">
                <tr>
                  <th
                    scope="col"
                    className="w-1/4 border-b border-border bg-card p-6 align-bottom"
                  >
                    <span className="sr-only">{t("featureColumnLabel")}</span>
                  </th>
                  {plans.map((plan, i) => (
                    <th
                      key={i}
                      scope="col"
                      className={cn(
                        "border-b border-border p-6 align-bottom",
                        plan.highlighted && "bg-primary/5",
                      )}
                    >
                      <div className="flex flex-col gap-3">
                        {plan.highlighted && (
                          <span className="w-fit rounded-sm bg-primary px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-primary-foreground uppercase">
                            {t("highlightedLabel")}
                          </span>
                        )}
                        <span className="font-display text-lg text-foreground">
                          {plan.name}
                        </span>
                        <span className="flex items-baseline gap-1">
                          <span className="font-display text-2xl text-foreground">
                            {plan.price}
                          </span>
                          {plan.period && (
                            <span className="text-xs text-muted-foreground">
                              {plan.period}
                            </span>
                          )}
                        </span>
                        <a
                          href={plan.href}
                          className={cn(
                            "inline-flex w-fit items-center justify-center rounded-md px-4 py-2 text-xs font-medium transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                            plan.highlighted
                              ? "bg-primary text-primary-foreground"
                              : "border border-border bg-transparent text-foreground",
                          )}
                        >
                          {plan.cta}
                        </a>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              {groups.map((group, gi) => (
                <tbody key={gi}>
                  <tr>
                    <th
                      colSpan={plans.length + 1}
                      scope="colgroup"
                      className="border-b border-border bg-secondary/40 px-6 py-3 text-left text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase"
                    >
                      {group.name}
                    </th>
                  </tr>
                  {group.rows.map((row, ri) => (
                    <tr
                      key={ri}
                      className={cn(ri % 2 === 1 && "bg-secondary/30")}
                    >
                      <th
                        scope="row"
                        className="border-b border-border p-6 text-sm font-medium text-foreground last:border-b-0"
                      >
                        {row.feature}
                      </th>
                      {row.values.map((value, ci) => (
                        <td
                          key={ci}
                          className={cn(
                            "border-b border-border p-6 last:border-b-0",
                            plans[ci]?.highlighted && "bg-primary/5",
                          )}
                        >
                          <Cell value={value} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
