import type { CSSProperties } from "react";

import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import {
  RiRadarLine,
  RiRouteLine,
  RiShieldCheckLine,
  RiTimeLine,
  RiTruckLine,
  RiBarChartBoxLine,
  type RemixiconComponentType,
} from "@remixicon/react";

type Capability = {
  icon: string;
  title: string;
  description: string;
};

const ICONS: Record<string, RemixiconComponentType> = {
  radar: RiRadarLine,
  route: RiRouteLine,
  shield: RiShieldCheckLine,
  time: RiTimeLine,
  truck: RiTruckLine,
  chart: RiBarChartBoxLine,
};

export function FeatureInteractiveGridAutoCyclePulse({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const capabilities = t.raw("capabilities") as Capability[];
  const cycleSeconds = capabilities.length * 2.5;

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <style>{`
        @keyframes capability-cell-pulse {
          0%, 13%, 100% {
            background-color: var(--color-card);
            border-color: var(--color-border);
            box-shadow: none;
          }
          4%, 9% {
            background-color: color-mix(in oklch, var(--color-primary) 8%, var(--color-card));
            border-color: var(--color-primary);
            box-shadow: 0 0 0 1px var(--color-primary);
          }
        }
        @keyframes capability-label-pulse {
          0%, 13%, 100% {
            opacity: 0.55;
            transform: translateY(0.25rem);
          }
          4%, 9% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .capability-cell {
          animation: capability-cell-pulse var(--cycle-duration) ease-in-out infinite;
          animation-delay: var(--cycle-delay);
        }
        .capability-cell .capability-label {
          animation: capability-label-pulse var(--cycle-duration) ease-in-out infinite;
          animation-delay: var(--cycle-delay);
        }
        .capability-cell:hover,
        .capability-cell:focus-within {
          animation-play-state: paused;
          background-color: color-mix(in oklch, var(--color-primary) 8%, var(--color-card)) !important;
          border-color: var(--color-primary) !important;
          box-shadow: 0 0 0 1px var(--color-primary) !important;
        }
        .capability-cell:hover .capability-label,
        .capability-cell:focus-within .capability-label {
          animation-play-state: paused;
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .capability-cell,
          .capability-cell .capability-label {
            animation-play-state: paused;
          }
        }
      `}</style>
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

        <ul className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, i) => {
            const Icon = ICONS[capability.icon] ?? RiRadarLine;
            return (
              <li key={i} className="contents">
                <Reveal delay={i * 60}>
                  <article
                    tabIndex={0}
                    className="capability-cell flex h-full flex-col gap-4 rounded-md border border-border bg-card p-8 outline-none"
                    style={
                      {
                        "--cycle-duration": `${cycleSeconds}s`,
                        "--cycle-delay": `${i * 2.5}s`,
                      } as CSSProperties
                    }
                  >
                    <Icon className="size-5 text-primary" />
                    <div className="capability-label">
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
