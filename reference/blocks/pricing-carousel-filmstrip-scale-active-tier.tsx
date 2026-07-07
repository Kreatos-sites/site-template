import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

type Tier = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

export function PricingCarouselFilmstripScaleActiveTier({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const tiers = t.raw("tiers") as Tier[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">{t("description")}</p>
        </Reveal>

        <div className="mt-14 -mx-6 px-6 lg:mx-0 lg:px-0">
          <ul
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 [-ms-overflow-style:none] [scrollbar-width:none] lg:justify-center [&::-webkit-scrollbar]:hidden"
          >
            {tiers.map((tier, i) => (
              <li key={i} className="shrink-0 snap-center">
                <Reveal delay={i * 60}>
                  <article
                    className={cn(
                      "flex h-full w-[280px] flex-col rounded-lg border p-8 transition-transform sm:w-[320px]",
                      tier.highlighted
                        ? "scale-105 border-primary bg-card shadow-lg"
                        : "scale-95 border-border bg-card opacity-80",
                    )}
                  >
                    {tier.highlighted ? (
                      <span className="mb-4 inline-flex w-fit items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        {t("highlightedLabel")}
                      </span>
                    ) : null}
                    <h3 className="font-display text-xl text-foreground">{tier.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tier.description}</p>
                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="font-display text-4xl text-foreground">{tier.price}</span>
                      <span className="text-sm text-muted-foreground">{tier.period}</span>
                    </div>
                    <ul className="mt-6 flex flex-1 flex-col gap-3">
                      {tier.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-foreground">
                          <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#contacto"
                      className={cn(
                        "mt-8 inline-flex items-center justify-center rounded-sm px-5 py-3 text-sm font-medium transition-colors",
                        tier.highlighted
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "border border-border text-foreground hover:bg-secondary",
                      )}
                    >
                      {tier.cta}
                    </a>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
