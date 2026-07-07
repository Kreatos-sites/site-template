import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";

type NavLink = { label: string; href: string };

export function FooterInlineBlurWordmarkCompact({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const links = t.raw("links") as NavLink[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5 text-center lg:flex-row lg:items-baseline lg:justify-between lg:gap-6 lg:text-left">
          <Reveal>
            <span className="font-display text-base tracking-tight text-foreground">{t("wordmark")}</span>
          </Reveal>

          <Reveal delay={60}>
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
          </Reveal>

          <Reveal delay={120}>
            <p className="text-xs text-muted-foreground">{t("copyright")}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
