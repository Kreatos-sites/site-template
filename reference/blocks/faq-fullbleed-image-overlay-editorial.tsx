import { useTranslations } from "next-intl";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * BLOQUE: faq-fullbleed-image-overlay-editorial — sección a sangre completa
 * con fotografía de equipo/oficina cubriendo todo el ancho y overlay oscuro
 * en gradiente (transparente arriba, negro intenso abajo). Sobre la imagen,
 * columna angosta centrada con eyebrow, título editorial en blanco y
 * acordeón de preguntas con líneas divisorias translúcidas, sin tarjetas.
 * Archetype: dramático y aspiracional para landings de servicios premium.
 * Distinto de faq-editorial-sidebar-sync (sin imagen, con panel índice) y
 * de property-hero-fullbleed-image-dark-overlay-floating-price (hero, no
 * FAQ).
 *
 * ns esperado:
 *   { image: string, imageAlt: string, eyebrow: string, title: string,
 *     items: [{ question: string, answer: string }] }
 */
type Item = { question: string; answer: string };

export function FaqFullbleedImageOverlayEditorial({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as Item[];

  return (
    <section className="relative border-t border-border py-(--section-gap)">
      <div className="absolute inset-0">
        <SmartImage
          src={t("image")}
          alt={t("imageAlt")}
          className="h-full w-full rounded-none"
          sizes="100vw"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-foreground/0 via-foreground/60 to-foreground/80"
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center px-6 py-20 text-center lg:px-8 lg:py-28">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-14 w-full text-left">
          {items.map((item, index) => (
            <Reveal key={index} delay={160 + index * 60}>
              <details className="group border-b border-background/20 first:border-t [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <h3 className="font-display text-lg leading-snug tracking-tight text-balance text-background sm:text-xl">
                    {item.question}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-full border border-background/30 text-background transition-transform duration-300 group-open:rotate-45"
                  >
                    <PlusIcon className="size-4" weight="bold" />
                  </span>
                </summary>
                <div className="max-w-xl pb-7 text-sm leading-relaxed text-background/80 sm:text-base">
                  {item.answer}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
