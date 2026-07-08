import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  ChatCircleDotsIcon,
  ClockIcon,
  CoinsIcon,
  HandshakeIcon,
  MapPinIcon,
  PlusIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

/**
 * BLOQUE: faq-staggered-cards-offset-editorial — grid de 3 columnas con
 * tarjetas de pregunta desfasadas verticalmente al estilo masonry (la
 * columna central baja respecto a las laterales), cada tarjeta con icono
 * ilustrado de línea y sombra suave sobre fondo cálido y aireado.
 * Archetype: presentación no lineal para negocios con varias categorías de
 * duda mostradas simultáneamente (distinto de faq-grid-cards-hover-lift,
 * que usa grid parejo sin offset ni categorías con icono).
 *
 * ns esperado:
 *   { eyebrow: string, title: string, intro: string,
 *     items: [{ icon: "chat"|"clock"|"coins"|"handshake"|"pin"|"shield",
 *               category: string, question: string, answer: string }] }
 */

const ICONS: Record<string, Icon> = {
  chat: ChatCircleDotsIcon,
  clock: ClockIcon,
  coins: CoinsIcon,
  handshake: HandshakeIcon,
  pin: MapPinIcon,
  shield: ShieldCheckIcon,
};

type Item = {
  icon: keyof typeof ICONS;
  category: string;
  question: string;
  answer: string;
};

const OFFSET_BY_COLUMN = [
  "sm:mt-0",
  "sm:mt-14",
  "sm:mt-0",
] as const;

export function FaqStaggeredCardsOffsetEditorial({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as Item[];

  return (
    <section className="border-t border-border bg-secondary py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {t("intro")}
            </p>
          </div>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-6">
          {items.map((item, index) => {
            const IconCmp = ICONS[item.icon] ?? ChatCircleDotsIcon;
            const column = index % 3;
            return (
              <li
                key={index}
                className={cn(OFFSET_BY_COLUMN[column])}
              >
                <Reveal delay={index * 80}>
                  <details className="group h-full rounded-lg border border-border bg-card p-7 shadow-sm transition-shadow duration-300 [&_summary::-webkit-details-marker]:hidden hover:shadow-md">
                    <summary className="flex cursor-pointer list-none flex-col gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                      <div className="flex items-start justify-between gap-4">
                        <span className="grid size-11 shrink-0 place-items-center rounded-md bg-secondary text-primary">
                          <IconCmp
                            className="size-5"
                            weight="thin"
                            aria-hidden="true"
                          />
                        </span>
                        <span
                          aria-hidden="true"
                          className="mt-1 grid size-6 shrink-0 place-items-center text-muted-foreground transition-transform duration-300 group-open:rotate-45"
                        >
                          <PlusIcon className="size-4" weight="bold" />
                        </span>
                      </div>
                      <div>
                        <p className="text-[0.6875rem] font-medium tracking-[0.2em] text-primary uppercase">
                          {item.category}
                        </p>
                        <h3 className="mt-2 font-display text-lg leading-snug tracking-tight text-balance text-foreground">
                          {item.question}
                        </h3>
                      </div>
                    </summary>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {item.answer}
                    </p>
                  </details>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
