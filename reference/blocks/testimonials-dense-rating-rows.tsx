import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { RiStarFill } from "@remixicon/react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  avatarAlt: string;
  rating: number;
};

export function TestimonialsDenseRatingRows({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const testimonials = t.raw("testimonials") as Testimonial[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <ul className="mt-16 divide-y divide-border border-y border-border">
          {testimonials.map((item, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <article className="group flex flex-col gap-6 py-8 transition-colors hover:bg-secondary sm:flex-row sm:items-center sm:gap-10">
                  <div className="flex shrink-0 items-center gap-4 sm:w-56">
                    <SmartImage
                      src={item.avatar}
                      alt={item.avatarAlt}
                      className="aspect-square size-14 rounded-full"
                    />
                    <div>
                      <p className="font-display text-base text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.role}</p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex gap-0.5" aria-label={t("ratingLabel", { rating: item.rating })}>
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <RiStarFill
                          key={starIndex}
                          className={
                            starIndex < item.rating
                              ? "size-4 text-primary"
                              : "size-4 text-muted-foreground/30"
                          }
                        />
                      ))}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-foreground sm:text-base">
                      {item.quote}
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
