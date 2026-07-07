import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import {
  RiTruckLine,
  RiShip2Line,
  RiPlaneLine,
  RiBuilding2Line,
  RiBankLine,
  RiShieldCheckLine,
  RiGlobalLine,
  RiBox3Line,
  type RemixiconComponentType,
} from "@remixicon/react";

type Partner = {
  icon: string;
  label: string;
};

const ICONS: Record<string, RemixiconComponentType> = {
  truck: RiTruckLine,
  ship: RiShip2Line,
  plane: RiPlaneLine,
  building: RiBuilding2Line,
  bank: RiBankLine,
  shield: RiShieldCheckLine,
  global: RiGlobalLine,
  box: RiBox3Line,
};

export function PartnersGridCardLogo({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const partners = t.raw("partners") as Partner[];

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
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
          {partners.map((partner, i) => {
            const Icon = ICONS[partner.icon] ?? RiBuilding2Line;
            return (
              <li key={i} className="contents">
                <Reveal delay={i * 60}>
                  <article className="group flex h-full flex-col items-center justify-center gap-3 bg-card px-4 py-10 text-center transition-colors duration-300 hover:bg-secondary">
                    <Icon
                      className="size-7 text-muted-foreground transition-colors duration-300 group-hover:text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-foreground">
                      {partner.label}
                    </span>
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
