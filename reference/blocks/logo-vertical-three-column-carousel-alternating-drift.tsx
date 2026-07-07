import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

type Wordmark = {
  name: string;
};

type Column = {
  items: Wordmark[];
};

export function LogoVerticalThreeColumnCarouselAlternatingDrift({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const columns = t.raw("columns") as Column[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div
            className="group/drift relative mt-16 grid grid-cols-1 gap-4 overflow-hidden rounded-sm border border-border bg-card sm:grid-cols-3"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <style>{`
              @keyframes logo-vtccad-drift-forward {
                from { transform: translateY(0); }
                to { transform: translateY(-50%); }
              }
              @keyframes logo-vtccad-drift-reverse {
                from { transform: translateY(-50%); }
                to { transform: translateY(0); }
              }
              .logo-vtccad-track-forward {
                animation: logo-vtccad-drift-forward 26s linear infinite;
              }
              .logo-vtccad-track-reverse {
                animation: logo-vtccad-drift-reverse 26s linear infinite;
              }
              .group\\/drift:hover .logo-vtccad-track-forward,
              .group\\/drift:hover .logo-vtccad-track-reverse {
                animation-play-state: paused;
              }
              @media (prefers-reduced-motion: reduce) {
                .logo-vtccad-track-forward,
                .logo-vtccad-track-reverse {
                  animation-play-state: paused;
                }
              }
            `}</style>

            {columns.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className="relative h-[26rem] overflow-hidden border-border sm:border-l sm:first:border-l-0"
              >
                <ul
                  className={cn(
                    "flex w-full flex-col items-center gap-8 py-6",
                    columnIndex % 2 === 0
                      ? "logo-vtccad-track-forward"
                      : "logo-vtccad-track-reverse",
                  )}
                  style={{ animationDuration: `${22 + columnIndex * 6}s` }}
                >
                  {[...column.items, ...column.items].map((item, i) => (
                    <li
                      key={i}
                      aria-hidden={i >= column.items.length ? "true" : undefined}
                      className="shrink-0"
                    >
                      <span className="font-display text-xl tracking-tight text-muted-foreground/70 transition-colors duration-300 hover:text-foreground sm:text-2xl">
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
