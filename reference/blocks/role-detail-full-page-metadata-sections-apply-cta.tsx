import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import {
  Briefcase,
  MapPin,
  Clock,
  Building2,
  CheckCircle2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

type MetaItem = { icon: string; label: string };
type ContentSection = { title: string; items: string[] };

const ICONS: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  "map-pin": MapPin,
  clock: Clock,
  building: Building2,
};

export function RoleDetailFullPageMetadataSectionsApplyCta({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const meta = t.raw("meta") as MetaItem[];
  const sections = t.raw("sections") as ContentSection[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-4xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">
            {t("summary")}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <ul className="mt-10 flex flex-wrap gap-3">
            {meta.map((item, index) => {
              const Icon = ICONS[item.icon] ?? Briefcase;
              return (
                <li
                  key={index}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm text-secondary-foreground"
                >
                  <Icon className="size-4 text-primary" strokeWidth={1.75} />
                  {item.label}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 flex flex-col gap-4 border-y border-border py-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                {t("applyHeading")}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("applySubtext")}
              </p>
            </div>
            <a
              href={t("applyHref")}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            >
              {t("applyLabel")}
              <ArrowRight className="size-4" />
            </a>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col gap-12">
          {sections.map((section, index) => (
            <Reveal key={section.title} delay={index * 60}>
              <div>
                <h3 className="font-display text-xl tracking-tight text-foreground">
                  {section.title}
                </h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {section.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <CheckCircle2
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        strokeWidth={1.75}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={sections.length * 60 + 60}>
          <div className="mt-14 flex flex-col items-start gap-4 rounded-sm border border-border bg-card p-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {t("closingText")}
            </p>
            <a
              href={t("applyHref")}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-sm bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            >
              {t("applyLabel")}
              <ArrowRight className="size-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
