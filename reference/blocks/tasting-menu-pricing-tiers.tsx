import { useTranslations } from "next-intl";
import { CheckIcon } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

/**
 * BLOQUE: tasting-menu-pricing-tiers — comparación de paquetes de menú
 * degustación con lista de tiempos/características incluidas, precio por
 * persona y botón de reservación. Un paquete puede marcarse como
 * recomendado (highlighted) para destacarlo visualmente.
 * Archetype: comparación de paquetes de menú degustación con
 * características, precios y botones de reserva.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, description?: string,
 *     tiers: [{ name: string, price: string, period?: string,
 *               highlighted?: boolean, badge?: string,
 *               features: string[], cta: string, href: string }] }
 */
type Tier = {
  name: string;
  price: string;
  period?: string;
  highlighted?: boolean;
  badge?: string;
  features: string[];
  cta: string;
  href: string;
};

export function TastingMenuPricingTiers({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const tiers = t.raw("tiers") as Tier[];

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

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal key={i} delay={i * 80}>
              <article
                className={cn(
                  "flex h-full flex-col gap-8 rounded-lg border p-8",
                  tier.highlighted
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card",
                )}
              >
                <div className="flex flex-col gap-4">
                  {tier.badge && (
                    <span className="w-fit rounded-sm bg-primary px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-primary-foreground uppercase">
                      {tier.badge}
                    </span>
                  )}
                  <h3 className="font-display text-xl text-foreground">
                    {tier.name}
                  </h3>
                  <span className="flex items-baseline gap-1">
                    <span className="font-display text-3xl text-foreground">
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className="text-xs text-muted-foreground">
                        {tier.period}
                      </span>
                    )}
                  </span>
                </div>

                <ul className="flex flex-1 flex-col gap-3">
                  {tier.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CheckIcon
                          className="size-3"
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="text-sm leading-relaxed text-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.href}
                  className={cn(
                    "inline-flex w-full items-center justify-center rounded-md px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                    tier.highlighted
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-transparent text-foreground",
                  )}
                >
                  {tier.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
