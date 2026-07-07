import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";

type GalleryItem = {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  tag: string;
};

/**
 * Galería spotlight: una foto grande en el centro que va cruzando
 * (fade + blur, en loop, sin JS de cliente) mientras el riel de miniaturas
 * y el panel de metadata se mantienen sincronizados con el mismo timing.
 * El carrusel se pausa al pasar el mouse (animation-play-state) y respeta
 * prefers-reduced-motion mostrando la primera foto fija.
 */
export function GallerySpotlightCarouselCrossfade({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as GalleryItem[];
  const segment = 6;
  const duration = items.length * segment;

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <style>{`
        @keyframes gscc-spot {
          0%, 18% { opacity: 1; filter: blur(0px); }
          25%, 93% { opacity: 0; filter: blur(10px); }
          100% { opacity: 1; filter: blur(0px); }
        }
        @keyframes gscc-meta {
          0%, 18% { opacity: 1; transform: translateY(0); }
          25%, 93% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes gscc-thumb {
          0%, 18% { opacity: 1; }
          25%, 93% { opacity: 0; }
          100% { opacity: 1; }
        }
        .gscc-spot, .gscc-meta, .gscc-thumb {
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        .gscc-carousel:hover .gscc-spot,
        .gscc-carousel:hover .gscc-meta,
        .gscc-carousel:hover .gscc-thumb {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .gscc-spot, .gscc-meta, .gscc-thumb {
            animation: none;
            opacity: 0;
          }
          .gscc-spot:first-child, .gscc-meta:first-child, .gscc-thumb:first-child {
            opacity: 1;
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">{t("description")}</p>
        </Reveal>

        <Reveal delay={80}>
          <div className="gscc-carousel relative mt-12">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-card sm:aspect-[21/10]">
              {items.map((item, index) => (
                <div
                  key={item.image + index}
                  className={cn("gscc-spot absolute inset-0", index === 0 ? "opacity-100" : "opacity-0")}
                  style={{
                    animationName: "gscc-spot",
                    animationDuration: `${duration}s`,
                    animationDelay: `${index * segment}s`,
                  }}
                >
                  <SmartImage src={item.image} alt={item.imageAlt} priority={index === 0} className="h-full w-full" />
                </div>
              ))}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

              {items.map((item, index) => (
                <div
                  key={item.title + index}
                  className={cn(
                    "gscc-meta absolute inset-x-0 bottom-0 p-6 sm:p-8",
                    index === 0 ? "opacity-100" : "opacity-0"
                  )}
                  style={{
                    animationName: "gscc-meta",
                    animationDuration: `${duration}s`,
                    animationDelay: `${index * segment}s`,
                  }}
                >
                  <span className="inline-flex items-center rounded-sm bg-secondary px-3 py-1 text-xs font-medium tracking-wide text-secondary-foreground uppercase">
                    {item.tag}
                  </span>
                  <h3 className="mt-4 font-display text-xl text-foreground sm:text-2xl">{item.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>

            <ul className="mt-6 flex gap-3 overflow-x-auto pb-2">
              {items.map((item, index) => (
                <li key={item.image + "thumb" + index} className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-sm sm:w-28">
                  <SmartImage src={item.image} alt={item.imageAlt} className="h-full w-full" />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "gscc-thumb absolute inset-0 rounded-sm ring-2 ring-primary ring-offset-2 ring-offset-background",
                      index === 0 ? "opacity-100" : "opacity-0"
                    )}
                    style={{
                      animationName: "gscc-thumb",
                      animationDuration: `${duration}s`,
                      animationDelay: `${index * segment}s`,
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
