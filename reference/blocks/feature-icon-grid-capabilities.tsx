import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  RiShieldCheckLine,
  RiSpeedUpLine,
  RiTeamLine,
  RiLineChartLine,
  RiCustomerService2Line,
  RiPuzzleLine,
  type RemixiconComponentType,
} from "@remixicon/react";

type Capability = { icon: string; title: string; description: string };

const ICONS: Record<string, RemixiconComponentType> = {
  shield: RiShieldCheckLine,
  speed: RiSpeedUpLine,
  team: RiTeamLine,
  chart: RiLineChartLine,
  support: RiCustomerService2Line,
  integration: RiPuzzleLine,
};

export function FeatureIconGridCapabilities({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const capabilities = t.raw("capabilities") as Capability[];

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
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, i) => {
            const Icon = ICONS[capability.icon] ?? RiShieldCheckLine;
            return (
              <li key={i} className="contents">
                <Reveal delay={i * 60}>
                  <article className="flex h-full flex-col gap-6 border border-border bg-card p-8">
                    <span className="inline-flex size-10 items-center justify-center rounded-md bg-secondary">
                      <Icon className="size-5 text-primary" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-foreground">
                        {capability.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {capability.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
