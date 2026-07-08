import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

/**
 * BLOQUE: faq-dark-gradient-diagonal-numbered — Panel en modo oscuro forzado
 * (bg-foreground) con un wash de gradiente diagonal en el color primary del
 * theme cruzando de esquina a esquina a baja opacidad, decorativo detrás del
 * contenido. Preguntas listadas como filas numeradas (01, 02, 03) en
 * tipografía grande, densidad alta, sin ícono de acordeón visible: la fila
 * se resalta al hover/focus y la respuesta se despliega inline al abrir
 * (interacción nativa <details>/<summary>). Tono técnico, apto para SaaS o
 * consultoría especializada.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, intro: string,
 *     items: [{ question: string, answer: string }] }
 */
type Item = { question: string; answer: string };

export function FaqDarkGradientDiagonalNumbered({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as Item[];

  return (
    <section className="relative overflow-hidden border-t border-border bg-foreground py-(--section-gap)">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/25 via-transparent to-primary/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-tl from-primary/15 via-transparent to-transparent"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
                {t("title")}
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-background/60">
                {t("intro")}
              </p>
            </div>
          </Reveal>

          <div className="border-t border-background/15">
            {items.map((item, index) => (
              <Reveal key={index} delay={index * 60}>
                <details className="group border-b border-background/15 [&_summary::-webkit-details-marker]:hidden">
                  <summary
                    className="flex cursor-pointer list-none items-baseline gap-5 py-6 transition-colors duration-300 hover:bg-background/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary group-open:bg-background/[0.04]"
                  >
                    <span className="font-mono text-sm text-primary tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-2xl leading-tight tracking-tight text-balance text-background transition-colors duration-300 group-hover:text-background sm:text-3xl">
                      {item.question}
                    </h3>
                  </summary>
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-8 pl-[3.25rem] text-sm leading-relaxed text-background/65 sm:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
