import { useTranslations } from "next-intl";
import { HardHat, ShieldCheck, Timer, Truck, Wrench } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

const ICONS = { HardHat, ShieldCheck, Timer, Truck, Wrench } as const;

/**
 * Sección de features a sangre completa: fotografía de gran formato
 * (planta, obra o equipo de trabajo) cubre todo el fondo con un overlay
 * oscuro en gradiente de abajo hacia arriba. Eyebrow y título centrados en
 * la mitad superior sobre la imagen; una fila horizontal de features
 * (icono + label, sin tarjeta) queda anclada en la franja inferior.
 * Tono oscuro, editorial-cinematográfico, sin fondo sólido.
 */
export function FeatureFullbleedImageDarkOverlay({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const features = t.raw("features") as {
    icon: keyof typeof ICONS;
    label: string;
  }[];

  return (
    <section className="relative border-t border-border py-(--section-gap)">
      <div className="absolute inset-0">
        <SmartImage
          src={t("backgroundImage")}
          alt={t("backgroundImageAlt")}
          className="h-full w-full rounded-none"
          sizes="100vw"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/75 to-foreground/35"
        />
      </div>

      <div className="relative mx-auto flex min-h-[32rem] w-full max-w-6xl flex-col px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
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
        </div>

        <ul className="mt-auto grid grid-cols-2 gap-x-6 gap-y-8 border-t border-background/20 pt-10 sm:grid-cols-3 lg:flex lg:flex-row lg:justify-between lg:gap-8">
          {features.map((feature, i) => {
            const Icon = ICONS[feature.icon];
            return (
              <li
                key={feature.label}
                className="flex flex-col items-center gap-3 text-center lg:flex-1"
              >
                <Reveal delay={i * 70}>
                  <div className="flex flex-col items-center gap-3">
                    <Icon
                      className="size-6 text-primary"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-background">
                      {feature.label}
                    </span>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
