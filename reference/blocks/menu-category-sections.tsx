import { useTranslations } from "next-intl";

import { SmartImage } from "@/components/shared/smart-image";
import { Reveal } from "@/components/shared/reveal";

/**
 * BLOQUE: menu-category-sections — categorías de menú (hospitality) con
 * navegación tipo breadcrumb por ancla, imagen hero por categoría, título,
 * descripción y lista de platillos con precio. Úsalo para organizar cartas
 * extensas (restaurante, catering, hotel) en tramos navegables sin JS de
 * cliente: los pills de navegación son anclas nativas a cada sección.
 *
 * ns: {
 *   eyebrow, title, description,
 *   navLabel,
 *   categories: [{ id, name, image, imageAlt, description,
 *     items: [{ name, description, price }] }]
 * }
 */
type MenuItem = {
  name: string;
  description: string;
  price: string;
};

type MenuCategory = {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  description: string;
  items: MenuItem[];
};

export function MenuCategorySections({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const categories = t.raw("categories") as MenuCategory[];

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
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <nav aria-label={t("navLabel")} className="mt-10">
            <ol className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <a
                    href={`#${category.id}`}
                    className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>

        <div className="mt-16 flex flex-col gap-20">
          {categories.map((category, i) => (
            <Reveal key={category.id} delay={i * 60}>
              <article
                id={category.id}
                className="scroll-mt-24 grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-14"
              >
                <div className="lg:col-span-2">
                  <SmartImage
                    src={category.image}
                    alt={category.imageAlt}
                    className="aspect-[4/3] rounded-sm"
                  />
                  <h3 className="mt-6 font-display text-2xl text-foreground">
                    {category.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {category.description}
                  </p>
                </div>

                <ul className="lg:col-span-3 flex flex-col divide-y divide-border border-t border-border">
                  {category.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    >
                      <div className="sm:max-w-md">
                        <p className="font-display text-lg text-foreground">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-medium tracking-wide text-primary sm:text-right">
                        {item.price}
                      </p>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
