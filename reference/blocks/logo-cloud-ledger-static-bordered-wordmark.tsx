import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

type Partner = {
  name: string;
  sector: string;
};

export function LogoCloudLedgerStaticBorderedWordmark({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const partners = t.raw("partners") as Partner[];

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
        </Reveal>

        <Reveal delay={80}>
          <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner, index) => (
              <li key={index} className="contents">
                <article className="flex items-center justify-between gap-4 bg-card px-6 py-5">
                  <span className="font-display text-lg tracking-tight text-foreground">
                    {partner.name}
                  </span>
                  <span className="shrink-0 text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
                    {partner.sector}
                  </span>
                </article>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
