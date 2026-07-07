import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";

type Review = {
  quote: string;
  name: string;
  role: string;
  monogram: string;
};

export function ReviewsLedgerFeaturedMonogramGrid({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const featured = t.raw("featured") as Review;
  const reviews = t.raw("reviews") as Review[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={60}>
          <blockquote className="mt-12 border border-border bg-card p-8 md:p-12">
            <p className="font-display text-xl leading-snug tracking-tight text-balance text-foreground md:text-2xl">
              &ldquo;{featured.quote}&rdquo;
            </p>
            <footer className="mt-8 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-primary font-mono text-xs text-primary-foreground"
              >
                {featured.monogram}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium tracking-tight text-foreground">
                  {featured.name}
                </p>
                <p className="text-xs text-muted-foreground">{featured.role}</p>
              </div>
            </footer>
          </blockquote>
        </Reveal>

        <ul className="mt-px grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <li key={index} className="contents">
              <Reveal delay={index * 60}>
                <article className="flex h-full flex-col justify-between gap-6 bg-background p-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex size-8 shrink-0 items-center justify-center rounded-sm border border-border font-mono text-xs text-foreground"
                    >
                      {review.monogram}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium tracking-tight text-foreground">
                        {review.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{review.role}</p>
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
