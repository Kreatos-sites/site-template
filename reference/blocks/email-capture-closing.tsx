import { useTranslations } from "next-intl";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";

export function EmailCaptureClosing({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-3xl px-6 text-center lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            {t("description")}
          </p>
        </Reveal>

        <Reveal delay={180}>
          <form
            action={t("formAction")}
            method="post"
            className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="email-capture-closing-input" className="sr-only">
              {t("inputLabel")}
            </label>
            <input
              id="email-capture-closing-input"
              type="email"
              name="email"
              required
              placeholder={t("inputPlaceholder")}
              className="w-full rounded-full border border-border bg-card px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            />
            <button
              type="submit"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            >
              {t("cta")}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </button>
          </form>
        </Reveal>

        <Reveal delay={240}>
          <p className="mx-auto mt-5 flex max-w-md items-center justify-center gap-2 text-xs leading-relaxed text-muted-foreground">
            <ShieldCheck
              aria-hidden="true"
              className="size-4 shrink-0 text-primary"
            />
            {t("legal")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
