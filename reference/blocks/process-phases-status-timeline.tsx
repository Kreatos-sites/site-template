import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  CircleCheck,
  CircleDashed,
  CircleDotDashed,
  type LucideIcon,
} from "lucide-react";

type Status = "completado" | "en-curso" | "planeado";

type Milestone = {
  date: string;
  status: Status;
  title: string;
  description: string;
};

const STATUS_ICON: Record<Status, LucideIcon> = {
  completado: CircleCheck,
  "en-curso": CircleDotDashed,
  planeado: CircleDashed,
};

const STATUS_STYLE: Record<Status, string> = {
  completado: "border-primary bg-primary text-primary-foreground",
  "en-curso": "border-primary bg-card text-primary",
  planeado: "border-border bg-card text-muted-foreground",
};

export function ProcessPhasesStatusTimeline({ ns }: { ns: string }) {
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

        <ol className="mt-16 space-y-0">
          {milestones.map((milestone, i) => {
            const Icon = STATUS_ICON[milestone.status] ?? CircleDashed;
            const isLast = i === milestones.length - 1;
            return (
              <li key={i} className="relative pb-12 last:pb-0">
                {!isLast ? (
                  <span
                    aria-hidden="true"
                    className="absolute top-10 left-5 h-[calc(100%-1rem)] w-px bg-border"
                  />
                ) : null}
                <Reveal delay={i * 60}>
                  <div className="flex gap-6">
                    <span
                      className={cn(
                        "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border",
                        STATUS_STYLE[milestone.status],
                      )}
                    >
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <div className="flex-1 pt-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs tracking-wide text-muted-foreground">
                          {milestone.date}
                        </span>
                        <span
                          className={cn(
                            "rounded-sm px-2 py-0.5 text-[0.65rem] font-medium tracking-wide uppercase",
                            milestone.status === "completado" &&
                              "bg-primary text-primary-foreground",
                            milestone.status === "en-curso" &&
                              "bg-secondary text-secondary-foreground",
                            milestone.status === "planeado" &&
                              "bg-secondary text-muted-foreground",
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
