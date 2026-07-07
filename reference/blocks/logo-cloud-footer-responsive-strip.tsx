import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  Building2,
  Landmark,
  Factory,
  Truck,
  Warehouse,
  Briefcase,
  ShieldCheck,
  Scale,
  type LucideIcon,
} from "lucide-react";

type Partner = {
  icon: string;
  name: string;
};

const ICONS: Record<string, LucideIcon> = {
  building: Building2,
  landmark: Landmark,
  factory: Factory,
  truck: Truck,
  warehouse: Warehouse,
  briefcase: Briefcase,
  shield: ShieldCheck,
  scale: Scale,
};

export function LogoCloudFooterResponsiveStrip({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const partners = t.raw("partners") as Partner[];

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
          <ul className="mt-14 grid grid-cols-3 gap-px border border-border bg-border sm:grid-cols-4 lg:grid-cols-8">
            {partners.map((partner, i) => {
              const Icon = ICONS[partner.icon] ?? Building2;
              return (
                <li key={i} className="contents">
                  <div className="flex h-24 items-center justify-center bg-card px-3 sm:h-28">
                    <Icon
                      aria-hidden="true"
                      className="size-6 text-muted-foreground lg:hidden"
                      strokeWidth={1.5}
                    />
                    <span className="hidden text-center font-display text-sm tracking-wide text-muted-foreground uppercase lg:block">
                      {partner.name}
                    </span>
                    <span className="sr-only lg:hidden">{partner.name}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
