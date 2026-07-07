import { useTranslations } from "next-intl";
import { Check, Minus } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

/**
 * BLOQUE: package-comparison-matrix — tabla comparativa densa de paquetes/planes
 * con características alineadas por columna y una acción (CTA) por plan.
 * Hermano de `pricing-tiers` (tarjetas) y `comparison-table` (filas genéricas):
 * aquí los planes SON las columnas de una sola tabla, con precio y botón en el
 * encabezado y filas de características marcadas con check/guion debajo. Úsalo
 * cuando hay 3+ paquetes con muchas características para comparar de un vistazo.
 *
 * ns esperado:
 *   { eyebrow: string, title: string,
 *     plans: [{ name, price, cta, href?, featured? }],
 *     rows: [{ label: string, values: string[] }] }  // values alineado a plans
 *
 * Convención de celda (igual que comparison-table): "check"/"sí"/"true"/"✓" se
 * pinta como marca; "—"/""/"no"/"false" como ausencia; cualquier otro string se
 * muestra tal cual (útil para límites numéricos, ej. "10 usuarios").
 */
type Plan = {
  name: string;
  price: string;
  cta: string;
  href?: string;
  featured?: boolean;
};

type Row = {
  label: string;
  values: string[];
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
        <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
        <span className="sr-only">{tCommon("yes")}</span>
      </span>
    );
  }

  if (NO.has(key)) {
    return (
      <span className="inline-flex size-6 items-center justify-center text-muted-foreground/50">
        <Minus className="size-3.5" strokeWidth={2} aria-hidden="true" />
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

export function PackageComparisonMatrix({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const plans = t.raw("plans") as Plan[];
  const rows = t.raw("rows") as Row[];

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
        </Reveal>

        <Reveal delay={80} className="mt-16 min-w-0">
          {/* min-w-0 en el wrapper: sin él, el min-w de la tabla estira el
              contenedor y desborda el viewport en mobile en vez de dejar que
              este contenedor haga scroll horizontal de la tabla. */}
          <div className="-mx-6 overflow-x-auto px-6 lg:mx-0 lg:px-0">
            <table className="w-full min-w-[42rem] border-collapse text-left">
              <caption className="sr-only">{t("title")}</caption>
              <thead>
                <tr>
                  <th scope="col" className="w-1/4 pb-6 align-bottom" />
                  {plans.map((plan) => (
                    <th
                      key={plan.name}
                      scope="col"
                      className={cn(
                        "px-4 pb-6 align-bottom",
                        plan.featured &&
                          "rounded-t-xl bg-primary/[0.06] px-4 pt-6",
                      )}
                    >
                      <div className="flex flex-col gap-3">
                        {plan.featured && (
                          <span className="inline-flex w-fit items-center gap-2 text-xs font-medium tracking-[0.18em] text-primary uppercase">
                            <span
                              className="size-1.5 rounded-full bg-primary"
                              aria-hidden="true"
                            />
                            {plan.name}
                          </span>
                        )}
                        {!plan.featured && (
                          <span className="font-display text-base tracking-tight text-foreground">
                            {plan.name}
                          </span>
                        )}
                        <span className="font-display text-2xl tracking-tight tabular-nums text-foreground">
                          {plan.price}
                        </span>
                        <a
                          href={plan.href ?? "#contacto"}
                          className={cn(
                            "inline-flex w-fit items-center justify-center rounded-md px-4 py-2 text-xs font-medium tracking-tight transition-colors",
                            plan.featured
                              ? "bg-primary text-primary-foreground hover:bg-primary/90"
                              : "border border-border text-foreground hover:bg-secondary",
                          )}
                        >
                          {plan.cta}
                        </a>
                      </div>
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
                      {row.values.map((value, colIndex) => {
                        const plan = plans[colIndex];
                        return (
                          <td
                            key={plan?.name ?? colIndex}
                            className={cn(
                              "px-4 py-5 align-middle",
                              plan?.featured && "bg-primary/[0.06]",
                              plan?.featured &&
                                last &&
                                "rounded-b-xl",
                            )}
                          >
                            <Cell value={value} featured={Boolean(plan?.featured)} />
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
