import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";
import {
  Building2,
  Compass,
  Layers,
  Maximize,
  Ruler,
  Trees,
  type LucideIcon,
} from "lucide-react";

type Vision = { icon: string; title: string; description: string };
type GalleryImage = { image: string; imageAlt: string; caption: string };
type Material = { name: string; description: string };
type Spec = { label: string; value: string };

const ICONS: Record<string, LucideIcon> = {
  building: Building2,
  compass: Compass,
  layers: Layers,
  maximize: Maximize,
  ruler: Ruler,
  trees: Trees,
};

export function PropertyShowcaseDetailed({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const visions = t.raw("visions") as Vision[];
  const gallery = t.raw("gallery") as GalleryImage[];
  const materials = t.raw("materials") as Material[];
  const specs = t.raw("specs") as Spec[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        {/* Hero: imagen dominante + ficha del proyecto */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <SmartImage
                src={t("heroImage")}
                alt={t("heroImageAlt")}
                className="aspect-[4/3] rounded-sm"
                sizes="(min-width: 1024px) 60vw, 100vw"
                priority
              />
            </Reveal>
          </div>

          <div className="flex flex-col justify-center lg:col-span-5">
            <Reveal delay={80}>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
              <p className="mt-6 max-w-prose text-[1.05rem] leading-relaxed text-muted-foreground">
                {t("description")}
              </p>

              <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8">
                {specs.map((spec, index) => (
                  <div key={index}>
                    <dt className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                      {spec.label}
                    </dt>
                    <dd className="mt-2 font-display text-lg text-foreground">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        {/* Visión: principios de diseño en tres ejes */}
        <div className="mt-24 lg:mt-32">
          <Reveal>
            <h3 className="font-display text-2xl tracking-tight text-foreground">
              {t("visionTitle")}
            </h3>
          </Reveal>

          <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
            {visions.map((vision, index) => {
              const Icon = ICONS[vision.icon] ?? Compass;
              return (
                <li key={index} className="contents">
                  <Reveal delay={index * 60}>
                    <article className="flex h-full flex-col gap-6 bg-card p-8">
                      <span
                        className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20"
                        aria-hidden="true"
                      >
                        <Icon className="size-5" strokeWidth={1.75} />
                      </span>
                      <div>
                        <h4 className="font-display text-lg text-foreground">
                          {vision.title}
                        </h4>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {vision.description}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Galería: recorrido fotográfico horizontal con scroll nativo */}
        <div className="mt-24 lg:mt-32">
          <Reveal>
            <h3 className="font-display text-2xl tracking-tight text-foreground">
              {t("galleryTitle")}
            </h3>
          </Reveal>

          <div className="mt-10 -mx-6 overflow-x-auto px-6 lg:mx-0 lg:px-0">
            <ul className="flex w-max gap-6">
              {gallery.map((item, index) => (
                <li key={index} className="w-[min(80vw,22rem)] shrink-0">
                  <Reveal delay={index * 60}>
                    <figure>
                      <SmartImage
                        src={item.image}
                        alt={item.imageAlt}
                        className="aspect-[4/5] rounded-sm"
                        sizes="22rem"
                      />
                      <figcaption className="mt-3 text-sm text-muted-foreground">
                        {item.caption}
                      </figcaption>
                    </figure>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Materiales y detalles constructivos */}
        <div className="mt-24 grid grid-cols-1 gap-12 lg:mt-32 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h3 className="font-display text-2xl tracking-tight text-foreground">
              {t("materialsTitle")}
            </h3>
            <ul className="mt-8 space-y-6">
              {materials.map((material, index) => (
                <li
                  key={index}
                  className={cn(
                    "border-t border-border pt-6",
                    index === 0 && "border-t-0 pt-0",
                  )}
                >
                  <h4 className="font-display text-base text-foreground">
                    {material.name}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {material.description}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80}>
            <SmartImage
              src={t("detailImage")}
              alt={t("detailImageAlt")}
              className="aspect-[4/5] rounded-sm"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
