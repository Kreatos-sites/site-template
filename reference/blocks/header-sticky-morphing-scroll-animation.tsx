import { useTranslations } from "next-intl";
import { RiMenuLine, RiCloseLine, RiArrowRightLine } from "@remixicon/react";

/**
 * BLOQUE: header-sticky-morphing-scroll-animation — nav sticky de una sola
 * capa con blur intenso permanente y borde inferior translúcido que sugiere
 * la "compactación" del header al hacer scroll (sin JS de cliente ni
 * listeners: el blur/soporte translúcido ya comunica la profundidad extra).
 * Logo a la izquierda, enlaces centrados y cluster de contacto + CTA a la
 * derecha; menú móvil nativo con <details>/<summary>.
 *
 * ns esperado:
 *   { logo: string, navLabel: string, links: [{ label: string, href: string }],
 *     phone: string, ctaLabel: string, ctaHref: string, menuLabel: string }
 */
type NavLink = { label: string; href: string };

export function HeaderStickyMorphingScrollAnimation({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const links = t.raw("links") as NavLink[];

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/70 backdrop-blur-xl supports-backdrop-filter:bg-background/55">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <a
          href="#inicio"
          className="font-display text-lg font-medium tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {t("logo")}
        </a>

        <nav
          aria-label={t("navLabel")}
          className="hidden items-center gap-8 lg:flex"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <span className="text-sm text-muted-foreground">{t("phone")}</span>
          <a
            href={t("ctaHref")}
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t("ctaLabel")}
            <RiArrowRightLine className="size-4" />
          </a>
        </div>

        {/* Menú móvil: <details>/<summary> nativo, sin JS de cliente */}
        <details className="group relative lg:hidden">
          <summary
            aria-label={t("menuLabel")}
            className="flex size-10 cursor-pointer list-none items-center justify-center rounded-sm border border-border text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden"
          >
            <RiMenuLine className="size-5 group-open:hidden" />
            <RiCloseLine className="hidden size-5 group-open:block" />
          </summary>

          <div className="fixed inset-x-0 top-[calc(4rem+1px)] z-50 border-b border-border bg-background/95 px-6 py-8 backdrop-blur-xl shadow-lg">
            <nav
              aria-label={t("navLabel")}
              className="flex flex-col gap-6"
            >
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {link.label}
                </a>
              ))}
              <span className="text-sm text-muted-foreground">{t("phone")}</span>
              <a
                href={t("ctaHref")}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {t("ctaLabel")}
                <RiArrowRightLine className="size-4" />
              </a>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
