import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  Rocket,
  Building2,
  Award,
  Handshake,
  TrendingUp,
  MapPin,
  Users,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type Milestone = {
  year: string;
  tag: string;
  title: string;
  description: string;
  icon: string;
};

const ICONS: Record<string, LucideIcon> = {
  rocket: Rocket,
  building: Building2,
  award: Award,
  handshake: Handshake,
  growth: TrendingUp,
  location: MapPin,
  team: Users,
  milestone: Sparkles,
};

export function TimelineMilestoneBilateralAlternatingSpine({ ns }: { ns: string }) {
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

        {/* mobile / tablet: single left rail */}
        <ol className="relative mt-16 flex flex-col gap-10 lg:hidden">
          <div aria-hidden className="absolute top-1 bottom-1 left-4 w-px bg-border sm:left-6" />
          {milestones.map((m, i) => {
            const Icon = ICONS[m.icon] ?? Sparkles;
            return (
              <li key={i} className="relative pl-12 sm:pl-16">
                <Reveal delay={i * 80}>
                  <div
                    aria-hidden
                    className="absolute top-0 left-4 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-card sm:left-6"
                  >
                    <Icon className="size-4 text-primary" strokeWidth={1.75} />
                  </div>
                  <MilestoneCard milestone={m} />
                </Reveal>
              </li>
            );
          })}
        </ol>

        {/* desktop: bilateral alternating spine */}
        <ol className="relative mt-20 hidden lg:flex lg:flex-col lg:gap-16">
          <div
            aria-hidden
            className="absolute top-1 bottom-1 left-1/2 w-px -translate-x-1/2 bg-border"
          />
          {milestones.map((m, i) => {
            const Icon = ICONS[m.icon] ?? Sparkles;
            const isRight = i % 2 === 1;
            return (
              <li key={i} className="relative grid grid-cols-2 gap-16">
                <Reveal delay={i * 80} className={cn(isRight && "invisible")}>
                  <div className={cn(!isRight && "text-right")}>
                    <MilestoneCard milestone={m} align={isRight ? "left" : "right"} />
                  </div>
                </Reveal>
                <Reveal delay={i * 80} className={cn(!isRight && "invisible")}>
                  <div>
                    <MilestoneCard milestone={m} align="left" />
                  </div>
                </Reveal>
                <div
                  aria-hidden
                  className="absolute top-1 left-1/2 flex size-9 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-card"
                >
                  <Icon className="size-4 text-primary" strokeWidth={1.75} />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function MilestoneCard({
  milestone,
  align = "left",
}: {
  milestone: Milestone;
  align?: "left" | "right";
}) {
  return (
    <div className={cn("flex flex-col gap-2", align === "right" && "items-end")}>
      <div className="flex items-center gap-3">
        <span className="font-display text-2xl tracking-tight text-foreground">
          {milestone.year}
        </span>
        <span className="rounded-sm bg-secondary px-2 py-1 text-xs font-medium tracking-wide text-secondary-foreground uppercase">
          {milestone.tag}
        </span>
      </div>
      <h3 className="font-display text-lg text-foreground">{milestone.title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{milestone.description}</p>
    </div>
  );
}
