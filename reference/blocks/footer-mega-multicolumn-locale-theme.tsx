import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import {
  Globe,
  Camera,
  Briefcase,
  Moon,
  Sun,
  type LucideIcon,
} from "lucide-react";

type SocialLink = {
  type: string;
  href: string;
  label: string;
};

type SitemapLink = {
  label: string;
  href: string;
};

type SitemapColumn = {
  heading: string;
  links: SitemapLink[];
};

type LocaleOption = {
  label: string;
  href: string;
  current: boolean;
};

type ThemeOption = {
  label: string;
  icon: string;
  current: boolean;
};

type LegalLink = {
  label: string;
  href: string;
};

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  facebook: Globe,
  instagram: Camera,
  linkedin: Briefcase,
};

const THEME_ICONS: Record<string, LucideIcon> = {
  sun: Sun,
  moon: Moon,
};

export function FooterMegaMulticolumnLocaleTheme({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const socials = t.raw("socials") as SocialLink[];
  const columns = t.raw("columns") as SitemapColumn[];
  const localeOptions = t.raw("localeOptions") as LocaleOption[];
  const themeOptions = t.raw("themeOptions") as ThemeOption[];
  const legalLinks = t.raw("legalLinks") as LegalLink[];

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-(--section-gap) lg:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-6 lg:gap-8">
          <Reveal>
            <div className="lg:col-span-2">
              <p className="font-display text-2xl tracking-tight text-foreground">
                {t("brandName")}
              </p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {t("tagline")}
              </p>
              <ul className="mt-6 flex items-center gap-3">
                {socials.map((social, i) => {
                  const Icon = SOCIAL_ICONS[social.type] ?? Globe;
                  return (
                    <li key={i}>
                      <a
                        href={social.href}
                        aria-label={social.label}
                        className="flex size-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors duration-300 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        <Icon className="size-4" aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-4">
            {columns.map((column, columnIndex) => (
              <Reveal key={columnIndex} delay={columnIndex * 80}>
                <div>
                  <h3 className="font-display text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
                    {column.heading}
                  </h3>
                  <ul className="mt-6 flex flex-col gap-4">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          className="text-sm leading-relaxed text-foreground/80 transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={200}>
          <div className="mt-16 flex flex-col gap-8 border-t border-border pt-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <div className="flex flex-col gap-3">
                <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                  {t("localeLabel")}
                </p>
                <ul className="flex flex-wrap items-center gap-2">
                  {localeOptions.map((locale, i) => (
                    <li key={i}>
                      <a
                        href={locale.href}
                        aria-current={locale.current ? "true" : undefined}
                        className={`inline-flex items-center gap-1.5 rounded-sm border px-3 py-1.5 text-sm transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                          locale.current
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {i === 0 ? (
                          <Globe className="size-3.5" aria-hidden="true" />
                        ) : null}
                        {locale.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                  {t("themeLabel")}
                </p>
                <ul className="flex items-center gap-1 rounded-sm border border-border p-1">
                  {themeOptions.map((theme, i) => {
                    const Icon = THEME_ICONS[theme.icon] ?? Sun;
                    return (
                      <li key={i}>
                        <span
                          aria-current={theme.current ? "true" : undefined}
                          className={`inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-sm transition-colors duration-300 ${
                            theme.current
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          <Icon className="size-3.5" aria-hidden="true" />
                          {theme.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <ul className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                {legalLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="transition-colors duration-300 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground">{t("copyright")}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
