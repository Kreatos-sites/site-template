import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  GlobeIcon,
  EnvelopeSimpleIcon,
  ArrowUpRightIcon,
  MonitorIcon,
  MoonIcon,
  SunIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

/**
 * Footer tipo blueprint modular: cuadrícula de celdas delimitadas por bordes
 * (marca, columnas de enlaces, newsletter) rematada por una barra de
 * controles (idioma, modo de color, contacto) en formato pill y el bloque de
 * copyright/legal. Inspirado en el arquetipo footer-7 pero reescrito desde
 * cero, sin interactividad de cliente ni su código original.
 */

type LinkItem = { label: string; href: string };
type LinkColumn = { title: string; links: LinkItem[] };
type ControlOption = { icon: string; label: string };

const CONTROL_ICONS: Record<string, Icon> = {
  language: GlobeIcon,
  light: SunIcon,
  dark: MoonIcon,
  system: MonitorIcon,
};

export function FooterGridModularBorderedNewsletterControls({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);

  const columns = t.raw("columns") as LinkColumn[];
  const controls = t.raw("controls") as ControlOption[];
  const legalLinks = t.raw("legalLinks") as LinkItem[];

  return (
    <footer className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-1 border border-border sm:grid-cols-2 lg:grid-cols-5">
            <div className="flex flex-col gap-6 border-b border-border p-8 sm:border-r lg:col-span-2 lg:border-b-0">
              <p className="font-display text-2xl tracking-tight text-foreground">
                {t("brand")}
              </p>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                {t("description")}
              </p>
              <a
                href={`mailto:${t("contactEmail")}`}
                className="inline-flex w-fit items-center gap-2 text-sm text-primary transition-colors hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <EnvelopeSimpleIcon className="size-4" />
                {t("contactEmail")}
              </a>
            </div>

            {columns.map((column, index) => (
              <Reveal key={column.title} delay={index * 60}>
                <nav
                  aria-label={column.title}
                  className={`h-full border-b border-border p-8 lg:border-b-0 ${
                    index < columns.length - 1 ? "sm:border-r" : ""
                  }`}
                >
                  <h2 className="font-display text-sm tracking-tight text-foreground">
                    {column.title}
                  </h2>
                  <ul className="mt-5 flex flex-col gap-3">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Reveal>
            ))}

            <div className="flex flex-col gap-4 border-b border-border p-8 sm:border-r lg:border-b-0">
              <h2 className="font-display text-sm tracking-tight text-foreground">
                {t("newsletter.title")}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t("newsletter.description")}
              </p>
              <form className="mt-2 flex flex-col gap-3">
                <label className="sr-only" htmlFor={`${ns}-newsletter-email`}>
                  {t("newsletter.placeholder")}
                </label>
                <input
                  id={`${ns}-newsletter-email`}
                  type="email"
                  placeholder={t("newsletter.placeholder")}
                  className="w-full rounded-sm border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                />
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {t("newsletter.buttonLabel")}
                  <ArrowUpRightIcon className="size-4" />
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-col gap-6 border-x border-b border-border p-8 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-3">
              {controls.map((control, index) => {
                const ControlIcon = CONTROL_ICONS[control.icon] ?? GlobeIcon;
                return (
                  <li key={index}>
                    <span className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground">
                      <ControlIcon className="size-3.5 text-primary" />
                      {control.label}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <p className="text-xs text-muted-foreground">{t("copyright")}</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-xs text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
