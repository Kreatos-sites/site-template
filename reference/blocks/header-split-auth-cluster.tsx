import { useTranslations } from "next-intl";
import { RiMenuLine, RiCloseLine, RiArrowRightLine } from "@remixicon/react";

type NavLink = { label: string; href: string };

export function HeaderSplitAuthCluster({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const links = t.raw("links") as NavLink[];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
        {/* Marca minimalista, sola a la izquierda */}
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

        {/* Cluster de auth: pastilla contenida en bg-secondary, tratamiento distinto al resto de la nav */}
        <div className="hidden items-center gap-1 rounded-lg bg-secondary p-1 lg:flex">
          <a
            href={t("loginHref")}
            className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t("loginLabel")}
          </a>
          <a
            href={t("ctaHref")}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
              <div className="mt-2 flex flex-col gap-2 rounded-lg bg-secondary p-2">
                <a
                  href={t("loginHref")}
                  className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {t("loginLabel")}
                </a>
                <a
                  href={t("ctaHref")}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {t("ctaLabel")}
                  <RiArrowRightLine className="size-4" />
                </a>
              </div>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
