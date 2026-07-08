import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

type Testimonial = {
  image: string;
  imageAlt: string;
  quote: string;
  name: string;
  role: string;
  tenure: string;
};

const OFFSET_BY_POSITION = ["lg:mt-0", "lg:mt-12", "lg:mt-24"];

export function CareersEmployeeTestimonialsStaggeredCards({ ns }: { ns: string }) {
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

        <ul className="mt-16 grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, i) => (
            <li key={i} className={cn("contents")}>
              <Reveal delay={i * 90}>
                <article className={cn("flex flex-col gap-6", OFFSET_BY_POSITION[i % 3])}>
                  <SmartImage src={item.image} alt={item.imageAlt} className="aspect-square w-full rounded-sm" />

                  <div className="relative rounded-sm border border-border bg-card p-6">
                    <Quote
                      aria-hidden="true"
                      className="mb-3 size-6 text-primary/40"
                      strokeWidth={1.5}
                    />
                    <p className="text-sm leading-relaxed text-foreground">&ldquo;{item.quote}&rdquo;</p>
                    <div className="mt-6 border-t border-border pt-4">
                      <p className="font-display text-sm text-foreground">{item.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.role} · {item.tenure}
                      </p>
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
