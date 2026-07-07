import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
};

export function TestimonialsCarouselFramedAutoAdvanceSelectorBlur({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const testimonials = t.raw("items") as Testimonial[];
  const count = testimonials.length;
  const step = 6;
  const total = step * count;
  const windowPct = 100 / count;
  const rampIn = windowPct * 0.15;
  const holdEnd = windowPct * 0.85;

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="relative mx-auto mt-16 max-w-3xl">
            <div className="relative min-h-[22rem] overflow-hidden rounded-lg border border-border bg-card sm:min-h-[18rem]">
              {testimonials.map((item, i) => (
                <blockquote
                  key={i}
                  data-testimonial-quote
                  className="absolute inset-0 flex flex-col justify-center gap-6 p-8 opacity-0 sm:p-12"
                  style={{
                    animation: `testimonial-cycle-fade ${total}s ease-in-out infinite`,
                    animationDelay: `${-i * step}s`,
                  }}
                >
                  <p className="font-display text-xl leading-relaxed text-balance text-foreground sm:text-2xl">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <footer className="flex items-center gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
                      {item.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.role} · {item.company}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {testimonials.map((item, i) => (
                <span
                  key={i}
                  data-testimonial-chip
                  className={cn(
                    "rounded-md border border-border px-4 py-2 text-sm text-muted-foreground transition-colors",
                  )}
                  style={{
                    animation: `testimonial-cycle-chip ${total}s ease-in-out infinite`,
                    animationDelay: `${-i * step}s`,
                  }}
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes testimonial-cycle-fade {
          0% { opacity: 0; filter: blur(10px); }
          ${rampIn}% { opacity: 1; filter: blur(0); }
          ${holdEnd}% { opacity: 1; filter: blur(0); }
          ${windowPct}% { opacity: 0; filter: blur(10px); }
          100% { opacity: 0; filter: blur(10px); }
        }
        @keyframes testimonial-cycle-chip {
          0% { border-color: var(--border); color: var(--muted-foreground); background-color: transparent; }
          ${rampIn}% { border-color: var(--primary); color: var(--primary-foreground); background-color: var(--primary); }
          ${holdEnd}% { border-color: var(--primary); color: var(--primary-foreground); background-color: var(--primary); }
          ${windowPct}% { border-color: var(--border); color: var(--muted-foreground); background-color: transparent; }
          100% { border-color: var(--border); color: var(--muted-foreground); background-color: transparent; }
        }
      `}</style>
    </section>
  );
}
