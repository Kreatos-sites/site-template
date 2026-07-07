import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  Truck,
  Package,
  Clock,
  Users,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  RefreshCcw,
  type LucideIcon,
} from "lucide-react";

type Kpi = {
  icon: string;
  value: string;
  label: string;
  trend: "up" | "down";
  trendValue: string;
};

type ActivityItem = {
  initials: string;
  actor: string;
  action: string;
  status: string;
  timestamp: string;
};

const KPI_ICONS: Record<string, LucideIcon> = {
  truck: Truck,
  package: Package,
  clock: Clock,
  users: Users,
};

const STATUS_ICONS: Record<string, LucideIcon> = {
  done: CheckCircle2,
  alert: AlertTriangle,
  update: RefreshCcw,
};

/**
 * Cuadrícula de tarjetas KPI con insignias de tendencia direccional
 * (arriba/abajo), apiladas sobre un feed de actividad tipo timeline.
 * Pensado para secciones de resultados operativos (logística, distribución).
 */
export function KpiCardsGridTrendBadgesActivity({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const kpis = t.raw("kpis") as Kpi[];
  const activity = t.raw("activity") as ActivityItem[];

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
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi, index) => {
            const Icon = KPI_ICONS[kpi.icon] ?? Package;
            const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown;
            return (
              <li key={kpi.label} className="contents">
                <Reveal delay={index * 60}>
                  <article className="flex h-full flex-col gap-6 bg-card p-8">
                    <Icon className="size-5 text-primary" aria-hidden="true" />
                    <div className="flex flex-1 flex-col justify-end">
                      <p className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-none tracking-tight text-foreground tabular-nums">
                        {kpi.value}
                      </p>
                      <p className="mt-3 text-sm text-muted-foreground">
                        {kpi.label}
                      </p>
                      <span
                        className={cn(
                          "mt-4 inline-flex w-fit items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground",
                        )}
                      >
                        <TrendIcon
                          className={cn(
                            "size-3.5",
                            kpi.trend === "up"
                              ? "text-primary"
                              : "text-muted-foreground",
                          )}
                          aria-hidden="true"
                        />
                        {kpi.trendValue}
                      </span>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal delay={kpis.length * 60}>
          <div className="mt-8 rounded-sm border border-border bg-card">
            <div className="border-b border-border px-6 py-5 sm:px-8">
              <h3 className="font-display text-lg text-foreground">
                {t("activityTitle")}
              </h3>
            </div>
            <ul>
              {activity.map((item, index) => {
                const StatusIcon = STATUS_ICONS[item.status] ?? CheckCircle2;
                return (
                  <li
                    key={`${item.actor}-${index}`}
                    className={cn(
                      "flex items-start gap-4 px-6 py-5 sm:px-8",
                      index !== activity.length - 1 &&
                        "border-b border-border",
                    )}
                  >
                    <span
                      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium text-secondary-foreground"
                      aria-hidden="true"
                    >
                      {item.initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{item.actor}</span>{" "}
                        {item.action}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.timestamp}
                      </p>
                    </div>
                    <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                      <StatusIcon
                        className="size-3.5 text-primary"
                        aria-hidden="true"
                      />
                      {t(`statusLabels.${item.status}`)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
