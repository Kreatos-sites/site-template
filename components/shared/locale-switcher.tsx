"use client";

import { useLocale } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/**
 * Selector de idioma. INVISIBLE cuando el sitio tiene un solo idioma (el 99% de
 * los casos) — cero impacto en sitios es-only. Con 2+ locales muestra "ES / EN"
 * y cada uno enlaza a la MISMA página en su idioma (preserva la ruta).
 */
export function LocaleSwitcher() {
  const active = useLocale();
  const pathname = usePathname();

  if (routing.locales.length <= 1) return null;

  return (
    <div className="flex items-center gap-1.5 text-xs font-medium">
      {routing.locales.map((locale, index) => (
        <span key={locale} className="flex items-center gap-1.5">
          {index > 0 && (
            <span aria-hidden="true" className="text-border">
              /
            </span>
          )}
          {locale === active ? (
            <span className="uppercase text-foreground" aria-current="true">
              {locale}
            </span>
          ) : (
            <Link
              href={pathname}
              locale={locale}
              className="uppercase text-muted-foreground transition-colors hover:text-foreground"
            >
              {locale}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
