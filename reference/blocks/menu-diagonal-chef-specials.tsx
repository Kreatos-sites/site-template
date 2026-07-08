import { useTranslations } from "next-intl";

import { SmartImage } from "@/components/shared/smart-image";
import { Reveal } from "@/components/shared/reveal";
import { ChefHat } from "lucide-react";

/**
 * BLOQUE: menu-diagonal-chef-specials — layout asimétrico con corte
 * diagonal: la fotografía del platillo del chef ocupa un bloque anguloso
 * (clip-path diagonal) que invade la columna de texto, con eyebrow, título,
 * descripción y precio flotando sobre fondo claro sólido. Un solo platillo
 * protagonista, tono editorial cálido. Úsalo para presentar el especial del
 * chef o el platillo insignia de un restaurante, hotel o servicio de banquetes.
 *
 * ns: {
 *   eyebrow, title, description, price, priceLabel,
 *   image, imageAlt, chefNote
 * }
 */
export function MenuDiagonalChefSpecials({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-0">
          <Reveal className="relative z-10 lg:col-span-6 lg:pr-12">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>

            <div className="mt-10 flex items-center gap-4 border-t border-border pt-6">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-sm bg-secondary text-primary">
                <ChefHat className="size-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t("chefNote")}
              </p>
            </div>

            <div className="mt-8 flex items-baseline gap-3">
              <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                {t("priceLabel")}
              </span>
              <span className="font-display text-3xl tracking-tight text-primary">
                {t("price")}
              </span>
            </div>
          </Reveal>

          <Reveal
            delay={80}
            className="relative lg:col-span-7 lg:-ml-24"
          >
            <div
              className="relative aspect-[4/5] w-full overflow-hidden rounded-sm sm:aspect-[16/11] lg:aspect-[4/5]"
              style={{
                clipPath:
                  "polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
            >
              <SmartImage
                src={t("image")}
                alt={t("imageAlt")}
                className="size-full"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
