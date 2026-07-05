import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { ArrowRight } from "lucide-react";

export function CtaBandCentered({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="relative overflow-hidden bg-primary py-(--section-gap) text-primary-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 rounded-full bg-primary-foreground/5 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-primary-foreground/15" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center lg:px-8">
        <Reveal>
          <span className="text-xs font-medium tracking-[0.25em] text-primary-foreground/70 uppercase">
            {t("eyebrow")}
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.25rem,1.4rem+3.6vw,4.5rem)] leading-[0.98] font-semibold tracking-tight text-balance">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 max-w-xl text-base text-primary-foreground/70 text-pretty sm:text-lg">
            {t("description")}
          </p>
        </Reveal>

        <Reveal delay={240}>
          <a
            href="#contacto"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-primary-foreground px-8 py-4 text-sm font-medium tracking-wide text-primary transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:outline-none"
          >
            {t("cta")}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-1"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
