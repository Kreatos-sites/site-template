import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { UtensilsCrossed } from "lucide-react";

/**
 * BLOQUE: menu-fullbleed-split-image-right-warm — split asimétrico 60/40:
 * columna izquierda (60%) sobre fondo claro con eyebrow, título, lista corta
 * de platillos destacados (nombre + precio + descripción) y un CTA a la
 * carta completa; columna derecha (40%) con fotografía cálida a sangre de
 * altura completa (mesa puesta o interior del restaurante). Tono claro,
 * cálido y acogedor. Úsalo como aperitivo del menú antes de la carta
 * completa, en restaurante, hotel boutique o servicio de banquetes.
 *
 * ns: {
 *   eyebrow, title, description, image, imageAlt, ctaLabel, ctaHref,
 *   items: [{ name, price, description }]
 * }
 */
type WarmMenuItem = {
  name: string;
  price: string;
  description: string;
};

export function MenuFullbleedSplitImageRightWarm({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as WarmMenuItem[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 lg:grid-cols-5">
        <div className="flex flex-col justify-center px-6 py-12 lg:col-span-3 lg:px-8 lg:py-16 lg:pr-16">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </Reveal>

          <ul className="mt-10 flex flex-col gap-6 border-t border-border pt-8">
            {items.map((item, index) => (
              <li key={index}>
                <Reveal delay={index * 60}>
                  <div className="flex items-baseline gap-3">
                    <UtensilsCrossed
                      className="size-4 shrink-0 translate-y-0.5 text-primary"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <span className="font-display text-lg tracking-tight text-foreground">
                      {item.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className="min-w-0 flex-1 border-b border-dotted border-border"
                    />
                    <span className="shrink-0 text-sm font-medium tracking-wide text-primary">
                      {item.price}
                    </span>
                  </div>
                  <p className="mt-1.5 pl-7 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={items.length * 60 + 60}>
            <a
              href={t("ctaHref")}
              className="mt-10 inline-flex w-fit items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {t("ctaLabel")}
            </a>
          </Reveal>
        </div>

        <Reveal delay={120} className="lg:col-span-2 lg:h-full">
          <SmartImage
            src={t("image")}
            alt={t("imageAlt")}
            className="aspect-[4/5] rounded-sm lg:aspect-auto lg:h-full lg:rounded-none"
          />
        </Reveal>
      </div>
    </section>
  );
}
