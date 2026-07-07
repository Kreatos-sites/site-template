import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { Quote, Star } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  avatarAlt: string;
  rating: number;
};

export function TestimonialsCardsThreeColumnBlurStaggerRating({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const testimonials = t.raw("testimonials") as Testimonial[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 90}>
                <article className="relative flex h-full flex-col gap-6 overflow-hidden rounded-xl border border-border bg-card p-8">
                  <Quote
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-4 -right-4 size-24 rotate-6 text-primary/10 blur-[2px]"
                    strokeWidth={1}
                  />

                  <div
                    className="relative flex items-center gap-1"
                    aria-label={t("ratingLabel", { rating: item.rating })}
                  >
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={
                          starIndex < item.rating
                            ? "size-4 fill-primary text-primary"
                            : "size-4 fill-transparent text-muted-foreground"
                        }
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>

                  <p className="relative flex-1 text-base leading-relaxed text-foreground">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  <div className="relative flex items-center gap-3 border-t border-border pt-6">
                    <SmartImage src={item.avatar} alt={item.avatarAlt} className="aspect-square w-11 rounded-full" />
                    <div>
                      <p className="font-display text-sm text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    </div>
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
