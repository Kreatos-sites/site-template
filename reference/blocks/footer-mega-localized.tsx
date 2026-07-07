import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { RiGlobalLine, RiMoonLine } from "@remixicon/react";

type NavLink = {
  label: string;
  href: string;
};

type NavColumn = {
  heading: string;
  links: NavLink[];
};

type LocaleLink = {
  label: string;
  href: string;
};

type LegalLink = {
  label: string;
  href: string;
};

export function FooterMegaLocalized({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const columns = t.raw("columns") as NavColumn[];
  const locales = t.raw("locales") as LocaleLink[];
  const legalLinks = t.raw("legalLinks") as LegalLink[];

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-(--section-gap) lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <Reveal>
            <div className="flex h-full flex-col justify-between gap-8">
              <div>
                <p className="font-display text-2xl tracking-tight text-foreground">
                  {t("brandName")}
                </p>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {t("description")}
                </p>
              </div>
              <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                <p>{t("address")}</p>
                <a
                  href={`mailto:${t("email")}`}
                  className="text-foreground transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {t("email")}
                </a>
                <a
                  href={`tel:${t("phone")}`}
                  className="text-foreground transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {t("phone")}
                </a>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
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

        <Reveal delay={160}>
          <div className="mt-16 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <RiGlobalLine className="size-4 text-primary" aria-hidden="true" />
              <ul className="flex flex-wrap items-center gap-3">
                {locales.map((locale, i) => (
                  <li key={i} className="contents">
                    {i > 0 ? (
                      <span aria-hidden="true" className="text-border">
                        /
                      </span>
                    ) : null}
                    <a
                      href={locale.href}
                      className="transition-colors duration-300 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {locale.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <RiMoonLine className="size-4 text-primary" aria-hidden="true" />
              <span>{t("themeNote")}</span>
            </div>

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
        </Reveal>
      </div>
    </footer>
  );
}
