import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";

type Tile = {
  image: string;
  imageAlt: string;
  title: string;
  category: string;
  aspect: "tall" | "square" | "wide";
  offset: "up" | "down" | "none";
};

const ASPECT_CLASS: Record<Tile["aspect"], string> = {
  tall: "aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-[4/3]",
};

const OFFSET_CLASS: Record<Tile["offset"], string> = {
  up: "lg:-translate-y-8",
  down: "lg:translate-y-8",
  none: "",
};

export function GalleryMasonryOffsetFramedDirectionalReveal({ ns }: { ns: string }) {
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
            <li key={i} className={cn("contents")}>
              <div className={cn(OFFSET_CLASS[tile.offset])}>
                <Reveal delay={i * 70}>
                  <figure className="group relative overflow-hidden rounded-sm border border-border bg-card p-2">
                    <div className="relative overflow-hidden rounded-sm">
                      <SmartImage
                        src={tile.image}
                        alt={tile.imageAlt}
                        className={cn(ASPECT_CLASS[tile.aspect])}
                      />
                      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background/90 via-background/10 to-transparent p-5 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
                        <span className="translate-y-4 text-xs font-medium tracking-[0.2em] text-primary uppercase opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                          {tile.category}
                        </span>
                        <span className="mt-2 translate-y-4 font-display text-lg leading-snug text-foreground opacity-0 transition-all delay-75 duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                          {tile.title}
                        </span>
                      </div>
                    </div>
                  </figure>
                </Reveal>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
