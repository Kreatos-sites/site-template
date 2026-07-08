import { useTranslations } from "next-intl";
import { Briefcase, ShieldCheck, TrendingUp, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

type ServiceCard = {
  icon: string;
  title: string;
  description: string;
};

const ICONS: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  shield: ShieldCheck,
  trend: TrendingUp,
};

const CARD_STYLES = [
  "lg:-rotate-2 lg:translate-y-4",
  "lg:rotate-0 lg:-translate-y-3 lg:z-10",
  "lg:rotate-2 lg:translate-y-6",
];

export function HeroStackedCardsServiceTrio({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const cards = t.raw("cards") as ServiceCard[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h1 className="mt-5 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
              {t("subtitle")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={t("primaryCta.href")}
              className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground uppercase transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              {t("primaryCta.label")}
            </a>
            <a
              href={t("secondaryCta.href")}
              className="inline-flex items-center justify-center rounded-sm border border-border px-8 py-4 text-sm font-medium tracking-wide text-foreground uppercase transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              {t("secondaryCta.label")}
            </a>
          </div>
        </Reveal>

        <ul className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-8">
          {cards.map((card, i) => {
            const Icon = ICONS[card.icon] ?? Briefcase;
            return (
              <li key={card.title}>
                <Reveal delay={240 + i * 80}>
                  <div
                    className={cn(
                      "h-full rounded-md border border-border bg-card p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:rotate-0",
                      CARD_STYLES[i % CARD_STYLES.length],
                    )}
                  >
                    <span className="flex size-11 items-center justify-center rounded-sm bg-secondary">
                      <Icon className="size-5 text-primary" strokeWidth={1.75} />
                    </span>
                    <h2 className="mt-6 font-display text-xl text-foreground">{card.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
