import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type Featured = {
  name: string;
  image: string;
  imageAlt: string;
  description: string;
};

type Partner = {
  name: string;
  image: string;
  imageAlt: string;
};

export function LogoCloudBentoAsymmetricFeatured({ ns }: { ns: string }) {
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
          <div className="relative mt-16 rounded-lg border border-border p-3 sm:p-4">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-primary/60"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-primary/60"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-primary/60"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-0 bottom-0 h-6 w-6 border-r-2 border-b-2 border-primary/60"
            />

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-4">
              <article className="col-span-2 row-span-2 flex flex-col justify-between gap-8 bg-card p-8 sm:p-10">
                <div className="flex h-16 w-full items-center">
                  <SmartImage
                    src={featured.image}
                    alt={featured.imageAlt}
                    className="aspect-[16/6]"
                  />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground">
                    {featured.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {featured.description}
                  </p>
                </div>
              </article>

              {partners.map((partner, index) => (
                <article
                  key={index}
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
