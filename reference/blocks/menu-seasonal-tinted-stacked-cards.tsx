import { useTranslations } from "next-intl";

import { SmartImage } from "@/components/shared/smart-image";
import { Reveal } from "@/components/shared/reveal";
import { LeafIcon } from "@phosphor-icons/react/dist/ssr";

/**
 * BLOQUE: menu-seasonal-tinted-stacked-cards — sección completa con fondo
 * tintado (bg-secondary) y tarjetas de platillos de temporada apiladas en
 * columna, con offset alterno izquierda/derecha para dar un ritmo de zigzag
 * suave. Cada tarjeta trae imagen redondeada, nombre, descripción corta y
 * precio. Tono claro, cálido y editorial. Úsalo para menús de temporada,
 * cartas de chef o selecciones estacionales en restaurante/hotel.
 *
 * ns: {
 *   eyebrow, title, description,
 *   items: [{ image, imageAlt, name, description, price }]
 * }
 */
type SeasonalMenuItem = {
  image: string;
  imageAlt: string;
  name: string;
  description: string;
  price: string;
};

export function MenuSeasonalTintedStackedCards({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as SeasonalMenuItem[];

  return (
    <section className="border-t border-border bg-secondary py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-primary uppercase">
            <LeafIcon className="size-4" weight="regular" aria-hidden="true" />
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <ul className="mt-16 flex flex-col gap-14 lg:gap-20">
          {items.map((item, index) => {
            const isReversed = index % 2 === 1;
            return (
              <li key={index}>
                <Reveal delay={index * 80}>
                  <article
                    className={`flex flex-col items-center gap-8 lg:gap-14 ${
                      isReversed
                        ? "lg:flex-row-reverse lg:pl-[12%]"
                        : "lg:flex-row lg:pr-[12%]"
                    }`}
                  >
                    <div className="w-full max-w-sm shrink-0">
                      <SmartImage
                        src={item.image}
                        alt={item.imageAlt}
                        className="aspect-[4/5] rounded-lg"
                      />
                    </div>
                    <div className="flex w-full flex-col gap-3 text-center lg:text-left">
                      <div className="flex flex-col items-center gap-2 lg:flex-row lg:items-baseline lg:justify-between lg:gap-4">
                        <h3 className="font-display text-2xl leading-snug tracking-tight text-balance text-foreground">
                          {item.name}
                        </h3>
                        <p className="shrink-0 text-base font-medium tracking-wide text-primary">
                          {item.price}
                        </p>
                      </div>
                      <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground lg:mx-0">
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
