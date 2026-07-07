import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  RiTruckLine,
  RiMapPin2Line,
  RiBuildingLine,
  RiGlobalLine,
  RiShieldCheckLine,
  RiTeamLine,
  RiRocketLine,
  RiBarChartBoxLine,
  type RemixiconComponentType,
} from "@remixicon/react";

type Status = "lanzado" | "en-progreso" | "planeado";

type Milestone = {
  date: string;
  status: Status;
  icon: string;
  title: string;
  description: string;
};

const ICONS: Record<string, RemixiconComponentType> = {
  truck: RiTruckLine,
  pin: RiMapPin2Line,
  building: RiBuildingLine,
  global: RiGlobalLine,
  shield: RiShieldCheckLine,
  team: RiTeamLine,
  rocket: RiRocketLine,
  chart: RiBarChartBoxLine,
};

const STATUS_BADGE: Record<Status, string> = {
  lanzado: "bg-primary text-primary-foreground",
  "en-progreso": "bg-secondary text-secondary-foreground",
  planeado: "bg-secondary text-muted-foreground",
};

const STATUS_NODE: Record<Status, string> = {
  lanzado: "border-primary text-primary",
  "en-progreso": "border-primary/60 text-primary",
  planeado: "border-border text-muted-foreground",
};

export function ProcessMilestoneTimelineVerticalBadges({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const milestones = t.raw("milestones") as Milestone[];

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

        <ol className="mt-16">
          {milestones.map((milestone, i) => {
            const Icon = ICONS[milestone.icon] ?? RiRocketLine;
            const isLast = i === milestones.length - 1;
            return (
              <li key={i} className="relative pb-12 last:pb-0">
                {!isLast ? (
                  <span
                    aria-hidden="true"
                    className="absolute top-12 left-[1.375rem] h-[calc(100%-1.5rem)] w-px bg-border"
                  />
                ) : null}
                <Reveal delay={i * 60}>
                  <div className="flex gap-6">
                    <span
                      className={cn(
                        "relative z-10 flex size-11 shrink-0 items-center justify-center rounded-sm border-2 bg-card",
                        STATUS_NODE[milestone.status],
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <div className="flex-1 pt-1.5">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs tracking-wide text-muted-foreground">
                          {milestone.date}
                        </span>
                        <span
                          className={cn(
                            "rounded-sm px-2 py-0.5 text-[0.65rem] font-medium tracking-wide uppercase",
                            STATUS_BADGE[milestone.status],
                          )}
                        >
                          {t(`status.${milestone.status}`)}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-xl text-foreground">
                        {milestone.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
