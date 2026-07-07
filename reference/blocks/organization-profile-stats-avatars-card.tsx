import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import {
  BadgeCheck,
  Globe,
  Mail,
  Phone,
  type LucideIcon,
} from "lucide-react";

type Stat = { value: string; label: string };
type Member = { initials: string };
type ContactLink = { icon: string; label: string; href: string };

const ICONS: Record<string, LucideIcon> = {
  globe: Globe,
  mail: Mail,
  phone: Phone,
};

export function OrganizationProfileStatsAvatarsCard({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as Stat[];
  const members = t.raw("members") as Member[];
  const contactLinks = t.raw("contactLinks") as ContactLink[];

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

        <Reveal delay={60}>
          <div className="mt-14 overflow-hidden rounded-lg border border-border bg-card">
            <div className="flex flex-col gap-8 p-8 sm:flex-row sm:items-start sm:justify-between lg:p-10">
              <div className="flex items-start gap-5">
                <div
                  className="flex size-14 shrink-0 items-center justify-center rounded-md bg-primary text-lg font-semibold text-primary-foreground"
                  aria-hidden="true"
                >
                  {t("logoInitials")}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-xl text-foreground">
                      {t("orgName")}
                    </h3>
                    <BadgeCheck
                      className="size-5 shrink-0 text-primary"
                      strokeWidth={1.75}
                      aria-label={t("verifiedLabel")}
                    />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("orgTagline")}
                  </p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {t("description")}
                  </p>
                </div>
              </div>

              <ul className="flex shrink-0 flex-col gap-3">
                {contactLinks.map((link, i) => {
                  const Icon = ICONS[link.icon] ?? Globe;
                  return (
                    <li key={i}>
                      <a
                        href={link.href}
                        className="flex items-center gap-2.5 text-sm text-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:underline focus-visible:outline-none"
                      >
                        <Icon
                          className="size-4 shrink-0 text-primary"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        <span>{link.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <dl className="grid grid-cols-2 gap-px border-t border-border bg-border sm:grid-cols-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1 bg-card px-6 py-8 text-center"
                >
                  <dd className="font-display text-[clamp(1.5rem,1.1rem+1.2vw,2.25rem)] leading-none tracking-tight text-foreground tabular-nums">
                    {stat.value}
                  </dd>
                  <dt className="text-xs leading-snug tracking-wide text-muted-foreground uppercase">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap items-center gap-4 border-t border-border px-8 py-6 lg:px-10">
              <div className="flex -space-x-3">
                {members.map((member, i) => (
                  <div
                    key={i}
                    className="flex size-9 items-center justify-center rounded-full border-2 border-card bg-secondary text-xs font-medium text-secondary-foreground"
                    aria-hidden="true"
                  >
                    {member.initials}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{t("teamLabel")}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
