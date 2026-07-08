import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

export function HeroMarqueeScrollingTextBand({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const words = t.raw("marqueeWords") as string[];
  const track = [...words, ...words];

  return (
    <section className="relative overflow-hidden border-t border-border bg-foreground py-(--section-gap)">
      <style>{`
        @keyframes hero-marquee-band-track {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .hero-marquee-band-track {
          animation: hero-marquee-band-track 28s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-marquee-band-track {
            animation-play-state: paused;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-0 w-full -translate-y-1/2 select-none overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="hero-marquee-band-track flex w-max items-center gap-10 opacity-[0.08]">
          {track.map((word, i) => (
            <span
              key={i}
              className="shrink-0 font-display text-[clamp(4rem,14vw,10rem)] leading-none tracking-tight text-background uppercase"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-tight text-balance text-background">
              {t("title")}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 text-lg leading-relaxed text-background/70 text-pretty">
              {t("subtitle")}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={t("primaryCta.href")}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground uppercase transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
                )}
              >
                {t("primaryCta.label")}
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </a>
              <a
                href={t("secondaryCta.href")}
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-background/20 px-8 py-4 text-sm font-medium tracking-wide text-background uppercase transition-colors hover:bg-background/10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                {t("secondaryCta.label")}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
