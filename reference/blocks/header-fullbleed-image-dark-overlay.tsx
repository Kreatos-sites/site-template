import { useTranslations } from "next-intl";
import { ArrowRight, Menu, X } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type NavLink = { label: string; href: string };

/**
 * BLOQUE: header-fullbleed-image-dark-overlay — header alto a sangre completa
 * con fotografía corporativa de fondo (obra, planta industrial u oficina) y
 * overlay oscuro en degradado de abajo hacia arriba. Logo, nav y CTA flotan
 * en texto claro sobre la imagen; debajo, un eyebrow + h1 editorial ancla la
 * portada. Tono dramático/editorial para constructoras e industria pesada.
 * Archetype: header-hero combinado, fondo fotográfico + overlay, portada.
 *
 * ns esperado:
 *   { logo: string, navLabel: string, menuLabel: string,
 *     links: [{ label: string, href: string }],
 *     ctaLabel: string, ctaHref: string,
 *     eyebrow: string, title: string, subtitle: string,
 *     image: string, imageAlt: string }
 */
export function HeaderFullbleedImageDarkOverlay({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const links = t.raw("links") as NavLink[];

  return (
    <section className="relative border-t border-border">
      <div className="absolute inset-0">
        <SmartImage
          src={t("image")}
          alt={t("imageAlt")}
          className="h-full w-full rounded-none"
          sizes="100vw"
          priority
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/25"
        />
      </div>

      <div className="relative mx-auto flex min-h-[42rem] w-full max-w-6xl flex-col px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-6">
          <a
            href="#inicio"
            className="font-display text-lg font-medium tracking-tight text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t("logo")}
          </a>

          <nav aria-label={t("navLabel")} className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-background/85 transition-colors hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={t("ctaHref")}
            className="hidden items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:inline-flex"
          >
            {t("ctaLabel")}
            <ArrowRight className="size-4" strokeWidth={1.75} />
          </a>

          {/* Menú móvil: <details>/<summary> nativo, sin JS de cliente */}
          <details className="group relative lg:hidden">
            <summary
              aria-label={t("menuLabel")}
              className="flex size-10 cursor-pointer list-none items-center justify-center rounded-sm border border-background/30 text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden"
            >
              <Menu className="size-5 group-open:hidden" strokeWidth={1.75} />
              <X className="hidden size-5 group-open:block" strokeWidth={1.75} />
            </summary>

            <div className="fixed inset-x-0 top-[4.5rem] z-50 border-b border-border bg-background px-6 py-8 shadow-lg">
              <nav aria-label={t("navLabel")} className="flex flex-col gap-6">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-base font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={t("ctaHref")}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {t("ctaLabel")}
                  <ArrowRight className="size-4" strokeWidth={1.75} />
                </a>
              </nav>
            </div>
          </details>
        </div>

        <div className="mt-auto flex flex-col pb-20 lg:pb-24">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,4vw+1rem,4.25rem)] leading-[1.03] tracking-tight text-balance text-background">
              {t("title")}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-background/85 text-pretty sm:text-lg">
              {t("subtitle")}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
