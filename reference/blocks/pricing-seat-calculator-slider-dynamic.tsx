import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { Users, Calculator, Check } from "lucide-react";

/**
 * BLOQUE: pricing-seat-calculator-slider-dynamic — calculadora de precio por
 * número de asientos/usuarios.
 * Arquetipo original (@nusaiba/pricing-7): slider de asientos interactivo con
 * total animado en cliente (motion). Adaptado a server component: en vez de
 * un slider con estado de cliente, se representa la misma idea como un
 * "track" visual con marcas por tramo de asientos y un punto destacado en el
 * tramo recomendado, junto con una tarjeta grande de total ya calculado para
 * ese tramo — el mismo insight (precio = base + por asiento, visualizado
 * como recorrido) sin dependencias de cliente ni animación de JS.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, description: string,
 *     seatsLabel: string, perSeatLabel: string, totalLabel: string,
 *     brackets: [{ seats: string, pricePerSeat: string, total: string, featured?: boolean }],
 *     footnote: string, cta: string }
 */
type Bracket = {
  seats: string;
  pricePerSeat: string;
  total: string;
  featured?: boolean;
};

export function PricingSeatCalculatorSliderDynamic({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const brackets = t.raw("brackets") as Bracket[];

  const featuredIndex = brackets.findIndex((bracket) => bracket.featured);
  const activeIndex = featuredIndex >= 0 ? featuredIndex : Math.floor(brackets.length / 2);
  const active = brackets[activeIndex];
  const trackPosition =
    brackets.length > 1 ? (activeIndex / (brackets.length - 1)) * 100 : 0;

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {t("description")}
              </p>

              <div className="mt-8 rounded-lg border border-primary bg-card p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Calculator className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Users className="size-4" aria-hidden="true" />
                    <span>
                      {active.seats} {t("seatsLabel")}
                    </span>
                  </div>
                </div>
                <p className="mt-6 font-display text-4xl tracking-tight tabular-nums text-foreground">
                  {active.total}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{t("totalLabel")}</p>
                <p className="mt-4 border-t border-border pt-4 text-xs text-muted-foreground">
                  {active.pricePerSeat} {t("perSeatLabel")}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="min-w-0 lg:col-span-8" delay={80}>
            <div className="rounded-lg border border-border bg-card p-8">
              <div className="relative pt-2 pb-8">
                <div className="h-2 w-full rounded-full bg-secondary" aria-hidden="true">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${trackPosition}%` }}
                  />
                </div>
                <div className="absolute inset-x-0 top-0 flex justify-between">
                  {brackets.map((bracket, index) => {
                    const position =
                      brackets.length > 1 ? (index / (brackets.length - 1)) * 100 : 0;
                    const isActive = index === activeIndex;
                    return (
                      <div
                        key={bracket.seats}
                        className="absolute -translate-x-1/2"
                        style={{ left: `${position}%` }}
                      >
                        <span
                          className={cn(
                            "block size-4 rounded-full border-2 border-background ring-2",
                            isActive
                              ? "bg-primary ring-primary"
                              : "bg-secondary ring-border",
                          )}
                          aria-hidden="true"
                        />
                        {isActive && (
                          <span className="absolute top-6 left-1/2 -translate-x-1/2">
                            <Check className="size-4 text-primary" aria-hidden="true" />
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <ul className="grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-5">
                {brackets.map((bracket, index) => (
                  <li key={bracket.seats} className="contents">
                    <div
                      className={cn(
                        "flex flex-col gap-1 border-t border-border px-2 py-4 text-center",
                        index === activeIndex && "border-t-2 border-primary",
                      )}
                    >
                      <span className="flex items-center justify-center gap-1 text-xs font-medium text-foreground">
                        <Users className="size-3.5 text-muted-foreground" aria-hidden="true" />
                        {bracket.seats}
                      </span>
                      <span className="text-xs tabular-nums text-muted-foreground">
                        {bracket.pricePerSeat}
                      </span>
                      <span className="font-display text-sm font-medium tabular-nums text-foreground">
                        {bracket.total}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-relaxed text-muted-foreground">{t("footnote")}</p>
              <a
                href="#contacto"
                className="inline-flex w-fit items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t("cta")}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
