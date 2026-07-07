import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * BLOQUE: gallery-spotlight-carousel-thumbrail-2 — carrusel spotlight con
 * riel de miniaturas y panel de metadatos, para mostrar un catálogo de
 * proyectos/piezas con detalle enfocado. El arquetipo de origen
 * (@nusaiba/gallery-2) usa hover con temporizador de cliente; como este es
 * un componente de servidor sin JS de cliente, la selección es manual vía
 * radios nativos ocultos + selector :has(), y el crossfade con blur se logra
 * apilando los paneles (imagen y metadatos) en la misma celda de grid,
 * controlados por el radio checked.
 *
 * ns esperado:
 *   { eyebrow: string, title: string,
 *     items: [{ image: string, imageAlt: string, title: string, category: string, year: string, description: string }] }
 */
type GalleryItem = {
  image: string;
  imageAlt: string;
  title: string;
  category: string;
  year: string;
  description: string;
};

export function GallerySpotlightCarouselThumbrail2({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as GalleryItem[];
  const idPrefix = ns.replace(/[^a-zA-Z0-9]/g, "-");

  const styleRules = items
    .map(
      (_, i) => `
        .gs-${idPrefix}:has(#${idPrefix}-g-${i}:checked) .gs-spotlight-${i} {
          opacity: 1;
          filter: blur(0);
          z-index: 10;
          pointer-events: auto;
        }
        .gs-${idPrefix}:has(#${idPrefix}-g-${i}:checked) .gs-meta-${i} {
          opacity: 1;
          z-index: 10;
          pointer-events: auto;
        }
        .gs-${idPrefix}:has(#${idPrefix}-g-${i}:checked) .gs-thumb-${i} {
          border-color: var(--primary);
          opacity: 1;
        }
      `,
    )
    .join("");

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

        <Reveal delay={80}>
          <div className={`gs-${idPrefix} relative mt-16`}>
            {items.map((_, i) => (
              <input
                key={i}
                type="radio"
                id={`${idPrefix}-g-${i}`}
                name={`${idPrefix}-gallery`}
                defaultChecked={i === 0}
                className="sr-only"
              />
            ))}

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
              <div className="relative grid aspect-[4/3] overflow-hidden rounded-lg border border-border bg-card">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className={`gs-spotlight-${i} col-start-1 row-start-1 opacity-0 blur-sm transition-all duration-700 ease-out`}
                  >
                    <SmartImage
                      src={item.image}
                      alt={item.imageAlt}
                      className="h-full w-full"
                    />
                  </div>
                ))}
              </div>

              <div className="relative grid rounded-lg border border-border bg-card p-8">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className={`gs-meta-${i} col-start-1 row-start-1 flex flex-col gap-4 opacity-0 transition-opacity duration-500 ease-out`}
                  >
                    <span className="text-xs font-medium tracking-[0.15em] text-primary uppercase">
                      {item.category}
                    </span>
                    <h3 className="font-display text-2xl text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <span className="mt-auto text-sm text-muted-foreground">
                      {item.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {items.map((item, i) => (
                <label
                  key={i}
                  htmlFor={`${idPrefix}-g-${i}`}
                  className={`gs-thumb-${i} block cursor-pointer overflow-hidden rounded-sm border-2 border-border opacity-60 transition-all duration-300`}
                >
                  <SmartImage
                    src={item.image}
                    alt={item.imageAlt}
                    className="aspect-square w-20"
                  />
                  <span className="sr-only">
                    {item.title} — {item.category}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <style>{styleRules}</style>
    </section>
  );
}
