import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";
import type { Icon } from "@phosphor-icons/react";
import {
  TruckIcon,
  WrenchIcon,
  PackageIcon,
  HeadsetIcon,
} from "@phosphor-icons/react/dist/ssr";

type BentoItem = {
  icon: string;
  label: string;
  description: string;
};

const ICONS: Record<string, Icon> = {
  truck: TruckIcon,
  wrench: WrenchIcon,
  package: PackageIcon,
  headset: HeadsetIcon,
};

export function FeatureAsymmetricBentoMotionFocus({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as BentoItem[];

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
        </Reveal>

        <div className="group/bento mt-16 grid grid-cols-1 grid-rows-none gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-4 sm:grid-rows-2">
          <Reveal className="col-span-1 row-span-1 sm:col-span-2 sm:row-span-2">
            <div
              className={cn(
                "group relative flex h-full min-h-[18rem] flex-col justify-end overflow-hidden bg-card",
                "opacity-100 blur-none transition-all duration-300",
                "group-hover/bento:opacity-45 group-hover/bento:blur-[2px]",
                "hover:z-10 hover:opacity-100! hover:blur-none!",
              )}
            >
              <SmartImage
                src={t("flagshipImage")}
                alt={t("flagshipImageAlt")}
                className="absolute inset-0 h-full w-full"
              />
              <div className="relative bg-gradient-to-t from-background/90 via-background/40 to-transparent p-8 pt-20">
                <p className="font-display text-xl text-foreground">
                  {t("flagshipLabel")}
                </p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {t("flagshipDescription")}
                </p>
              </div>
            </div>
          </Reveal>

          {items.map((item, i) => {
            const ItemIcon = ICONS[item.icon] ?? PackageIcon;
            return (
              <Reveal key={item.label} delay={(i + 1) * 60} className="col-span-1 row-span-1">
                <div
                  className={cn(
                    "group relative flex h-full min-h-[9rem] flex-col justify-between overflow-hidden bg-card p-6",
                    "opacity-100 blur-none transition-all duration-300",
                    "group-hover/bento:opacity-45 group-hover/bento:blur-[2px]",
                    "hover:z-10 hover:opacity-100! hover:blur-none!",
                  )}
                >
                  <ItemIcon className="size-5 text-primary" weight="regular" />
                  <div>
                    <p className="font-display text-base text-foreground">{item.label}</p>
                    <p className="mt-2 max-h-0 overflow-hidden text-xs leading-relaxed text-muted-foreground opacity-0 transition-all duration-300 group-hover:mt-2 group-hover:max-h-24 group-hover:opacity-100">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
