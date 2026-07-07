import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";

type NavLink = { label: string; href: string };
type MetaItem = { label: string };

export function HeaderWordmarkSlashDividerMinimal({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const links = t.raw("links") as NavLink[];
  const meta = t.raw("meta") as MetaItem[];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      {/* Barra utilitaria: meta info separada por slash */}
      <div className="hidden border-b border-border/60 lg:block">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-end px-6 py-2 lg:px-8">
          <ul className="flex items-center text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
            {meta.map((item, i) => (
              <li key={item.label} className="flex items-center">
                {i > 0 && (
                  <span aria-hidden="true" className="mx-3 text-border">
                    /
                  </span>
                )}
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Fila principal: wordmark serif + navegación slash-separated */}
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-7 lg:px-8">
        <a
          href="#inicio"
          className="font-display text-2xl tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
          className="hidden shrink-0 border border-foreground px-5 py-2 text-sm font-medium tracking-tight text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:inline-block"
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
                className="mt-2 inline-block border border-foreground px-5 py-2 text-base font-medium tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {t("ctaLabel")}
              </a>
            </nav>

            <ul className="mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-6 text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
              {meta.map((item, i) => (
                <li key={item.label} className="flex items-center">
                  {i > 0 && (
                    <span aria-hidden="true" className="mr-3 text-border">
                      /
                    </span>
                  )}
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </details>
      </div>
    </header>
  );
}
