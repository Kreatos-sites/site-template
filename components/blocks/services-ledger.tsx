import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

type LedgerRow = { name: string; description: string; meta?: string };

export function ServicesLedger({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const rows = t.raw("rows") as LedgerRow[];

  return (
    <section className="border-t border-border bg-card py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <header className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.98] tracking-tight text-balance">
                {t("title")}
              </h2>
            </div>
            <span
              aria-hidden="true"
              className="hidden font-display text-sm tabular-nums text-muted-foreground/70 sm:block"
            >
              {String(rows.length).padStart(2, "0")} —
            </span>
          </header>
        </Reveal>

        <ol className="mt-6 border-t border-border">
          {rows.map((row, index) => (
            <li key={row.name} className="border-b border-border">
              <Reveal delay={index * 60}>
                <article className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-3 py-9 transition-colors duration-500 sm:grid-cols-[3.5rem_1fr_auto] sm:gap-x-8 sm:py-11">
                  <span
                    aria-hidden="true"
                    className="font-display text-sm tabular-nums text-muted-foreground/60 transition-colors duration-500 group-hover:text-primary sm:pt-2"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <h3 className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] leading-[1.02] tracking-tight text-balance transition-transform duration-500 ease-out group-hover:translate-x-1">
                      {row.name}
                    </h3>
                    <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
                      {row.description}
                    </p>
                  </div>

                  {row.meta ? (
                    <div className="col-start-2 flex items-baseline gap-2 sm:col-start-3 sm:justify-end sm:pt-2 sm:text-right">
                      <span
                        aria-hidden="true"
                        className="h-px w-8 self-center bg-border transition-colors duration-500 group-hover:bg-primary sm:hidden"
                      />
                      <span className="font-display text-lg tracking-tight text-primary tabular-nums whitespace-nowrap">
                        {row.meta}
                      </span>
                    </div>
                  ) : null}
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
