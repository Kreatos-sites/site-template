import { useTranslations } from "next-intl";
import { MenuIcon, XIcon, ArrowUpRightIcon } from "lucide-react";

/**
 * BLOQUE: header-flat-monochrome-drawer — navegación superior plana en
 * monocromo con borde inferior tipo hairline, esquinas rectas (sin radius)
 * en el CTA y menú móvil tipo drawer con <details>/<summary> nativo (sin
 * JS de cliente). Estética minimalista para sitios corporativos serios.
 *
 * ns esperado:
 *   { logo: string, navLabel: string, nav: [{ label: string, href: string }],
 *     ctaLabel: string, ctaHref: string, menuLabel: string }
 */
type NavItem = { label: string; href: string };

export function HeaderFlatMonochromeDrawer({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const nav = t.raw("nav") as NavItem[];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-5 lg:px-8">
        <a
          href="#inicio"
          className="font-display text-lg tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {t("logo")}
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label={t("navLabel")}>
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

        <div className="hidden lg:block">
          <a
            href={t("ctaHref")}
            className="inline-flex items-center gap-2 rounded-none border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t("ctaLabel")}
            <ArrowUpRightIcon className="size-4" />
          </a>
        </div>

        <details className="group relative lg:hidden">
          <summary
            aria-label={t("menuLabel")}
            className="flex size-10 cursor-pointer list-none items-center justify-center border border-border text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden"
          >
            <MenuIcon className="size-5 group-open:hidden" />
            <XIcon className="hidden size-5 group-open:block" />
          </summary>

          <div className="fixed inset-x-0 top-[calc(4rem+1px)] z-40 flex flex-col gap-1 border-t border-border bg-background px-6 py-8 shadow-lg">
            <nav className="flex flex-col gap-1" aria-label={t("navLabel")}>
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
            <a
              href={t("ctaHref")}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-none border border-foreground bg-foreground px-5 py-3 text-sm font-medium text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {t("ctaLabel")}
              <ArrowUpRightIcon className="size-4" />
            </a>
          </div>
        </details>
      </div>
    </header>
  );
}
