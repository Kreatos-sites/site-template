import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  BuildingIcon,
  FactoryIcon,
  GlobeIcon,
  BankIcon,
  PackageIcon,
  ShieldCheckIcon,
  TruckIcon,
  WarehouseIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

type Ally = {
  name: string;
  icon: string;
  featured?: boolean;
};

const ICONS: Record<string, Icon> = {
  building: BuildingIcon,
  factory: FactoryIcon,
  globe: GlobeIcon,
  landmark: BankIcon,
  package: PackageIcon,
  shield: ShieldCheckIcon,
  truck: TruckIcon,
  warehouse: WarehouseIcon,
};

export function LogoCloudGridPulseFocusActive({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const allies = t.raw("allies") as Ally[];

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

        <Reveal delay={80}>
          <ul className="mt-16 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-6 [&:has(li:hover)_li]:opacity-40 [&:has(li:hover)_li:hover]:opacity-100">
            {allies.map((ally, i) => {
              const AllyIcon = ICONS[ally.icon] ?? BuildingIcon;
              return (
                <li
                  key={i}
                  className="group/item flex aspect-square flex-col items-center justify-center gap-3 bg-card p-6 text-center transition-opacity duration-300"
                >
                  <AllyIcon
                    className={cn(
                      "size-8 text-muted-foreground transition-all duration-300 group-hover/item:text-primary",
                      ally.featured && "animate-pulse text-primary",
                    )}
                    weight="light"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground">
                    {ally.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
