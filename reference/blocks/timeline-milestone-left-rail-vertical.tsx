import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  RiFlagLine,
  RiBuilding2Line,
  RiTeamLine,
  RiRocketLine,
  RiAwardLine,
  RiGlobalLine,
  type RemixiconComponentType,
} from "@remixicon/react";

type Milestone = {
  icon: string;
  date: string;
  status: "completado" | "en-progreso" | "planeado";
  title: string;
  description: string;
};

const ICONS: Record<string, RemixiconComponentType> = {
  flag: RiFlagLine,
  building: RiBuilding2Line,
  team: RiTeamLine,
  rocket: RiRocketLine,
  award: RiAwardLine,
  global: RiGlobalLine,
};

const STATUS_STYLES: Record<Milestone["status"], string> = {
  completado: "border-primary bg-primary/10 text-primary",
  "en-progreso": "border-secondary bg-secondary text-secondary-foreground",
  planeado: "border-border bg-card text-muted-foreground",
};

export function TimelineMilestoneLeftRailVertical({ ns }: { ns: string }) {
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
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <ol className="relative mt-16 flex flex-col gap-12 border-l border-border pl-10 sm:pl-12">
          {milestones.map((m, i) => {
            const Icon = ICONS[m.icon] ?? RiFlagLine;
            return (
              <li key={i} className="relative">
                <Reveal delay={i * 60}>
                  <span
                    className={cn(
                      "absolute -left-[3.15rem] flex size-9 items-center justify-center rounded-full border bg-card sm:-left-[3.65rem]",
                      STATUS_STYLES[m.status],
                    )}
                  >
                    <Icon className="size-4" />
                  </span>

                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs tracking-wide text-muted-foreground">
                        {m.date}
                      </span>
                      <span
                        className={cn(
                          "inline-flex w-fit items-center rounded-sm border px-2.5 py-1 text-[0.65rem] font-medium tracking-[0.2em] uppercase",
                          STATUS_STYLES[m.status],
                        )}
                      >
                        {t(`statusLabels.${m.status}`)}
                      </span>
                    </div>
                    <h3 className="font-display text-xl text-foreground">
                      {m.title}
                    </h3>
                    <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {m.description}
                    </p>
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
