import { ArrowDownToLine, FileDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

export function DownloadBrochure({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section
      data-demo="descargable"
      className="border-t border-border py-(--section-gap)"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
            {/* Marca de agua tipográfica: gesto memorable, decorativa */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-6 -bottom-10 select-none font-display text-[7rem] leading-none tracking-tight text-primary/[0.06] sm:text-[9rem]"
            >
              PDF
            </span>

            <div className="relative flex flex-col gap-10 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
              <div className="flex items-start gap-5">
                <span
                  aria-hidden="true"
                  className="grid size-14 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20"
                >
                  <FileDown className="size-7" />
                </span>

                <div className="max-w-xl">
                  <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                    {t("eyebrow")}
                  </p>
                  <h2 className="mt-3 font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] leading-[1.1] tracking-tight text-balance">
                    {t("title")}
                  </h2>
                  <p className="mt-4 text-[0.98rem] leading-relaxed text-muted-foreground">
                    {t("description")}
                  </p>
                </div>
              </div>

              <div className="shrink-0 lg:pl-8">
                <a
                  href={t("href")}
                  download
                  className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground ring-1 ring-inset ring-primary/60 transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {t("cta")}
                  <ArrowDownToLine className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
