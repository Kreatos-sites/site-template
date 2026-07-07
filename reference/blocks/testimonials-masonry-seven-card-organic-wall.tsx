import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  avatarAlt: string;
  emphasis?: boolean;
};

export function TestimonialsMasonrySevenCardOrganicWall({ ns }: { ns: string }) {
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

        <div className="mt-16 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {testimonials.map((item, i) => (
            <div key={i} className="mb-5 break-inside-avoid">
              <Reveal delay={i * 60}>
                <figure
                  className={cn(
                    "flex flex-col gap-5 rounded-sm border border-border p-7",
                    item.emphasis ? "bg-primary/5" : "bg-card",
                  )}
                >
                  <Quote className="size-5 text-primary" aria-hidden="true" />
                  <blockquote
                    className={cn(
                      "leading-relaxed text-foreground",
                      item.emphasis ? "text-lg" : "text-sm",
                    )}
                  >
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-3 border-t border-border pt-4">
                    <SmartImage
                      src={item.avatar}
                      alt={item.avatarAlt}
                      className="aspect-square w-10 shrink-0 rounded-full"
                    />
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
