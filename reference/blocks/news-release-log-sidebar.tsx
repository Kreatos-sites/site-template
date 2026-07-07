import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  RiAddCircleLine,
  RiArrowUpCircleLine,
  RiCheckboxCircleLine,
  type RemixiconComponentType,
} from "@remixicon/react";

type ChangeType = "added" | "improved" | "fixed";

type ChangeGroup = {
  type: ChangeType;
  label: string;
  items: string[];
};

type Release = {
  version: string;
  date: string;
  title: string;
  groups: ChangeGroup[];
};

const TYPE_ICONS: Record<ChangeType, RemixiconComponentType> = {
  added: RiAddCircleLine,
  improved: RiArrowUpCircleLine,
  fixed: RiCheckboxCircleLine,
};

const TYPE_STYLES: Record<ChangeType, string> = {
  added: "bg-primary/10 text-primary",
  improved: "bg-secondary text-secondary-foreground",
  fixed: "bg-muted text-muted-foreground",
};

export function NewsReleaseLogSidebar({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const releases = t.raw("releases") as Release[];

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

        <div className="mt-16 flex flex-col gap-12">
          {releases.map((release, i) => (
            <Reveal key={release.version} delay={i * 60}>
              <article className="grid grid-cols-1 gap-6 border-t border-border pt-10 first:border-t-0 first:pt-0 lg:grid-cols-[minmax(0,220px)_1fr] lg:gap-10">
                <div className="flex flex-row items-baseline gap-3 lg:sticky lg:top-24 lg:flex-col lg:items-start lg:gap-2 lg:self-start">
                  <span className="rounded-sm bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                    {release.version}
                  </span>
                  <time className="text-sm text-muted-foreground">
                    {release.date}
                  </time>
                  <h3 className="font-display text-lg text-foreground lg:mt-1">
                    {release.title}
                  </h3>
                </div>

                <div className="flex flex-col gap-6">
                  {release.groups.map((group, gi) => {
                    const Icon = TYPE_ICONS[group.type] ?? RiAddCircleLine;
                    return (
                      <div key={gi} className="flex flex-col gap-3">
                        <span
                          className={cn(
                            "inline-flex w-fit items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs font-medium",
                            TYPE_STYLES[group.type],
                          )}
                        >
                          <Icon className="size-3.5" />
                          {group.label}
                        </span>
                        <ul className="flex flex-col gap-2">
                          {group.items.map((item, ii) => (
                            <li
                              key={ii}
                              className="flex gap-3 text-sm leading-relaxed text-foreground"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground"
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
          ))}
        </div>
      </div>
    </section>
  );
}
