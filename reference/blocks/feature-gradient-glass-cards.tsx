import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import {
  Cpu,
  Radar,
  ShieldCheck,
  Fingerprint,
  Network,
  CloudCog,
  Workflow,
  Database,
  type LucideIcon,
} from "lucide-react";

type Feature = { icon: string; title: string; description: string };

const ICONS: Record<string, LucideIcon> = {
  cpu: Cpu,
  radar: Radar,
  shield: ShieldCheck,
  fingerprint: Fingerprint,
  network: Network,
  cloud: CloudCog,
  workflow: Workflow,
  database: Database,
};

export function FeatureGradientGlassCards({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const features = t.raw("features") as Feature[];

  return (
    <section className="relative overflow-hidden border-t border-border bg-primary py-(--section-gap)">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-90 [background-image:radial-gradient(ellipse_75%_65%_at_50%_35%,transparent_0%,transparent_35%,var(--color-foreground)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mix-blend-overlay [background-image:radial-gradient(ellipse_60%_50%_at_50%_20%,var(--color-primary-foreground),transparent_70%)] opacity-30"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary-foreground/70 uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-primary-foreground">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/75">
            {t("description")}
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = ICONS[feature.icon] ?? Cpu;
            return (
              <li key={i}>
                <Reveal delay={i * 60}>
                  <article className="flex h-full flex-col gap-5 rounded-lg border border-primary-foreground/15 bg-primary-foreground/10 p-6 shadow-sm backdrop-blur-md transition-colors hover:bg-primary-foreground/15">
                    <span className="inline-flex size-10 items-center justify-center rounded-md border border-primary-foreground/15 bg-primary-foreground/10">
                      <Icon className="size-5 text-primary-foreground" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg text-primary-foreground">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">
                        {feature.description}
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
