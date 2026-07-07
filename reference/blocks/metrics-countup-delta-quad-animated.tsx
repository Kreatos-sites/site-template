import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

type Metric = {
  value: string;
  suffix?: string;
  label: string;
  delta: string;
  direction: "up" | "down";
};

export function MetricsCountupDeltaQuadAnimated({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const metrics = t.raw("metrics") as Metric[];

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

        <dl className="mt-16 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <div key={i} className="contents">
              <Reveal delay={i * 60}>
                <div className="flex h-full flex-col justify-between gap-6 bg-card p-8">
                  <dt className="text-sm font-medium text-muted-foreground">{m.label}</dt>
                  <div className="flex items-end justify-between gap-4">
                    <dd className="font-display text-[clamp(2.25rem,4vw,3rem)] leading-none tracking-tight text-foreground">
                      {m.value}
                      {m.suffix ? (
                        <span className="ml-0.5 text-xl text-muted-foreground">{m.suffix}</span>
                      ) : null}
                    </dd>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-medium",
                        m.direction === "up"
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary text-secondary-foreground",
                      )}
                    >
                      {m.direction === "up" ? (
                        <ArrowUpRight className="size-3.5" strokeWidth={2} />
                      ) : (
                        <ArrowDownRight className="size-3.5" strokeWidth={2} />
                      )}
                      {m.delta}
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
