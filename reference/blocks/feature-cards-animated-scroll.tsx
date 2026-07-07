import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  BadgeCheck,
  Boxes,
  ClipboardList,
  Gauge,
  Handshake,
  Layers,
  LineChart,
  ShieldCheck,
  Sparkles,
  Truck,
  Workflow,
  type LucideIcon,
} from "lucide-react";

type Feature = {
  icon: string;
  title: string;
  description: string;
};

const ICONS: Record<string, LucideIcon> = {
  badge: BadgeCheck,
  boxes: Boxes,
  clipboard: ClipboardList,
  gauge: Gauge,
  handshake: Handshake,
  layers: Layers,
  chart: LineChart,
  shield: ShieldCheck,
  sparkles: Sparkles,
  truck: Truck,
  workflow: Workflow,
};

export function FeatureCardsAnimatedScroll({ ns }: { ns: string }) {
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

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = ICONS[feature.icon] ?? Sparkles;

            return (
              <li key={index} className="contents">
                <Reveal delay={index * 90}>
                  <article
                    className={cn(
                      "group flex h-full flex-col gap-6 rounded-sm border border-border bg-card p-7 transition-transform duration-300 ease-out",
                      "hover:-translate-y-1 hover:border-primary/40",
                    )}
                  >
                    <span
                      className="inline-flex size-11 items-center justify-center rounded-sm bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                      aria-hidden="true"
                    >
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>

                    <div>
                      <h3 className="font-display text-lg leading-snug text-balance text-foreground">
                        {feature.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>

                    <span
                      className="mt-auto h-px w-8 bg-border transition-all duration-300 group-hover:w-16 group-hover:bg-primary"
                      aria-hidden="true"
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
