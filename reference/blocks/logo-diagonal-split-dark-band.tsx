import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";

type Ally = { name: string; sector: string };

export function LogoDiagonalSplitDarkBand({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const allies = t.raw("allies") as Ally[];

  return (
    <section className="border-t border-border bg-foreground py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="relative overflow-hidden lg:grid lg:grid-cols-12">
          <div
            className="relative flex flex-col justify-center py-4 lg:col-span-6 lg:pr-16 lg:pb-4"
            style={{
              clipPath: "polygon(0 0, 100% 0, 88% 100%, 0 100%)",
            }}
          >
            <div className="lg:max-w-md">
              <Reveal>
                <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                  {t("eyebrow")}
                </p>
                <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
                  {t("title")}
                </h2>
                <p className="mt-6 text-base leading-relaxed text-background/70">
                  {t("description")}
                </p>
              </Reveal>

              <Reveal delay={100}>
                <div className="mt-10 flex items-baseline gap-3 border-t border-background/20 pt-6">
                  <span className="font-display text-4xl tracking-tight text-background">
                    {t("statValue")}
                  </span>
                  <span className="text-sm leading-snug text-background/60">
                    {t("statLabel")}
                  </span>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="mt-12 lg:col-span-6 lg:mt-0 lg:pl-10">
            <ul className="grid grid-cols-2 gap-px border border-background/15 bg-background/15 sm:grid-cols-3">
              {allies.map((ally, i) => (
                <li key={i} className="contents">
                  <Reveal delay={i * 60}>
                    <article className="flex h-full min-h-24 flex-col justify-center gap-2 bg-foreground px-4 py-5">
                      <span className="font-display text-lg tracking-tight text-background">
                        {ally.name}
                      </span>
                      <span className="text-[0.65rem] font-medium tracking-[0.2em] text-background/50 uppercase">
                        {ally.sector}
                      </span>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
