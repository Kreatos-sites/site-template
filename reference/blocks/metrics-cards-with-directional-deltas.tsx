import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  RiArrowRightUpLine,
  RiArrowRightDownLine,
  RiSubtractLine,
} from "@remixicon/react";

type Metric = {
  label: string;
  value: string;
  delta: string;
  direction: "up" | "down" | "flat";
  caption: string;
};

export function MetricsCardsWithDirectionalDeltas({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const metrics = t.raw("metrics") as Metric[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
          </div>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => {
            const isUp = metric.direction === "up";
            const isDown = metric.direction === "down";
            const DeltaIcon = isUp
              ? RiArrowRightUpLine
              : isDown
                ? RiArrowRightDownLine
                : RiSubtractLine;

            return (
              <li key={index} className="contents">
                <Reveal delay={index * 60}>
                  <article className="flex h-full flex-col justify-between gap-6 bg-card p-8">
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.label}
                    </p>

                    <div>
                      <p className="font-display text-4xl tracking-tight text-foreground tabular-nums">
                        {metric.value}
                      </p>

                      <div
                        className={cn(
                          "mt-4 inline-flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-medium tabular-nums",
                          isUp && "bg-primary/10 text-primary",
                          isDown && "bg-secondary text-foreground",
                          !isUp && !isDown && "bg-secondary text-muted-foreground",
                        )}
                      >
                        <DeltaIcon className="size-3.5" aria-hidden="true" />
                        {metric.delta}
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {metric.caption}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
