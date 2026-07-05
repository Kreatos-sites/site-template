import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

export function BannerStatement({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const label = t("label");

  return (
    <section className="relative overflow-hidden bg-primary py-[clamp(4.5rem,3rem+9vw,9rem)] text-primary-foreground">
      {/* Gesto memorable: comilla sobredimensionada, sangrada fuera del margen */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-[0.35em] left-[max(1rem,calc(50%-34rem))] select-none font-display text-[clamp(11rem,9rem+22vw,26rem)] leading-none text-primary-foreground/10"
      >
        &ldquo;
      </span>

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-4xl text-center">
          {label ? (
            <span className="mb-6 inline-flex items-center gap-3 text-xs font-medium tracking-[0.25em] text-primary-foreground/70 uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-primary-foreground/40" />
              {label}
              <span aria-hidden="true" className="h-px w-8 bg-primary-foreground/40" />
            </span>
          ) : null}

          <h2 className="font-display text-[clamp(1.9rem,1.2rem+3.4vw,3.6rem)] leading-[1.08] tracking-tight text-balance">
            {t("statement")}
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
