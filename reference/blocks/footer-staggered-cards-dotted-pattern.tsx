import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

/**
 * Footer claro y aireado sobre fondo con patrón de puntos sutil. Cada
 * columna de navegación vive en su propia tarjeta con borde fino, y las
 * tarjetas se escalonan verticalmente (offset alterno arriba/abajo) en vez
 * de alinearse en una fila recta. Cierra con una barra de copyright plana.
 */

type LinkItem = { label: string; href: string };
type CardItem = { title: string; links: LinkItem[]; offset: "up" | "down" };

export function FooterStaggeredCardsDottedPattern({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  const cards = t.raw("cards") as CardItem[];
  const legalLinks = t.raw("legalLinks") as LinkItem[];

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background py-(--section-gap)">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent_100%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="max-w-xl">
            <p className="font-display text-2xl tracking-tight text-foreground">
              {t("brand")}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <li key={card.title}>
              <Reveal delay={index * 70}>
                <nav
                  aria-label={card.title}
                  className={cn(
                    "h-full rounded-lg border border-border bg-card p-6 shadow-sm lg:mt-0",
                    card.offset === "down" ? "lg:mt-10" : "lg:-mt-6",
                  )}
                >
                  <h2 className="font-display text-sm tracking-tight text-foreground">
                    {card.title}
                  </h2>
                  <ul className="mt-5 flex flex-col gap-3">
                    {card.links.map((link) => (
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
            </li>
          ))}
        </ul>

        <div className="relative mt-20 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
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
    </footer>
  );
}
