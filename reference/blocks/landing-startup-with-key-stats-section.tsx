import { useTranslations } from "next-intl";
import { Rocket, Users, Clock, TrendingUp, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";

type Stat = {
  icon: string;
  value: string;
  label: string;
  description: string;
};

const ICONS: Record<string, LucideIcon> = {
  rocket: Rocket,
  users: Users,
  clock: Clock,
  trending: TrendingUp,
};

export function LandingStartupWithKeyStatsSection({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as Stat[];

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
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = ICONS[stat.icon] ?? Rocket;
            return (
              <li key={i} className="contents">
                <Reveal delay={i * 60}>
                  <article className="flex h-full flex-col gap-4 bg-card p-8">
                    <Icon className="size-5 text-primary" strokeWidth={1.75} />
                    <p className="font-display text-4xl text-foreground">
                      {stat.value}
                    </p>
                    <div>
                      <p className="text-sm font-medium text-foreground">
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
