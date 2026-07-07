import { useTranslations } from "next-intl";
import { UsersIcon, CalculatorIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";

import { Reveal } from "@/components/shared/reveal";

/**
 * BLOQUE: team-seat-calculator — calculador de precio por tamaño de equipo.
 * Arquetipo original (pricing-7 de shadcn): slider de asientos interactivo con
 * total animado en cliente. Adaptado a server component: en vez de un slider
 * de JS, se presenta como tabla de rangos de asientos con precio por asiento
 * y total de ejemplo ya calculado — el mismo insight (precio = base + por
 * asiento) sin dependencias de cliente ni animación.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, description: string,
 *     basePrice: string, basePriceLabel: string,
 *     seatsLabel: string, perSeatLabel: string, totalLabel: string,
 *     brackets: [{ seats: string, pricePerSeat: string, exampleTotal: string }],
 *     footnote: string, cta: string }
 */
type Bracket = {
  seats: string;
  pricePerSeat: string;
  exampleTotal: string;
};

export function TeamSeatCalculator({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const brackets = t.raw("brackets") as Bracket[];

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

              <div className="mt-8 flex items-center gap-4 rounded-lg border border-border bg-card p-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <CalculatorIcon className="size-5" weight="duotone" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-3xl tracking-tight tabular-nums text-foreground">
                    {t("basePrice")}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t("basePriceLabel")}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="min-w-0 lg:col-span-8" delay={80}>
            <div className="-mx-6 overflow-x-auto px-6 lg:mx-0 lg:px-0">
              <table className="w-full min-w-[32rem] border-collapse text-left">
                <caption className="sr-only">{t("title")}</caption>
                <thead>
                  <tr className="border-b border-border">
                    <th
                      scope="col"
                      className="py-4 pr-4 text-sm font-medium text-muted-foreground"
                    >
                      <span className="flex items-center gap-2">
                        <UsersIcon className="size-4" aria-hidden="true" />
                        {t("seatsLabel")}
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-4 text-right text-sm font-medium text-muted-foreground"
                    >
                      {t("perSeatLabel")}
                    </th>
                    <th
                      scope="col"
                      className="rounded-t-md bg-primary/[0.06] px-4 py-4 text-right font-display text-base tracking-tight text-foreground"
                    >
                      {t("totalLabel")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {brackets.map((bracket, index) => {
                    const last = index === brackets.length - 1;
                    return (
                      <tr
                        key={bracket.seats}
                        className={last ? undefined : "border-b border-border/70"}
                      >
                        <th
                          scope="row"
                          className="py-5 pr-4 align-middle text-sm font-normal text-foreground"
                        >
                          <span className="flex items-center gap-2">
                            <PlusIcon
                              className="size-3.5 text-primary"
                              aria-hidden="true"
                            />
                            {bracket.seats}
                          </span>
                        </th>
                        <td className="px-4 py-5 text-right align-middle text-sm tabular-nums text-muted-foreground">
                          {bracket.pricePerSeat}
                        </td>
                        <td
                          className={
                            last
                              ? "rounded-b-md bg-primary/[0.06] px-4 py-5 text-right align-middle"
                              : "bg-primary/[0.06] px-4 py-5 text-right align-middle"
                          }
                        >
                          <span className="font-display text-lg tabular-nums font-medium text-foreground">
                            {bracket.exampleTotal}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-relaxed text-muted-foreground">
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
