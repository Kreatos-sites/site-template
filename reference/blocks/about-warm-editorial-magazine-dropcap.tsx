import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

export function AboutWarmEditorialMagazineDropcap({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const paragraphs = t.raw("paragraphs") as string[];
  const [firstParagraph, ...restParagraphs] = paragraphs;

  return (
    <section className="border-t border-border bg-secondary py-(--section-gap)">
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
          <div className="mt-14 border-t border-border pt-12">
            <figure className="float-right ml-8 mb-6 w-40 sm:w-48 lg:w-56">
              <SmartImage
                src={t("image")}
                alt={t("imageAlt")}
                className="aspect-[4/5] rounded-sm"
              />
              <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {t("caption")}
              </figcaption>
            </figure>

            <div className="columns-1 gap-10 [column-rule:1px_solid_var(--border)] sm:columns-2">
              <p className="mb-6 text-base leading-relaxed text-foreground [text-wrap:pretty] first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.85] first-letter:text-primary">
                {firstParagraph}
              </p>
              {restParagraphs.map((p, i) => (
                <p key={i} className="mb-6 text-base leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
