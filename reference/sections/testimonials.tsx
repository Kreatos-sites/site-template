import { ArrowUpRight, Star } from "lucide-react";
import { useTranslations } from "next-intl";

import { GoogleRatingBadge } from "@/components/shared/google-rating-badge";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import type { SectionOf } from "@/lib/config";
import config from "@/site.config";

type Testimonial = { quote: string; author: string; role: string };

/**
 * Reseñas de Google. Las citas deben ser verificables en la ficha real del
 * negocio: sin `business.maps` la sección no renderiza (no hay ficha que
 * respalde las citas — recórtala del spec en ese caso).
 */
export function Testimonials({ count, ns }: SectionOf<"testimonials">) {
  const t = useTranslations(ns ?? "testimonials");
  const tCommon = useTranslations("common");
  const allItems = t.raw("items") as Testimonial[];
  const items = count ? allItems.slice(0, count) : allItems;
  const maps = config.business.maps;
  if (!maps) return null;
  const { uri, reviewsCount } = maps;

  return (
    <section id="opiniones" className="border-t border-border py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
            <GoogleRatingBadge className="lg:pb-1" />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {items.map((item, index) => (
            <Reveal key={item.author} delay={index * 60}>
              <figure className="flex h-full flex-col border-t border-border pt-6">
                <div
                  className="flex gap-0.5 text-primary"
                  role="img"
                  aria-label={tCommon("ratingOutOfFive", { rating: maps.rating.toFixed(1) })}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 text-[1.05rem] leading-relaxed text-foreground">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6">
                  <p className="font-medium">{item.author}</p>
                  <p className="text-sm text-muted-foreground">{item.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <a
            href={uri}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-12 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            {t("viewAll", { count: reviewsCount })}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
