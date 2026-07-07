import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import {
  RiBriefcase4Line,
  RiMapPinLine,
  RiMailLine,
  RiLinkedinBoxLine,
  type RemixiconComponentType,
} from "@remixicon/react";

type Stat = { value: string; label: string };
type TimelineItem = { period: string; title: string; description: string };
type ContactLink = { icon: string; label: string; href: string };

const ICONS: Record<string, RemixiconComponentType> = {
  role: RiBriefcase4Line,
  location: RiMapPinLine,
  email: RiMailLine,
  linkedin: RiLinkedinBoxLine,
};

export function TeamMemberProfileIndividualCover({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as Stat[];
  const bioParagraphs = t.raw("bioParagraphs") as string[];
  const timeline = t.raw("timeline") as TimelineItem[];
  const contactLinks = t.raw("contactLinks") as ContactLink[];

  return (
    <section className="border-t border-border bg-background pb-(--section-gap)">
      <div className="relative h-[clamp(14rem,32vw,22rem)] w-full">
        <SmartImage
          src={t("coverImage")}
          alt={t("coverImageAlt")}
          className="h-full w-full rounded-none"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="-mt-16 flex flex-col gap-6 sm:-mt-20 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-end">
              <div className="size-32 shrink-0 overflow-hidden rounded-full ring-4 ring-background sm:size-40">
                <SmartImage
                  src={t("avatar")}
                  alt={t("avatarAlt")}
                  className="aspect-square rounded-none"
                />
              </div>
              <div className="pb-1">
                <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                  {t("eyebrow")}
                </p>
                <h2 className="mt-2 font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                  {t("name")}
                </h2>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  {t("role")}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="flex flex-wrap gap-3 pb-1">
              {contactLinks.map((link, i) => {
                const Icon = ICONS[link.icon] ?? RiMailLine;
                return (
                  <a
                    key={i}
                    href={link.href}
                    aria-label={link.label}
                    className="flex size-11 items-center justify-center rounded-sm border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Icon className="size-5" />
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2">
            <Reveal delay={80}>
              <h3 className="font-display text-xl text-foreground">
                {t("bioTitle")}
              </h3>
              <div className="mt-4 space-y-4">
                {bioParagraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-base leading-relaxed text-muted-foreground"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <details className="group mt-10 border-t border-border pt-6" open>
                <summary className="flex cursor-pointer list-none items-center justify-between font-display text-xl text-foreground">
                  {t("timelineTitle")}
                  <span className="text-sm text-muted-foreground transition-transform group-open:rotate-180">
                    ⌄
                  </span>
                </summary>
                <ol className="mt-6 space-y-6 border-l border-border pl-6">
                  {timeline.map((item, i) => (
                    <li key={i} className="relative">
                      <span className="absolute top-1.5 -left-[27px] size-2 rounded-full bg-primary" />
                      <p className="text-xs font-medium tracking-[0.15em] text-primary uppercase">
                        {item.period}
                      </p>
                      <p className="mt-1 font-display text-base text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ol>
              </details>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-1">
              {stats.map((s, i) => (
                <li key={i} className="bg-card p-6">
                  <p className="font-display text-2xl text-foreground">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {s.label}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
