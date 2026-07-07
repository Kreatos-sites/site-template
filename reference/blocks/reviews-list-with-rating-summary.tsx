import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { BadgeCheck, Star } from "lucide-react";

type RatingBreakdown = {
  stars: number;
  percentage: number;
};

type Review = {
  author: string;
  role: string;
  date: string;
  rating: number;
  comment: string;
  verified: boolean;
};

export function ReviewsListWithRatingSummary({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const breakdown = t.raw("breakdown") as RatingBreakdown[];
  const reviews = t.raw("reviews") as Review[];
  const average = t("average");
  const totalCount = t("totalCount");

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

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <div className="rounded-sm border border-border bg-card p-8">
                <p className="font-display text-6xl leading-none tracking-tight text-foreground">
                  {average}
                </p>
                <div
                  className="mt-4 flex items-center gap-1"
                  aria-hidden="true"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "size-4",
                        i < Math.round(Number(average))
                          ? "fill-primary text-primary"
                          : "fill-transparent text-muted-foreground/40",
                      )}
                      strokeWidth={1.75}
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {t("summaryLabel", { count: totalCount })}
                </p>

                <div className="mt-8 flex flex-col gap-3">
                  {breakdown.map((row, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-3 text-xs font-medium tabular-nums text-muted-foreground">
                        {row.stars}
                      </span>
                      <Star
                        className="size-3 shrink-0 fill-primary text-primary"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${row.percentage}%` }}
                        />
                      </div>
                      <span className="w-9 text-right text-xs tabular-nums text-muted-foreground">
                        {row.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <ul className="flex flex-col gap-px overflow-hidden rounded-sm border border-border bg-border">
            {reviews.map((review, i) => (
              <li key={i} className="contents">
                <Reveal delay={i * 60}>
                  <article className="flex flex-col gap-4 bg-card p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-display text-lg text-foreground">
                            {review.author}
                          </h3>
                          {review.verified && (
                            <span
                              className="inline-flex items-center gap-1 text-xs font-medium text-primary"
                              title={t("verifiedLabel")}
                            >
                              <BadgeCheck
                                className="size-3.5"
                                strokeWidth={1.75}
                                aria-hidden="true"
                              />
                              {t("verifiedLabel")}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {review.role}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div
                          className="flex items-center gap-0.5"
                          aria-hidden="true"
                        >
                          {Array.from({ length: 5 }).map((_, s) => (
                            <Star
                              key={s}
                              className={cn(
                                "size-3.5",
                                s < review.rating
                                  ? "fill-primary text-primary"
                                  : "fill-transparent text-muted-foreground/40",
                              )}
                              strokeWidth={1.75}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {review.date}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {review.comment}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
