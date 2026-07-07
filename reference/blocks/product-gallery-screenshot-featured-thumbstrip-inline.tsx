import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { CircleIcon } from "@phosphor-icons/react/dist/ssr";

type Thumbnail = {
  image: string;
  imageAlt: string;
  label: string;
};

export function ProductGalleryScreenshotFeaturedThumbstripInline({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const thumbnails = t.raw("thumbnails") as Thumbnail[];

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
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-14 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div className="flex items-center gap-2 border-b border-border bg-secondary px-4 py-3">
              <span className="flex items-center gap-1.5">
                <CircleIcon
                  weight="fill"
                  className="size-2.5 text-muted-foreground/40"
                />
                <CircleIcon
                  weight="fill"
                  className="size-2.5 text-muted-foreground/40"
                />
                <CircleIcon
                  weight="fill"
                  className="size-2.5 text-muted-foreground/40"
                />
              </span>
              <span className="ml-3 rounded-sm bg-primary px-2.5 py-0.5 text-[11px] font-medium tracking-[0.1em] text-primary-foreground uppercase">
                {t("versionBadge")}
              </span>
            </div>
            <SmartImage
              src={t("featuredImage")}
              alt={t("featuredImageAlt")}
              className="aspect-[16/10]"
            />
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t("caption")}
          </p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {thumbnails.map((thumb, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <figure className="group flex flex-col gap-2">
                  <div className="overflow-hidden rounded-sm border border-border">
                    <SmartImage
                      src={thumb.image}
                      alt={thumb.imageAlt}
                      className="aspect-[4/3] transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="text-xs font-medium text-muted-foreground">
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
