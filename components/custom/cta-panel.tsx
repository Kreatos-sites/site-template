import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { whatsappDigits } from "@/lib/config";
import config from "@/site.config";

/**
 * Sección CUSTOM: panel de cierre (ver AGENT.md → "Secciones custom").
 * Bloque editorial macizo (bg-primary) que corta el ritmo oscuro del sitio:
 * titular display a la izquierda, invitación + CTA a WhatsApp alineados abajo
 * a la derecha (asimetría de grid). El gesto propio es el marco de esquina en
 * hairline — evoca el pliegue de un documento, a tono con un despacho contable.
 *
 * Reusable en la home y en páginas interiores con distinto `ns`.
 * Cumple el contrato del motor:
 * - server component (sin "use client"); motion solo con <Reveal>;
 * - copy 100% vía next-intl con el `ns` de props (+ common para labels);
 * - solo tokens semánticos del theme (cero colores literales);
 * - h2 (el h1 vive en el hero/page-header);
 * - el CTA es un enlace wa.me con el mensaje precargado de common.
 */
export function CtaPanel({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const tCommon = useTranslations("common");

  const whatsappHref = `https://wa.me/${whatsappDigits(config.business)}?text=${encodeURIComponent(
    tCommon("whatsappMessage"),
  )}`;

  return (
    <section id="cotizar" className="bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="relative isolate rounded-lg bg-primary px-8 py-14 text-primary-foreground sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            {/* Marco de esquina en hairline: el gesto propio del panel. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-6 right-6 h-20 w-20 border-t border-r border-primary-foreground/25 sm:h-28 sm:w-28"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-10 right-10 h-12 w-12 border-t border-r border-primary-foreground/10 sm:h-16 sm:w-16"
            />

            <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-7">
                <Reveal>
                  <p className="text-xs font-medium tracking-[0.25em] text-primary-foreground/70 uppercase">
                    {t("eyebrow")}
                  </p>
                  <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,1.3rem+3vw,3.5rem)] leading-[1.05] tracking-tight text-balance">
                    {t("title")}
                  </h2>
                </Reveal>
              </div>

              <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
                <Reveal delay={120}>
                  <p className="max-w-sm text-[0.95rem] leading-relaxed text-primary-foreground/80">
                    {t("subtitle")}
                  </p>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-8 inline-flex items-center gap-3 rounded-md bg-primary-foreground px-7 py-4 text-sm font-medium tracking-wide text-primary transition-colors hover:bg-primary-foreground/90 focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:outline-none"
                  >
                    {t("cta")}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path d="M5 12h14" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>
                  </a>
                </Reveal>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
