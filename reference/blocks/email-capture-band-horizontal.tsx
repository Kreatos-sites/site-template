import { useTranslations } from "next-intl";
import { RiMailLine, RiShieldCheckLine } from "@remixicon/react";

import { Reveal } from "@/components/shared/reveal";

export function EmailCaptureBandHorizontal({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 rounded-lg bg-card p-8 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
          <Reveal>
            <div className="flex items-center gap-2">
              <RiMailLine
                aria-hidden="true"
                className="size-5 shrink-0 text-primary"
              />
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
            </div>
            <h2 className="mt-5 font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.1] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("description")}
            </p>
          </Reveal>

          <Reveal delay={90}>
            <form
              action={t("formAction")}
              method="post"
              className="flex flex-col gap-3"
            >
              <label
                htmlFor="email-capture-band-horizontal-input"
                className="sr-only"
              >
                {t("inputLabel")}
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="email-capture-band-horizontal-input"
                  type="email"
                  name="email"
                  required
                  placeholder={t("inputPlaceholder")}
                  className="w-full rounded-sm border border-border bg-background px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center justify-center rounded-sm bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                >
                  {t("cta")}
                </button>
              </div>
              <p className="flex items-center gap-2 text-xs leading-relaxed text-muted-foreground">
                <RiShieldCheckLine
                  aria-hidden="true"
                  className="size-4 shrink-0 text-primary"
                />
                {t("legal")}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
