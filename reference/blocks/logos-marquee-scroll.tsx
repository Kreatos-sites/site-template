import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

type Logo = { name: string };

export function LogosMarqueeScroll({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const logos = t.raw("logos") as Logo[];

  // Duplicado para continuidad del loop: la pista traslada -50%, así el
  // segundo bloque ocupa exactamente el hueco del primero sin salto.
  const track = [...logos, ...logos];

  return (
    <section
      data-demo="clientes"
      className="border-t border-border bg-secondary py-(--section-gap) text-secondary-foreground"
    >
      <style>{`
        @keyframes lms-scroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .lms-track {
          animation: lms-scroll 42s linear infinite;
          will-change: transform;
        }
        .lms-viewport:hover .lms-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .lms-track {
            animation: none;
            transform: none;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <span
              aria-hidden="true"
              className="hidden h-px flex-1 translate-y-[-0.15em] bg-border sm:block"
            />
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-12">
        {/* Viewport de ancho completo con máscaras de desvanecimiento en los
            bordes: la franja emerge y se disuelve, no arranca en seco. */}
        <div
          className="lms-viewport relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          <ul
            className="lms-track flex w-max items-center gap-x-16 gap-y-6 pr-16"
            aria-hidden="true"
          >
            {track.map((logo, index) => (
              <li key={`${logo.name}-${index}`} className="flex items-center gap-x-16">
                <span className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] leading-none font-medium tracking-tight text-secondary-foreground/70 whitespace-nowrap">
                  {logo.name}
                </span>
                <span
                  aria-hidden="true"
                  className="size-1.5 shrink-0 rounded-full bg-primary/40"
                />
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Lista accesible real para lectores de pantalla (la marquesina visual
          está oculta con aria-hidden para no leer los nombres duplicados). */}
      <ul className="sr-only">
        {logos.map((logo) => (
          <li key={logo.name}>{logo.name}</li>
        ))}
      </ul>
    </section>
  );
}
