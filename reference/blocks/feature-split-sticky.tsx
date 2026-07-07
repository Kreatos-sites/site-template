import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

export function FeatureSplitSticky({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const points = t.raw("points") as string[];

  return (
    <section className="py-(--section-gap) border-t border-border">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-2 lg:items-start">
          {/* Media — sticky */}
          <div className="lg:sticky lg:top-24">
            <Reveal>
              <figure className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -inset-x-4 -top-4 bottom-8 -z-10 rounded-[2rem] bg-secondary/40"
                />
                <SmartImage
                  src={t("image")}
                  alt={t("imageAlt")}
                  className="aspect-[4/3] w-full rounded-2xl object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </figure>
            </Reveal>
          </div>

          {/* Texto */}
          <div className="lg:pt-6">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-6 max-w-xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
                {t("body")}
              </p>
            </Reveal>

            <ul className="mt-12 space-y-px border-t border-border">
              {points.map((point, index) => (
                <Reveal key={index} delay={index * 60}>
                  <li className="flex items-baseline gap-6 border-b border-border py-6">
                    <span
                      aria-hidden="true"
                      className="font-display text-sm tabular-nums text-primary/70"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base leading-relaxed text-secondary-foreground">
                      {point}
                    </h3>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
