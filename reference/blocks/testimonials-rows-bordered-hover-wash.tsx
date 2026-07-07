import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { StarIcon } from "@phosphor-icons/react/dist/ssr";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  avatarAlt: string;
  rating: number;
};

export function TestimonialsRowsBorderedHoverWash({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as Testimonial[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <ul className="mt-14 divide-y divide-border border-y border-border">
          {items.map((item, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <article className="group relative flex flex-col gap-5 overflow-hidden px-2 py-8 transition-colors sm:flex-row sm:items-start sm:gap-8 sm:px-4">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-secondary/60 transition-transform duration-500 ease-out group-hover:translate-x-0"
                  />
                  <div className="relative flex shrink-0 items-center gap-4 sm:w-56 sm:flex-col sm:items-start sm:gap-3">
                    <SmartImage
                      src={item.avatar}
                      alt={item.avatarAlt}
                      className="aspect-square w-12 rounded-full sm:w-14"
                    />
                    <div>
                      <p className="font-display text-base text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.role}</p>
                    </div>
                  </div>

                  <div className="relative flex-1">
                    <div className="flex gap-0.5" role="img" aria-label={t("ratingLabel", { rating: item.rating })}>
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <StarIcon
                          key={starIndex}
                          weight={starIndex < item.rating ? "fill" : "regular"}
                          className="size-4 text-primary"
                        />
                      ))}
                    </div>
                    <p className="mt-4 text-base leading-relaxed text-foreground">{item.quote}</p>
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
