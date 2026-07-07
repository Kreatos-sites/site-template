import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { RiMapPinLine, RiGlobalLine, RiMailLine, RiShieldCheckLine } from "@remixicon/react";

type Stat = { value: string; label: string };
type Member = { name: string; role: string; avatar: string; avatarAlt: string };

export function AboutOrganizationProfileStats({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as Stat[];
  const members = t.raw("members") as Member[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-12 overflow-hidden rounded-lg border border-border bg-card">
            <div className="flex flex-col gap-8 p-8 lg:flex-row lg:items-start lg:justify-between lg:p-10">
              <div className="flex gap-5">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-md bg-secondary">
                  <SmartImage src={t("logo")} alt={t("logoAlt")} className="aspect-square size-10 rounded-sm" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-xl text-foreground">{t("name")}</h3>
                    <span className="inline-flex items-center gap-1 rounded-sm bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      <RiShieldCheckLine className="size-3.5" />
                      {t("verifiedLabel")}
                    </span>
                  </div>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{t("description")}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <RiMapPinLine className="size-4 text-primary" />
                      {t("location")}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <RiGlobalLine className="size-4 text-primary" />
                      {t("website")}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <RiMailLine className="size-4 text-primary" />
                      {t("email")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 -space-x-3">
                {members.map((m, i) => (
                  <div key={i} className="relative">
                    <SmartImage
                      src={m.avatar}
                      alt={m.avatarAlt}
                      className="aspect-square size-11 rounded-full border-2 border-card"
                    />
                  </div>
                ))}
                <div className="relative z-10 flex size-11 items-center justify-center rounded-full border-2 border-card bg-secondary text-xs font-medium text-secondary-foreground">
                  {t("teamSizeLabel")}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px border-t border-border bg-border sm:grid-cols-4">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col gap-1 bg-card p-6">
                  <span className="font-display text-2xl text-foreground">{s.value}</span>
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <h3 className="mt-14 text-sm font-medium text-foreground">{t("teamTitle")}</h3>
          <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((m, i) => (
              <li key={i}>
                <article className="flex items-center gap-4 rounded-md border border-border bg-card p-5">
                  <SmartImage src={m.avatar} alt={m.avatarAlt} className="aspect-square size-12 rounded-full" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{m.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{m.role}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
