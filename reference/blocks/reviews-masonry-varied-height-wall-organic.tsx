import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";

type Review = {
  quote: string;
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  rating: number;
  size: "sm" | "md" | "lg";
};

const ROW_SPAN: Record<Review["size"], string> = {
  sm: "lg:row-span-4",
  md: "lg:row-span-5",
  lg: "lg:row-span-6",
};

/**
 * Muro de reseñas tipo masonry con altura orgánica: cada tarjeta ocupa un
 * número distinto de filas de una grid densa (sm/md/lg) según el tamaño de
 * la cita, generando un acomodo irregular de bloques con avatar, nombre,
 * rol y calificación en estrellas. Pensado para negocios con volumen real
 * de clientes (restaurantes, clínicas, estudios) que quieren mostrar
 * muchas voces distintas de un vistazo.
 */
export function ReviewsMasonryVariedHeightWallOrganic({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const reviews = t.raw("reviews") as Review[];

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
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[minmax(0,1fr)] lg:[grid-auto-flow:dense]">
          {reviews.map((item, index) => (
            <li key={item.name} className={cn("contents")}>
              <Reveal
                delay={index * 60}
                className={cn("h-full", ROW_SPAN[item.size])}
              >
                <figure className="flex h-full flex-col gap-6 rounded-lg border border-border bg-card p-7">
                  <div
                    className="flex items-center gap-0.5"
                    aria-hidden="true"
                  >
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={cn(
                          "size-3.5",
                          starIndex < item.rating
                            ? "fill-primary text-primary"
                            : "fill-transparent text-muted-foreground",
                        )}
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                  <blockquote className="flex-1 text-sm leading-relaxed text-secondary-foreground text-balance">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-3 border-t border-border pt-5">
                    <SmartImage
                      src={item.image}
                      alt={item.imageAlt}
                      className="size-10 shrink-0 rounded-full"
                    />
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {item.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.role}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
