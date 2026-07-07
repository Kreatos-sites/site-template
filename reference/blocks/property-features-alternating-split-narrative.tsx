import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";
import {
  MapPinIcon,
  SparkleIcon,
  RulerIcon,
  ShieldCheckIcon,
  CheckIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as Icon } from "@phosphor-icons/react";

const ICONS: Record<string, Icon> = {
  location: MapPinIcon,
  finishes: SparkleIcon,
  layout: RulerIcon,
  security: ShieldCheckIcon,
};

type Row = {
  icon: string;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  statValue: string;
  statLabel: string;
  image: string;
  imageAlt: string;
};

export function PropertyFeaturesAlternatingSplitNarrative({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
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

        <div className="mt-16 flex flex-col lg:mt-24">
          {rows.map((row, i) => {
            const isEven = i % 2 === 0;
            const RowIcon = ICONS[row.icon] ?? MapPinIcon;
            return (
              <div
                key={row.title}
                className={cn(
                  i > 0 &&
                    "mt-14 border-t border-border pt-14 lg:mt-20 lg:pt-20",
                )}
              >
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <Reveal
                    delay={i * 60}
                    className={cn(!isEven && "lg:order-2")}
                  >
                    <div className="flex flex-col gap-5">
                      <div className="flex items-center gap-2">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-sm border border-border bg-secondary">
                          <RowIcon
                            className="size-3.5 text-primary"
                            weight="regular"
                            aria-hidden="true"
                          />
                        </span>
                        <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                          {row.eyebrow}
                        </p>
                      </div>

                      <h3 className="font-display text-2xl text-foreground lg:text-3xl">
                        {row.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {row.body}
                      </p>

                      <ul className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {row.points.map((point) => (
                          <li key={point} className="flex items-start gap-2">
                            <span className="mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                              <CheckIcon
                                weight="bold"
                                className="size-2.5"
                                aria-hidden="true"
                              />
                            </span>
                            <span className="text-sm text-foreground">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-2 flex items-baseline gap-2 border-t border-border pt-5">
                        <span className="font-display text-xl text-foreground">
                          {row.statValue}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {row.statLabel}
                        </span>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal
                    delay={i * 60 + 60}
                    className={cn(!isEven && "lg:order-1")}
                  >
                    <SmartImage
                      src={row.image}
                      alt={row.imageAlt}
                      className="aspect-[4/5] rounded-sm"
                    />
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
