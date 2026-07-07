import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";

type FooterLink = { label: string; href: string };
type FooterColumn = { title: string; links: FooterLink[] };

export function FooterFourColumnMonochromeWordmarkMinimal({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const columns = t.raw("columns") as FooterColumn[];
  const legalLinks = t.raw("legalLinks") as FooterLink[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {columns.map((column, i) => (
              <div key={i}>
                <h3 className="font-display text-sm text-foreground">{column.title}</h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <p
            aria-hidden="true"
            className="mt-20 select-none text-center font-display leading-none tracking-tight text-transparent [-webkit-text-stroke:1px_var(--foreground)] [font-size:clamp(3rem,13vw,10rem)]"
          >
            {t("wordmark")}
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
            <p>{t("copyright")}</p>
            <ul className="flex items-center gap-6">
              {legalLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="transition-colors hover:text-foreground">
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
