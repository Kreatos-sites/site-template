import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  FlagIcon,
  BuildingsIcon,
  HandshakeIcon,
  TrophyIcon,
  RocketLaunchIcon,
  MapPinIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

type Milestone = {
  date: string;
  status: string;
  title: string;
  description: string;
  icon: string;
};

const ICONS: Record<string, PhosphorIcon> = {
  flag: FlagIcon,
  buildings: BuildingsIcon,
  handshake: HandshakeIcon,
  trophy: TrophyIcon,
  rocket: RocketLaunchIcon,
  pin: MapPinIcon,
};

const STATUS_STYLES: Record<string, string> = {
  done: "bg-primary text-primary-foreground",
  active: "bg-secondary text-secondary-foreground",
  upcoming: "border border-border bg-card text-muted-foreground",
};

export function TimelineVerticalMilestoneDatedBadges({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as Milestone[];

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

        <ol className="relative mt-16 flex flex-col gap-10 lg:mt-20">
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-4 w-px bg-border"
          />
          {items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? FlagIcon;
            const statusClass = STATUS_STYLES[item.status] ?? STATUS_STYLES.upcoming;
            return (
              <li key={i} className="relative pl-14">
                <span className="absolute top-0 left-0 flex size-8 items-center justify-center rounded-full border border-border bg-card text-primary">
                  <Icon className="size-4" weight="regular" />
                </span>
                <Reveal delay={i * 60}>
                  <article className="flex flex-col gap-3 rounded-sm border border-border bg-card p-6 sm:flex-row sm:items-start sm:gap-6">
                    <div className="flex shrink-0 flex-col gap-2 sm:w-36">
                      <span className="font-display text-lg tracking-tight text-foreground">
                        {item.date}
                      </span>
                      <span
                        className={cn(
                          "w-fit rounded-sm px-2.5 py-1 text-xs font-medium tracking-wide uppercase",
                          statusClass,
                        )}
                      >
                        {t(`statusLabels.${item.status}`)}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-display text-lg text-foreground">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
