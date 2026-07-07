import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

type GalleryItem = {
  image: string;
  imageAlt: string;
  category: string;
  caption: string;
  aspect: string;
};

export function GalleryMasonryCssColumnsCaptionHoverOverlay({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as GalleryItem[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{t("description")}</p>
        </Reveal>

        <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 60}>
              <figure className="group relative mb-4 block break-inside-avoid overflow-hidden rounded-sm border border-border bg-card">
                <SmartImage
                  src={item.image}
                  alt={item.imageAlt}
                  className={`${item.aspect} w-full transition duration-500 ease-out group-hover:scale-105`}
                />
                <figcaption className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-foreground/85 via-foreground/10 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-xs font-medium tracking-[0.2em] text-background/80 uppercase">
                    {item.category}
                  </span>
                  <span className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-background">
                    {item.caption}
                    <ArrowUpRightIcon className="size-3.5 shrink-0" />
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
