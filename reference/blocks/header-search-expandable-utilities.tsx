import { useTranslations } from "next-intl";
import {
  RiSearchLine,
  RiCloseLine,
  RiUserLine,
  RiGlobalLine,
  RiMenuLine,
} from "@remixicon/react";

/**
 * BLOQUE: header-search-expandable-utilities — navegación superior con
 * campo de búsqueda que se expande en línea (CSS puro, sin JS de cliente)
 * junto a un cluster de controles de utilidad (cuenta, idioma). En móvil
 * colapsa a un menú tipo drawer con <details>/<summary> nativo.
 *
 * ns esperado:
 *   { logo: string, navLabel: string, nav: [{ label: string, href: string }],
 *     searchLabel: string, searchPlaceholder: string,
 *     accountLabel: string, accountHref: string, localeLabel: string, menuLabel: string }
 */
type NavItem = { label: string; href: string };

export function HeaderSearchExpandableUtilities({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const nav = t.raw("nav") as NavItem[];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-6 py-4 lg:px-8">
        <a
          href="#inicio"
          className="font-display text-lg font-medium tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {t("logo")}
        </a>

        <nav
          aria-label={t("navLabel")}
          className="hidden flex-1 items-center gap-8 lg:flex"
        >
          {nav.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          {/* Búsqueda expandible: details/summary nativo, el ancho anima con transition-all al abrir */}
          <details className="group relative">
            <summary
              aria-label={t("searchLabel")}
              className="flex size-10 cursor-pointer list-none items-center justify-center rounded-sm text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden"
            >
              <RiSearchLine className="size-5 group-open:hidden" />
              <RiCloseLine className="hidden size-5 group-open:block" />
            </summary>

            <div className="absolute top-1/2 right-0 z-10 w-0 -translate-y-1/2 overflow-hidden opacity-0 transition-all duration-300 group-open:w-72 group-open:opacity-100">
              <div className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 shadow-lg">
                <RiSearchLine className="size-4 shrink-0 text-muted-foreground" />
                <input
                  type="search"
                  name="q"
                  placeholder={t("searchPlaceholder")}
                  aria-label={t("searchLabel")}
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none"
                />
              </div>
            </div>
          </details>

          <a
            href={t("accountHref")}
            aria-label={t("accountLabel")}
            className="flex size-10 items-center justify-center rounded-sm text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <RiUserLine className="size-5" />
          </a>

          <button
            type="button"
            aria-label={t("localeLabel")}
            className="flex size-10 items-center justify-center rounded-sm text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <RiGlobalLine className="size-5" />
          </button>
        </div>

        {/* Menú móvil: incluye búsqueda inline y utilidades, sin JS de cliente */}
        <details className="group relative ml-auto lg:hidden">
          <summary
            aria-label={t("menuLabel")}
            className="flex size-10 cursor-pointer list-none items-center justify-center rounded-sm border border-border text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden"
          >
            <RiMenuLine className="size-5 group-open:hidden" />
            <RiCloseLine className="hidden size-5 group-open:block" />
          </summary>

          <div className="fixed inset-x-0 top-[calc(4rem+1px)] z-50 border-b border-border bg-background px-6 py-8 shadow-lg">
            <div className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2.5">
              <RiSearchLine className="size-4 shrink-0 text-muted-foreground" />
              <input
                type="search"
                name="q"
                placeholder={t("searchPlaceholder")}
                aria-label={t("searchLabel")}
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none"
              />
            </div>

            <nav
              aria-label={t("navLabel")}
              className="mt-6 flex flex-col gap-1"
            >
              {nav.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="border-b border-border py-4 text-base font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={t("accountHref")}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <RiUserLine className="size-4" />
                {t("accountLabel")}
              </a>
              <button
                type="button"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <RiGlobalLine className="size-4" />
                {t("localeLabel")}
              </button>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
