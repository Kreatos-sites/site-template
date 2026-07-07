import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

type Tile = {
  label: string;
  value: string;
  delta: string;
  direction: "up" | "down" | "flat";
};

export function MetricsStripHorizontalSixTilesDelta({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const tiles = t.raw("tiles") as Tile[];

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

        <ul className="mt-12 grid grid-cols-2 divide-y divide-border border border-border sm:grid-cols-3 lg:grid-cols-6 lg:divide-x lg:divide-y-0">
          {tiles.map((tile, index) => {
            const isUp = tile.direction === "up";
            const isDown = tile.direction === "down";
            const DeltaIcon = isUp ? TrendingUp : isDown ? TrendingDown : Minus;

            return (
              <li key={index} className="contents">
                <Reveal delay={index * 50}>
                  <div className="flex flex-col gap-3 bg-card px-5 py-6">
                    <p className="text-xs font-medium text-muted-foreground">
                      {tile.label}
                    </p>

                    <p className="font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-none tracking-tight text-foreground tabular-nums">
                      {tile.value}
                    </p>

                    <div
                      className={cn(
                        "inline-flex w-fit items-center gap-1 text-xs font-medium tabular-nums",
                        isUp && "text-primary",
                        isDown && "text-muted-foreground",
                        !isUp && !isDown && "text-muted-foreground",
                      )}
                    >
                      <DeltaIcon className="size-3.5" aria-hidden="true" />
                      {tile.delta}
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
