import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type GalleryItem = {
  title: string;
  caption: string;
  image: string;
  imageAlt: string;
};

export function GalleryEditorialGrayscaleIndexed({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as GalleryItem[];

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

        <ul className="mt-16 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <article className="group flex h-full flex-col bg-background">
                  <div className="relative overflow-hidden">
                    <SmartImage
                      src={item.image}
                      alt={item.imageAlt}
                      className="aspect-[4/5] grayscale transition-all duration-500 ease-out group-hover:grayscale-0"
                    />
                  </div>
                  <div className="flex items-start gap-4 border-t border-border px-5 py-4">
                    <span className="font-display text-xs text-muted-foreground tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-display text-base text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
