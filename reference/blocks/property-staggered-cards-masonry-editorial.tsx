import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

type Property = {
  image: string;
  imageAlt: string;
  title: string;
  location: string;
};

/** Desfase vertical por tarjeta (traslada la columna en desktop) para lograr
 * el escalonado editorial: columnas impares bajan, pares se mantienen. */
const OFFSETS = ["lg:translate-y-0", "lg:translate-y-16", "lg:translate-y-8", "lg:translate-y-24"];

/** Relación de aspecto por tarjeta: alterna retrato alto y medio para el
 * ritmo de mosaico asimétrico. */
const ASPECTS = ["aspect-[3/4]", "aspect-[4/5]", "aspect-square", "aspect-[3/4]"];

export function PropertyStaggeredCardsMasonryEditorial({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const properties = t.raw("properties") as Property[];

  return (
    <section className="border-t border-border bg-secondary py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          {t.has("description") ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{t("description")}</p>
          ) : null}
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {properties.map((property, i) => (
            <li key={i} className={cn("flex", OFFSETS[i % OFFSETS.length])}>
              <Reveal delay={i * 70} className="w-full">
                <article className="group relative isolate w-full overflow-hidden rounded-sm bg-card shadow-sm">
                  <SmartImage
                    src={property.image}
                    alt={property.imageAlt}
                    className={cn(
                      "transition-transform duration-500 ease-out group-hover:scale-[1.04]",
                      ASPECTS[i % ASPECTS.length],
                    )}
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
                    <h3 className="font-display text-lg leading-snug text-background">{property.title}</h3>
                    <p className="flex items-center gap-1.5 text-xs text-background/80">
                      <MapPin className="size-3.5 shrink-0 text-background" strokeWidth={1.75} aria-hidden="true" />
                      {property.location}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
