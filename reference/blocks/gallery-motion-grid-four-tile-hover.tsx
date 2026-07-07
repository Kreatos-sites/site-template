import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type GalleryItem = {
  title: string;
  caption: string;
  image: string;
  imageAlt: string;
};

export function GalleryMotionGridFourTileHover({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as GalleryItem[];

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

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {items.map((item, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <article className="group relative flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-transform duration-300 ease-out hover:-translate-y-1">
                  <div className="relative overflow-hidden">
                    <SmartImage
                      src={item.image}
                      alt={item.imageAlt}
                      className="aspect-[4/5] transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1 p-6 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
                    <h3 className="font-display text-lg text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/80">{item.caption}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
