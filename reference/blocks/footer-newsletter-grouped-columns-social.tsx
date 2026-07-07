import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  ArrowUpRightIcon,
  GlobeIcon,
  EnvelopeSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

/**
 * Footer con captura de newsletter prominente arriba y columnas de
 * navegación agrupadas debajo, cerrando con una barra inferior de redes
 * (iconos neutros) y avisos legales. Inspirado en el arquetipo footer-3
 * (banda de captura + columnas + barra legal) sin copiar su código.
 */

type LinkItem = { label: string; href: string };
type LinkColumn = { title: string; links: LinkItem[] };
type SocialLink = { icon: string; href: string; label: string };

const SOCIAL_ICONS: Record<string, PhosphorIcon> = {
  globe: GlobeIcon,
  email: EnvelopeSimpleIcon,
  link: ArrowUpRightIcon,
};

export function FooterNewsletterGroupedColumnsSocial({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  const columns = t.raw("columns") as LinkColumn[];
  const socials = t.raw("socials") as SocialLink[];
  const legalLinks = t.raw("legalLinks") as LinkItem[];

  return (
    <footer className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-8 border-b border-border pb-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-lg">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {t("description")}
              </p>
            </div>

            <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
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
                className="shrink-0 rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {t("newsletter.buttonLabel")}
              </button>
            </form>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-8 border-b border-border py-12 sm:grid-cols-4">
          {columns.map((column, index) => (
            <Reveal key={column.title} delay={index * 60}>
              <nav aria-label={column.title}>
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

        <div className="flex flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <p className="font-display text-lg tracking-tight text-foreground">
              {t("brand")}
            </p>
            <ul className="flex flex-wrap gap-3">
              {socials.map((social, index) => {
                const Icon = SOCIAL_ICONS[social.icon] ?? GlobeIcon;
                return (
                  <li key={index}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className="flex size-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <Icon className="size-4" weight="regular" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

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
      </div>
    </footer>
  );
}
