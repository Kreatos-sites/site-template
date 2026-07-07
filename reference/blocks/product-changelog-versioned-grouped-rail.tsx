import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  RiAddLine,
  RiArrowUpCircleLine,
  RiBugLine,
  type RemixiconComponentType,
} from "@remixicon/react";

type ChangeItem = {
  type: "added" | "improved" | "fixed";
  text: string;
};

type Release = {
  version: string;
  date: string;
  title: string;
  changes: ChangeItem[];
};

const TYPE_ICONS: Record<ChangeItem["type"], RemixiconComponentType> = {
  added: RiAddLine,
  improved: RiArrowUpCircleLine,
  fixed: RiBugLine,
};

export function ProductChangelogVersionedGroupedRail({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const releases = t.raw("releases") as Release[];
  const typeLabels = t.raw("typeLabels") as Record<ChangeItem["type"], string>;

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
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col gap-0">
          {releases.map((release, i) => (
            <Reveal key={release.version} delay={i * 60}>
              <article className="grid grid-cols-1 gap-6 border-t border-border py-10 first:border-t-0 sm:grid-cols-[minmax(0,180px)_1fr] sm:gap-10">
                <div className="flex flex-row items-baseline gap-3 sm:flex-col sm:items-start sm:gap-2">
                  <span className="inline-flex items-center rounded-sm bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                    {t("versionLabel", { version: release.version })}
                  </span>
                  <time className="text-sm text-muted-foreground">
                    {release.date}
                  </time>
                </div>

                <div>
                  <h3 className="font-display text-xl text-foreground">
                    {release.title}
                  </h3>
                  <ul className="mt-6 flex flex-col gap-3">
                    {release.changes.map((change, j) => {
                      const Icon = TYPE_ICONS[change.type];
                      return (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                        >
                          <span className="mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-sm bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                            <Icon className="size-3.5 text-primary" />
                            {typeLabels[change.type]}
                          </span>
                          <span className="pt-0.5">{change.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
