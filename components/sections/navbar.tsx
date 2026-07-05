"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import type { SectionOf } from "@/lib/config";
import { cn } from "@/lib/utils";
import config from "@/site.config";

type NavLink = { href: string; label: string };

/**
 * Marca del header. Con `business.logo` presente, se muestra SOLO el logo —
 * sin el nombre en texto al lado (el logo ya ES la marca; duplicar con texto
 * se ve redundante). El nombre en texto aparece únicamente cuando NO hay logo
 * (fallback: monograma con la inicial + nombre corto). `alt` del logo lleva el
 * nombre para accesibilidad. Nunca se muestra la razón social completa si
 * existe `business.shortName`.
 */
function Brand() {
  const { name, shortName, logo } = config.business;
  const brandName = shortName ?? name;

  if (logo) {
    return (
      <Link href="/" className="flex items-center gap-3">
        {/* unoptimized: los logos suelen ser SVG/PNG mínimos y el optimizador
            de next/image rechaza SVG sin dangerouslyAllowSVG */}
        <Image
          src={logo}
          alt={brandName}
          width={144}
          height={32}
          priority
          unoptimized
          className="h-8 w-auto"
        />
      </Link>
    );
  }

  const initial = brandName
    .replace(/^(Despacho|Grupo|Firma)\s+/i, "")
    .charAt(0)
    .toUpperCase();

  return (
    <Link href="/" className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="flex size-8 items-center justify-center rounded-sm bg-primary font-display text-lg font-semibold text-primary-foreground"
      >
        {initial}
      </span>
      <span className="font-display text-lg leading-tight tracking-tight">
        {brandName}
      </span>
    </Link>
  );
}

/** Sección de sitio: se hereda de la home y se renderiza igual en todas las páginas. */
export function Navbar({ variant = "minimal", ns }: SectionOf<"navbar">) {
  const t = useTranslations(ns ?? "navbar");
  const tCommon = useTranslations("common");
  const links = t.raw("links") as NavLink[];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const desktopNav = (
    <nav aria-label="principal" className="hidden items-center gap-1 lg:flex">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );

  const actions = (
    <div className="hidden items-center gap-2 lg:flex">
      {config.flags.themeToggle && <ThemeToggle />}
      <Button asChild size="sm">
        <Link href="/#contacto">{t("cta")}</Link>
      </Button>
    </div>
  );

  const mobileTrigger = (
    <div className="flex items-center gap-1 lg:hidden">
      {config.flags.themeToggle && <ThemeToggle />}
      <Button
        variant="ghost"
        size="icon"
        aria-expanded={open}
        aria-label={open ? tCommon("closeMenu") : tCommon("openMenu")}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </Button>
    </div>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-colors",
        scrolled || open
          ? "border-border bg-background/90 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-6xl px-6 lg:px-8",
          variant === "centered-logo"
            ? "flex flex-col items-stretch"
            : "flex h-16 items-center justify-between gap-6",
        )}
      >
        {variant === "centered-logo" ? (
          <>
            <div className="flex h-16 items-center justify-between lg:justify-center">
              <Brand />
              {mobileTrigger}
              <div className="absolute right-6 hidden lg:block">{actions}</div>
            </div>
            <div className="hidden justify-center border-t border-border/60 py-1 lg:flex">
              {desktopNav}
            </div>
          </>
        ) : (
          <>
            <Brand />
            {variant === "split" && desktopNav}
            <div className="flex items-center gap-4">
              {variant === "minimal" && desktopNav}
              {actions}
              {mobileTrigger}
            </div>
          </>
        )}
      </div>

      {open && (
        <nav
          aria-label="principal móvil"
          /* absolute + top-full: el menú SE MONTA sobre el contenido (drop-down),
             no empuja la página. Sin esto crecía el header sticky y desplazaba
             todo hacia abajo. shadow para separarlo del contenido de fondo. */
          className="absolute inset-x-0 top-full border-b border-border bg-background px-6 py-4 shadow-lg lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-2.5 text-base text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button asChild className="mt-4 w-full">
            <Link href="/#contacto" onClick={() => setOpen(false)}>
              {t("cta")}
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
}
