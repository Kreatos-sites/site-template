import { useTranslations } from "next-intl";
import { RiCompasses2Line } from "@remixicon/react";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type ThumbEntry = {
  image: string;
  imageAlt: string;
  label: string;
};

/**
 * BLOQUE: gallery-diagonal-split-dark-panel-thumbrail — split asimétrico a
 * dos columnas con corte diagonal (clip-path) entre paneles: panel
 * izquierdo sólido bg-foreground con eyebrow, título y descripción; panel
 * derecho con imagen protagonista recortada en diagonal y un riel vertical
 * de miniaturas superpuesto sobre el borde. Tono técnico/arquitectónico.
 *
 * ns: { eyebrow, title, description, index, indexTotal, image, imageAlt,
 *       thumbnails: { image, imageAlt, label }[] (3-4 items) }
 */
export function GalleryDiagonalSplitDarkPanelThumbrail({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const thumbnails = t.raw("thumbnails") as ThumbEntry[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="relative grid grid-cols-1 overflow-hidden rounded-sm border border-border lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div
            className="relative flex flex-col justify-between bg-foreground px-8 py-12 lg:px-10 lg:py-16"
            style={{
              clipPath:
                "polygon(0 0, 100% 0, 100% 78%, 0 100%)",
            }}
          >
            <Reveal>
              <div className="flex items-center gap-3">
                <RiCompasses2Line
                  className="size-5 text-primary"
                  aria-hidden="true"
                />
                <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                  {t("eyebrow")}
                </p>
              </div>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
                {t("title")}
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-background/70">
                {t("description")}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-16 flex items-baseline gap-2 border-t border-background/20 pt-6 lg:mt-24">
                <span className="font-display text-3xl tabular-nums text-background">
                  {t("index")}
                </span>
                <span className="text-sm tabular-nums text-background/50">
                  / {t("indexTotal")}
                </span>
              </div>
            </Reveal>
          </div>

          <div className="relative min-h-[22rem] lg:min-h-[32rem]">
            <Reveal delay={60}>
              <div
                className="absolute inset-0 -ml-px lg:-ml-16"
                style={{
                  clipPath: "polygon(8% 0, 100% 0, 100% 100%, 0 100%)",
                }}
              >
                <SmartImage
                  src={t("image")}
                  alt={t("imageAlt")}
                  className="h-full rounded-none"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent"
                />
              </div>
            </Reveal>

            <Reveal delay={140}>
              <ul className="absolute inset-y-6 right-6 flex flex-col gap-3 lg:inset-y-10 lg:right-10">
                {thumbnails.map((thumb, i) => (
                  <li
                    key={i}
                    className="group relative w-16 shrink-0 overflow-hidden rounded-sm border border-background/40 shadow-sm lg:w-20"
                  >
                    <SmartImage
                      src={thumb.image}
                      alt={thumb.imageAlt}
                      className="aspect-square rounded-none"
                    />
                    <span className="sr-only">{thumb.label}</span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 truncate bg-foreground/70 px-1.5 py-1 text-center text-[10px] tracking-wide text-background"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
