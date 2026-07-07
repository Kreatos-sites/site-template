import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  CompassIcon,
  HardHatIcon,
  BuildingIcon,
  UsersThreeIcon,
  TrophyIcon,
  MapPinIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

type Milestone = {
  year: string;
  tag: string;
  title: string;
  description: string;
  icon: string;
};

const ICONS: Record<string, PhosphorIcon> = {
  compass: CompassIcon,
  hardhat: HardHatIcon,
  building: BuildingIcon,
  team: UsersThreeIcon,
  trophy: TrophyIcon,
  pin: MapPinIcon,
};

export function TimelineBilateralSpineCenteredMilestones({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const milestones = t.raw("milestones") as Milestone[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
          </Reveal>
        </div>

        <ol className="relative mt-20 flex flex-col gap-10 lg:mt-24 lg:gap-0">
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[11px] w-px bg-border lg:left-1/2 lg:-translate-x-1/2"
          />
          {milestones.map((milestone, i) => {
            const Icon = ICONS[milestone.icon] ?? CompassIcon;
            const isEven = i % 2 === 0;
            return (
              <li
                key={milestone.year + milestone.title}
                className="relative pl-12 lg:grid lg:grid-cols-2 lg:gap-x-14 lg:pl-0 lg:py-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 flex size-6 items-center justify-center rounded-full border-2 border-primary bg-background text-[0.6rem] font-semibold text-primary lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
                >
                  <Icon className="size-3" weight="bold" />
                </span>

                <div
                  className={cn(isEven ? "lg:col-start-1" : "lg:col-start-2")}
                >
                  <Reveal delay={i * 60}>
                    <div
                      className={cn(
                        "flex flex-col gap-3 border-l-2 border-primary/30 bg-card p-6",
                        isEven
                          ? "lg:mr-10 lg:border-r-2 lg:border-l-0 lg:pr-6 lg:pl-0 lg:text-right"
                          : "lg:ml-10",
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-baseline gap-3",
                          isEven && "lg:flex-row-reverse",
                        )}
                      >
                        <span className="font-display text-2xl text-foreground tabular-nums">
                          {milestone.year}
                        </span>
                        <span className="rounded-sm bg-secondary px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-secondary-foreground uppercase">
                          {milestone.tag}
                        </span>
                      </div>
                      <h3 className="font-display text-xl text-foreground">
                        {milestone.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
