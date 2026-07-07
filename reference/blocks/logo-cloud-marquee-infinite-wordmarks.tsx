import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

type Wordmark = {
  name: string;
};

export function LogoCloudMarqueeInfiniteWordmarks({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const wordmarks = t.raw("wordmarks") as Wordmark[];

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
      </div>

      <Reveal delay={80}>
        <div
          className="relative mt-16 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <style>{`
            @keyframes logo-cloud-marquee-track {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            .logo-cloud-marquee-track {
              animation: logo-cloud-marquee-track 32s linear infinite;
            }
            @media (prefers-reduced-motion: reduce) {
              .logo-cloud-marquee-track {
                animation-play-state: paused;
              }
            }
          `}</style>
          <ul className="logo-cloud-marquee-track flex w-max items-center gap-16">
            {[...wordmarks, ...wordmarks].map((item, i) => (
              <li
                key={i}
                aria-hidden={i >= wordmarks.length ? "true" : undefined}
                className="shrink-0"
              >
                <span className="font-display text-2xl tracking-tight text-muted-foreground/70 transition-colors duration-300 hover:text-foreground sm:text-3xl">
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
