import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";

type LogoItem = { name: string };

export function LogoCloudMarqueeInfiniteResponsiveDrift({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const logos = t.raw("logos") as LogoItem[];
  const track = [...logos, ...logos];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 text-center font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div
            className="group relative mt-16 overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <ul className="flex w-max animate-[marquee_32s_linear_infinite] items-center gap-16 group-hover:[animation-play-state:paused]">
              {track.map((logo, i) => (
                <li
                  key={i}
                  className="flex h-12 shrink-0 items-center justify-center px-4"
                  aria-hidden={i >= logos.length}
                >
                  <span className="text-lg font-semibold tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground">
                    {logo.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
