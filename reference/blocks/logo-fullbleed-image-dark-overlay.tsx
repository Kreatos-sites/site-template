import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * Sección a sangre completa con fotografía de planta industrial u oficina
 * de fondo y overlay oscuro en gradiente de abajo hacia arriba. Eyebrow y
 * título editorial se alinean arriba en tono claro; los wordmarks de los
 * aliados flotan centrados en la mitad inferior, en blanco con opacidad
 * reducida, separados por una regla vertical fina. Composición dramática
 * de escala y trayectoria: el fondo es fotográfico, no de color plano.
 */
export function LogoFullbleedImageDarkOverlay({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  type Partner = { name: string };
  const partners = t.raw("partners") as Partner[];

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
          className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/75 to-foreground/35"
        />
      </div>

      <div className="relative mx-auto flex min-h-[34rem] w-full max-w-6xl flex-col justify-between px-6 py-20 lg:px-8 lg:py-24">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <ul className="mt-16 flex flex-wrap items-center justify-center gap-x-0 gap-y-8 divide-x divide-background/20 border-t border-background/15 pt-10">
            {partners.map((partner, i) => (
              <li
                key={i}
                className="flex items-center justify-center px-8 first:pl-0 last:pr-0"
              >
                <span className="font-display text-lg tracking-tight text-background/70 transition-opacity duration-300 hover:text-background sm:text-xl">
                  {partner.name}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
