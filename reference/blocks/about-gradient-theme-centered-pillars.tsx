import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { Compass, HeartHandshake, Sparkles, type LucideIcon } from "lucide-react";

type Pillar = {
  icon: string;
  name: string;
  description: string;
};

const ICONS: Record<string, LucideIcon> = {
  compass: Compass,
  handshake: HeartHandshake,
  spark: Sparkles,
};

export function AboutGradientThemeCenteredPillars({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const pillars = t.raw("pillars") as Pillar[];

  return (
    <section className="relative overflow-hidden border-t border-border bg-gradient-to-b from-primary/10 via-primary/5 to-transparent py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {t("intro")}
            </p>
          </div>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-12 text-center sm:grid-cols-3 sm:gap-8 lg:mt-20">
          {pillars.map((pillar, i) => {
            const Icon = ICONS[pillar.icon] ?? Sparkles;
            return (
              <li key={pillar.name}>
                <Reveal delay={i * 60}>
                  <div className="flex flex-col items-center">
                    <span className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="size-6 text-primary" strokeWidth={1.5} />
                    </span>
                    <h3 className="mt-6 font-display text-xl text-foreground">
                      {pillar.name}
                    </h3>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                      {pillar.description}
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
