import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";

type Slide = { src: string; alt: string };
type Cta = { label: string; href: string };

/**
 * Hero con carrusel de imágenes rotativo: titular/CTA a la izquierda,
 * columna derecha con fotos que se van cruzando en loop (fade puro en CSS,
 * sin JS de cliente). Los puntos indicadores son decorativos (aria-hidden);
 * el carrusel real es accesible como lista de imágenes con alt individual.
 */
export function HeroImageCarousel({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const slides = t.raw("slides") as Slide[];
  const primaryCta = t.raw("primaryCta") as Cta;
  const secondaryCta = t.raw("secondaryCta") as Cta | null;
  const duration = slides.length * 5;

  return (
    <section className="overflow-x-clip border-t border-border bg-background py-(--section-gap)">
      <style>{`
        @keyframes hic-fade {
          0%, 18% { opacity: 1; }
          25%, 93% { opacity: 0; }
          100% { opacity: 1; }
        }
        .hic-slide {
          animation-name: hic-fade;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hic-slide {
            animation: none;
            opacity: 0;
          }
          .hic-slide:first-child {
            opacity: 1;
          }
        }
      `}</style>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-5 font-display text-[clamp(2.25rem,1.5rem+3.2vw,3.75rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {t("subtitle")}
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href={primaryCta.href}
                className="inline-flex items-center justify-center rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                {primaryCta.label}
              </a>
              {secondaryCta ? (
                <a
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground"
                >
                  {secondaryCta.label}
                </a>
              ) : null}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={150}>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -top-4 -right-4 hidden h-full w-full border border-primary/40 lg:block"
              />
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
                {slides.map((slide, index) => (
                  <div
                    key={slide.src}
                    className={cn(
                      "hic-slide absolute inset-0",
                      index === 0 ? "opacity-100" : "opacity-0"
                    )}
                    style={{
                      animationDuration: `${duration}s`,
                      animationDelay: `${index * (duration / slides.length)}s`,
                    }}
                  >
                    <SmartImage
                      src={slide.src}
                      alt={slide.alt}
                      priority={index === 0}
                      className="h-full w-full"
                    />
                  </div>
                ))}
              </div>
              <div
                aria-hidden="true"
                className="absolute right-4 bottom-4 flex items-center gap-2"
              >
                {slides.map((slide, index) => (
                  <span
                    key={slide.src}
                    className={cn(
                      "h-1.5 rounded-full bg-primary-foreground/70 transition-all",
                      index === 0 ? "w-6" : "w-1.5 bg-primary-foreground/40"
                    )}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
