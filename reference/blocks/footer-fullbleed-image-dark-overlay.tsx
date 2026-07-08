import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type FooterLink = { label: string; href: string };

/**
 * footer-fullbleed-image-dark-overlay — footer a sangre completa con
 * fotografía editorial de oficina/equipo cubriendo todo el ancho y un
 * overlay oscuro en gradiente (transparente arriba, negro sólido abajo).
 * Layout centrado: wordmark grande, una línea de contacto directo y
 * enlaces flotando en texto claro sobre la imagen; base densa, encabezado
 * aireado. Cierre de sitio corporativo con peso fotográfico.
 */
export function FooterFullbleedImageDarkOverlay({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const links = t.raw("links") as FooterLink[];
  const legalLinks = t.raw("legalLinks") as FooterLink[];

  return (
    <footer className="relative border-t border-border">
      <div className="absolute inset-0">
        <SmartImage
          src={t("backgroundImage")}
          alt={t("backgroundImageAlt")}
          className="h-full w-full rounded-none"
          sizes="100vw"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-foreground/10 via-foreground/70 to-foreground"
        />
      </div>

      <div className="relative mx-auto flex min-h-[36rem] w-full max-w-6xl flex-col justify-between px-6 py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <p className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-tight text-balance text-background">
              {t("wordmark")}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-5 text-base leading-relaxed text-background/80">
              {t("contactLine")}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col items-center gap-8 border-t border-background/20 pt-10">
          <nav aria-label={t("linksNavAria")}>
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {links.map((link, index) => (
                <li key={link.href}>
                  <Reveal delay={index * 60}>
                    <a
                      href={link.href}
                      className="text-sm font-medium text-background/85 transition-colors hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                    >
                      {link.label}
                    </a>
                  </Reveal>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-center gap-3 text-xs text-background/60 sm:flex-row sm:gap-6">
            <span>{t("copyright")}</span>
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-background/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
