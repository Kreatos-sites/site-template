import { useTranslations } from "next-intl";
import { GlassWater } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";

/**
 * BLOQUE: menu-pattern-bar-menu-dark — fondo bg-foreground oscuro con un
 * patrón sutil de líneas diagonales repetidas en baja opacidad (vía
 * repeating-linear-gradient sobre currentColor sin hex/paleta). Grid de
 * tarjetas compactas para carta de bar/coctelería: nombre, ingredientes
 * breves e ícono, con borde delgado semitransparente. Tono técnico, denso
 * y nocturno. Úsalo para la carta de cocteles de un bar o speakeasy.
 *
 * ns: {
 *   eyebrow, title, description,
 *   drinks: [{ name, ingredients, price }]
 * }
 */
type BarDrink = {
  name: string;
  ingredients: string;
  price: string;
};

export function MenuPatternBarMenuDark({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const drinks = t.raw("drinks") as BarDrink[];

  return (
    <section className="relative overflow-hidden border-t border-border bg-foreground py-(--section-gap)">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-background opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 1px, transparent 14px)",
        }}
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-background/65">
            {t("description")}
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {drinks.map((drink, i) => (
            <li key={i}>
              <Reveal delay={i * 60}>
                <div className="flex h-full flex-col gap-4 rounded-sm border border-background/15 bg-background/[0.03] p-6">
                  <div className="flex items-start justify-between gap-3">
                    <GlassWater
                      className="size-5 shrink-0 text-primary"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <span className="shrink-0 text-sm font-medium tracking-wide text-primary">
                      {drink.price}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg tracking-tight text-background">
                      {drink.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-background/60">
                      {drink.ingredients}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
