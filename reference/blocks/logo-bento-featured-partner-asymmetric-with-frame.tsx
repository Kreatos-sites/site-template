import { useTranslations } from "next-intl";
import { Plus, Star, ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type Featured = {
  name: string;
  image: string;
  imageAlt: string;
  tier: string;
  description: string;
  ctaLabel: string;
};

type Partner = {
  name: string;
  image: string;
  imageAlt: string;
};

export function LogoBentoFeaturedPartnerAsymmetricWithFrame({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const featured = t.raw("featured") as Featured;
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

        <Reveal delay={80}>
          <div className="relative mt-16 rounded-lg border border-dashed border-border p-3 sm:p-5">
            <Plus
              aria-hidden="true"
              className="pointer-events-none absolute -top-2.5 -left-2.5 size-5 text-primary/70"
              strokeWidth={1.5}
            />
            <Plus
              aria-hidden="true"
              className="pointer-events-none absolute -top-2.5 -right-2.5 size-5 text-primary/70"
              strokeWidth={1.5}
            />
            <Plus
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-2.5 -left-2.5 size-5 text-primary/70"
              strokeWidth={1.5}
            />
            <Plus
              aria-hidden="true"
              className="pointer-events-none absolute -right-2.5 -bottom-2.5 size-5 text-primary/70"
              strokeWidth={1.5}
            />

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-4 sm:grid-rows-2">
              {partners.slice(0, 2).map((partner, index) => (
                <article
                  key={`top-${index}`}
                  className="group flex aspect-square items-center justify-center bg-card p-6 transition-colors duration-300 hover:bg-secondary sm:order-none"
                >
                  <SmartImage
                    src={partner.image}
                    alt={partner.imageAlt}
                    className="aspect-square opacity-60 grayscale transition-all duration-300 ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </article>
              ))}

              <article className="col-span-2 row-span-2 flex flex-col justify-between gap-8 bg-card p-8 sm:order-none sm:p-10">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-14 items-center">
                    <SmartImage
                      src={featured.image}
                      alt={featured.imageAlt}
                      className="aspect-[16/6]"
                    />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-sm bg-secondary px-2.5 py-1 text-[0.65rem] font-medium tracking-wide text-secondary-foreground uppercase">
                    <Star className="size-3 text-primary" strokeWidth={2} />
                    {featured.tier}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground">
                    {featured.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {featured.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    {featured.ctaLabel}
                    <ArrowUpRight className="size-4" strokeWidth={1.75} />
                  </span>
                </div>
              </article>

              {partners.slice(2).map((partner, index) => (
                <article
                  key={`rest-${index}`}
                  className="group flex aspect-square items-center justify-center bg-card p-6 transition-colors duration-300 hover:bg-secondary"
                >
                  <SmartImage
                    src={partner.image}
                    alt={partner.imageAlt}
                    className="aspect-square opacity-60 grayscale transition-all duration-300 ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
