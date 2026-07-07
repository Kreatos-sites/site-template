import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";

type GalleryItem = {
  image: string;
  imageAlt: string;
  title: string;
  artist: string;
  year: string;
  tags: string[];
};

/**
 * Exhibición tipo museo: una obra enmarcada en el centro que cruza (blur crossfade,
 * loop, sin JS de cliente) mientras la cédula de museo (artista, año, chips de
 * etiquetas) se mantiene centrada debajo y sincronizada con el mismo timing.
 * Se pausa al pasar el mouse (animation-play-state) y respeta prefers-reduced-motion
 * mostrando la primera obra fija.
 */
export function GalleryExhibitionDecorFramedCrossfade({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as GalleryItem[];
  const segment = 7;
  const duration = items.length * segment;

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <style>{`
        @keyframes gedfc-frame {
          0%, 15% { opacity: 1; filter: blur(0px); }
          22%, 94% { opacity: 0; filter: blur(12px); }
          100% { opacity: 1; filter: blur(0px); }
        }
        @keyframes gedfc-plaque {
          0%, 15% { opacity: 1; transform: translateY(0); }
          22%, 94% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes gedfc-dot {
          0%, 15% { opacity: 1; }
          22%, 94% { opacity: 0.3; }
          100% { opacity: 1; }
        }
        .gedfc-frame, .gedfc-plaque, .gedfc-dot {
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        .gedfc-exhibit:hover .gedfc-frame,
        .gedfc-exhibit:hover .gedfc-plaque,
        .gedfc-exhibit:hover .gedfc-dot {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .gedfc-frame, .gedfc-plaque, .gedfc-dot {
            animation: none;
            opacity: 0;
          }
          .gedfc-frame:first-child, .gedfc-plaque:first-child, .gedfc-dot:first-child {
            opacity: 1;
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t("description")}</p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="gedfc-exhibit relative mx-auto mt-16 max-w-xl">
            <div className="relative aspect-[3/4] w-full border border-border bg-card p-3 sm:p-4">
              <div className="relative h-full w-full overflow-hidden rounded-sm ring-1 ring-border">
                {items.map((item, index) => (
                  <div
                    key={item.image + index}
                    className={cn("gedfc-frame absolute inset-0", index === 0 ? "opacity-100" : "opacity-0")}
                    style={{
                      animationName: "gedfc-frame",
                      animationDuration: `${duration}s`,
                      animationDelay: `${index * segment}s`,
                    }}
                  >
                    <SmartImage src={item.image} alt={item.imageAlt} priority={index === 0} className="h-full w-full" />
                  </div>
                ))}
              </div>
            </div>

            <ul className="mt-6 flex items-center justify-center gap-2" aria-hidden="true">
              {items.map((item, index) => (
                <li
                  key={item.title + "dot" + index}
                  className={cn("gedfc-dot size-1.5 rounded-full bg-primary", index === 0 ? "opacity-100" : "opacity-30")}
                  style={{
                    animationName: "gedfc-dot",
                    animationDuration: `${duration}s`,
                    animationDelay: `${index * segment}s`,
                  }}
                />
              ))}
            </ul>

            <div className="relative mt-6 min-h-32">
              {items.map((item, index) => (
                <div
                  key={item.title + index}
                  className={cn(
                    "gedfc-plaque absolute inset-x-0 top-0 text-center",
                    index === 0 ? "opacity-100" : "opacity-0"
                  )}
                  style={{
                    animationName: "gedfc-plaque",
                    animationDuration: `${duration}s`,
                    animationDelay: `${index * segment}s`,
                  }}
                >
                  <h3 className="font-display text-xl text-foreground sm:text-2xl">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {item.artist} — {item.year}
                  </p>
                  <ul className="mt-4 flex flex-wrap items-center justify-center gap-2">
                    {item.tags.map((tag, tagIndex) => (
                      <li
                        key={tag + tagIndex}
                        className="inline-flex items-center rounded-sm bg-secondary px-3 py-1 text-xs font-medium tracking-wide text-secondary-foreground uppercase"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
