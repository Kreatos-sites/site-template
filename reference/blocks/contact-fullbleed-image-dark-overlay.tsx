import { useTranslations } from "next-intl";
import {
  PhoneIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as Icon } from "@phosphor-icons/react";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type ContactItem = { icon: string; label: string; value: string };

const ICONS: Record<string, Icon> = {
  phone: PhoneIcon,
  email: EnvelopeSimpleIcon,
  address: MapPinIcon,
};

/**
 * Sección de contacto a sangre completa: fotografía de oficina/equipo de
 * fondo con overlay oscuro degradado, título editorial oversized centrado
 * en la mitad superior y una fila simple de datos de contacto (teléfono,
 * correo, dirección) en texto claro sobre la imagen en la mitad inferior.
 * Sin tarjeta ni formulario visible: todo el peso lo llevan la imagen y la
 * tipografía en blanco.
 */
export function ContactFullbleedImageDarkOverlay({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as ContactItem[];

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
          className="absolute inset-0 bg-gradient-to-b from-foreground/75 via-foreground/50 to-foreground/85"
        />
      </div>

      <div className="relative mx-auto flex min-h-[34rem] w-full max-w-6xl flex-col justify-between px-6 py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,5vw+1rem,4.5rem)] leading-[1.02] tracking-tight text-balance text-background">
              {t("title")}
            </h2>
          </Reveal>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-8 border-t border-background/20 pt-10 text-center sm:grid-cols-3">
          {items.map((item, index) => {
            const ItemIcon = ICONS[item.icon] ?? PhoneIcon;
            return (
              <li key={item.label}>
                <Reveal delay={index * 60}>
                  <div className="flex flex-col items-center gap-3">
                    <ItemIcon
                      aria-hidden="true"
                      className="size-5 text-background/70"
                      weight="light"
                    />
                    <p className="text-xs font-medium tracking-[0.2em] text-background/70 uppercase">
                      {item.label}
                    </p>
                    <p className="text-base leading-relaxed text-background">
                      {item.value}
                    </p>
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
