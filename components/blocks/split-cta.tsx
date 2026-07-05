import { ArrowUpRight, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

export function SplitCta({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="bg-secondary text-secondary-foreground py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-y-12 gap-x-8 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          {/* Columna izquierda: titular protagonista */}
          <Reveal className="max-w-2xl">
            <span className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </span>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,1.4rem+4.2vw,4.5rem)] leading-[0.98] tracking-tight text-balance">
              {t("title")}
            </h2>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-secondary-foreground/70">
              {t("description")}
            </p>
          </Reveal>

          {/* Columna derecha: acciones apiladas */}
          <Reveal
            delay={120}
            className="flex flex-col gap-px overflow-hidden rounded-2xl border border-secondary-foreground/15"
          >
            <a
              href="#contacto"
              className={cn(
                "group flex items-center justify-between gap-6 bg-primary px-6 py-7 text-primary-foreground transition-colors",
                "hover:bg-primary/90",
              )}
            >
              <span className="font-display text-lg tracking-tight">
                {t("primaryCta")}
              </span>
              <ArrowUpRight
                className="size-6 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href="#contacto"
              className={cn(
                "group flex items-center justify-between gap-6 bg-secondary-foreground/[0.06] px-6 py-7 text-secondary-foreground transition-colors",
                "hover:bg-secondary-foreground/10",
              )}
            >
              <span className="font-display text-lg tracking-tight">
                {t("secondaryCta")}
              </span>
              <Phone
                className="size-5 shrink-0 text-secondary-foreground/60 transition-colors group-hover:text-secondary-foreground"
                aria-hidden="true"
              />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
