import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";

export function CalloutQuote({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  const rawAttribution = t.raw("attribution") as unknown;
  const attribution =
    typeof rawAttribution === "string" && rawAttribution.trim().length > 0
      ? rawAttribution
      : null;

  return (
    <section className="py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <figure className="relative mx-auto max-w-4xl">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-8 -left-2 select-none font-display text-[clamp(4rem,12vw,9rem)] leading-none text-primary/15 lg:-left-10"
            >
              &ldquo;
            </span>

            <blockquote className="relative border-l-4 border-primary pl-6 lg:pl-10">
              <p className="font-display text-[clamp(1.6rem,3.4vw,2.9rem)] leading-[1.15] tracking-tight text-balance text-foreground">
                {t("text")}
              </p>

              {attribution ? (
                <figcaption className="mt-8 flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-10 bg-primary/70"
                  />
                  <cite className="text-sm font-medium tracking-[0.15em] text-muted-foreground uppercase not-italic">
                    {attribution}
                  </cite>
                </figcaption>
              ) : null}
            </blockquote>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
