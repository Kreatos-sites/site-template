import { useTranslations } from "next-intl";

import { SmartImage } from "@/components/shared/smart-image";
import { Reveal } from "@/components/shared/reveal";
import { Leaf, Flame, WheatOff, type LucideIcon } from "lucide-react";

/**
 * BLOQUE: menu-plated-item-card — tarjetas de platillos individuales con
 * fotografía del platillo emplatado, nombre, precio, descripción corta y una
 * etiqueta opcional de atributo (vegetariano, picante, sin gluten). Úsalo
 * para destacar un puñado de platillos insignia (entradas del chef, especial
 * de temporada) en restaurante, catering o menú de hotel.
 *
 * ns: {
 *   eyebrow, title, description,
 *   items: [{ image, imageAlt, name, price, description, tag?: string }]
 * }
 */
type MenuPlatedItem = {
  image: string;
  imageAlt: string;
  name: string;
  price: string;
  description: string;
  tag?: string;
};

const TAG_ICONS: Record<string, LucideIcon> = {
  vegetarian: Leaf,
  spicy: Flame,
  "gluten-free": WheatOff,
};

export function MenuPlatedItemCard({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as MenuPlatedItem[];

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
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const TagIcon = item.tag ? TAG_ICONS[item.tag] : undefined;
            return (
              <li key={index}>
                <Reveal delay={index * 60}>
                  <article className="flex h-full flex-col gap-5">
                    <div className="relative">
                      <SmartImage
                        src={item.image}
                        alt={item.imageAlt}
                        className="aspect-[4/5] rounded-sm"
                      />
                      {TagIcon ? (
                        <span className="absolute top-4 left-4 flex size-8 items-center justify-center rounded-full bg-background/90 text-primary ring-1 ring-border">
                          <TagIcon className="size-4" aria-hidden="true" />
                        </span>
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-display text-xl leading-snug tracking-tight text-balance text-foreground">
                          {item.name}
                        </h3>
                        <p className="shrink-0 text-base font-medium tracking-wide text-primary">
                          {item.price}
                        </p>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
