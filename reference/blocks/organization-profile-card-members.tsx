import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { RiVerifiedBadgeFill, RiGlobeLine, RiMailLine } from "@remixicon/react";

type Stat = { value: string; label: string };
type Member = { name: string; image: string; imageAlt: string };
type Link = { label: string; href: string; icon: "site" | "mail" };

export function OrganizationProfileCardMembers({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as Stat[];
  const members = t.raw("members") as Member[];
  const links = t.raw("links") as Link[];

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
          <article className="mt-12 rounded-lg border border-border bg-card p-8 sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <SmartImage
                  src={t("logo")}
                  alt={t("logoAlt")}
                  className="aspect-square w-16 rounded-md shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-xl text-foreground">
                      {t("name")}
                    </h3>
                    <RiVerifiedBadgeFill
                      className="size-5 text-primary"
                      aria-label={t("verifiedLabel")}
                    />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("tagline")}
                  </p>
                </div>
              </div>

              <ul className="flex shrink-0 flex-col gap-2 sm:items-end">
                {links.map((link, i) => {
                  const Icon = link.icon === "mail" ? RiMailLine : RiGlobeLine;
                  return (
                    <li key={i}>
                      <a
                        href={link.href}
                        className="inline-flex items-center gap-2 text-sm text-foreground underline decoration-border decoration-1 underline-offset-4 transition-colors hover:text-primary"
                      >
                        <Icon className="size-4 text-primary" />
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {t("description")}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
              {stats.map((s, i) => (
                <div key={i}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-2xl tracking-tight text-foreground sm:text-3xl">
                    {s.value}
                  </dd>
                  <p className="mt-2 text-xs leading-snug text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex items-center gap-4 border-t border-border pt-8">
              <ul className="flex -space-x-3">
                {members.map((m, i) => (
                  <li key={i} className="contents">
                    <SmartImage
                      src={m.image}
                      alt={m.imageAlt}
                      className="aspect-square w-10 rounded-full ring-2 ring-card"
                    />
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground">{t("membersLabel")}</p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
