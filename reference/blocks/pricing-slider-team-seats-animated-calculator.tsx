import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { RiTeamLine, RiCalculatorLine, RiCheckLine } from "@remixicon/react";

/**
 * BLOQUE: pricing-slider-team-seats-animated-calculator — calculadora de
 * precio por número de asientos/usuarios del equipo.
 * Arquetipo original (@nusaiba/pricing-7): slider de asientos interactivo con
 * estado de cliente (motion) y total animado al arrastrar. Adaptado a server
 * component: se representa el mismo insight (precio = base fija + tarifa por
 * asiento, a lo largo de un recorrido de tramos) como un "medidor" de barras
 * escalonadas por tramo de asientos, con el tramo recomendado destacado y una
 * tarjeta de desglose del total ya calculado para ese tramo — sin
 * dependencias de cliente ni animación de JS.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, description: string,
 *     seatsLabel: string, perSeatLabel: string, totalLabel: string, baseLabel: string,
 *     brackets: [{ seats: string, base: string, pricePerSeat: string, total: string, barHeight: number, featured?: boolean }],
 *     footnote: string, cta: string }
 */
type Bracket = {
  seats: string;
  base: string;
  pricePerSeat: string;
  total: string;
  barHeight: number;
  featured?: boolean;
};

export function PricingSliderTeamSeatsAnimatedCalculator({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const brackets = t.raw("brackets") as Bracket[];

  const featuredIndex = brackets.findIndex((bracket) => bracket.featured);
  const activeIndex = featuredIndex >= 0 ? featuredIndex : Math.floor(brackets.length / 2);
  const active = brackets[activeIndex];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
          <Reveal className="lg:col-span-5">
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
                    <RiCalculatorLine className="size-5" aria-hidden="true" />
                  </span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <RiTeamLine className="size-4" aria-hidden="true" />
                    <span>
                      {active.seats} {t("seatsLabel")}
                    </span>
                  </div>
                </div>
                <p className="mt-6 font-display text-4xl tracking-tight tabular-nums text-foreground">
                  {active.total}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{t("totalLabel")}</p>
                <div className="mt-4 flex flex-col gap-1.5 border-t border-border pt-4 text-xs text-muted-foreground">
                  <span>
                    {t("baseLabel")}{" "}
                    <span className="font-medium text-foreground">{active.base}</span>
                  </span>
                  <span>
                    {t("perSeatLabel")}{" "}
                    <span className="font-medium text-foreground">{active.pricePerSeat}</span>
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="min-w-0 lg:col-span-7" delay={80}>
            <div className="rounded-lg border border-border bg-card p-8">
              <div className="flex h-40 items-end gap-3">
                {brackets.map((bracket, index) => (
                  <div key={bracket.seats} className="flex flex-1 flex-col items-center gap-3">
                    <div
                      className={cn(
                        "w-full rounded-sm bg-secondary transition-colors",
                        index === activeIndex && "bg-primary",
                      )}
                      style={{ height: `${bracket.barHeight}%` }}
                    />
                  </div>
                ))}
              </div>

              <ul className="mt-4 grid grid-cols-2 gap-px border-t border-border sm:grid-cols-3 lg:grid-cols-5">
                {brackets.map((bracket, index) => (
                  <li key={bracket.seats} className="contents">
                    <div
                      className={cn(
                        "flex flex-col items-center gap-1 border-t border-border px-2 py-4 text-center",
                        index === activeIndex && "border-t-2 border-primary",
                      )}
                    >
                      <span className="flex items-center justify-center gap-1 text-xs font-medium text-foreground">
                        <RiTeamLine className="size-3.5 text-muted-foreground" aria-hidden="true" />
                        {bracket.seats}
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
              <p className="flex items-center gap-2 text-xs leading-relaxed text-muted-foreground">
                <RiCheckLine className="size-4 shrink-0 text-primary" aria-hidden="true" />
                {t("footnote")}
              </p>
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
