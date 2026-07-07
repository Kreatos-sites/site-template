import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type Partner = {
  name: string;
  image: string;
  imageAlt: string;
};

type Group = {
  label: string;
  partners: Partner[];
};

export function BrandPartnersGrid({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const groups = t.raw("groups") as Group[];

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

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {groups.map((group, groupIndex) => (
            <Reveal key={groupIndex} delay={groupIndex * 80}>
              <div>
                <h3 className="font-display text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  {group.label}
                </h3>
                <ul className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
                  {group.partners.map((partner, partnerIndex) => (
                    <li key={partnerIndex} className="contents">
                      <article className="group flex aspect-[3/2] items-center justify-center bg-card p-6 transition-colors duration-300 hover:bg-secondary">
                        <SmartImage
                          src={partner.image}
                          alt={partner.imageAlt}
                          className="aspect-square opacity-60 grayscale transition-all duration-300 ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                        />
                      </article>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
