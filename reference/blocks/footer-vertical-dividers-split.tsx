import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";

type FooterLink = { label: string; href: string };
type LinkColumn = { heading: string; links: FooterLink[] };
type LegalLink = { label: string; href: string };

export function FooterVerticalDividersSplit({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const columns = t.raw("columns") as LinkColumn[];
  const legalLinks = t.raw("legalLinks") as LegalLink[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-10 divide-y divide-border lg:flex-row lg:gap-0 lg:divide-x lg:divide-y-0">
            <div className="flex flex-col gap-4 pb-8 lg:basis-72 lg:pb-0 lg:pr-10">
              <span className="font-display text-xl text-foreground">{t("brand")}</span>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{t("description")}</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                <span>{t("statusLabel")}</span>
              </div>
            </div>

            {columns.map((column, i) => (
              <Reveal key={i} delay={(i + 1) * 60}>
                <div className="flex flex-col gap-4 pt-8 lg:flex-1 lg:px-10 lg:pt-0">
                  <h3 className="text-sm font-medium text-foreground">{column.heading}</h3>
                  <ul className="flex flex-col gap-3">
                    {column.links.map((link, j) => (
                      <li key={j}>
                        <a
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
        </Reveal>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-border pt-8 text-center lg:flex-row lg:justify-between lg:text-left">
          <p className="text-xs text-muted-foreground">{t("copyright")}</p>
          <nav aria-label={t("legalNavLabel")}>
            <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs text-muted-foreground">
              {legalLinks.map((link, i) => (
                <li key={i} className="flex items-center gap-2">
                  {i > 0 ? <span aria-hidden="true">·</span> : null}
                  <a
                    href={link.href}
                    className="transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
