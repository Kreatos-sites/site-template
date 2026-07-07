import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";

type OverlayCard = {
  image: string;
  imageAlt: string;
  tag: string;
  title: string;
  description: string;
};

/**
 * gallery-masonry-overlay-cards — masonry de tarjetas con la fotografía de
 * fondo y el copy (etiqueta, título, descripción) sobrepuesto en un
 * degradado inferior. Pensado para portafolio de proyectos, catálogo de
 * espacios/servicios o casos con imagen fuerte.
 */
export function GalleryMasonryOverlayCards({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const cards = t.raw("cards") as OverlayCard[];

  // Ritmo de alturas para que la retícula no lea uniforme.
  const spans = [
    "row-span-5",
    "row-span-4",
    "row-span-6",
    "row-span-4",
    "row-span-5",
    "row-span-6",
  ];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <Reveal
              key={index}
              delay={index * 60}
              className={cn(spans[index % spans.length])}
            >
              <article className="group relative flex h-full min-h-[18rem] flex-col justify-end overflow-hidden rounded-sm">
                <SmartImage
                  src={card.image}
                  alt={card.imageAlt}
                  className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
                />
                <div className="relative z-10 flex flex-col gap-2 p-6">
                  <span className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                    {card.tag}
                  </span>
                  <h3 className="font-display text-xl leading-snug text-balance text-foreground">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
