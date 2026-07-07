import { useTranslations } from "next-intl";
import { RiCheckLine, RiSubtractLine } from "@remixicon/react";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

/**
 * BLOQUE: pricing-table-ledger-comparison-hairline — tabla ledger densa de
 * comparación de tres planes con filas finas de features (hairlines) y el
 * plan destacado invertido (fondo oscuro sobre fondo claro). Archetype:
 * tabla de precios tipo "libro contable", compacta y de alta densidad.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, description?: string,
 *     featureColumnLabel: string, highlightedLabel: string,
 *     plans: [{ name: string, price: string, period?: string, note?: string, highlighted?: boolean, cta: string, href: string }] (3 elementos),
 *     rows: [{ feature: string, values: (boolean | string)[] }] (values.length === plans.length) }
 */
type Plan = {
  name: string;
  price: string;
  period?: string;
  note?: string;
  highlighted?: boolean;
  cta: string;
  href: string;
};

type Row = {
  feature: string;
  values: (boolean | string)[];
};

function Cell({
  value,
  inverted,
}: {
  value: boolean | string;
  inverted?: boolean;
}) {
  if (typeof value === "boolean") {
    return value ? (
      <RiCheckLine
        className={cn(
          "mx-auto size-4",
          inverted ? "text-background" : "text-primary",
        )}
        aria-hidden="true"
      />
    ) : (
      <RiSubtractLine
        className={cn(
          "mx-auto size-4",
          inverted ? "text-background/30" : "text-muted-foreground/40",
        )}
        aria-hidden="true"
      />
    );
  }
  return (
    <span
      className={cn(
        "text-sm tabular-nums",
        inverted ? "text-background" : "text-foreground",
      )}
    >
      {value}
    </span>
  );
}

export function PricingTableLedgerComparisonHairline({ ns }: { ns: string }) {
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
          {t.has("description") && (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          )}
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-16 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="w-2/5 border-b border-border pb-6 align-bottom"
                  >
                    <span className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
                      {t("featureColumnLabel")}
                    </span>
                  </th>
                  {plans.map((plan, i) => (
                    <th
                      key={i}
                      scope="col"
                      className={cn(
                        "border-b border-border p-6 align-bottom",
                        plan.highlighted && "rounded-t-sm bg-foreground",
                      )}
                    >
                      <div className="flex flex-col gap-3">
                        {plan.highlighted && (
                          <span className="w-fit rounded-sm bg-primary px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-primary-foreground uppercase">
                            {t("highlightedLabel")}
                          </span>
                        )}
                        <span
                          className={cn(
                            "font-display text-lg",
                            plan.highlighted
                              ? "text-background"
                              : "text-foreground",
                          )}
                        >
                          {plan.name}
                        </span>
                        <span className="flex items-baseline gap-1">
                          <span
                            className={cn(
                              "font-display text-2xl tabular-nums",
                              plan.highlighted
                                ? "text-background"
                                : "text-foreground",
                            )}
                          >
                            {plan.price}
                          </span>
                          {plan.period && (
                            <span
                              className={cn(
                                "text-xs",
                                plan.highlighted
                                  ? "text-background/60"
                                  : "text-muted-foreground",
                              )}
                            >
                              {plan.period}
                            </span>
                          )}
                        </span>
                        {plan.note && (
                          <span
                            className={cn(
                              "text-xs leading-relaxed",
                              plan.highlighted
                                ? "text-background/60"
                                : "text-muted-foreground",
                            )}
                          >
                            {plan.note}
                          </span>
                        )}
                        <a
                          href={plan.href}
                          className={cn(
                            "mt-1 inline-flex w-fit items-center justify-center rounded-md px-4 py-2 text-xs font-medium transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
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
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri}>
                    <th
                      scope="row"
                      className="border-b border-border/60 py-4 pr-6 text-sm font-normal text-foreground"
                    >
                      {row.feature}
                    </th>
                    {row.values.map((value, ci) => (
                      <td
                        key={ci}
                        className={cn(
                          "border-b border-border/60 px-6 py-4 text-center",
                          plans[ci]?.highlighted && "bg-foreground",
                          plans[ci]?.highlighted &&
                            ri === rows.length - 1 &&
                            "rounded-b-sm",
                        )}
                      >
                        <Cell value={value} inverted={plans[ci]?.highlighted} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
