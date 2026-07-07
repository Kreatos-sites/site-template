"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import config from "@/site.config";

type NavLink = { href: string; label: string };

/**
 * SLOT HEADER — sección CUSTOM (ver AGENT.md → "Secciones custom").
 * Emite el CONTENIDO interior del header: el renderer lo envuelve en el
 * landmark <header>. Barra editorial sobria para un despacho contable:
 * regla inferior fina, fondo esmerilado (backdrop-blur translúcido que se
 * "activa" cuando el contenido pasa por debajo al hacer scroll), marca a la
 * izquierda con asimetría de grid, navegación con acento parco (primary) y
 * un CTA de contorno que se rellena al hover.
 *
 * Isla client acotada: el ÚNICO estado es abrir/cerrar el menú móvil
 * (useState). Sin listeners de scroll ni animaciones propias — el gesto
 * esmerilado es CSS puro y las micro-afordancias son transiciones de hover.
 */
export function SiteHeader({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const tCommon = useTranslations("common");
  const links = t.raw("links") as NavLink[];

  const business = config.business;
  const brandName = business.shortName ?? business.name;
  const initial = brandName.charAt(0);

  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-6 lg:h-[4.5rem] lg:px-8">
        {/* Marca: logo real, o monograma + wordmark corto */}
        <Link href="/" className="flex items-center gap-3">
          {business.logo ? (
            <Image
              src={business.logo}
              alt={brandName}
              width={160}
              height={32}
              unoptimized
              priority
              className="h-8 w-auto"
            />
          ) : (
            <>
              <span
                aria-hidden="true"
                className="flex size-9 shrink-0 items-center justify-center border border-border font-display text-lg leading-none text-primary uppercase"
              >
                {initial}
              </span>
              <span className="font-display text-base tracking-tight text-balance sm:text-lg">
                {brandName}
              </span>
            </>
          )}
        </Link>

        {/* Cluster derecho: navegación + divisor fino + acciones (asimetría) */}
        <div className="flex items-center gap-8">
          <nav aria-label={tCommon("primaryNav")} className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative inline-flex text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground after:absolute after:inset-x-0 after:-bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <span aria-hidden="true" className="h-5 w-px bg-border" />
            {config.flags.themeToggle && <ThemeToggle />}
            <Link
              href="/#contacto"
              className="inline-flex items-center border border-primary/40 px-4 py-2 text-xs font-medium tracking-[0.18em] text-foreground uppercase transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              {t("cta")}
            </Link>
          </div>

          {/* Controles móviles */}
          <div className="flex items-center gap-1 lg:hidden">
            {config.flags.themeToggle && <ThemeToggle />}
            <button
              type="button"
              aria-label={open ? tCommon("closeMenu") : tCommon("openMenu")}
              aria-expanded={open}
              aria-controls="site-header-mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-9 items-center justify-center text-foreground transition-colors hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              {open ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Panel desplegable móvil: opaco sobre el contenido, reglas finas */}
      <nav
        id="site-header-mobile-nav"
        aria-label={tCommon("primaryNavMobile")}
        hidden={!open}
        className="border-t border-border bg-background lg:hidden"
      >
        <ul className="mx-auto w-full max-w-6xl px-6">
          {links.map((link) => (
            <li key={link.href} className="border-b border-border last:border-b-0">
              <Link
                href={link.href}
                onClick={close}
                className="block py-4 font-display text-lg tracking-tight text-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mx-auto w-full max-w-6xl px-6 py-6">
          <Link
            href="/#contacto"
            onClick={close}
            className="flex w-full items-center justify-center bg-primary px-5 py-3 text-xs font-medium tracking-[0.18em] text-primary-foreground uppercase transition-colors hover:bg-primary/90"
          >
            {t("cta")}
          </Link>
        </div>
      </nav>
    </div>
  );
}
