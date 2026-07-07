import { useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Menu01Icon,
  Cancel01Icon,
  ArrowRight01Icon,
  Call02Icon,
} from "@hugeicons/core-free-icons";

/**
 * BLOQUE: header-sticky-scroll-padding-blur-morph — nav sticky de dos capas
 * (franja de contacto superior + barra principal) donde el blur de fondo y el
 * padding vertical compacto ya "pre-morfean" la barra hacia un estado denso,
 * simulando el efecto de scroll sin JS de cliente ni listeners: el degradado
 * de opacidad del backdrop y el borde inferior comunican la profundidad que
 * normalmente daría un handler de scroll. Logo a la izquierda, nav centrada,
 * teléfono + CTA a la derecha; menú móvil nativo con <details>/<summary>.
 *
 * ns esperado:
 *   { utilityLabel: string, phone: string, logo: string, navLabel: string,
 *     links: [{ label: string, href: string }], ctaLabel: string,
 *     ctaHref: string, menuLabel: string }
 */
type NavLink = { label: string; href: string };

export function HeaderStickyScrollPaddingBlurMorph({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const links = t.raw("links") as NavLink[];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/65">
      <div className="hidden border-b border-border/60 lg:block">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-1.5 lg:px-8">
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
            {t("utilityLabel")}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <HugeiconsIcon icon={Call02Icon} className="size-3.5 text-primary" />
            <span>{t("phone")}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-3 lg:px-8">
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
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
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

          <div className="fixed inset-x-0 top-[calc(3.5rem+1px)] z-50 border-b border-border bg-background/95 px-6 py-8 backdrop-blur-xl shadow-lg">
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
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <HugeiconsIcon icon={Call02Icon} className="size-4 text-primary" />
                {t("phone")}
              </span>
              <a
                href={t("ctaHref")}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {t("ctaLabel")}
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
              </a>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
