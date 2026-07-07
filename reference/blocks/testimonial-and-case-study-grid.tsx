import { Quote, TrendingUp, Clock, Users, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

type Testimonial = { quote: string; author: string; role: string };
type CaseStudy = { icon: string; stat: string; label: string; description: string };

const ICONS: Record<string, LucideIcon> = {
  trendingup: TrendingUp,
  clock: Clock,
  users: Users,
};

/**
 * Sección híbrida: arriba, 2-3 testimonios reales en layout de 2 columnas
 * (quote-cards); abajo, un grid de 3 case studies con stat destacado. Sirve
 * para combinar prueba social cualitativa (la cita) con prueba cuantitativa
 * (el resultado medible) en una sola sección de cierre de confianza.
 */
export function TestimonialAndCaseStudyGrid({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const testimonials = t.raw("testimonials") as Testimonial[];
  const caseStudies = t.raw("caseStudies") as CaseStudy[];

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

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((item, index) => (
            <Reveal key={item.author} delay={index * 60}>
              <figure className="flex h-full flex-col justify-between gap-8 rounded-lg border border-border bg-card p-8 lg:p-10">
                <Quote className="size-8 text-primary/40" aria-hidden="true" />
                <blockquote className="flex-1 text-[clamp(1.05rem,1.6vw,1.25rem)] leading-relaxed text-secondary-foreground text-balance">
                  {item.quote}
                </blockquote>
                <figcaption className="flex items-center gap-4 border-t border-border pt-6">
                  <span
                    className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-base font-semibold text-primary"
                    aria-hidden="true"
                  >
                    {item.author.charAt(0)}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-medium text-foreground">{item.author}</span>
                    <span className="text-sm text-muted-foreground">{item.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
          {caseStudies.map((item, index) => {
            const Icon = ICONS[item.icon] ?? TrendingUp;
            return (
              <li key={item.label} className="contents">
                <Reveal delay={index * 60}>
                  <article className="flex h-full flex-col gap-5 bg-card p-8">
                    <Icon className="size-5 text-primary" strokeWidth={1.75} aria-hidden="true" />
                    <div>
                      <p className="font-display text-4xl tracking-tight text-foreground">
                        {item.stat}
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground">{item.label}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
