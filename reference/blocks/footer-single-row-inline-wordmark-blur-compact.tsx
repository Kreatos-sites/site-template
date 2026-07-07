import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { ArrowUpIcon } from "@phosphor-icons/react/dist/ssr";

type NavLink = { label: string; href: string };

export function FooterSingleRowInlineWordmarkBlurCompact({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const links = t.raw("links") as NavLink[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-5 rounded-lg border border-border bg-card/60 px-6 py-5 text-center backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:text-left">
            <span className="font-display text-base tracking-tight text-foreground">
              {t("wordmark")}
            </span>

            <nav aria-label={t("navLabel")} className="order-3 w-full lg:order-none lg:w-auto">
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
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

            <div className="flex items-center gap-4">
              <p className="text-xs whitespace-nowrap text-muted-foreground">{t("copyright")}</p>
              <span className="hidden h-4 w-px bg-border lg:block" aria-hidden="true" />
              <a
                href="#top"
                aria-label={t("backToTopLabel")}
                className="flex size-8 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ArrowUpIcon className="size-4" weight="bold" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
