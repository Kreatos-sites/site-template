import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";
import {
  Gauge,
  Ruler,
  ShieldCheck,
  PackageIcon,
  Cube,
  Waveform,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

type Badge = {
  icon: string;
  label: string;
  value: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

const iconMap: Record<string, Icon> = {
  Gauge,
  Ruler,
  ShieldCheck,
  PackageIcon,
  Cube,
  Waveform,
};

const positionClasses: Record<Badge["position"], string> = {
  "top-left": "lg:top-8 lg:left-0 lg:-translate-x-1/3",
  "top-right": "lg:top-8 lg:right-0 lg:translate-x-1/3",
  "bottom-left": "lg:bottom-8 lg:left-0 lg:-translate-x-1/3",
  "bottom-right": "lg:bottom-8 lg:right-0 lg:translate-x-1/3",
};

const lineClasses: Record<Badge["position"], string> = {
  "top-left": "lg:top-[22%] lg:right-full lg:left-auto lg:w-16 lg:-translate-y-1/2",
  "top-right": "lg:top-[22%] lg:left-full lg:w-16 lg:-translate-y-1/2",
  "bottom-left": "lg:bottom-[22%] lg:right-full lg:left-auto lg:w-16 lg:translate-y-1/2",
  "bottom-right": "lg:bottom-[22%] lg:left-full lg:w-16 lg:translate-y-1/2",
};

export function ProductCenteredGradientSpotlightBadges({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const badges = t.raw("badges") as Badge[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
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
              {t("description")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="relative mt-16 overflow-hidden rounded-lg border border-border bg-gradient-to-b from-background to-primary/10 px-6 py-16 sm:py-20 lg:py-24">
            <div className="relative mx-auto flex w-full max-w-xs flex-col items-center lg:max-w-sm">
              <SmartImage
                src={t("image")}
                alt={t("imageAlt")}
                className="aspect-[4/5] w-full rounded-sm shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]"
                sizes="(min-width: 1024px) 384px, 320px"
              />

              {badges.map((badge, i) => {
                const BadgeIcon = iconMap[badge.icon] ?? Gauge;
                return (
                  <div
                    key={badge.label}
                    className={cn(
                      "static mt-4 w-full lg:absolute lg:mt-0 lg:w-56",
                      positionClasses[badge.position],
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute hidden h-px bg-border lg:block",
                        lineClasses[badge.position],
                      )}
                    />
                    <Reveal delay={160 + i * 70}>
                      <div className="flex items-center gap-3 rounded-sm border border-border bg-card px-4 py-3 shadow-[0_12px_24px_-16px_rgba(0,0,0,0.25)]">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-sm bg-primary/10">
                          <BadgeIcon className="size-4 text-primary" weight="light" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-xs font-medium tracking-[0.08em] text-muted-foreground uppercase">
                            {badge.label}
                          </span>
                          <span className="block truncate text-sm font-medium text-foreground">
                            {badge.value}
                          </span>
                        </span>
                      </div>
                    </Reveal>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
