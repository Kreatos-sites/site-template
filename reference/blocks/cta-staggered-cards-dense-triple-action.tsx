import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRightIcon, CalculatorIcon, CalendarCheckIcon, FileDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";

/**
 * BLOQUE: cta-staggered-cards-dense-triple-action — tres tarjetas de cierre en
 * fila en escritorio (apiladas en móvil), con desfase vertical alterno y una
 * ligera rotación en la tarjeta central. Cada tarjeta ofrece una ruta de
 * conversión distinta (cotizar, agendar, descargar) con su propio botón, sin
 * fotografía, en un layout denso pensado para cerrar la página con opciones
 * concretas en vez de un único CTA.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, description: string,
 *     cards: { title: string, text: string, icon: "calculator"|"calendar"|"download",
 *               cta: { label: string, href: string } }[] }
 */

const ICONS = {
  calculator: CalculatorIcon,
  calendar: CalendarCheckIcon,
  download: FileDownIcon,
} as const;

type IconKey = keyof typeof ICONS;

const OFFSET = ["lg:translate-y-4", "lg:-translate-y-2 lg:rotate-1", "lg:translate-y-6"];

export function CtaStaggeredCardsDenseTripleAction({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const cards = t.raw("cards") as {
    title: string;
    text: string;
    icon: IconKey;
    cta: { label: string; href: string };
  }[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-pretty text-muted-foreground md:text-base">
              {t("description")}
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
          {cards.map((card, i) => {
            const Icon = ICONS[card.icon];
            return (
              <li key={i} className={cn("lg:transition-transform", OFFSET[i % OFFSET.length])}>
                <Reveal delay={180 + i * 80}>
                  <div className="flex h-full flex-col gap-4 rounded-sm bg-secondary p-6">
                    <span className="inline-flex size-10 items-center justify-center rounded-sm bg-background">
                      <Icon className="size-5 text-primary" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg text-foreground">{card.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.text}</p>
                    </div>
                    <Link
                      href={card.cta.href}
                      className="mt-auto inline-flex items-center gap-2 self-start text-sm font-medium text-primary transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {card.cta.label}
                      <ArrowRightIcon className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
