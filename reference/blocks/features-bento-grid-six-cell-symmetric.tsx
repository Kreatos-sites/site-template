import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  RiTruckLine,
  RiShieldCheckLine,
  RiTimeLine,
  RiMapPin2Line,
  RiCustomerService2Line,
  RiBarChartBoxLine,
  RiFileListLine,
  RiRouteLine,
  RiScales3Line,
  RiTeamLine,
  RiHandCoinLine,
  RiBuilding2Line,
  type RemixiconComponentType,
} from "@remixicon/react";

type Feature = {
  icon: string;
  title: string;
  description: string;
};

const ICONS: Record<string, RemixiconComponentType> = {
  truck: RiTruckLine,
  shield: RiShieldCheckLine,
  clock: RiTimeLine,
  map: RiMapPin2Line,
  support: RiCustomerService2Line,
  chart: RiBarChartBoxLine,
  file: RiFileListLine,
  route: RiRouteLine,
  scale: RiScales3Line,
  team: RiTeamLine,
  coin: RiHandCoinLine,
  building: RiBuilding2Line,
};

export function FeaturesBentoGridSixCellSymmetric({ ns }: { ns: string }) {
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
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = ICONS[feature.icon] ?? RiShieldCheckLine;
            return (
              <li key={feature.title} className="contents">
                <Reveal delay={i * 60}>
                  <article
                    className={cn(
                      "flex h-full flex-col gap-6 bg-card p-8",
                      i === 0 && "sm:col-span-2 lg:col-span-1",
                    )}
                  >
                    <span className="inline-flex size-11 items-center justify-center rounded-md bg-secondary">
                      <Icon className="size-5 text-primary" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-foreground">
                        {feature.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
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
