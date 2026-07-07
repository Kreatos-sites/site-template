import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type Tile = {
  image: string;
  imageAlt: string;
  caption: string;
};

export function GalleryWallQuadTileMotionHoverLift({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const tiles = t.raw("tiles") as Tile[];

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

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 80}>
                <figure className="group relative overflow-hidden rounded-sm border border-border bg-card transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-lg">
                  <SmartImage
                    src={tile.image}
                    alt={tile.imageAlt}
                    className="aspect-[4/5] transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <figcaption className="border-t border-border bg-card px-4 py-3 text-sm leading-snug text-foreground">
                    {tile.caption}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
