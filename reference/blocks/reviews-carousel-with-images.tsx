import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { Star } from "lucide-react";

type Review = {
  quote: string;
  rating: number;
  authorName: string;
  authorRole: string;
  authorImage: string;
  authorImageAlt: string;
};

/**
 * Carrusel de reseñas con fotos de autor y calificación en estrellas, para
 * navegación visual de testimonios (scroll-snap nativo, sin JS de cliente).
 */
export function ReviewsCarouselWithImages({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const reviews = t.raw("reviews") as Review[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <ul
            className="mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="list"
          >
            {reviews.map((review, index) => (
              <li
                key={index}
                className="flex w-[19rem] shrink-0 snap-start flex-col overflow-hidden rounded-lg border border-border bg-card sm:w-[21rem]"
              >
                <SmartImage
                  src={review.authorImage}
                  alt={review.authorImageAlt}
                  className="aspect-[4/3] rounded-none"
                />
                <div className="flex flex-1 flex-col gap-4 p-7">
                  <div
                    className="flex items-center gap-1"
                    aria-label={t("ratingLabel", { rating: review.rating })}
                  >
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={
                          starIndex < review.rating
                            ? "size-4 fill-primary text-primary"
                            : "size-4 text-border"
                        }
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote className="flex-1 text-sm leading-relaxed text-secondary-foreground">
                    {review.quote}
                  </blockquote>
                  <figcaption className="flex flex-col border-t border-border pt-4">
                    <span className="font-medium text-foreground">
                      {review.authorName}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {review.authorRole}
                    </span>
                  </figcaption>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
