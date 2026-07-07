import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  Building2Icon,
  FactoryIcon,
  GlobeIcon,
  Landmark,
  LinkIcon,
  PackageIcon,
  ShieldCheckIcon,
  TruckIcon,
  WarehouseIcon,
  type LucideIcon,
} from "lucide-react";

type Partner = { name: string; icon: string };

const ICONS: Record<string, LucideIcon> = {
  building: Building2Icon,
  factory: FactoryIcon,
  globe: GlobeIcon,
  landmark: Landmark,
  link: LinkIcon,
  package: PackageIcon,
  shield: ShieldCheckIcon,
  truck: TruckIcon,
  warehouse: WarehouseIcon,
};

export function LogoOrbitalHubRotatingBrandsCenterFocus({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const partners = t.raw("partners") as Partner[];
  const count = partners.length;

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <div>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-border pt-8">
              {(t.raw("stats") as { value: string; label: string }[]).map((stat, i) => (
                <div key={i}>
                  <dt className="font-display text-3xl text-foreground">{stat.value}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div
              className="absolute inset-0 rounded-full bg-primary/10 blur-3xl motion-safe:animate-pulse"
              aria-hidden
            />
            <div className="absolute inset-[12%] rounded-full border border-border" aria-hidden />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative z-10 flex size-24 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                <span className="font-display text-sm tracking-tight">{t("hubLabel")}</span>
              </div>
            </div>

            <div className="absolute inset-0 motion-safe:animate-[spin_50s_linear_infinite]">
              {partners.map((partner, i) => {
                const Icon = ICONS[partner.icon] ?? GlobeIcon;
                const angle = (360 / count) * i;
                return (
                  <div
                    key={partner.name}
                    className="absolute top-1/2 left-1/2 size-0"
                    style={{ transform: `rotate(${angle}deg) translateX(46%)` }}
                  >
                    <div
                      className="flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow-sm motion-safe:animate-[spin_50s_linear_infinite_reverse]"
                      style={{ transform: `rotate(-${angle}deg)` }}
                    >
                      <Icon
                        className="size-5 text-foreground"
                        strokeWidth={1.75}
                        aria-label={partner.name}
                      />
                    </div>
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
