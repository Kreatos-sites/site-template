import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import {
  Boxes,
  Clock,
  MapPinned,
  ShieldCheck,
  TrendingUp,
  Truck,
  Users,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

type Stat = { icon: string; value: string; label: string; description: string };

const ICONS: Record<string, LucideIcon> = {
  truck: Truck,
  warehouse: Warehouse,
  users: Users,
  clock: Clock,
  shield: ShieldCheck,
  map: MapPinned,
  boxes: Boxes,
  trending: TrendingUp,
};

export function StatsMetricCards({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as Stat[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = ICONS[stat.icon] ?? TrendingUp;
            return (
              <li key={index} className="contents">
                <Reveal delay={index * 60}>
                  <article className="relative flex h-full flex-col gap-6 overflow-hidden rounded-sm border border-border bg-gradient-to-br from-secondary to-card p-8">
                    <span
                      aria-hidden="true"
                      className="absolute -top-10 -right-10 size-28 rounded-full bg-primary/10 blur-2xl"
                    />
                    <Icon
                      className="relative size-5 text-primary"
                      strokeWidth={1.75}
                    />
                    <div className="relative">
                      <p className="font-display text-[clamp(2.25rem,1.6rem+2vw,3rem)] leading-none tracking-tight text-foreground tabular-nums">
                        {stat.value}
                      </p>
                      <p className="mt-3 text-sm font-medium tracking-wide text-primary uppercase">
                        {stat.label}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {stat.description}
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
