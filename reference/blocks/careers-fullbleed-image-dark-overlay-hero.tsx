import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * Hero de empleo a sangre completa: fotografía documental del equipo en
 * oficina u obra cubre todo el viewport, con degradado oscuro de abajo hacia
 * arriba (transparente en la zona superior, negro en la inferior) que
 * garantiza contraste. Encabezado y subcopy centrados en la franja inferior,
 * seguidos de un CTA para ver vacantes y, opcionalmente, una fila de cifras
 * flotando como chips translúcidos sobre la imagen. Úsalo como hero de
 * apertura en páginas de carreras que buscan un tono editorial y humano.
 */
export function CareersFullbleedImageDarkOverlayHero({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as { value: string; label: string }[] | undefined;

  return (
    <section className="relative isolate min-h-[92vh] w-full overflow-hidden border-t border-border bg-foreground">
      <SmartImage
        src={t("image")}
        alt={t("imageAlt")}
        className="absolute inset-0 aspect-auto h-full w-full"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-transparent"
      />

      <div className="relative flex min-h-[92vh] w-full flex-col justify-end">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-16 text-center lg:px-8 lg:pb-20">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-5 max-w-3xl">
            <h1 className="font-display text-[clamp(2.4rem,5.5vw,4.75rem)] leading-[1.02] font-semibold tracking-tight text-balance text-background">
              {t("title")}
            </h1>
          </Reveal>

          <Reveal delay={140} className="mt-6 max-w-xl">
            <p className="text-base leading-relaxed text-background/80 text-pretty">
              {t("subtitle")}
            </p>
          </Reveal>

          <Reveal delay={200} className="mt-9">
            <a
              href={t("ctaHref")}
              className="group inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-foreground focus-visible:outline-none"
            >
              {t("cta")}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </Reveal>

          {stats && stats.length > 0 ? (
            <Reveal delay={260} className="mt-12 w-full">
              <ul className="flex flex-wrap items-stretch justify-center gap-3">
                {stats.map((stat, i) => (
                  <li
                    key={i}
                    className="rounded-sm border border-background/20 bg-background/10 px-6 py-4 backdrop-blur-sm"
                  >
                    <p className="font-display text-2xl font-semibold text-background">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs tracking-wide text-background/70 uppercase">
                      {stat.label}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
