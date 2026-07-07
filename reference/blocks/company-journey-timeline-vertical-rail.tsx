import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  Flag,
  Building2,
  Award,
  Users,
  Rocket,
  MapPin,
  type LucideIcon,
} from "lucide-react";

type Milestone = {
  date: string;
  status: string;
  icon: string;
  title: string;
  description: string;
};

const ICONS: Record<string, LucideIcon> = {
  flag: Flag,
  building: Building2,
  award: Award,
  users: Users,
  rocket: Rocket,
  map: MapPin,
};

const STATUS_STYLES: Record<string, string> = {
  completado: "bg-primary text-primary-foreground",
  "en-curso": "bg-secondary text-secondary-foreground",
  planeado: "border border-border text-muted-foreground",
};

export function CompanyJourneyTimelineVerticalRail({ ns }: { ns: string }) {
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

        <ol className="relative mt-16 border-l border-border pl-10 sm:pl-12">
          {milestones.map((m, i) => {
            const Icon = ICONS[m.icon] ?? Flag;
            const statusClass =
              STATUS_STYLES[m.status] ?? STATUS_STYLES.planeado;
            return (
              <li key={i} className="relative pb-14 last:pb-0">
                <Reveal delay={i * 60}>
                  <span className="absolute top-0 -left-[3.15rem] flex size-9 items-center justify-center rounded-full border border-border bg-card sm:-left-[3.65rem]">
                    <Icon className="size-4 text-primary" strokeWidth={1.75} />
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs tracking-wide text-muted-foreground">
                      {m.date}
                    </span>
                    <span
                      className={`rounded-sm px-2 py-0.5 text-[0.6875rem] font-medium tracking-wide uppercase ${statusClass}`}
                    >
                      {t(`statusLabels.${m.status}`)}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl text-foreground">
                    {m.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {m.description}
                  </p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
