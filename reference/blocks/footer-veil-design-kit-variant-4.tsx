import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  RiGlobalLine,
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
  RiArrowRightUpLine,
} from "@remixicon/react";

/**
 * Footer inspirado en el arquetipo Veil footer-4 de Tailark: banda de
 * cierre centrada (declaración + CTA) arriba, seguida de una retícula
 * de celdas con bordes (marca + contacto + columnas de navegación) y
 * una barra inferior con avisos legales. Reescrito desde cero al
 * contrato del template, sin copiar el código fuente.
 */

type LinkItem = { label: string; href: string };
type LinkColumn = { title: string; links: LinkItem[] };
type ContactItem = { icon: string; label: string; href: string };

const CONTACT_ICONS: Record<string, typeof RiMailLine> = {
  mail: RiMailLine,
  phone: RiPhoneLine,
  location: RiMapPinLine,
  globe: RiGlobalLine,
};

export function FooterVeilDesignKitVariant4({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  const columns = t.raw("columns") as LinkColumn[];
  const contacts = t.raw("contacts") as ContactItem[];
  const legalLinks = t.raw("legalLinks") as LinkItem[];

  return (
    <footer className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-6 border-b border-border pb-14 text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <a
              href={t("cta.href")}
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {t("cta.label")}
              <RiArrowRightUpLine className="size-4" />
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 border-b border-border sm:grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-border">
          <Reveal>
            <div className="flex flex-col gap-5 border-b border-border py-10 sm:pr-8 lg:col-span-2 lg:border-b-0 lg:pr-10">
              <p className="font-display text-xl tracking-tight text-foreground">
                {t("brand")}
              </p>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                {t("description")}
              </p>
              <ul className="flex flex-col gap-3">
                {contacts.map((contact, index) => {
                  const Icon = CONTACT_ICONS[contact.icon] ?? RiMailLine;
                  return (
                    <li key={index}>
                      <a
                        href={contact.href}
                        className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        <Icon className="size-4 shrink-0 text-primary" />
                        {contact.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          {columns.map((column, index) => (
            <Reveal key={column.title} delay={(index + 1) * 60}>
              <nav
                aria-label={column.title}
                className="border-b border-border py-10 last:border-b-0 sm:px-8 lg:border-b-0 lg:px-10 lg:first:pl-0"
              >
                <h3 className="font-display text-sm tracking-tight text-foreground">
                  {column.title}
                </h3>
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
        </div>

        <div className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
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
    </footer>
  );
}
