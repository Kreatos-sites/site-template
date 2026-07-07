import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type Logo = {
  name: string;
  image: string;
  imageAlt: string;
};

export function LogoCloudDualRowOppositeDrift({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const rowOne = t.raw("rowOne") as Logo[];
  const rowTwo = t.raw("rowTwo") as Logo[];

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
      </div>

      <Reveal delay={80}>
        <div
          className="group/drift relative mt-16 flex flex-col gap-6 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <style>{`
            @keyframes logo-cloud-dual-row-drift-forward {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            @keyframes logo-cloud-dual-row-drift-reverse {
              from { transform: translateX(-50%); }
              to { transform: translateX(0); }
            }
            .logo-cloud-dual-row-track-forward {
              animation: logo-cloud-dual-row-drift-forward 36s linear infinite;
            }
            .logo-cloud-dual-row-track-reverse {
              animation: logo-cloud-dual-row-drift-reverse 36s linear infinite;
            }
            .group\\/drift:hover .logo-cloud-dual-row-track-forward,
            .group\\/drift:hover .logo-cloud-dual-row-track-reverse {
              animation-play-state: paused;
            }
            @media (prefers-reduced-motion: reduce) {
              .logo-cloud-dual-row-track-forward,
              .logo-cloud-dual-row-track-reverse {
                animation-play-state: paused;
              }
            }
          `}</style>

          <ul className="logo-cloud-dual-row-track-forward flex w-max items-center gap-12">
            {[...rowOne, ...rowOne].map((item, i) => (
              <li
                key={i}
                aria-hidden={i >= rowOne.length ? "true" : undefined}
                className="shrink-0"
              >
                <article className="flex h-20 w-40 items-center justify-center rounded-sm bg-card px-6">
                  <SmartImage
                    src={item.image}
                    alt={item.imageAlt}
                    className="aspect-[3/1] opacity-60 grayscale transition-all duration-300 ease-out hover:opacity-100 hover:grayscale-0"
                  />
                </article>
              </li>
            ))}
          </ul>

          <ul className="logo-cloud-dual-row-track-reverse flex w-max items-center gap-12">
            {[...rowTwo, ...rowTwo].map((item, i) => (
              <li
                key={i}
                aria-hidden={i >= rowTwo.length ? "true" : undefined}
                className="shrink-0"
              >
                <article className="flex h-20 w-40 items-center justify-center rounded-sm bg-card px-6">
                  <SmartImage
                    src={item.image}
                    alt={item.imageAlt}
                    className="aspect-[3/1] opacity-60 grayscale transition-all duration-300 ease-out hover:opacity-100 hover:grayscale-0"
                  />
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
