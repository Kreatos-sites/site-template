import { useTranslations } from "next-intl";
import { ListIcon, XIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

type NavLink = { label: string; href: string };

export function HeaderDiagonalGradientSplitDark({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const links = t.raw("links") as NavLink[];

  return (
    <header className="relative overflow-hidden bg-foreground">
      {/* Panel oscuro sólido: logo + nav, recortado en diagonal */}
      <div className="relative z-10 [clip-path:polygon(0_0,68%_0,58%_100%,0_100%)]">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-10 py-5 pr-24 pl-6 lg:px-8 lg:pr-32">
          <a
            href="#inicio"
            className="shrink-0 font-display text-lg font-medium tracking-tight text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t("logo")}
          </a>

          <nav
            aria-label={t("navLabel")}
            className="hidden items-center gap-7 lg:flex"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-background/70 transition-colors hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <details className="group relative ml-auto lg:hidden">
            <summary
              aria-label={t("menuLabel")}
              className="flex size-10 cursor-pointer list-none items-center justify-center rounded-sm border border-background/25 text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden"
            >
              <ListIcon className="size-5 group-open:hidden" weight="regular" />
              <XIcon className="hidden size-5 group-open:block" weight="regular" />
            </summary>

            <div className="fixed inset-x-0 top-[calc(4rem+1px)] z-50 border-b border-border bg-background px-6 py-8 shadow-lg">
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
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-sm border-t border-border bg-primary px-5 py-3 text-sm font-medium text-primary-foreground pt-6 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {t("ctaLabel")}
                  <ArrowUpRightIcon className="size-4" weight="bold" />
                </a>
              </nav>
            </div>
          </details>
        </div>
      </div>

      {/* Panel de degradado (primary) recortado en diagonal complementaria, con la pastilla del CTA flotando encima */}
      <div className="pointer-events-none absolute inset-y-0 right-0 left-[42%] z-0 bg-gradient-to-br from-primary via-primary to-foreground [clip-path:polygon(28%_0,100%_0,100%_100%,18%_100%)]" />

      <div className="absolute inset-y-0 right-6 z-10 hidden items-center lg:right-8 lg:flex">
        <a
          href={t("ctaHref")}
          className="inline-flex items-center gap-2 rounded-full bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-lg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        >
          {t("ctaLabel")}
          <ArrowUpRightIcon className="size-4" weight="bold" />
        </a>
      </div>

      {/* Franja mínima visible en móvil dentro del panel de degradado */}
      <p className="relative z-10 pb-3 pr-6 text-right text-[0.65rem] font-medium tracking-[0.2em] text-background/70 uppercase lg:hidden">
        {t("eyebrow")}
      </p>
    </header>
  );
}
