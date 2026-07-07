import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type MarqueeImage = {
  image: string;
  imageAlt: string;
};

export function GalleryMarqueeInfiniteEdgeMask({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const images = t.raw("images") as MarqueeImage[];

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
          className="relative mt-16 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <style>{`
            @keyframes gallery-marquee-track {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            .gallery-marquee-track {
              animation: gallery-marquee-track 36s linear infinite;
            }
            @media (prefers-reduced-motion: reduce) {
              .gallery-marquee-track {
                animation-play-state: paused;
              }
            }
          `}</style>
          <ul className="gallery-marquee-track flex w-max items-stretch gap-6">
            {[...images, ...images].map((item, i) => (
              <li
                key={i}
                aria-hidden={i >= images.length ? "true" : undefined}
                className="w-56 shrink-0 sm:w-72"
              >
                <SmartImage
                  src={item.image}
                  alt={i >= images.length ? "" : item.imageAlt}
                  className="aspect-[4/5] rounded-sm"
                />
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
