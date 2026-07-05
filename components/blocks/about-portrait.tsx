import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

export function AboutPortrait({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section className="border-t border-border py-(--section-gap)">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Retrato vertical con marco desplazado + índice tipográfico decorativo */}
        <div className="lg:col-span-5">
          <Reveal>
            <figure className="relative">
              <span
                aria-hidden="true"
                className="absolute -top-6 -left-2 font-display text-[clamp(3rem,7vw,5rem)] leading-none text-primary/15 select-none lg:-left-6"
              >
                &mdash;
              </span>
              <div
                aria-hidden="true"
                className="absolute -right-4 -bottom-4 hidden h-full w-full border border-primary/40 lg:block"
              />
              <SmartImage
                src={t("image")}
                alt={t("imageAlt")}
                className="relative aspect-[3/4] w-full"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </figure>
          </Reveal>
        </div>

        {/* Relato tipo carta + firma */}
        <div className="flex flex-col justify-center lg:col-span-7 lg:pl-6">
          <Reveal delay={100}>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>

            <div className="mt-8 max-w-prose space-y-5 text-[1.05rem] leading-relaxed text-muted-foreground">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <figcaption className="mt-12 flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-12 bg-primary/70" />
              <span>
                <span className="block font-display text-lg leading-tight text-foreground">
                  {t("signatureName")}
                </span>
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  {t("signatureRole")}
                </span>
              </span>
            </figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
