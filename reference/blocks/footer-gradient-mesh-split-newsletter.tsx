import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";

/**
 * Footer con fondo de gradiente radial mesh en tono primary (varias manchas
 * suaves superpuestas), layout split asimétrico: marca + tagline a la
 * izquierda, tarjeta de newsletter elevada (borde + sombra) flotando a la
 * derecha, y una franja de columnas de enlaces separada por borde debajo.
 */

type LinkItem = { label: string; href: string };
type LinkColumn = { heading: string; links: LinkItem[] };

export function FooterGradientMeshSplitNewsletter({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  const columns = t.raw("columns") as LinkColumn[];
  const legalLinks = t.raw("legalLinks") as LinkItem[];

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 text-primary opacity-10 [background-image:radial-gradient(ellipse_60%_50%_at_15%_10%,currentColor,transparent_60%),radial-gradient(ellipse_45%_40%_at_85%_0%,currentColor,transparent_55%),radial-gradient(ellipse_55%_45%_at_50%_100%,currentColor,transparent_60%)]"
      />

      <div className="relative py-(--section-gap)">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div className="flex flex-col gap-5">
                <p className="font-display text-3xl tracking-tight text-foreground">
                  {t("brand")}
                </p>
                <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
                  {t("tagline")}
                </p>
              </div>

              <div className="lg:justify-self-end lg:pt-2">
                <div className="w-full max-w-sm rounded-lg border border-border bg-card p-7 shadow-lg lg:translate-y-[-0.75rem]">
                  <h2 className="font-display text-lg tracking-tight text-foreground">
                    {t("newsletter.title")}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t("newsletter.description")}
                  </p>
                  <form className="mt-5 flex flex-col gap-3">
                    <label className="sr-only" htmlFor={`${ns}-newsletter-email`}>
                      {t("newsletter.placeholder")}
                    </label>
                    <input
                      id={`${ns}-newsletter-email`}
                      type="email"
                      placeholder={t("newsletter.placeholder")}
                      className="w-full rounded-sm border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-sm bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {t("newsletter.buttonLabel")}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="relative mt-14 border-t border-border">
          <div className="mx-auto w-full max-w-6xl px-6 pt-10 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {columns.map((column, index) => (
                <Reveal key={column.heading} delay={index * 60}>
                  <nav aria-label={column.heading}>
                    <h2 className="font-display text-sm tracking-tight text-foreground">
                      {column.heading}
                    </h2>
                    <ul className="mt-5 flex flex-col gap-3">
                      {column.links.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            className="text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">{t("copyright")}</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-xs text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
