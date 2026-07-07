import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

type Cta = {
  label: string;
  href: string;
};

export function CtaInlineSlim({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const cta = t.raw("cta") as Cta;

  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="flex items-baseline gap-4">
            <span
              aria-hidden="true"
              className="hidden h-px w-10 shrink-0 translate-y-[-0.35em] bg-primary/70 sm:block"
            />
            <div className="max-w-2xl">
              <h2 className="font-display text-[clamp(1.35rem,1rem+1.6vw,2.1rem)] leading-[1.1] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground text-pretty">
                {t("description")}
              </p>
            </div>
          </div>

          <a
            href={cta.href}
            className="group inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-primary px-6 py-3 text-sm font-medium tracking-tight text-primary-foreground ring-1 ring-primary/20 transition-colors hover:bg-primary/90 md:self-auto"
          >
            {cta.label}
            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
