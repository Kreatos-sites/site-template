import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import {
  BuildingsIcon,
  HandshakeIcon,
  MapPinIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

const ICONS: Record<string, Icon> = {
  buildings: BuildingsIcon,
  handshake: HandshakeIcon,
  location: MapPinIcon,
};

type Partner = {
  name: string;
  role: string;
  location: string;
  since: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: string;
};

export function PartnerDevelopersGrid({ ns }: { ns: string }) {
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

        <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, i) => {
            const PartnerIcon = ICONS[partner.icon] ?? HandshakeIcon;
            return (
              <li key={i} className="contents">
                <Reveal delay={i * 60}>
                  <article className="flex h-full flex-col gap-5 bg-card p-8">
                    <div className="flex items-center gap-4">
                      <SmartImage
                        src={partner.image}
                        alt={partner.imageAlt}
                        className="aspect-square w-14 shrink-0 rounded-sm bg-secondary"
                      />
                      <div>
                        <h3 className="font-display text-lg text-foreground">
                          {partner.name}
                        </h3>
                        <p className="flex items-center gap-1.5 text-xs font-medium tracking-[0.15em] text-primary uppercase">
                          <PartnerIcon className="size-3.5" />
                          {partner.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {partner.description}
                    </p>
                    <div className="mt-auto flex items-center gap-4 border-t border-border pt-5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPinIcon className="size-4" />
                        {partner.location}
                      </span>
                      <span>{partner.since}</span>
                    </div>
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
