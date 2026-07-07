import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";
import {
  RiCheckboxCircleFill,
  RiGlobalLine,
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
  type RemixiconComponentType,
} from "@remixicon/react";

type Stat = { value: string; label: string };
type ContactLink = { icon: string; label: string; href: string };
type Member = { name: string; avatar: string };

const ICONS: Record<string, RemixiconComponentType> = {
  globe: RiGlobalLine,
  mail: RiMailLine,
  phone: RiPhoneLine,
  pin: RiMapPinLine,
};

export function OrganizationContactCard({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as Stat[];
  const links = t.raw("links") as ContactLink[];
  const members = t.raw("members") as Member[];

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

        <Reveal delay={60}>
          <article className="mt-12 overflow-hidden rounded-lg border border-border bg-card">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
              <div className="relative">
                <SmartImage
                  src={t("logoImage")}
                  alt={t("logoImageAlt")}
                  className="aspect-[4/5] rounded-none"
                />
              </div>

              <div className="flex flex-col justify-between gap-8 p-8 lg:p-10">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-2xl text-foreground">
                      {t("organizationName")}
                    </h3>
                    <RiCheckboxCircleFill
                      aria-label={t("verifiedLabel")}
                      className="size-5 shrink-0 text-primary"
                    />
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {t("description")}
                  </p>

                  <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-6">
                    {stats.map((s, i) => (
                      <div key={i}>
                        <dt className="sr-only">{s.label}</dt>
                        <dd className="font-display text-2xl tracking-tight text-foreground sm:text-3xl">
                          {s.value}
                        </dd>
                        <p className="mt-1 text-xs leading-snug text-muted-foreground">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="flex flex-col gap-6 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center">
                    <ul className="-space-x-3 flex">
                      {members.map((m, i) => (
                        <li key={i} className="contents">
                          <span className="relative size-9 overflow-hidden rounded-full ring-2 ring-card">
                            <SmartImage
                              src={m.avatar}
                              alt={m.name}
                              className="aspect-square rounded-full"
                            />
                          </span>
                        </li>
                      ))}
                    </ul>
                    <span className="ml-3 text-xs text-muted-foreground">
                      {t("membersLabel")}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-5">
                    {links.map((l, i) => {
                      const Icon = ICONS[l.icon] ?? RiGlobalLine;
                      return (
                        <li key={i}>
                          <a
                            href={l.href}
                            className={cn(
                              "inline-flex items-center gap-2 text-sm text-foreground underline-offset-4 hover:text-primary hover:underline",
                              "focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                            )}
                          >
                            <Icon className="size-4 shrink-0 text-primary" />
                            {l.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
