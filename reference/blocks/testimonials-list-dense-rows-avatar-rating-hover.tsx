import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { Star, BadgeCheck } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  avatarAlt: string;
  rating: number;
  verified: boolean;
};

export function TestimonialsListDenseRowsAvatarRatingHover({ ns }: { ns: string }) {
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

        <ul className="mt-14 grid grid-cols-1 divide-y divide-border border-y border-border md:grid-cols-2 md:divide-y-0">
          {testimonials.map((item, i) => (
            <li
              key={i}
              className={
                i % 2 === 0
                  ? "border-border md:border-r md:border-b"
                  : "border-border md:border-b"
              }
            >
              <Reveal delay={i * 60}>
                <article className="group relative flex items-start gap-4 overflow-hidden px-2 py-7 transition-colors sm:px-4">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-secondary/60 transition-transform duration-500 ease-out group-hover:translate-x-0"
                  />
                  <SmartImage
                    src={item.avatar}
                    alt={item.avatarAlt}
                    className="relative aspect-square size-12 shrink-0 rounded-full"
                  />
                  <div className="relative min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5">
                        <p className="truncate font-display text-base text-foreground">{item.name}</p>
                        {item.verified ? (
                          <BadgeCheck
                            aria-label={t("verifiedLabel")}
                            className="size-4 shrink-0 text-primary"
                          />
                        ) : null}
                      </div>
                      <div
                        className="flex shrink-0 gap-0.5"
                        role="img"
                        aria-label={t("ratingLabel", { rating: item.rating })}
                      >
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            className={
                              starIndex < item.rating
                                ? "size-3.5 fill-primary text-primary"
                                : "size-3.5 text-muted-foreground/30"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground">{item.quote}</p>
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
