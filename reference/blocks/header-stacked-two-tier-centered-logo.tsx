import { useTranslations } from "next-intl";
import {
  PhoneIcon,
  GlobeIcon,
  ListIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";

type NavLink = { label: string; href: string };

export function HeaderStackedTwoTierCenteredLogo({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const links = t.raw("links") as NavLink[];

  return (
    <header className="border-b border-border bg-secondary">
      {/* Fila superior: angosta, densa, logo centrado flanqueado por utilidades */}
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 items-center gap-4 px-6 py-2 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <div className="hidden items-center gap-2 text-xs font-medium text-muted-foreground lg:flex">
          <PhoneIcon className="size-3.5 text-primary" />
          <a
            href={t("phoneHref")}
            className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t("phoneLabel")}
          </a>
        </div>

        <a
          href="#inicio"
          className="col-start-1 justify-self-start font-display text-base font-medium tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:col-start-2 lg:justify-self-center"
        >
          {t("logo")}
        </a>

        <div className="col-start-2 flex items-center justify-end gap-4 text-xs font-medium text-muted-foreground lg:col-start-3">
          <div className="hidden items-center gap-2 lg:flex">
            <GlobeIcon className="size-3.5 text-primary" />
            <span>{t("languageLabel")}</span>
          </div>

          {/* Menú móvil: <details>/<summary> nativo, sin JS de cliente */}
          <details className="group relative lg:hidden">
            <summary
              aria-label={t("menuLabel")}
              className="flex size-8 cursor-pointer list-none items-center justify-center rounded-sm border border-border text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden"
            >
              <ListIcon className="size-4 group-open:hidden" />
              <XIcon className="hidden size-4 group-open:block" />
            </summary>

            <div className="fixed inset-x-0 top-[calc(6.25rem)] z-50 border-b border-border bg-secondary px-6 py-8 shadow-lg">
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
                <div className="mt-2 flex flex-col gap-3 border-t border-border pt-6 text-xs font-medium text-muted-foreground">
                  <a
                    href={t("phoneHref")}
                    className="inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <PhoneIcon className="size-3.5 text-primary" />
                    {t("phoneLabel")}
                  </a>
                  <div className="inline-flex items-center gap-2">
                    <GlobeIcon className="size-3.5 text-primary" />
                    {t("languageLabel")}
                  </div>
                </div>
              </nav>
            </div>
          </details>
        </div>
      </div>

      {/* Hairline horizontal separando las dos filas */}
      <div className="border-t border-border" />

      {/* Fila inferior: nav en pastillas, institucional y compacta */}
      <nav
        aria-label={t("navLabel")}
        className="mx-auto hidden w-full max-w-6xl items-center justify-center gap-1 px-6 py-3 lg:flex lg:px-8"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="inline-flex items-center rounded-md px-4 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
