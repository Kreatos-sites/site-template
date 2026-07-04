import Link from "next/link";
import { useTranslations } from "next-intl";

import type { SectionOf } from "@/lib/config";
import config from "@/site.config";

type NavLink = { href: string; label: string };

/** Sección de sitio: se hereda de la home y se renderiza igual en todas las páginas. */
export function Footer({ ns }: SectionOf<"footer">) {
  const t = useTranslations(ns ?? "footer");
  const tNav = useTranslations("navbar");
  const links = tNav.raw("links") as NavLink[];
  const { business } = config;
  const year = new Date().getFullYear();
  const social = [
    { label: "Facebook", href: business.social?.facebook },
    { label: "LinkedIn", href: business.social?.linkedin },
    { label: "Instagram", href: business.social?.instagram },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href));

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto w-full max-w-6xl px-6 py-14 lg:px-8">
        <div className="flex flex-col justify-between gap-10 lg:flex-row">
          <div className="max-w-sm">
            {/* Marca corta; la razón social completa vive en la línea legal de abajo */}
            <p className="font-display text-xl tracking-tight">
              {business.shortName ?? business.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("tagline")}
            </p>
            <address className="mt-5 text-sm leading-relaxed text-muted-foreground not-italic">
              {business.address.street}, Col. {business.address.colonia}
              <br />
              {business.address.zip} {business.address.city}, {business.address.state}
              <br />
              <a
                href={`tel:${business.phone.replace(/\s/g, "")}`}
                className="underline-offset-4 hover:text-foreground hover:underline"
              >
                {business.phone}
              </a>
              {business.email && (
                <>
                  {" · "}
                  <a
                    href={`mailto:${business.email}`}
                    className="underline-offset-4 hover:text-foreground hover:underline"
                  >
                    {business.email}
                  </a>
                </>
              )}
            </address>
          </div>

          <div className="flex gap-16">
            <nav aria-label={t("navTitle")}>
              <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                {t("navTitle")}
              </p>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {social.length > 0 && (
              <div>
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  {t("contactTitle")}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {social.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {business.name}. {t("rights")}
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/aviso-de-privacidad"
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {t("privacyLink")}
            </Link>
            <span>{t("credit")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
