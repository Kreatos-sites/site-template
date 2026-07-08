import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

/**
 * BLOQUE: hero-split-diagonal-clip-image — hero asimétrico de dos columnas
 * separadas por un corte diagonal (clip-path) en vez de una línea recta: el
 * texto vive a la izquierda sobre bg-background y el panel de imagen a la
 * derecha invade el espacio central con un ángulo, generando un layout
 * dinámico. En mobile la imagen baja debajo del texto como panel rectangular
 * normal (sin diagonal, para evitar recortes ilegibles en pantallas chicas).
 *
 * ns: { eyebrow, title, subtitle, primaryCta: {label, href},
 *       secondaryCta: {label, href}, highlights: string[] (3 items),
 *       image, imageAlt }
 */
export function HeroSplitDiagonalClipImage({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const highlights = t.raw("highlights") as string[];

  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Columna texto */}
          <div className="relative z-10 lg:col-span-6 lg:pr-8">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h1 className="mt-5 font-display text-[clamp(2.25rem,1.4rem+3.6vw,3.75rem)] leading-[1.03] tracking-tight text-balance text-foreground">
                {t("title")}
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
                {t("subtitle")}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <ul className="mt-8 flex flex-col gap-3">
                {highlights.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2.5 text-sm text-foreground"
                  >
                    <CheckCircle2
                      className="size-4 shrink-0 text-primary"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={t("primaryCta.href")}
                  className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {t("primaryCta.label")}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={t("secondaryCta.href")}
                  className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {t("secondaryCta.label")}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Columna imagen — panel normal en mobile, hueco reservado en desktop */}
          <div className="lg:col-span-6">
            <Reveal delay={100}>
              <div className="lg:hidden">
                <SmartImage
                  src={t("image")}
                  alt={t("imageAlt")}
                  className="aspect-[4/3] rounded-sm"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Panel de imagen con corte diagonal, invade el centro en desktop */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)] lg:block"
        aria-hidden="true"
      >
        <SmartImage
          src={t("image")}
          alt=""
          className="h-full"
          sizes="62vw"
        />
      </div>
    </section>
  );
}
