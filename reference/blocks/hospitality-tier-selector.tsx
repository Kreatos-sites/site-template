import { useTranslations } from "next-intl";
import { Check, Crown, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

/**
 * BLOQUE: hospitality-tier-selector — dos paquetes lado a lado (uno destacado,
 * uno sencillo), cada uno con precio, lista de incluye y CTA. Adaptable a
 * tiers de hospedaje, categorías de menú o paquetes de servicio.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, description: string,
 *     tiers: [{ icon: string, name: string, price: string, period: string,
 *               description: string, features: string[], ctaLabel: string,
 *               featured: boolean }] }
 */
type Tier = {
  icon: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaLabel: string;
  featured: boolean;
};

const ICONS: Record<string, LucideIcon> = {
  crown: Crown,
};

export function HospitalityTierSelector({ ns }: { ns: string }) {
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
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {tiers.map((tier, i) => {
            const Icon = ICONS[tier.icon] ?? Crown;
            return (
              <Reveal key={tier.name} delay={i * 80}>
                <article
                  className={cn(
                    "flex h-full flex-col gap-8 rounded-lg border p-8 sm:p-10",
                    tier.featured
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-card-foreground",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex size-10 items-center justify-center rounded-md",
                        tier.featured
                          ? "bg-primary-foreground/15"
                          : "bg-secondary",
                      )}
                    >
                      <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-xl">{tier.name}</h3>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-4xl tracking-tight">
                        {tier.price}
                      </span>
                      <span
                        className={cn(
                          "text-sm",
                          tier.featured
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground",
                        )}
                      >
                        {tier.period}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "mt-3 text-sm leading-relaxed",
                        tier.featured
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground",
                      )}
                    >
                      {tier.description}
                    </p>
                  </div>

                  <ul className="flex flex-1 flex-col gap-3 border-t border-current/15 pt-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check
                          className={cn(
                            "mt-0.5 size-4 shrink-0",
                            tier.featured
                              ? "text-primary-foreground"
                              : "text-primary",
                          )}
                          strokeWidth={2.25}
                          aria-hidden="true"
                        />
                        <span
                          className={cn(
                            tier.featured
                              ? "text-primary-foreground/90"
                              : "text-foreground",
                          )}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contacto"
                    className={cn(
                      "inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-colors",
                      tier.featured
                        ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                    )}
                  >
                    {tier.ctaLabel}
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
