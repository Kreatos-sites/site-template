import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";

type NavLink = { label: string; href: string };

export function FooterCompactInlineBar({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const links = t.raw("links") as NavLink[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-6 border-t border-border pt-8 text-center lg:flex-row lg:justify-between lg:pt-6 lg:text-left">
            <div className="flex flex-col gap-1 lg:flex-row lg:items-baseline lg:gap-3">
              <span className="font-display text-lg text-foreground">{t("brand")}</span>
              <span className="text-sm text-muted-foreground">{t("tagline")}</span>
            </div>

            <nav aria-label={t("navLabel")}>
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

            <p className="text-sm text-muted-foreground">{t("copyright")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
