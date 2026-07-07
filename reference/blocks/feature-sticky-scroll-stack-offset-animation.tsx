import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  RiRouteLine,
  RiShieldCheckLine,
  RiTeamLine,
  RiTruckLine,
  RiBarChartBoxLine,
  type RemixiconComponentType,
} from "@remixicon/react";

type Feature = { icon: string; title: string; description: string };

const ICONS: Record<string, RemixiconComponentType> = {
  route: RiRouteLine,
  shield: RiShieldCheckLine,
  team: RiTeamLine,
  truck: RiTruckLine,
  chart: RiBarChartBoxLine,
};

export function FeatureStickyScrollStackOffsetAnimation({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const features = t.raw("features") as Feature[];

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
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <ul className="mt-16 flex flex-col gap-6">
          {features.map((feature, i) => {
            const Icon = ICONS[feature.icon] ?? RiRouteLine;
            return (
              <li key={i} className="sticky" style={{ top: `${5 + i * 1.25}rem` }}>
                <Reveal delay={i * 60}>
                  <article className="flex flex-col gap-6 rounded-lg border border-border bg-card p-8 shadow-sm sm:flex-row sm:items-start sm:gap-10 sm:p-10">
                    <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-start">
                      <span className="flex size-12 items-center justify-center rounded-md bg-secondary text-primary">
                        <Icon className="size-6" />
                      </span>
                      <span className="font-display text-3xl tracking-tight text-muted-foreground/60 sm:text-4xl">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-foreground sm:text-2xl">
                        {feature.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {feature.description}
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
