import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  RiAddLine,
  RiArrowUpCircleLine,
  RiBugLine,
  type RemixiconComponentType,
} from "@remixicon/react";

type ChangeGroup = {
  type: string;
  label: string;
  items: string[];
};

type Entry = {
  version: string;
  date: string;
  title: string;
  groups: ChangeGroup[];
};

const TYPE_ICONS: Record<string, RemixiconComponentType> = {
  added: RiAddLine,
  improved: RiArrowUpCircleLine,
  fixed: RiBugLine,
};

const TYPE_STYLES: Record<string, string> = {
  added: "bg-primary/10 text-primary",
  improved: "bg-secondary text-secondary-foreground",
  fixed: "bg-muted text-muted-foreground",
};

export function ChangelogVersionedGroupedRail({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const entries = t.raw("entries") as Entry[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <ol className="mt-16 flex flex-col">
          {entries.map((entry, i) => (
            <li key={entry.version} className="contents">
              <Reveal delay={i * 60}>
                <article
                  className={cn(
                    "grid grid-cols-1 gap-6 border-t border-border py-10 first:border-t-0 first:pt-0 lg:grid-cols-[220px_1fr] lg:gap-12",
                  )}
                >
                  <div className="lg:sticky lg:top-24 lg:self-start">
                    <p className="font-display text-2xl tracking-tight text-foreground">
                      {entry.version}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">{entry.date}</p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {entry.title}
                    </p>
                  </div>

                  <div className="flex flex-col gap-8">
                    {entry.groups.map((group) => {
                      const Icon = TYPE_ICONS[group.type] ?? RiAddLine;
                      const badgeStyle = TYPE_STYLES[group.type] ?? TYPE_STYLES.added;
                      return (
                        <div key={group.type}>
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs font-medium",
                              badgeStyle,
                            )}
                          >
                            <Icon className="size-3.5" />
                            {group.label}
                          </span>
                          <ul className="mt-4 flex flex-col gap-3">
                            {group.items.map((item, j) => (
                              <li
                                key={j}
                                className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                              >
                                <span
                                  className="mt-2 size-1 shrink-0 rounded-full bg-border"
                                  aria-hidden="true"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
