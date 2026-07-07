import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { RiDoubleQuotesL } from "@remixicon/react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
};

type Featured = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
};

export function TestimonialsLedgerFeaturedPullQuote({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const featured = t.raw("featured") as Featured;
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

        <Reveal delay={60}>
          <figure className="mt-14 border border-border bg-card p-8 lg:p-12">
            <RiDoubleQuotesL className="size-8 text-primary" aria-hidden="true" />
            <blockquote className="mt-6">
              <p className="font-display text-2xl leading-snug text-balance text-foreground lg:text-3xl">
                {featured.quote}
              </p>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span
                className="flex size-12 shrink-0 items-center justify-center rounded-sm bg-primary text-sm font-medium text-primary-foreground"
                aria-hidden="true"
              >
                {featured.initials}
              </span>
              <span>
                <span className="block font-display text-base text-foreground">{featured.name}</span>
                <span className="block text-sm text-muted-foreground">
                  {featured.role} · {featured.company}
                </span>
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <ul className="mt-6 grid grid-cols-1 border-t border-l border-border sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <article className="flex h-full flex-col gap-5 border-r border-b border-border p-7">
                  <p className="flex-1 text-sm leading-relaxed text-foreground">{item.quote}</p>
                  <div className="flex items-center gap-3">
                    <span
                      className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-secondary text-xs font-medium text-secondary-foreground"
                      aria-hidden="true"
                    >
                      {item.initials}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-foreground">{item.name}</span>
                      <span className="block text-xs text-muted-foreground">
                        {item.role} · {item.company}
                      </span>
                    </span>
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
