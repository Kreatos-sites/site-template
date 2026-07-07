import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { ChevronUp, Rocket, Wrench, Lightbulb, CheckCircle2, type LucideIcon } from "lucide-react";

type Contributor = { initials: string };

type RoadmapItem = {
  title: string;
  description: string;
  status: string;
  statusLabel: string;
  category: string;
  votes: string;
  progress: number;
  contributors: Contributor[];
};

const STATUS_ICONS: Record<string, LucideIcon> = {
  planned: Lightbulb,
  progress: Wrench,
  review: Rocket,
  shipped: CheckCircle2,
};

const STATUS_STYLES: Record<string, string> = {
  planned: "bg-secondary text-secondary-foreground",
  progress: "bg-primary/10 text-primary",
  review: "bg-primary/10 text-primary",
  shipped: "bg-primary text-primary-foreground",
};

export function PublicRoadmapVoteableFeatures({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as RoadmapItem[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mt-6 text-[1.05rem] leading-relaxed text-muted-foreground">
              {t("body")}
            </p>
          </Reveal>
        </div>

        <ul className="mx-auto mt-16 flex max-w-4xl flex-col gap-4">
          {items.map((item, i) => {
            const StatusIcon = STATUS_ICONS[item.status] ?? Lightbulb;
            const statusClass = STATUS_STYLES[item.status] ?? "bg-secondary text-secondary-foreground";
            return (
              <li key={item.title} className="contents">
                <Reveal delay={i * 60}>
                  <article className="flex flex-col gap-5 border border-border bg-card p-6 sm:flex-row sm:items-start sm:gap-6">
                    <div className="flex shrink-0 flex-col items-center gap-1 rounded-sm border border-border bg-background px-4 py-3 sm:w-20">
                      <ChevronUp className="size-4 text-primary" strokeWidth={2} aria-hidden="true" />
                      <span className="font-display text-lg leading-none text-foreground tabular-nums">
                        {item.votes}
                      </span>
                      <span className="text-[0.65rem] tracking-wide text-muted-foreground uppercase">
                        {t("votesLabel")}
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs font-medium",
                            statusClass,
                          )}
                        >
                          <StatusIcon className="size-3.5" strokeWidth={2} aria-hidden="true" />
                          {item.statusLabel}
                        </span>
                        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="mt-3 font-display text-xl text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>

                      <div className="mt-5 flex items-center gap-4">
                        <div
                          className="h-1.5 flex-1 overflow-hidden rounded-sm bg-secondary"
                          role="img"
                          aria-label={t("progressLabel", { percent: item.progress })}
                        >
                          <div
                            className="h-full rounded-sm bg-primary"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <div className="flex -space-x-2">
                          {item.contributors.map((contributor, ci) => (
                            <span
                              key={ci}
                              className="flex size-7 items-center justify-center rounded-full border-2 border-card bg-secondary text-[0.65rem] font-medium text-secondary-foreground"
                            >
                              {contributor.initials}
                            </span>
                          ))}
                        </div>
                      </div>
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
