import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * Hero asimétrico: bloque de texto desplazado a la izquierda con amplio
 * espacio en blanco alrededor, y una tarjeta de imagen pequeña flotando
 * en la esquina superior derecha (no ocupa columna completa). Composición
 * aireada sobre fondo claro, sin franja de imagen a ancho completo.
 */
export function HeroAsymmetricOffsetImageCorner({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="relative">
          <div className="hidden lg:absolute lg:top-0 lg:right-0 lg:block lg:w-64 xl:w-72">
            <Reveal delay={200}>
              <figure className="rounded-sm border border-border bg-card p-2 shadow-sm">
                <SmartImage
                  src={t("image")}
                  alt={t("imageAlt")}
                  className="aspect-[4/5] rounded-sm"
                  sizes="288px"
                />
                <figcaption className="mt-2 px-1 pb-1 text-xs text-muted-foreground">
                  {t("imageCaption")}
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="max-w-xl lg:ml-12 lg:pr-80 xl:pr-96">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 font-display text-[clamp(2.25rem,4vw+1rem,3.75rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
                {t("description")}
              </p>
            </Reveal>

            <div className="mt-16 lg:hidden">
              <Reveal delay={200}>
                <figure className="max-w-xs rounded-sm border border-border bg-card p-2 shadow-sm">
                  <SmartImage
                    src={t("image")}
                    alt={t("imageAlt")}
                    className="aspect-[4/5] rounded-sm"
                    sizes="320px"
                  />
                  <figcaption className="mt-2 px-1 pb-1 text-xs text-muted-foreground">
                    {t("imageCaption")}
                  </figcaption>
                </figure>
              </Reveal>
            </div>

            <Reveal delay={240}>
              <div className="mt-12 flex flex-wrap items-center gap-8">
                <a
                  href={t("ctaHref")}
                  className="group inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                >
                  {t("ctaLabel")}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={1.75}
                  />
                </a>
                <a
                  href={t("secondaryHref")}
                  className="text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {t("secondaryLabel")}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
