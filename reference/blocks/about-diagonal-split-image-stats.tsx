import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { Compass } from "lucide-react";

export function AboutDiagonalSplitImageStats({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="relative grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-stretch lg:gap-0">
          <div className="relative lg:col-span-7">
            <Reveal>
              <div
                className="relative aspect-[4/3] lg:h-full lg:min-h-[30rem]"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 84% 100%, 0 100%)",
                }}
              >
                <SmartImage
                  src={t("image")}
                  alt={t("imageAlt")}
                  className="h-full w-full rounded-none"
                />
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="absolute right-0 bottom-0 z-10 w-52 translate-y-1/3 border border-border bg-card p-6 shadow-lg sm:right-6 lg:right-10">
                <Compass className="size-5 text-primary" strokeWidth={1.75} />
                <p className="mt-4 font-display text-4xl tracking-tight text-foreground">
                  {t("stat.value")}
                </p>
                <p className="mt-2 text-xs leading-snug text-muted-foreground">
                  {t("stat.label")}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col justify-center pt-16 lg:col-span-5 lg:pt-0 lg:pl-14">
            <Reveal delay={80}>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
              <div className="mt-6 space-y-4">
                {paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-base leading-relaxed text-muted-foreground"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-8 border-l-2 border-primary pl-5">
                <p className="text-sm leading-relaxed text-foreground">
                  {t("quote")}
                </p>
                <p className="mt-3 text-xs tracking-wide text-muted-foreground uppercase">
                  {t("quoteAttribution")}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
