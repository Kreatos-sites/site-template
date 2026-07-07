import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { RiDoubleQuotesL } from "@remixicon/react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export function TestimonialsMasonryVariedHeights({ ns }: { ns: string }) {
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
                <figure className="flex flex-col gap-6 rounded-sm border border-border bg-card p-8">
                  <RiDoubleQuotesL className="size-6 text-primary" aria-hidden="true" />
                  <blockquote className="text-base leading-relaxed text-foreground">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-3 border-t border-border pt-5">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
                      {item.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-foreground">{item.name}</span>
                      <span className="block text-xs text-muted-foreground">{item.role}</span>
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
