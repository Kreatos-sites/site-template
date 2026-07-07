import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";

type Ally = { name: string; sector: string };

export function LogoCloudSplitEditorial({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const allies = t.raw("allies") as Ally[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:px-8">
        <Reveal>
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
            <div className="mt-10 flex items-baseline gap-3 border-t border-border pt-6">
              <span className="font-display text-4xl text-foreground">
                {t("statValue")}
              </span>
              <span className="text-sm leading-snug text-muted-foreground">
                {t("statLabel")}
              </span>
            </div>
          </div>
        </Reveal>

        <ul className="grid grid-cols-1 gap-px sm:grid-cols-2">
          {allies.map((ally, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 70}>
                <article className="flex h-full flex-col justify-between gap-8 border border-border bg-card p-8 transition-[filter,opacity] duration-500 ease-out hover:blur-0 hover:opacity-100 motion-safe:blur-[2px] motion-safe:opacity-70">
                  <span className="font-display text-2xl tracking-tight text-foreground">
                    {ally.name}
                  </span>
                  <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                    {ally.sector}
                  </span>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
