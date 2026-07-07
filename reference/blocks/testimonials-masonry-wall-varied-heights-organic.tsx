import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";
import { StarIcon, QuotesIcon } from "@phosphor-icons/react/dist/ssr";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  avatar: string;
  avatarAlt: string;
  featured?: boolean;
};

export function TestimonialsMasonryWallVariedHeightsOrganic({ ns }: { ns: string }) {
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

        <div className="mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {testimonials.map((item, i) => (
            <div key={i} className="mb-6 break-inside-avoid">
              <Reveal delay={i * 60}>
                <figure
                  className={cn(
                    "flex flex-col gap-6 rounded-sm border border-border p-8",
                    item.featured ? "bg-primary/5" : "bg-card",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <QuotesIcon className="size-6 text-primary" weight="fill" aria-hidden="true" />
                    <div className="flex gap-0.5" role="img" aria-label={t("ratingLabel", { rating: item.rating })}>
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <StarIcon
                          key={starIndex}
                          className={cn(
                            "size-3.5",
                            starIndex < item.rating ? "text-primary" : "text-muted-foreground/30",
                          )}
                          weight="fill"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-base leading-relaxed text-foreground">{item.quote}</blockquote>
                  <figcaption className="mt-auto flex items-center gap-3 border-t border-border pt-5">
                    <SmartImage
                      src={item.avatar}
                      alt={item.avatarAlt}
                      className="aspect-square w-11 shrink-0 rounded-full"
                    />
                    <span>
                      <span className="block text-sm font-medium text-foreground">{item.name}</span>
                      <span className="block text-xs text-muted-foreground">
                        {item.role} · {item.company}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
