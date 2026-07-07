"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

type Included = string;

export function PricingSliderTeamSeatsDynamicCalculator({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const included = t.raw("included") as Included[];

  const minSeats = Number(t("minSeats"));
  const maxSeats = Number(t("maxSeats"));
  const defaultSeats = Number(t("defaultSeats"));
  const basePrice = Number(t("basePrice"));
  const perSeatPrice = Number(t("perSeatPrice"));

  const [seats, setSeats] = useState(defaultSeats);

  const total = useMemo(() => basePrice + seats * perSeatPrice, [basePrice, seats, perSeatPrice]);

  const formattedTotal = useMemo(
    () =>
      new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        maximumFractionDigits: 0,
      }).format(total),
    [total],
  );

  const progress = ((seats - minSeats) / (maxSeats - minSeats)) * 100;

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">{t("description")}</p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-5">
            <div className="flex flex-col gap-10 bg-card p-8 lg:col-span-3 lg:p-10">
              <div>
                <label htmlFor="team-seats-range" className="text-sm font-medium text-foreground">
                  {t("sliderLabel")}
                </label>
                <div className="mt-6 flex items-end justify-between">
                  <span className="font-display text-5xl tabular-nums text-foreground">{seats}</span>
                  <span className="text-sm text-muted-foreground">{t("seatsUnit")}</span>
                </div>
                <div className="relative mt-6">
                  <div className="h-1.5 w-full rounded-sm bg-secondary">
                    <div
                      className="h-1.5 rounded-sm bg-primary transition-[width] duration-200 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <input
                    id="team-seats-range"
                    type="range"
                    min={minSeats}
                    max={maxSeats}
                    step={1}
                    value={seats}
                    onChange={(e) => setSeats(Number(e.target.value))}
                    aria-label={t("sliderAriaLabel")}
                    aria-valuetext={t("sliderValueText", { seats })}
                    className={cn(
                      "absolute inset-x-0 top-1/2 h-1.5 w-full -translate-y-1/2 appearance-none bg-transparent",
                      "[&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full",
                      "[&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:ring-4 [&::-webkit-slider-thumb]:ring-primary/20",
                      "[&::-webkit-slider-thumb]:cursor-pointer",
                      "[&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full",
                      "[&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:ring-4 [&::-moz-range-thumb]:ring-primary/20",
                      "[&::-moz-range-thumb]:cursor-pointer",
                      "focus-visible:outline-none focus-visible:[&::-webkit-slider-thumb]:ring-primary/40",
                    )}
                  />
                </div>
                <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                  <span>{minSeats}</span>
                  <span>{maxSeats}</span>
                </div>
              </div>

              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {included.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between bg-secondary p-8 lg:col-span-2 lg:p-10">
              <div>
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  {t("totalLabel")}
                </p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-5xl tabular-nums text-foreground">{formattedTotal}</span>
                  <span className="text-sm text-muted-foreground">{t("periodLabel")}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {t("breakdown", { base: basePrice, seats, perSeat: perSeatPrice })}
                </p>
              </div>

              <a
                href={t("ctaHref")}
                className="mt-10 inline-flex w-full items-center justify-center rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t("ctaLabel")}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
