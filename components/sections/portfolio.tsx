import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { SmartImage } from "@/components/shared/smart-image";
import type { SectionOf } from "@/lib/config";
import { cn } from "@/lib/utils";

type PortfolioItem = { title: string; description: string };

/**
 * Trabajo/casos. Las imágenes vienen de config (section.images, en orden);
 * el copy de messages/es.json → portfolio.items (mismo orden).
 */
export function Portfolio({ variant = "rows", images = [] }: SectionOf<"portfolio">) {
  const t = useTranslations("portfolio");
  const items = t.raw("items") as PortfolioItem[];

  return (
    <section id="casos" className="border-t border-border py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        </Reveal>

        {variant === "masonry" ? (
          <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
            {items.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <figure>
                  {images[index] && (
                    <SmartImage
                      src={images[index]}
                      alt={item.title}
                      className={cn(
                        "w-full",
                        index % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]",
                      )}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  )}
                  <figcaption className="mt-3">
                    <h3 className="font-display text-lg tracking-tight">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-14 space-y-16">
            {items.map((item, index) => (
              <Reveal key={item.title} delay={60}>
                <div
                  className={cn(
                    "grid items-center gap-8 lg:grid-cols-12",
                    index % 2 === 1 && "lg:[&>*:first-child]:order-2",
                  )}
                >
                  {images[index] && (
                    <SmartImage
                      src={images[index]}
                      alt={item.title}
                      className="aspect-[16/10] w-full lg:col-span-7"
                      sizes="(min-width: 1024px) 58vw, 100vw"
                    />
                  )}
                  <div className="lg:col-span-5">
                    <span
                      aria-hidden="true"
                      className="font-display text-3xl text-primary/60 tabular-nums"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-2xl tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
