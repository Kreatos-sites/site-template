import { useTranslations } from "next-intl";
import {
  ListIcon,
  XIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react/dist/ssr";

type NavLink = { label: string; href: string };

export function HeaderSplitMinimalBrandAuth({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const links = t.raw("links") as NavLink[];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex w-full max-w-6xl items-stretch justify-between px-6 lg:px-8">
        {/* Bloque izquierdo: marca + enlaces, unidos visualmente como un solo grupo */}
        <div className="flex items-center gap-10 py-4">
          <a
            href="#inicio"
            className="font-display text-lg font-medium tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t("logo")}
          </a>

          <nav
            aria-label={t("navLabel")}
            className="hidden items-center gap-8 border-l border-border pl-10 lg:flex"
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
        </div>

        {/* Bloque derecho: cluster de autenticación, separado por un borde vertical */}
        <div className="hidden items-center gap-6 border-l border-border pl-8 lg:flex">
          <a
            href={t("loginHref")}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t("loginLabel")}
          </a>
          <a
            href={t("ctaHref")}
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t("ctaLabel")}
            <ArrowRightIcon className="size-4" />
          </a>
        </div>

        {/* Menú móvil: <details>/<summary> nativo, sin JS de cliente */}
        <details className="group relative flex items-center lg:hidden">
          <summary
            aria-label={t("menuLabel")}
            className="flex size-10 cursor-pointer list-none items-center justify-center rounded-sm border border-border text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden"
          >
            <ListIcon className="size-5 group-open:hidden" />
            <XIcon className="hidden size-5 group-open:block" />
          </summary>

          <div className="fixed inset-x-0 top-[calc(4rem+1px)] z-50 border-b border-border bg-background px-6 py-8 shadow-lg">
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
              <div className="mt-2 flex flex-col gap-3 border-t border-border pt-6">
                <a
                  href={t("loginHref")}
                  className="inline-flex items-center justify-center rounded-sm border border-border px-5 py-3 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {t("loginLabel")}
                </a>
                <a
                  href={t("ctaHref")}
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {t("ctaLabel")}
                  <ArrowRightIcon className="size-4" />
                </a>
              </div>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
