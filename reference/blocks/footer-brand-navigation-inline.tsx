import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { Compass } from "lucide-react";

type NavLink = { label: string; href: string };
type LegalLink = { label: string; href: string };

export function FooterBrandNavigationInline({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const links = t.raw("links") as NavLink[];
  const legalLinks = t.raw("legalLinks") as LegalLink[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-primary text-primary-foreground">
                <Compass className="size-4.5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="font-display text-base text-foreground">{t("brand")}</p>
                <p className="text-xs text-muted-foreground">{t("tagline")}</p>
              </div>
            </div>

            <nav aria-label={t("navLabel")}>
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {links.map((link, i) => (
                  <li key={i}>
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
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">{t("copyright")}</p>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              {legalLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
