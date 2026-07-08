import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { ArrowUpRight } from "lucide-react";

type FooterLink = { label: string; href: string };
type FooterColumn = { heading: string; links: FooterLink[] };

export function FooterInvertedDarkBandCta({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const columns = t.raw("columns") as FooterColumn[];
  const legalLinks = t.raw("legalLinks") as FooterLink[];

  return (
    <footer className="border-t border-border bg-foreground">
      <div className="mx-auto w-full max-w-6xl px-6 py-(--section-gap) lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 pb-12 lg:flex-row lg:items-end">
            <p className="max-w-2xl font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.1] tracking-tight text-balance text-background">
              {t("statement")}
            </p>
            <a
              href={t("ctaHref")}
              className="group inline-flex shrink-0 items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors duration-300 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {t("ctaLabel")}
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>

        <div className="border-t border-background/15" />

        <div className="grid grid-cols-2 gap-10 pt-12 sm:grid-cols-3">
          {columns.map((column, columnIndex) => (
            <Reveal key={columnIndex} delay={columnIndex * 80}>
              <div>
                <h3 className="font-display text-sm font-medium tracking-[0.2em] text-background/50 uppercase">
                  {column.heading}
                </h3>
                <ul className="mt-6 flex flex-col gap-4">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-sm leading-relaxed text-background/80 transition-colors duration-300 hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
          <div className="mt-16 flex flex-col gap-6 border-t border-background/15 pt-8 text-xs text-background/50 sm:flex-row sm:items-center sm:justify-between">
            <p>{t("copyright")}</p>
            <ul className="flex flex-wrap items-center gap-6">
              {legalLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="transition-colors duration-300 hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
