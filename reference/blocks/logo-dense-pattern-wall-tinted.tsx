import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  Banknote,
  Boxes,
  Briefcase,
  Building2,
  Cloud,
  Cpu,
  Database,
  Factory,
  Fingerprint,
  Gauge,
  Globe,
  Landmark,
  Layers,
  Link2,
  Lock,
  Network,
  PackageSearch,
  ServerCog,
  ShieldCheck,
  ShoppingBag,
  SquareCode,
  Truck,
  Wallet,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

type Ally = { icon: string; name: string };

const ICONS: Record<string, LucideIcon> = {
  bank: Banknote,
  boxes: Boxes,
  briefcase: Briefcase,
  building: Building2,
  cloud: Cloud,
  chip: Cpu,
  database: Database,
  factory: Factory,
  fingerprint: Fingerprint,
  gauge: Gauge,
  globe: Globe,
  landmark: Landmark,
  layers: Layers,
  link: Link2,
  lock: Lock,
  network: Network,
  package: PackageSearch,
  server: ServerCog,
  shield: ShieldCheck,
  bag: ShoppingBag,
  code: SquareCode,
  truck: Truck,
  wallet: Wallet,
  warehouse: Warehouse,
};

export function LogoDensePatternWallTinted({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const allies = t.raw("allies") as Ally[];

  return (
    <section className="relative overflow-hidden border-t border-border bg-secondary py-(--section-gap)">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[image:radial-gradient(currentColor_1px,transparent_1.5px)] bg-[length:16px_16px] text-foreground opacity-[0.07]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t("subtitle")}</p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <ul className="mt-14 grid grid-cols-4 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-6 lg:grid-cols-8">
            {allies.map((ally, i) => {
              const Icon = ICONS[ally.icon] ?? Globe;
              return (
                <li key={`${ally.name}-${i}`} className="contents">
                  <div className="flex aspect-square items-center justify-center bg-card/80 p-3 grayscale transition-none">
                    <Icon
                      className="size-5 text-muted-foreground sm:size-6"
                      strokeWidth={1.5}
                      aria-label={ally.name}
                    />
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
