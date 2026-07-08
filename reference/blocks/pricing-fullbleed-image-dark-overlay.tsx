import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";

/**
 * Sección de precios a sangre completa: fotografía editorial (oficina,
 * skyline o equipo trabajando) cubre todo el ancho con degradado oscuro de
 * abajo hacia arriba. Sobre la imagen flotan tres tarjetas de precio en
 * vidrio esmerilado (fondo translúcido + blur), con el plan destacado
 * resaltado por un borde luminoso. Tono oscuro y premium, ideal para cerrar
 * una página de servicios con una oferta clara.
 */
export function PricingFullbleedImageDarkOverlay({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const plans = t.raw("plans") as {
    name: string;
    price: string;
    period: string;
    description?: string;
    features: string[];
    cta: string;
    featured?: boolean;
    badge?: string;
  }[];

  return (
    <section className="relative isolate overflow-hidden border-t border-border bg-foreground">
      <SmartImage
        src={t("backgroundImage")}
        alt={t("backgroundImageAlt")}
        className="absolute inset-0 aspect-auto h-full w-full"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/85 to-foreground/40"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-(--section-gap) lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
              {t("title")}
            </h2>
          </Reveal>
          {t.has("description") ? (
            <Reveal delay={140}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-background/75 text-pretty">
                {t("description")}
              </p>
            </Reveal>
          ) : null}
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <li key={i} className="flex">
              <Reveal
                delay={200 + i * 80}
                className={cn(
                  "flex w-full flex-col rounded-sm border bg-background/10 p-8 backdrop-blur-md",
                  plan.featured
                    ? "border-primary shadow-[0_0_0_1px] shadow-primary/40"
                    : "border-background/20",
                )}
              >
                {plan.featured && plan.badge ? (
                  <span className="w-fit rounded-sm bg-primary px-3 py-1 text-xs font-medium tracking-wide text-primary-foreground uppercase">
                    {plan.badge}
                  </span>
                ) : null}

                <h3 className="mt-6 font-display text-xl text-background">
                  {plan.name}
                </h3>

                {plan.description ? (
                  <p className="mt-2 text-sm leading-relaxed text-background/70">
                    {plan.description}
                  </p>
                ) : null}

                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="font-display text-4xl font-semibold text-background">
                    {plan.price}
                  </span>
                  <span className="text-sm text-background/60">{plan.period}</span>
                </div>

                <ul className="mt-8 flex flex-1 flex-col gap-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        strokeWidth={2}
                      />
                      <span className="text-sm leading-relaxed text-background/80">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className={cn(
                    "mt-8 inline-flex items-center justify-center rounded-sm px-6 py-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-foreground focus-visible:outline-none",
                    plan.featured
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-background/30 text-background hover:bg-background/10",
                  )}
                >
                  {plan.cta}
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
