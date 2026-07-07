import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";

type GalleryItem = {
  image: string;
  imageAlt: string;
  title: string;
  category: string;
};

const ASPECTS = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[4/3]"];

export function GalleryMasonryCaptionHover({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as GalleryItem[];

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

        <div className="mt-16 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="group relative mb-4 block break-inside-avoid overflow-hidden rounded-sm">
                <SmartImage
                  src={item.image}
                  alt={item.imageAlt}
                  className={cn(ASPECTS[i % ASPECTS.length], "rounded-sm")}
                />
                <div
                  className={cn(
                    "absolute inset-0 flex flex-col justify-end p-5",
                    "bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/70",
                  )}
                >
                  <div className="translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-xs font-medium tracking-[0.2em] text-background/80 uppercase">
                      {item.category}
                    </p>
                    <h3 className="mt-1 font-display text-lg text-background">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
