import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { RiVerifiedBadgeFill, RiGlobalLine, RiMailLine } from "@remixicon/react";

type Metric = { value: string; label: string };
type Member = { name: string; avatar: string };

export function OrganizationProfileCardMemberAvatarStack({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const metrics = t.raw("metrics") as Metric[];
  const members = t.raw("members") as Member[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 overflow-hidden rounded-lg border border-border bg-card">
            <div className="flex flex-col gap-8 p-8 sm:flex-row sm:items-start sm:justify-between lg:p-10">
              <div className="flex gap-5">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-md bg-secondary">
                  <SmartImage
                    src={t("logo")}
                    alt={t("logoAlt")}
                    className="aspect-square size-10 rounded-sm"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-xl text-foreground">{t("companyName")}</h3>
                    <RiVerifiedBadgeFill
                      className="size-4 shrink-0 text-primary"
                      aria-label={t("verifiedLabel")}
                    />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{t("tagline")}</p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {t("description")}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-3 sm:items-end">
                <a
                  href={t("websiteHref")}
                  className="flex items-center gap-2 text-sm text-foreground underline-offset-4 hover:underline focus-visible:underline"
                >
                  <RiGlobalLine className="size-4 text-primary" />
                  {t("websiteLabel")}
                </a>
                <a
                  href={`mailto:${t("contactEmail")}`}
                  className="flex items-center gap-2 text-sm text-foreground underline-offset-4 hover:underline focus-visible:underline"
                >
                  <RiMailLine className="size-4 text-primary" />
                  {t("contactEmail")}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 border-t border-border sm:grid-cols-4">
              {metrics.map((metric, i) => (
                <div
                  key={i}
                  className="border-b border-border p-6 sm:border-b-0 [&:not(:last-child)]:border-r"
                >
                  <p className="font-display text-2xl text-foreground">{metric.value}</p>
                  <p className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 border-t border-border p-8 lg:p-10">
              <div className="flex -space-x-3">
                {members.map((member, i) => (
                  <SmartImage
                    key={i}
                    src={member.avatar}
                    alt={member.name}
                    className="aspect-square size-10 rounded-full ring-2 ring-card"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{t("membersLabel")}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
