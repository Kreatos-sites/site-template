import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { Tag } from "lucide-react";

type Thumbnail = {
  image: string;
  imageAlt: string;
  label: string;
};

export function ProductGalleryScreenshotFeaturedThumbstrip({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const thumbnails = t.raw("thumbnails") as Thumbnail[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{t("description")}</p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-14 overflow-hidden rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between gap-4 border-b border-border bg-secondary px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                <span className="size-2.5 rounded-full bg-muted-foreground/30" />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                <Tag className="size-3.5" strokeWidth={1.75} />
                {t("featured.version")}
              </span>
            </div>
            <SmartImage src={t("featured.image")} alt={t("featured.imageAlt")} className="aspect-video" />
            <p className="border-t border-border px-6 py-5 text-sm leading-relaxed text-muted-foreground">
              {t("featured.caption")}
            </p>
          </div>
        </Reveal>

        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {thumbnails.map((thumb, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <figure className="overflow-hidden rounded-sm border border-border bg-card">
                  <SmartImage src={thumb.image} alt={thumb.imageAlt} className="aspect-video" />
                  <figcaption className="border-t border-border px-3 py-2 text-xs text-muted-foreground">
                    {thumb.label}
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
