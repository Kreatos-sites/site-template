import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  Anchor,
  Atom,
  Boxes,
  Building2,
  Cog,
  Compass,
  Factory,
  Gem,
  Layers,
  Mountain,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";

type Logo = { name: string; icon: string };

const ICONS: Record<string, LucideIcon> = {
  anchor: Anchor,
  atom: Atom,
  boxes: Boxes,
  building: Building2,
  cog: Cog,
  compass: Compass,
  factory: Factory,
  gem: Gem,
  layers: Layers,
  mountain: Mountain,
  shield: ShieldCheck,
  truck: Truck,
};

export function LogoCloudGridColorizeTooltip({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const logos = t.raw("logos") as Logo[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <ul className="mt-16 grid grid-cols-2 border-t border-l border-border sm:grid-cols-3 lg:grid-cols-5">
            {logos.map((logo, i) => {
              const Icon = ICONS[logo.icon] ?? Building2;
              return (
                <li key={i} className="contents">
                  <div
                    className="group relative flex aspect-square flex-col items-center justify-center gap-3 border-r border-b border-border p-6 transition-colors hover:bg-secondary"
                    title={logo.name}
                  >
                    <Icon
                      className="size-8 text-muted-foreground/50 transition-colors duration-300 group-hover:text-primary"
                      strokeWidth={1.5}
                    />

                    <span
                      className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full rounded-sm bg-foreground px-3 py-1.5 text-xs font-medium whitespace-nowrap text-background opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100"
                      aria-hidden="true"
                    >
                      {logo.name}
                    </span>
                    <span className="sr-only">{logo.name}</span>
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
