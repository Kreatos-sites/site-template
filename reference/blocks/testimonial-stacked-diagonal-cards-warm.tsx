import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  avatarAlt: string;
};

const ROTATION_BY_POSITION = ["-rotate-2", "rotate-2", "-rotate-1", "rotate-3"];
const OFFSET_BY_POSITION = ["lg:mt-0", "lg:mt-16", "lg:mt-6", "lg:mt-24"];

export function TestimonialStackedDiagonalCardsWarm({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const testimonials = t.raw("testimonials") as Testimonial[];

  return (
    <section className="relative overflow-hidden border-t border-border bg-secondary py-(--section-gap)">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/15"
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 items-start gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((item, i) => (
            <li key={i} className={cn(OFFSET_BY_POSITION[i % OFFSET_BY_POSITION.length])}>
              <Reveal delay={i * 90}>
                <article
                  className={cn(
                    "relative flex flex-col gap-5 rounded-sm border border-border bg-card p-6 shadow-sm transition-transform duration-300 hover:rotate-0 hover:scale-[1.02]",
                    ROTATION_BY_POSITION[i % ROTATION_BY_POSITION.length],
                  )}
                >
                  <Quote aria-hidden="true" className="size-6 text-primary/50" strokeWidth={1.5} />
                  <p className="text-sm leading-relaxed text-foreground">&ldquo;{item.quote}&rdquo;</p>
                  <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
                    <SmartImage
                      src={item.avatar}
                      alt={item.avatarAlt}
                      className="aspect-square w-9 rounded-full border border-border"
                    />
                    <div>
                      <p className="font-display text-sm text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
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
