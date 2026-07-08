import { useTranslations } from "next-intl";
import { HardHatIcon, MenuIcon, XIcon, ArrowUpRightIcon } from "lucide-react";

/**
 * BLOQUE: header-staggered-cards-dotted-pattern — encabezado con fondo claro
 * y patrón de puntos tipo grid técnico a baja opacidad. En vez de una barra
 * de nav plana, cada enlace vive en una tarjeta pequeña con borde fino,
 * escalonada verticalmente (offset par/impar) para un look ingenieril,
 * propio de constructoras y manufactura. Menú móvil con <details>/<summary>
 * nativo, sin JS de cliente.
 *
 * ns esperado:
 *   { badgeLabel: string, logo: string, navLabel: string,
 *     nav: [{ label: string, href: string }],
 *     ctaLabel: string, ctaHref: string, menuLabel: string }
 */
type NavItem = { label: string; href: string };

export function HeaderStaggeredCardsDottedPattern({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const nav = t.raw("nav") as NavItem[];

  return (
    <header className="relative z-40 border-b border-border bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:18px_18px]"
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <a
            href="#inicio"
            className="inline-flex items-center gap-2.5 font-display text-lg tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="flex size-9 items-center justify-center rounded-sm border border-border bg-card text-primary">
              <HardHatIcon className="size-4" strokeWidth={1.75} />
            </span>
            {t("logo")}
          </a>

          <details className="group relative lg:hidden">
            <summary
              aria-label={t("menuLabel")}
              className="flex size-10 cursor-pointer list-none items-center justify-center rounded-sm border border-border bg-card text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden"
            >
              <MenuIcon className="size-5 group-open:hidden" />
              <XIcon className="hidden size-5 group-open:block" />
            </summary>

            <div className="fixed inset-x-0 top-[calc(4.75rem+1px)] z-40 flex flex-col gap-3 border-t border-border bg-background px-6 py-6 shadow-lg">
              <nav className="flex flex-col gap-3" aria-label={t("navLabel")}>
                {nav.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    className="rounded-sm border border-border bg-card px-4 py-3 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <a
                href={t("ctaHref")}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-sm border border-foreground bg-foreground px-5 py-3 text-sm font-medium text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {t("ctaLabel")}
                <ArrowUpRightIcon className="size-4" />
              </a>
            </div>
          </details>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <nav className="flex items-center gap-3" aria-label={t("navLabel")}>
            {nav.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className={`inline-flex items-center rounded-sm border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  i % 2 === 1 ? "translate-y-2.5" : "-translate-y-0.5"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={t("ctaHref")}
            className="ml-2 inline-flex items-center gap-2 rounded-sm border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t("ctaLabel")}
            <ArrowUpRightIcon className="size-4" />
          </a>
        </div>
      </div>

      <p className="relative mx-auto hidden w-full max-w-6xl px-6 pb-4 text-xs font-medium tracking-[0.25em] text-primary uppercase lg:block lg:px-8">
        {t("badgeLabel")}
      </p>
    </header>
  );
}
