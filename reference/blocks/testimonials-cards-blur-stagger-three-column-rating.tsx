import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { RiStarFill, RiStarLine } from "@remixicon/react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  avatarAlt: string;
  rating: number;
};

export function TestimonialsCardsBlurStaggerThreeColumnRating({ ns }: { ns: string }) {
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

        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 70}>
                <article className="flex h-full flex-col gap-4 rounded-md border border-border bg-card/70 p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <SmartImage src={item.avatar} alt={item.avatarAlt} className="aspect-square w-9 rounded-full" />
                    <div className="min-w-0">
                      <p className="truncate font-display text-sm text-foreground">{item.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{item.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5" aria-label={t("ratingLabel", { rating: item.rating })}>
                    {Array.from({ length: 5 }).map((_, starIndex) =>
                      starIndex < item.rating ? (
                        <RiStarFill key={starIndex} className="size-3.5 text-primary" />
                      ) : (
                        <RiStarLine key={starIndex} className="size-3.5 text-muted-foreground" />
                      ),
                    )}
                  </div>

                  <p className="flex-1 text-sm leading-relaxed text-foreground">&ldquo;{item.quote}&rdquo;</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
