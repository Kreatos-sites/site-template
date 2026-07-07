import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";
import {
  TruckIcon,
  MapPinLineIcon,
  PackageIcon,
  GlobeHemisphereWestIcon,
  HeadsetIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

type Feature = {
  icon: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

const ICONS: Record<string, PhosphorIcon> = {
  truck: TruckIcon,
  route: MapPinLineIcon,
  package: PackageIcon,
  globe: GlobeHemisphereWestIcon,
  headset: HeadsetIcon,
};

// Posiciones fijas del mosaico asimétrico: la celda 0 es la insignia (grande).
const SPANS = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
];

export function InteractiveAsymmetricFeaturesBento({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const features = t.raw("features") as Feature[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <div className="group/bento relative mt-16 grid grid-cols-1 gap-4 sm:grid-cols-4 sm:grid-rows-2">
          {features.map((feature, i) => {
            const Icon = ICONS[feature.icon] ?? PackageIcon;
            return (
              <Reveal key={i} delay={i * 60} className={cn("h-full", SPANS[i])}>
                <article
                  className={cn(
                    "group/cell relative flex h-full min-h-[220px] flex-col justify-end overflow-hidden rounded-lg border border-border bg-card transition-all duration-500 ease-out",
                    "sm:group-hover/bento:opacity-60 sm:group-hover/bento:blur-[2px] sm:group-hover/bento:saturate-50",
                    "sm:hover:opacity-100 sm:hover:blur-none sm:hover:saturate-100 sm:hover:z-10 sm:hover:scale-[1.015]",
                  )}
                >
                  <SmartImage
                    src={feature.image}
                    alt={feature.imageAlt}
                    className="absolute inset-0 -z-10 h-full w-full opacity-70"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/60 to-transparent" />

                  <div className="flex items-center gap-3 p-6 pb-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary">
                      <Icon className="size-5" weight="regular" />
                    </span>
                    <h3 className="font-display text-lg text-foreground">
                      {feature.title}
                    </h3>
                  </div>

                  <p
                    className={cn(
                      "px-6 pb-6 text-sm leading-relaxed text-muted-foreground opacity-0 transition-all duration-500",
                      "translate-y-2 group-hover/cell:translate-y-0 group-hover/cell:opacity-100",
                      i === 0 && "sm:opacity-100 sm:translate-y-0",
                    )}
                  >
                    {feature.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
