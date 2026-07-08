import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type Logo = {
  name: string;
  image: string;
  imageAlt: string;
};

const OFFSET = [
  "sm:translate-y-0 -rotate-2",
  "sm:translate-y-8 rotate-1",
  "sm:-translate-y-2 -rotate-1",
  "sm:translate-y-10 rotate-2",
  "sm:translate-y-2 -rotate-2",
  "sm:translate-y-12 rotate-1",
  "sm:-translate-y-1 -rotate-1",
  "sm:translate-y-6 rotate-2",
];

export function LogoStaggeredCardsGradientTheme({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const logos = t.raw("logos") as Logo[];

  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-(--section-gap)">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/0 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
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

        <ul className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-y-4">
          {logos.map((logo, index) => (
            <li key={logo.name} className={OFFSET[index % OFFSET.length]}>
              <Reveal delay={index * 60}>
                <div className="group flex aspect-[4/3] flex-col items-center justify-center gap-4 rounded-lg border border-border bg-card p-6 shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
                  <SmartImage
                    src={logo.image}
                    alt={logo.imageAlt}
                    className="aspect-[16/7] w-full opacity-70 grayscale transition-all duration-300 ease-out group-hover:opacity-100 group-hover:grayscale-0"
                  />
                  <span className="text-center text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    {logo.name}
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
