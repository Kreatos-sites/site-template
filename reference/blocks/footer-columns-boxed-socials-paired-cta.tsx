import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  GlobeIcon,
  LinkIcon,
  EnvelopeSimpleIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

/**
 * Footer multi-columna con sección de redes sociales encajonada (bordered box)
 * y dos CTAs pareados y prominentes apilados sobre el copyright centrado,
 * inspirado en el arquetipo footer-8 sin copiar su código.
 */

type SocialLink = { icon: string; href: string; label: string };
type LinkItem = { label: string; href: string };
type LinkColumn = { title: string; links: LinkItem[] };
type Cta = { label: string; href: string };

const SOCIAL_ICONS: Record<string, PhosphorIcon> = {
  globe: GlobeIcon,
  link: LinkIcon,
  email: EnvelopeSimpleIcon,
};

export function FooterColumnsBoxedSocialsPairedCta({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  const socials = t.raw("socials") as SocialLink[];
  const columns = t.raw("columns") as LinkColumn[];
  const ctas = t.raw("ctas") as Cta[];
  const legalLinks = t.raw("legalLinks") as LinkItem[];

  return (
    <footer className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
            <div className="flex flex-col gap-5 lg:col-span-2">
              <p className="font-display text-2xl tracking-tight text-foreground">
                {t("brand")}
              </p>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                {t("description")}
              </p>

              <div className="mt-2 w-fit rounded-md border border-border p-1.5">
                <ul className="flex items-center gap-1">
                  {socials.map((social, index) => {
                    const Icon = SOCIAL_ICONS[social.icon] ?? GlobeIcon;
                    return (
                      <li key={index}>
                        <a
                          href={social.href}
                          aria-label={social.label}
                          className="flex size-9 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          <Icon className="size-4" weight="regular" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {columns.map((column, index) => (
              <Reveal key={column.title} delay={index * 60}>
                <nav aria-label={column.title}>
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
          </div>

          <div className="mt-16 flex flex-col items-center gap-4 border-y border-border py-10 sm:flex-row sm:justify-center sm:gap-6">
            {ctas.map((cta, index) => (
              <a
                key={cta.href}
                href={cta.href}
                className={
                  index === 0
                    ? "inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
                    : "inline-flex w-full items-center justify-center gap-2 rounded-sm border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
                }
              >
                {cta.label}
                <ArrowUpRightIcon className="size-4" weight="regular" />
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-4 text-center">
            <p className="text-xs text-muted-foreground">{t("copyright")}</p>
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
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
        </Reveal>
      </div>
    </footer>
  );
}
