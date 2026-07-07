import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";

type MetaItem = { index: string; label: string };
type Stat = { value: string; label: string };

export function HeroEditorialWithStatHairline({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const metaItems = t.raw("metaItems") as MetaItem[];
  const stats = t.raw("stats") as Stat[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 border-b border-border pb-6">
            {metaItems.map((m, i) => (
              <li key={i} className="flex items-baseline gap-2">
                <span className="font-mono text-xs text-primary">{m.index}</span>
                <span className="text-xs tracking-wide text-muted-foreground uppercase">
                  {m.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-10 max-w-4xl">
          <Reveal delay={80}>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h1 className="mt-5 font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.02] tracking-tight text-balance text-foreground">
              {t("title")}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
              {t("subtitle")}
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={t("primaryCta.href")}
                className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground uppercase transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                {t("primaryCta.label")}
              </a>
              <a
                href={t("secondaryCta.href")}
                className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide text-foreground uppercase transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                {t("secondaryCta.label")}
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={240}>
          <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-border pt-8 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div key={i} className="border-l border-border pl-5 first:border-l-0 first:pl-0">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">
                  {s.value}
                </dd>
                <p className="mt-2 text-xs leading-snug tracking-wide text-muted-foreground uppercase">
                  {s.label}
                </p>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
