import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";

type NavLink = { label: string; href: string };

export function HeaderCenteredUnderlineHover({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const links = t.raw("links") as NavLink[];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 items-center gap-4 px-6 py-4 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <a
          href="#inicio"
          className="font-display text-lg font-medium tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {t("logo")}
        </a>

        <nav
          aria-label={t("navLabel")}
          className="hidden items-center gap-10 lg:flex"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-0.5 h-px origin-center scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        <div className="hidden justify-end lg:flex">
          <a
            href={t("ctaHref")}
            className="inline-flex items-center justify-center rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t("ctaLabel")}
          </a>
        </div>

        {/* Menú móvil: <details>/<summary> nativo, sin JS de cliente */}
        <details className="group relative justify-self-end lg:hidden">
          <summary
            aria-label={t("menuLabel")}
            className="flex size-10 cursor-pointer list-none items-center justify-center rounded-sm border border-border text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden"
          >
            <Menu className="size-5 group-open:hidden" strokeWidth={1.75} />
            <X className="hidden size-5 group-open:block" strokeWidth={1.75} />
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
              <a
                href={t("ctaHref")}
                className="mt-2 inline-flex items-center justify-center rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {t("ctaLabel")}
              </a>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
