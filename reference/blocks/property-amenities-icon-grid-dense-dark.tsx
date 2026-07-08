import { useTranslations } from "next-intl";
import {
  Waves,
  Dumbbell,
  Laptop,
  ShieldCheck,
  Car,
  TreePine,
  Baby,
  Utensils,
} from "lucide-react";

import { Reveal } from "@/components/shared/reveal";

const ICONS = [Waves, Dumbbell, Laptop, ShieldCheck, Car, TreePine, Baby, Utensils];

/**
 * Grid denso de 6-8 columnas de amenidades, cada celda con ícono + etiqueta
 * corta y un número de catálogo monoespaciado. Fondo bg-foreground sólido
 * oscuro, sin imágenes, líneas divisorias sutiles: motivo de ficha técnica
 * / catálogo de especificaciones para transmitir el inventario completo de
 * amenidades del desarrollo inmobiliario de un vistazo.
 */
export function PropertyAmenitiesIconGridDenseDark({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  type Amenity = { label: string };
  const amenities = t.raw("amenities") as Amenity[];

  return (
    <section className="border-t border-border bg-foreground py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
            {t("title")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-background/70">
            {t("description")}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <ul className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-background/15 bg-background/15 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {amenities.map((amenity, index) => {
              const Icon = ICONS[index % ICONS.length];
              return (
                <li key={index} className="contents">
                  <div className="flex flex-col items-start gap-4 bg-foreground px-4 py-5">
                    <div className="flex w-full items-center justify-between">
                      <Icon
                        className="size-5 text-primary"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <span className="font-mono text-[0.65rem] tracking-[0.05em] text-background/40 tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="text-xs leading-tight tracking-[0.02em] text-background/80">
                      {amenity.label}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
