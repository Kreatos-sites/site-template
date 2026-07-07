import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { Globe, SunMedium, MoonStar, ArrowUpRight, type LucideIcon } from "lucide-react";

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

type ContactLine = {
  label: string;
  value: string;
};

const THEME_ICONS: Record<string, LucideIcon> = {
  sun: SunMedium,
  moon: MoonStar,
};

export function FooterMegaColumnsSitemapLocaleControls({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const columns = t.raw("columns") as SitemapColumn[];
  const localeOptions = t.raw("localeOptions") as LocaleOption[];
  const themeOptions = t.raw("themeOptions") as ThemeOption[];
  const legalLinks = t.raw("legalLinks") as LegalLink[];
  const contactLines = t.raw("contactLines") as ContactLine[];

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-(--section-gap) lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-border pb-12 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-display text-2xl tracking-tight text-foreground">
                {t("brandName")}
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                {t("tagline")}
              </p>
            </div>
            <ul className="flex flex-col gap-2">
              {contactLines.map((line, i) => (
                <li key={i} className="flex items-baseline gap-2 text-sm">
                  <span className="text-muted-foreground">{line.label}</span>
                  <span className="text-foreground">{line.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {columns.map((column, columnIndex) => (
            <Reveal key={columnIndex} delay={columnIndex * 70}>
              <div>
                <h3 className="font-display text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  {column.heading}
                </h3>
                <ul className="mt-6 flex flex-col gap-4">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="inline-flex items-center gap-1.5 text-sm leading-relaxed text-foreground/80 transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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

        <Reveal delay={240}>
          <div className="mt-16 flex flex-col gap-8 border-t border-border pt-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
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
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                          locale.current
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-secondary-foreground hover:text-primary"
                        }`}
                      >
                        {i === 0 ? <Globe className="size-3.5" aria-hidden="true" /> : null}
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
                <ul className="flex items-center gap-1 rounded-sm border border-border bg-card p-1">
                  {themeOptions.map((theme, i) => {
                    const Icon = THEME_ICONS[theme.icon] ?? SunMedium;
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

            <div className="flex flex-col gap-4 lg:items-end">
              <ul className="flex flex-wrap items-center gap-6 text-sm text-secondary-foreground">
                {legalLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="inline-flex items-center gap-1 transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {link.label}
                      <ArrowUpRight className="size-3" aria-hidden="true" />
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
