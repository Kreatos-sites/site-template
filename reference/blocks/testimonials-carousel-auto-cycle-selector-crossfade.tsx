import { useTranslations } from "next-intl";
import { QuotesIcon } from "@phosphor-icons/react/dist/ssr";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * BLOQUE: testimonials-carousel-auto-cycle-selector-crossfade — carrusel de
 * testimonios con ciclo automático y chips selectores, transición de blur
 * crossfade entre voces. El arquetipo de origen (@nusaiba/testimonials-2) usa
 * un temporizador de cliente para el auto-avance; como este es un componente
 * de servidor sin JS de cliente, el ciclo automático se logra 100% con CSS:
 * una sola @keyframes periódica aplicada a cada panel/chip con
 * animation-delay negativo desfasado (-i * duraciónPorItem), de modo que cada
 * voz entra en su turno mientras las demás permanecen ocultas (opacity+blur).
 * Los chips no requieren clic: son indicadores de progreso sincronizados con
 * el mismo desfase. Se respeta prefers-reduced-motion mostrando solo la
 * primera voz de forma estática.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, selectorLabel: string,
 *     testimonials: [{ quote: string, author: string, role: string,
 *                       company: string, image: string, imageAlt: string }] }
 */
type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
  imageAlt: string;
};

const SECONDS_PER_ITEM = 5.5;

export function TestimonialsCarouselAutoCycleSelectorCrossfade({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const testimonials = t.raw("testimonials") as Testimonial[];
  const idPrefix = ns.replace(/[^a-zA-Z0-9]/g, "-");

  const count = testimonials.length;
  const totalDuration = count * SECONDS_PER_ITEM;
  const slot = 100 / count;
  const fadeIn = slot * 0.14;
  const holdEnd = slot * 0.86;

  const panelKeyframes = `
    @keyframes tccc-panel-${idPrefix} {
      0% { opacity: 0; filter: blur(14px); }
      ${fadeIn}% { opacity: 1; filter: blur(0); }
      ${holdEnd}% { opacity: 1; filter: blur(0); }
      ${slot}% { opacity: 0; filter: blur(14px); }
      100% { opacity: 0; filter: blur(14px); }
    }
    @keyframes tccc-chip-${idPrefix} {
      0% { background-color: var(--secondary); color: var(--secondary-foreground); border-color: var(--border); }
      ${fadeIn}% { background-color: var(--primary); color: var(--primary-foreground); border-color: var(--primary); }
      ${holdEnd}% { background-color: var(--primary); color: var(--primary-foreground); border-color: var(--primary); }
      ${slot}% { background-color: var(--secondary); color: var(--secondary-foreground); border-color: var(--border); }
      100% { background-color: var(--secondary); color: var(--secondary-foreground); border-color: var(--border); }
    }
    @media (prefers-reduced-motion: reduce) {
      .tccc-panel-${idPrefix} { animation: none !important; opacity: 0; filter: none; }
      .tccc-panel-${idPrefix}:first-of-type { opacity: 1; }
      .tccc-chip-${idPrefix} { animation: none !important; background-color: var(--secondary); color: var(--secondary-foreground); border-color: var(--border); }
      .tccc-chip-${idPrefix}:first-of-type { background-color: var(--primary); color: var(--primary-foreground); border-color: var(--primary); }
    }
  `;

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="relative mx-auto mt-16 max-w-3xl">
            <QuotesIcon
              aria-hidden="true"
              className="mx-auto size-9 text-primary/30"
              weight="fill"
            />

            <div className="relative mt-6 min-h-72 overflow-hidden rounded-lg border border-border bg-card p-8 sm:min-h-56 sm:p-14">
              {testimonials.map((item, i) => (
                <figure
                  key={i}
                  className={`tccc-panel-${idPrefix} absolute inset-0 flex flex-col items-center justify-center gap-6 p-8 text-center sm:p-14`}
                  style={{
                    animation: `tccc-panel-${idPrefix} ${totalDuration}s infinite`,
                    animationDelay: `-${i * SECONDS_PER_ITEM}s`,
                  }}
                >
                  <blockquote>
                    <p className="font-display text-xl leading-relaxed text-balance text-foreground sm:text-2xl">
                      {item.quote}
                    </p>
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    <SmartImage
                      src={item.image}
                      alt={item.imageAlt}
                      className="size-11 shrink-0 rounded-full"
                    />
                    <span className="text-left">
                      <span className="block text-sm font-semibold text-foreground">
                        {item.author}
                      </span>
                      <span className="block text-sm text-muted-foreground">
                        {item.role} · {item.company}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
              role="list"
              aria-label={t("selectorLabel")}
            >
              {testimonials.map((item, i) => (
                <span
                  key={i}
                  role="listitem"
                  className={`tccc-chip-${idPrefix} flex size-9 items-center justify-center rounded-full border border-border bg-secondary text-sm font-medium text-secondary-foreground`}
                  style={{
                    animation: `tccc-chip-${idPrefix} ${totalDuration}s infinite`,
                    animationDelay: `-${i * SECONDS_PER_ITEM}s`,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                  <span className="sr-only"> — {item.author}</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <style>{panelKeyframes}</style>
    </section>
  );
}
