import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { Star } from "lucide-react";

type Review = {
  quote: string;
  name: string;
  company: string;
  avatar: string;
  avatarAlt: string;
  rating: number;
};

export function ReviewsListDenseRowAvatarStarsHover({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const reviews = t.raw("reviews") as Review[];

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
          {reviews.map((item, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <article className="group flex flex-col gap-5 px-2 py-7 transition-colors hover:bg-secondary sm:flex-row sm:items-center sm:gap-8 sm:px-4">
                  <div className="flex shrink-0 items-center gap-4 sm:w-52">
                    <SmartImage
                      src={item.avatar}
                      alt={item.avatarAlt}
                      className="aspect-square size-14 rounded-full"
                    />
                    <div>
                      <p className="font-display text-base text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.company}</p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex gap-0.5" aria-label={t("ratingLabel", { rating: item.rating })}>
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className={
                            starIndex < item.rating
                              ? "size-4 fill-primary text-primary"
                              : "size-4 fill-transparent text-muted-foreground/30"
                          }
                          strokeWidth={1.75}
                        />
                      ))}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-foreground sm:text-base">{item.quote}</p>
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
