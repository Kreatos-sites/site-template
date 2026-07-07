import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { CheckIcon, PlusIcon } from "lucide-react";

/**
 * BLOQUE: pricing-accordion-tier-expandable — acordeón vertical con un tier
 * por panel: el <summary> muestra nombre + precio + resumen corto, y al abrir
 * revela la lista de features con stagger. Archetype: alternativa compacta a
 * las tablas de precios en columnas, útil cuando hay 3-5 planes y se quiere
 * priorizar escaneo vertical (por ejemplo en móvil) en vez de comparación
 * lado a lado.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, description: string,
 *     tiers: [{ name: string, price: string, period: string,
 *       summary: string, highlighted?: boolean,
 *       features: string[], cta: string }] }
 */
type Tier = {
  name: string;
  price: string;
  period: string;
  summary: string;
  highlighted?: boolean;
  features: string[];
  cta: string;
};

export function PricingAccordionTierExpandable({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const tiers = t.raw("tiers") as Tier[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("description")}
            </p>
          </div>
        </Reveal>

        <div className="mt-14">
          {tiers.map((tier, index) => (
            <Reveal key={index} delay={index * 60}>
              <details
                className={cn(
                  "group border-b border-border first:border-t first:border-t-2 [&_summary::-webkit-details-marker]:hidden",
                  tier.highlighted && "bg-secondary/40",
                )}
              >
                <summary className="flex cursor-pointer list-none flex-col gap-4 px-4 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6">
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground transition-transform duration-300 group-open:rotate-45"
                    >
                      <PlusIcon className="size-4" strokeWidth={2} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg tracking-tight text-balance text-foreground sm:text-xl">
                        {tier.name}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {tier.summary}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-baseline gap-1 pl-12 sm:pl-0">
                    <span className="font-display text-2xl tracking-tight text-foreground sm:text-3xl">
                      {tier.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {tier.period}
                    </span>
                  </div>
                </summary>

                <div className="grid grid-cols-1 gap-x-8 gap-y-3 px-4 pb-8 pl-16 sm:grid-cols-2 sm:px-6 sm:pl-16">
                  {tier.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      style={{ transitionDelay: `${featureIndex * 40}ms` }}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                    >
                      <CheckIcon
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        strokeWidth={2}
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                  <a
                    href="#"
                    className={cn(
                      "mt-2 inline-flex w-fit items-center justify-center rounded-sm px-5 py-2.5 text-sm font-medium transition-colors sm:col-span-2",
                      tier.highlighted
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                    )}
                  >
                    {tier.cta}
                  </a>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
