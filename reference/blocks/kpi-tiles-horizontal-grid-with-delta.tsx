import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { RiArrowUpLine, RiArrowDownLine } from "@remixicon/react";

type Kpi = {
  label: string;
  value: string;
  delta: string;
  direction: "up" | "down";
};

export function KpiTilesHorizontalGridWithDelta({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const kpis = t.raw("kpis") as Kpi[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
            </div>
            <span className="rounded-sm border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              {t("period")}
            </span>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
          {kpis.map((kpi, i) => (
            <Reveal key={kpi.label} delay={i * 60}>
              <div className="flex h-full flex-col gap-3 bg-card p-6">
                <p className="text-xs font-medium text-muted-foreground">{kpi.label}</p>
                <p className="font-display text-3xl tracking-tight text-foreground">
                  {kpi.value}
                </p>
                <div
                  className={
                    kpi.direction === "up"
                      ? "flex items-center gap-1 text-xs font-medium text-primary"
                      : "flex items-center gap-1 text-xs font-medium text-muted-foreground"
                  }
                >
                  {kpi.direction === "up" ? (
                    <RiArrowUpLine className="size-3.5" />
                  ) : (
                    <RiArrowDownLine className="size-3.5" />
                  )}
                  <span>{kpi.delta}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
