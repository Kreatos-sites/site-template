import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type GalleryImage = { src: string; alt: string };

export function IntroAsymmetricGallery({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const body = t.raw("body") as string[];
  const images = t.raw("images") as GalleryImage[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
          </Reveal>

          <div className="mt-6 space-y-4">
            {body.map((paragraph, index) => (
              <Reveal key={index} delay={index * 60}>
                <p className="text-[1.02rem] leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Galería asimétrica: columna alta a la izquierda, dos columnas apiladas a la derecha */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          <Reveal className="col-span-2 lg:col-span-1">
            <SmartImage
              src={images[0]?.src ?? "/images/about.svg"}
              alt={images[0]?.alt ?? ""}
              className="aspect-[3/4] w-full rounded-sm lg:aspect-[4/5]"
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
          </Reveal>

          <Reveal delay={60}>
            <SmartImage
              src={images[1]?.src ?? "/images/hero.svg"}
              alt={images[1]?.alt ?? ""}
              className="aspect-square w-full rounded-sm sm:mt-10"
              sizes="(min-width: 1024px) 33vw, 50vw"
            />
          </Reveal>

          <Reveal delay={120}>
            <SmartImage
              src={images[2]?.src ?? "/images/about.svg"}
              alt={images[2]?.alt ?? ""}
              className="aspect-[4/5] w-full rounded-sm"
              sizes="(min-width: 1024px) 33vw, 50vw"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
