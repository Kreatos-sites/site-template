import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";

type NavLink = { label: string; href: string };

export function HeaderEditorialWordmarkSlashes({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const links = t.raw("links") as NavLink[];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-6 lg:px-8">
        <a
          href="#inicio"
          className="font-display text-xl tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {t("wordmark")}
        </a>

        <nav
          aria-label={t("navLabel")}
          className="hidden items-center text-sm font-medium text-muted-foreground lg:flex"
        >
          {links.map((link, i) => (
            <span key={link.href} className="flex items-center">
              {i > 0 && (
                <span aria-hidden="true" className="mx-4 text-border">
                  /
                </span>
              )}
              <a
                href={link.href}
                className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {link.label}
              </a>
            </span>
          ))}
        </nav>

        <a
          href={t("ctaHref")}
          className="hidden text-sm font-medium tracking-tight text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:inline-block"
        >
          {t("ctaLabel")}
        </a>

        {/* Menú móvil: <details>/<summary> nativo, sin JS de cliente */}
        <details className="group relative lg:hidden">
          <summary
            aria-label={t("menuLabel")}
            className="flex size-10 cursor-pointer list-none items-center justify-center border border-border text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden"
          >
            <Menu className="size-5 group-open:hidden" strokeWidth={1.5} />
            <X className="hidden size-5 group-open:block" strokeWidth={1.5} />
          </summary>

          <div className="fixed inset-x-0 top-[calc(4.5rem+1px)] z-50 border-b border-border bg-background px-6 py-8">
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
                className="mt-2 text-base font-medium tracking-tight text-foreground underline decoration-primary decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
