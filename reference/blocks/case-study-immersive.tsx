import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type MetaItem = { label: string; value: string };
type GalleryImage = { image: string; imageAlt: string; caption: string };

export function CaseStudyImmersive({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const meta = t.raw("meta") as MetaItem[];
  const gallery = t.raw("gallery") as GalleryImage[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("summary")}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <dl className="mt-12 grid grid-cols-2 gap-y-8 border-y border-border py-8 sm:grid-cols-4">
            {meta.map((item, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <dt className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  {item.label}
                </dt>
                <dd className="font-display text-lg text-foreground">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={160}>
          <div className="relative mt-14 overflow-hidden rounded-sm">
            <SmartImage
              src={t("heroImage")}
              alt={t("heroImageAlt")}
              className="aspect-[16/9] rounded-sm lg:aspect-[21/9]"
            />
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {gallery.map((item, i) => (
            <Reveal
              key={i}
              delay={220 + i * 80}
              className={i % 3 === 0 ? "sm:col-span-2" : undefined}
            >
              <figure className="flex flex-col gap-4">
                <SmartImage
                  src={item.image}
                  alt={item.imageAlt}
                  className={
                    i % 3 === 0
                      ? "aspect-[21/9] rounded-sm"
                      : "aspect-[4/5] rounded-sm"
                  }
                />
                <figcaption className="text-sm leading-relaxed text-muted-foreground">
                  {item.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
