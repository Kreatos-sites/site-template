import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  CheckCircle2,
  CircleDot,
  FileText,
  MessageSquare,
  AlertTriangle,
  Truck,
  type LucideIcon,
} from "lucide-react";

type Update = {
  avatarLabel: string;
  icon: string;
  actor: string;
  action: string;
  time: string;
  title: string;
  description: string;
};

type Day = {
  date: string;
  updates: Update[];
};

const ICONS: Record<string, LucideIcon> = {
  check: CheckCircle2,
  progress: CircleDot,
  document: FileText,
  message: MessageSquare,
  alert: AlertTriangle,
  shipment: Truck,
};

export function NewsFeedActivityUpdatesVerticalRailDayGrouped({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const days = t.raw("days") as Day[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">{t("description")}</p>
        </Reveal>

        <div className="mt-16 max-w-3xl">
          {days.map((day, dayIndex) => (
            <div key={dayIndex} className={dayIndex > 0 ? "mt-12" : ""}>
              <Reveal delay={dayIndex * 60}>
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">{day.date}</p>
              </Reveal>

              <ul className="mt-6">
                {day.updates.map((update, i) => {
                  const StatusIcon = ICONS[update.icon] ?? CircleDot;
                  const isLast = i === day.updates.length - 1;
                  return (
                    <li key={i} className="relative flex gap-5 pb-8 last:pb-0">
                      {!isLast ? (
                        <span
                          aria-hidden="true"
                          className="absolute top-11 bottom-0 left-5 w-px bg-border"
                        />
                      ) : null}

                      <Reveal delay={dayIndex * 60 + i * 40}>
                        <div className="relative flex shrink-0">
                          <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                            {update.avatarLabel}
                          </span>
                          <span className="absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background">
                            <StatusIcon className="size-3" strokeWidth={2} />
                          </span>
                        </div>
                      </Reveal>

                      <Reveal delay={dayIndex * 60 + i * 40 + 20}>
                        <div className="min-w-0 pt-1.5">
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">{update.actor}</span> {update.action}{" "}
                            <span className="text-muted-foreground">· {update.time}</span>
                          </p>
                          <h3 className="mt-2 font-display text-lg text-foreground">{update.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{update.description}</p>
                        </div>
                      </Reveal>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
