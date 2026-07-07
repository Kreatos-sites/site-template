import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { RiDoubleQuotesL } from "@remixicon/react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  avatarAlt: string;
  logo: string;
  logoAlt: string;
};

export function TestimonialOversizedQuoteAvatarLogo({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const testimonial = t.raw("testimonial") as Testimonial;

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <figure className="mt-10 flex flex-col items-center gap-10 text-center">
            <RiDoubleQuotesL
              className="size-14 text-primary/30"
              aria-hidden="true"
            />

            <blockquote className="max-w-4xl">
              <p className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.2] tracking-tight text-balance text-foreground">
                {testimonial.quote}
              </p>
            </blockquote>

            <figcaption className="flex flex-col items-center gap-5">
              <SmartImage
                src={testimonial.avatar}
                alt={testimonial.avatarAlt}
                className="size-20 rounded-full"
              />
              <div>
                <p className="font-display text-lg text-foreground">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
              <SmartImage
                src={testimonial.logo}
                alt={testimonial.logoAlt}
                className="mt-2 h-8 w-32 rounded-none"
              />
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
