import { ArrowRight, Phone, Star } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import config from "@/site.config";

/**
 * Sección CUSTOM — héroe editorial de la home (el ÚNICO h1 del sitio).
 * Masthead con reglas finas + titular display dominante a la izquierda e
 * imagen duotone enmarcada y desplazada a la derecha (asimetría 7/5). La
 * prueba social es la ficha real de Google (config.business.maps), no un
 * adorno. Motion "subtle": entrada escalonada con Reveal.
 */
export function HeroEditorial({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const tCommon = useTranslations("common");

  const { business } = config;
  const maps = business.maps;
  const telHref = `tel:${business.phone.replace(/\s+/g, "")}`;

  return (
    <section
      id="inicio"
      className="overflow-x-clip border-b border-border pt-[calc(var(--section-gap)*0.9)] pb-(--section-gap)"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        {/* Masthead editorial: descriptor del despacho / plaza (desde config) */}
        <Reveal>
          <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <p className="hidden text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase sm:block">
              {business.address.city}, {business.address.state}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          {/* Columna principal: titular, subtítulo, CTAs y prueba social */}
          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <h1 className="font-display text-[clamp(2.5rem,1.5rem+4.6vw,4.75rem)] leading-[1.02] tracking-tight text-balance">
                {t("title")}
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {t("subtitle")}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Button asChild size="lg">
                  <a href="#contacto">
                    {t("ctaPrimary")}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                </Button>
                <a
                  href={telHref}
                  className="group inline-flex items-center gap-2 text-sm font-medium"
                >
                  <Phone className="size-4 text-primary" aria-hidden="true" />
                  <span className="text-foreground">{t("ctaSecondary")}</span>
                  <span className="text-muted-foreground tabular-nums transition-colors group-hover:text-foreground">
                    {business.phone}
                  </span>
                </a>
              </div>
            </Reveal>

            {maps && (
              <Reveal delay={320} className="mt-14 border-t border-border pt-6">
                <a
                  href={maps.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={tCommon("viewOnGoogle")}
                  className="group inline-flex items-center gap-3"
                >
                  <span className="flex items-center gap-1.5 font-display text-3xl text-primary tabular-nums">
                    <Star className="size-5 fill-current" aria-hidden="true" />
                    {maps.rating.toFixed(1)}
                  </span>
                  <span className="text-sm leading-tight">
                    <span className="block font-medium text-foreground">
                      {tCommon("googleRating", { rating: maps.rating.toFixed(1) })}
                    </span>
                    <span className="block text-muted-foreground transition-colors group-hover:text-foreground">
                      {tCommon("googleReviews", { count: maps.reviewsCount })}
                    </span>
                  </span>
                </a>
              </Reveal>
            )}
          </div>

          {/* Columna imagen: enmarcada, desplazada y con marca de fundación */}
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={120} className="lg:mt-8">
              <figure className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -bottom-4 -left-4 hidden h-full w-full border border-primary/40 lg:block"
                />
                <SmartImage
                  src="/images/hero.svg"
                  alt={t("imageAlt")}
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="relative aspect-[4/5] w-full"
                />
                <figcaption className="relative mt-4 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                  <span>{t("imageCaption")}</span>
                  {business.founded && (
                    <span className="shrink-0 border-l border-border pl-3 font-medium text-foreground">
                      {t("since", { year: business.founded })}
                    </span>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
