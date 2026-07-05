import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  Boxes,
  Compass,
  Gauge,
  Layers,
  LineChart,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

type Feature = {
  icon: string;
  title: string;
  description: string;
};

const ICONS: Record<string, LucideIcon> = {
  boxes: Boxes,
  compass: Compass,
  gauge: Gauge,
  layers: Layers,
  chart: LineChart,
  shield: ShieldCheck,
  sparkles: Sparkles,
  workflow: Workflow,
  zap: Zap,
};

export function FeatureCardsIcon({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const features = t.raw("features") as Feature[];

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

        <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = ICONS[feature.icon] ?? Sparkles;
            const isEmphasis = index === 0;

            return (
              <li key={index} className="contents">
                <Reveal delay={index * 60}>
                  <article
                    className={cn(
                      "group relative flex h-full min-h-[15rem] flex-col justify-between gap-8 bg-card p-8 transition-colors duration-300 hover:bg-secondary",
                      isEmphasis && "sm:col-span-2 lg:col-span-1 lg:row-span-1",
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                        aria-hidden="true"
                      >
                        <Icon className="size-5" strokeWidth={1.75} />
                      </span>
                      <span
                        className="text-[0.6875rem] font-medium tabular-nums tracking-[0.25em] text-muted-foreground/70"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-xl leading-snug tracking-tight text-balance text-foreground">
                        {feature.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>

                    <ArrowUpRight
                      className="absolute right-8 bottom-8 size-4 text-muted-foreground/0 transition-all duration-300 group-hover:text-primary group-hover:-translate-y-0.5"
                      aria-hidden="true"
                      strokeWidth={2}
                    />
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
