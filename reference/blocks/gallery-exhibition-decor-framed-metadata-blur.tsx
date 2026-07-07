import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type GalleryItem = {
  image: string;
  imageAlt: string;
  hoverImage: string;
  hoverImageAlt: string;
  category: string;
  title: string;
  year: string;
};

export function GalleryExhibitionDecorFramedMetadataBlur({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as GalleryItem[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{t("description")}</p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <article className="group flex flex-col">
                  <div className="border border-border bg-card p-3">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                      <SmartImage
                        src={item.image}
                        alt={item.imageAlt}
                        className="absolute inset-0 h-full w-full object-cover opacity-100 blur-0 transition-all duration-700 ease-out group-hover:opacity-0 group-hover:blur-sm"
                      />
                      <SmartImage
                        src={item.hoverImage}
                        alt={item.hoverImageAlt}
                        className="absolute inset-0 h-full w-full object-cover opacity-0 blur-sm transition-all duration-700 ease-out group-hover:opacity-100 group-hover:blur-0"
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col items-center gap-2 text-center">
                    <span className="inline-flex items-center rounded-sm border border-border px-3 py-1 text-[0.65rem] font-medium tracking-[0.2em] text-muted-foreground uppercase">
                      {item.category}
                    </span>
                    <h3 className="font-display text-lg text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.year}</p>
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
