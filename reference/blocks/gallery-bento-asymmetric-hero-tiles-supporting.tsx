import { useTranslations } from "next-intl";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type SupportingPiece = {
  image: string;
  imageAlt: string;
  category: string;
  title: string;
  year: string;
};

export function GalleryBentoAsymmetricHeroTilesSupporting({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const pieces = t.raw("pieces") as SupportingPiece[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-5">
          <Reveal>
            <article className="group relative flex h-full min-h-[26rem] flex-col overflow-hidden rounded-lg border border-border lg:col-span-3">
              <SmartImage
                src={t("hero.image")}
                alt={t("hero.imageAlt")}
                className="aspect-[4/5] flex-1 lg:aspect-auto"
              />
              <div className="flex items-end justify-between gap-4 border-t border-border bg-card p-6">
                <div>
                  <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                    {t("hero.category")}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-foreground">
                    {t("hero.title")}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t("hero.year")}
                  </p>
                </div>
                <ArrowUpRightIcon
                  className="size-5 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  weight="regular"
                />
              </div>
            </article>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 lg:col-span-2 lg:grid-rows-2">
            {pieces.map((piece, i) => (
              <Reveal key={i} delay={(i + 1) * 60}>
                <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border">
                  <SmartImage
                    src={piece.image}
                    alt={piece.imageAlt}
                    className="aspect-[16/10] lg:aspect-auto lg:flex-1"
                  />
                  <div className="flex items-end justify-between gap-4 border-t border-border bg-card p-5">
                    <div>
                      <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                        {piece.category}
                      </p>
                      <h3 className="mt-2 font-display text-lg text-foreground">
                        {piece.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {piece.year}
                      </p>
                    </div>
                    <ArrowUpRightIcon
                      className="size-4 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      weight="regular"
                    />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
