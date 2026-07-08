import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { ArrowRight, Quote } from "lucide-react";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

export function HeroSplitTestimonialLogoStrip({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const testimonial = t.raw("testimonial") as Testimonial;
  const logos = t.raw("logos") as string[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Columna texto */}
          <div className="lg:col-span-6">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h1 className="mt-5 font-display text-[clamp(2.25rem,1.4rem+3.6vw,3.75rem)] leading-[1.03] tracking-tight text-balance text-foreground">
                {t("title")}
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
                {t("subtitle")}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={t("primaryCta.href")}
                  className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {t("primaryCta.label")}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={t("secondaryCta.href")}
                  className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {t("secondaryCta.label")}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Columna tarjeta apilada: testimonio + tira de logos */}
          <div className="lg:col-span-6">
            <Reveal delay={80}>
              <div className="overflow-hidden rounded-sm border border-border bg-card shadow-sm">
                <div className="p-8 sm:p-10">
                  <Quote
                    className="size-8 text-primary/40"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <p className="mt-5 font-display text-xl leading-snug text-balance text-foreground sm:text-2xl">
                    {testimonial.quote}
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <span
                      className="flex size-10 items-center justify-center rounded-full bg-secondary text-sm font-medium text-foreground"
                      aria-hidden="true"
                    >
                      {testimonial.author.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role} · {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border bg-secondary/40 px-8 py-6 sm:px-10">
                  <p className="text-[0.65rem] font-medium tracking-[0.2em] text-muted-foreground uppercase">
                    {t("logoStripLabel")}
                  </p>
                  <ul className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
                    {logos.map((logo) => (
                      <li
                        key={logo}
                        className="font-display text-sm tracking-tight text-muted-foreground"
                      >
                        {logo}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
