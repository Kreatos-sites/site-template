import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";
import { HandshakeIcon } from "@phosphor-icons/react/dist/ssr";

type Partner = {
  name: string;
  image: string;
  imageAlt: string;
};

type FeaturedPartner = {
  name: string;
  image: string;
  imageAlt: string;
  tagline: string;
};

export function LogoCloudBentoFeaturedPartner({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const featured = t.raw("featured") as FeaturedPartner;
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
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
          <Reveal className="col-span-2 row-span-2">
            <article className="flex h-full flex-col justify-between gap-8 bg-card p-8 sm:p-10">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-primary uppercase">
                  <HandshakeIcon className="size-4" weight="duotone" />
                  {t("featuredLabel")}
                </span>
              </div>
              <div className="flex flex-1 items-center justify-center py-6">
                <SmartImage
                  src={featured.image}
                  alt={featured.imageAlt}
                  className="aspect-[3/1] w-full max-w-xs"
                />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {featured.tagline}
              </p>
            </article>
          </Reveal>

          {partners.map((partner, index) => (
            <Reveal
              key={partner.name}
              delay={(index + 1) * 60}
              className={cn(index === 0 && "col-span-2 sm:col-span-1")}
            >
              <article className="group flex h-full aspect-square items-center justify-center bg-card p-6 transition-colors duration-300 hover:bg-secondary sm:aspect-auto">
                <SmartImage
                  src={partner.image}
                  alt={partner.imageAlt}
                  className="aspect-square opacity-60 grayscale transition-all duration-300 ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
