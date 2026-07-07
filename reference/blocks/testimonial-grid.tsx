import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

type Testimonial = { quote: string; author: string; role: string };

/**
 * Mosaico de reseñas reales (2-3) como quote-cards de borde fino. Distinto
 * del pull-quote único: aquí la prueba social es plural y comparable. Las
 * citas deben ser verificables — nunca inventar. Composición asimétrica: la
 * primera card ancla la columna izquierda a lo alto, el resto se apila al
 * lado para romper el grid de tarjetas iguales.
 */
export function TestimonialGrid({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const testimonials = t.raw("testimonials") as Testimonial[];

  return (
    <section className="border-t border-border py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex max-w-2xl flex-col gap-4">
            <span className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </span>
            <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-12">
          {testimonials.map((item, index) => (
            <Reveal
              key={item.author}
              delay={index * 60}
              className={
                index === 0
                  ? "md:row-span-2 lg:col-span-5"
                  : "lg:col-span-7"
              }
            >
              <figure className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-8 lg:p-10">
                <Quote
                  className="size-9 text-primary/40"
                  aria-hidden="true"
                />
                <blockquote className="mt-6 flex-1 text-[clamp(1.05rem,1.6vw,1.35rem)] leading-relaxed text-secondary-foreground text-balance">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                  <span
                    className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-base font-semibold text-primary"
                    aria-hidden="true"
                  >
                    {item.author.charAt(0)}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-medium text-foreground">
                      {item.author}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {item.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
