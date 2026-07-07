import { useTranslations } from "next-intl";
import { ArrowUpRight, Download, Star, Users, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type Cta = {
  label: string;
  href: string;
};

type Stat = {
  icon: string;
  value: string;
  label: string;
};

const ICONS: Record<string, LucideIcon> = {
  star: Star,
  users: Users,
  download: Download,
};

export function HeroMobileAppShowcase({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const ctaPrimary = t.raw("ctaPrimary") as Cta;
  const ctaSecondary = t.raw("ctaSecondary") as Cta;
  const stats = t.raw("stats") as Stat[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
                {t("subtitle")}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href={ctaPrimary.href}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium tracking-tight text-primary-foreground ring-1 ring-inset ring-primary/20 transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {ctaPrimary.label}
                  <Download
                    className="size-4 transition-transform group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href={ctaSecondary.href}
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-medium tracking-tight text-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {ctaSecondary.label}
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-6 border-t border-border pt-8">
                {stats.map((stat, i) => {
                  const Icon = ICONS[stat.icon] ?? Star;
                  return (
                    <li key={i} className="flex items-center gap-3">
                      <Icon className="size-5 text-primary" strokeWidth={1.75} aria-hidden="true" />
                      <span className="flex flex-col">
                        <span className="font-display text-xl tracking-tight text-foreground">
                          {stat.value}
                        </span>
                        <span className="text-xs text-muted-foreground">{stat.label}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={120}>
              <div className="relative mx-auto max-w-sm">
                <div
                  aria-hidden="true"
                  className="absolute -inset-8 -z-10 rounded-full bg-primary/10 blur-3xl"
                />
                <SmartImage
                  src={t("image")}
                  alt={t("imageAlt")}
                  className="aspect-[4/5] rounded-lg border border-border"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
