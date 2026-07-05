import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

type Card = { title: string; description: string };

/** Offset vertical por columna: escalera descendente que da ritmo al grid. */
const COLUMN_OFFSET = ["lg:mt-0", "lg:mt-16", "lg:mt-32"] as const;

export function OffsetCards({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const cards = t.raw("cards") as Card[];

  return (
    <section className="border-t border-border py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-tight text-balance">
              {t("title")}
            </h2>
          </div>
        </Reveal>

        <ul className="mt-16 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {cards.map((card, index) => (
            <li key={card.title} className={cn(COLUMN_OFFSET[index % 3])}>
              <Reveal delay={index * 60}>
                <article className="group relative flex h-full flex-col border-t border-border pt-6 transition-colors hover:border-primary">
                  <span
                    aria-hidden="true"
                    className="font-display text-sm text-primary/70 tabular-nums transition-colors group-hover:text-primary"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-2xl tracking-tight text-balance">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
