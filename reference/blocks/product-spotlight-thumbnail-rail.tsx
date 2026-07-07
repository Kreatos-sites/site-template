import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";

type ThumbnailItem = { image: string; imageAlt: string; label: string };

/**
 * product-spotlight-thumbnail-rail — un proyecto o pieza destacada con un
 * marco de imagen principal grande (con insignia de estado y descripción) y
 * una barra de miniaturas debajo para hojear variantes o vistas relacionadas
 * de forma secuencial. La primera miniatura se marca como la vista activa.
 */
export function ProductSpotlightThumbnailRail({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const thumbnails = t.raw("thumbnails") as ThumbnailItem[];

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
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 overflow-hidden rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="flex size-3 items-center justify-center gap-1" aria-hidden="true">
                  <span className="size-1.5 rounded-full bg-muted-foreground/30" />
                </span>
                <span className="text-sm font-medium text-foreground">{t("frameLabel")}</span>
              </div>
              <span className="rounded-sm bg-primary px-2.5 py-1 text-xs font-medium tracking-wide text-primary-foreground uppercase">
                {t("badge")}
              </span>
            </div>
            <SmartImage
              src={t("mainImage")}
              alt={t("mainImageAlt")}
              className="aspect-16/10 w-full"
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
            <p className="border-t border-border px-6 py-4 text-sm leading-relaxed text-muted-foreground">
              {t("caption")}
            </p>
          </div>
        </Reveal>

        <ul className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-5">
          {thumbnails.map((thumb, i) => (
            <li key={thumb.label} className="contents">
              <Reveal delay={140 + i * 60}>
                <figure
                  className={cn(
                    "group overflow-hidden rounded-sm border bg-card",
                    i === 0 ? "border-primary ring-1 ring-primary" : "border-border",
                  )}
                >
                  <SmartImage
                    src={thumb.image}
                    alt={thumb.imageAlt}
                    className="aspect-4/3 w-full"
                    sizes="(min-width: 640px) 20vw, 33vw"
                  />
                  <figcaption
                    className={cn(
                      "flex items-center gap-2 border-t px-3 py-2 text-xs font-medium",
                      i === 0
                        ? "border-primary/30 text-foreground"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    <span aria-hidden="true" className="tabular-nums text-primary/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate">{thumb.label}</span>
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
