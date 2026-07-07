import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type MarqueeItem = {
  image: string;
  imageAlt: string;
  caption: string;
  subcaption: string;
};

export function GalleryMarqueeInfiniteEdgeMask2({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as MarqueeItem[];

  const rowA = items.filter((_, i) => i % 2 === 0);
  const rowB = items.filter((_, i) => i % 2 === 1);

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>
      </div>

      <Reveal delay={80}>
        <div
          className="relative mt-16 flex flex-col gap-6 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <style>{`
            @keyframes gallery-marquee-2-track-a {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            @keyframes gallery-marquee-2-track-b {
              from { transform: translateX(-50%); }
              to { transform: translateX(0); }
            }
            .gallery-marquee-2-track-a {
              animation: gallery-marquee-2-track-a 42s linear infinite;
            }
            .gallery-marquee-2-track-b {
              animation: gallery-marquee-2-track-b 42s linear infinite;
            }
            @media (prefers-reduced-motion: reduce) {
              .gallery-marquee-2-track-a,
              .gallery-marquee-2-track-b {
                animation-play-state: paused;
              }
            }
          `}</style>

          <ul className="gallery-marquee-2-track-a flex w-max items-stretch gap-5">
            {[...rowA, ...rowA].map((item, i) => (
              <li
                key={i}
                aria-hidden={i >= rowA.length ? "true" : undefined}
                className="w-48 shrink-0 sm:w-64"
              >
                <figure className="overflow-hidden rounded-sm bg-card">
                  <SmartImage
                    src={item.image}
                    alt={i >= rowA.length ? "" : item.imageAlt}
                    className="aspect-[4/5] rounded-none"
                  />
                  <figcaption className="border-t border-border px-4 py-3">
                    <p className="text-sm font-medium text-foreground">
                      {item.caption}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.subcaption}
                    </p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <ul className="gallery-marquee-2-track-b flex w-max items-stretch gap-5">
            {[...rowB, ...rowB].map((item, i) => (
              <li
                key={i}
                aria-hidden={i >= rowB.length ? "true" : undefined}
                className="w-48 shrink-0 sm:w-64"
              >
                <figure className="overflow-hidden rounded-sm bg-card">
                  <SmartImage
                    src={item.image}
                    alt={i >= rowB.length ? "" : item.imageAlt}
                    className="aspect-[4/5] rounded-none"
                  />
                  <figcaption className="border-t border-border px-4 py-3">
                    <p className="text-sm font-medium text-foreground">
                      {item.caption}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.subcaption}
                    </p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
