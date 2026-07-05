import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";

export function EditorialIntro({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
          <Reveal className="lg:col-span-3">
            <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-4">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-primary/70 lg:w-16"
              />
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-9">
            <h2 className="font-display text-[clamp(1.75rem,1rem+2.6vw,3.25rem)] leading-[1.08] tracking-tight text-balance text-foreground">
              {t("lead")}
            </h2>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
