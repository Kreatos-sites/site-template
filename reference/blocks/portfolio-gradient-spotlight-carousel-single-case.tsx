import { useTranslations } from "next-intl";
import { ArrowUpRight, TrendingUp } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * BLOQUE: portfolio-gradient-spotlight-carousel-single-case — un solo caso
 * de estudio a la vez, a pantalla completa, sobre un gradiente del color
 * primary (oscuro a saturado). La cifra de resultado flota gigante sobre la
 * imagen (baja opacidad, mix-blend) y unos puntos selectores rotan entre
 * proyectos. La rotación es 100% CSS: radios nativos ocultos + selector
 * :has() en el contenedor, sin JS de cliente.
 *
 * ns esperado:
 *   { eyebrow: string, title: string,
 *     cases: [{ image: string, imageAlt: string, title: string, client: string,
 *               stat: string, statLabel: string, description: string }] }
 */
type CaseItem = {
  image: string;
  imageAlt: string;
  title: string;
  client: string;
  stat: string;
  statLabel: string;
  description: string;
};

export function PortfolioGradientSpotlightCarouselSingleCase({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const cases = t.raw("cases") as CaseItem[];
  const idPrefix = ns.replace(/[^a-zA-Z0-9]/g, "-");

  const styleRules = cases
    .map(
      (_, i) => `
        .pgs-${idPrefix}:has(#${idPrefix}-c-${i}:checked) .pgs-panel-${i} {
          display: flex;
        }
        .pgs-${idPrefix}:has(#${idPrefix}-c-${i}:checked) .pgs-image-${i} {
          display: block;
        }
        .pgs-${idPrefix}:has(#${idPrefix}-c-${i}:checked) .pgs-dot-${i} {
          background-color: var(--background);
          width: 2rem;
        }
      `,
    )
    .join("");

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div
            className={`pgs-${idPrefix} relative mt-16 overflow-hidden rounded-lg border border-border bg-gradient-to-br from-foreground via-primary to-primary`}
          >
            {cases.map((_, i) => (
              <input
                key={i}
                type="radio"
                id={`${idPrefix}-c-${i}`}
                name={`${idPrefix}-case`}
                defaultChecked={i === 0}
                className="sr-only"
              />
            ))}

            <div className="relative min-h-[32rem] lg:min-h-[38rem]">
              {cases.map((c, i) => (
                <div
                  key={i}
                  className={`pgs-image-${i} absolute inset-0 hidden`}
                >
                  <SmartImage
                    src={c.image}
                    alt={c.imageAlt}
                    className="h-full opacity-35 mix-blend-overlay"
                    priority={i === 0}
                  />
                </div>
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />

              {cases.map((c, i) => (
                <div
                  key={i}
                  className={`pgs-panel-${i} relative z-10 hidden h-full flex-col justify-end gap-6 p-8 sm:p-12 lg:p-16`}
                >
                  <div className="flex items-end justify-between gap-8">
                    <div className="max-w-2xl">
                      <p className="text-xs font-medium tracking-[0.25em] text-background/70 uppercase">
                        {c.client}
                      </p>
                      <h3 className="mt-3 font-display text-2xl text-background sm:text-3xl">
                        {c.title}
                      </h3>
                      <p className="mt-4 max-w-xl text-sm leading-relaxed text-background/80">
                        {c.description}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-background">
                        {t("viewCta")}
                        <ArrowUpRight className="size-4" strokeWidth={1.75} />
                      </span>
                    </div>

                    <div className="hidden shrink-0 text-right sm:block">
                      <div className="flex items-center justify-end gap-2 text-background/70">
                        <TrendingUp className="size-4" strokeWidth={1.75} />
                        <span className="text-xs font-medium tracking-[0.2em] uppercase">
                          {c.statLabel}
                        </span>
                      </div>
                      <p className="mt-1 font-display text-[clamp(3.5rem,8vw,7rem)] leading-none text-background">
                        {c.stat}
                      </p>
                    </div>
                  </div>

                  <div className="text-right sm:hidden">
                    <p className="font-display text-[clamp(3rem,16vw,4.5rem)] leading-none text-background">
                      {c.stat}
                    </p>
                    <p className="mt-1 text-xs font-medium tracking-[0.2em] text-background/70 uppercase">
                      {c.statLabel}
                    </p>
                  </div>
                </div>
              ))}

              <div className="absolute bottom-8 left-8 z-10 flex items-center gap-2 sm:left-12 lg:left-16">
                {cases.map((c, i) => (
                  <label
                    key={i}
                    htmlFor={`${idPrefix}-c-${i}`}
                    className={`pgs-dot-${i} h-2 w-2 cursor-pointer rounded-full bg-background/40 transition-all duration-300`}
                  >
                    <span className="sr-only">{c.title}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{styleRules}</style>
    </section>
  );
}
