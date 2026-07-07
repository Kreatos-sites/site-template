import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";
import {
  Warehouse,
  Route,
  ShieldCheck,
  Clock,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

type BentoCell = {
  icon: string;
  label: string;
  description: string;
};

const ICONS: Record<string, LucideIcon> = {
  warehouse: Warehouse,
  route: Route,
  shield: ShieldCheck,
  clock: Clock,
  chart: BarChart3,
};

export function FeaturesBentoAsymmetricFlagshipMotionExpand({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const cells = t.raw("cells") as BentoCell[];

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
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <div className="group/bento mt-16 grid grid-cols-1 gap-3 sm:grid-cols-4">
          <Reveal className="sm:col-span-2 sm:row-span-2">
            <div
              className={cn(
                "group relative flex h-full min-h-[20rem] flex-col justify-end overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 ease-out",
                "group-hover/bento:scale-[0.99] group-hover/bento:opacity-70",
                "hover:z-10 hover:scale-100! hover:opacity-100!",
              )}
            >
              <SmartImage
                src={t("flagshipImage")}
                alt={t("flagshipImageAlt")}
                className="absolute inset-0 h-full w-full transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="relative bg-gradient-to-t from-background/95 via-background/50 to-transparent p-8 pt-24">
                <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                  {t("flagshipEyebrow")}
                </p>
                <p className="mt-2 font-display text-2xl text-foreground">
                  {t("flagshipLabel")}
                </p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {t("flagshipDescription")}
                </p>
              </div>
            </div>
          </Reveal>

          {cells.map((cell, i) => {
            const CellIcon = ICONS[cell.icon] ?? Warehouse;
            return (
              <Reveal key={cell.label} delay={(i + 1) * 60} className="sm:col-span-2">
                <div
                  className={cn(
                    "group relative flex h-full min-h-[9rem] flex-col justify-between overflow-hidden rounded-lg border border-border bg-card p-6 transition-all duration-300 ease-out",
                    "group-hover/bento:scale-[0.99] group-hover/bento:opacity-70",
                    "hover:z-10 hover:scale-100! hover:border-primary/40! hover:opacity-100!",
                  )}
                >
                  <CellIcon className="size-5 text-primary" strokeWidth={1.75} />
                  <div>
                    <p className="font-display text-base text-foreground">{cell.label}</p>
                    <p className="mt-2 max-h-0 overflow-hidden text-xs leading-relaxed text-muted-foreground opacity-0 transition-all duration-300 group-hover:mt-2 group-hover:max-h-24 group-hover:opacity-100">
                      {cell.description}
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
