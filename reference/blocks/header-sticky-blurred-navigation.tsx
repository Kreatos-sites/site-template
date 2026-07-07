import { useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Menu01Icon,
  Cancel01Icon,
  ArrowRight02Icon,
} from "@hugeicons/core-free-icons";

/**
 * BLOQUE: header-sticky-blurred-navigation — barra de navegación superior
 * fija (sticky) con fondo translúcido y blur permanente, logo, enlaces
 * principales y CTA primario. Responsive: en escritorio muestra el nav
 * completo; en móvil colapsa a un menú desplegable con <details>/<summary>
 * nativo (sin JS de cliente). Ideal como header principal de cualquier
 * sitio corporativo.
 *
 * ns esperado:
 *   { logo: string, navLabel: string, links: [{ label: string, href: string }],
 *     ctaLabel: string, ctaHref: string, menuLabel: string }
 */
type NavLink = { label: string; href: string };

export function HeaderStickyBlurredNavigation({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const links = t.raw("links") as NavLink[];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg supports-backdrop-filter:bg-background/60">
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

        <div className="hidden lg:block">
          <a
            href={t("ctaHref")}
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t("ctaLabel")}
            <HugeiconsIcon icon={ArrowRight02Icon} className="size-4" />
          </a>
        </div>

        {/* Menú móvil: <details>/<summary> nativo, sin JS de cliente */}
        <details className="group relative lg:hidden">
          <summary
            aria-label={t("menuLabel")}
            className="flex size-10 cursor-pointer list-none items-center justify-center rounded-sm border border-border text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden"
          >
            <HugeiconsIcon icon={Menu01Icon} className="size-5 group-open:hidden" />
            <HugeiconsIcon icon={Cancel01Icon} className="hidden size-5 group-open:block" />
          </summary>

          <div className="fixed inset-x-0 top-[calc(4rem+1px)] z-50 border-b border-border bg-background/95 px-6 py-8 shadow-lg backdrop-blur-lg">
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
              <a
                href={t("ctaHref")}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {t("ctaLabel")}
                <HugeiconsIcon icon={ArrowRight02Icon} className="size-4" />
              </a>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
