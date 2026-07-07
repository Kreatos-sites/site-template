import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function EmailSubscriptionBandInlineForm({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-t border-border bg-secondary py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <div>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
                {t("description")}
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div>
              <form className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  {t("emailLabel")}
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder={t("placeholder")}
                  className="h-12 w-full rounded-sm border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                />
                <button
                  type="submit"
                  className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-sm bg-primary px-6 text-sm font-medium tracking-wide text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary focus-visible:outline-none"
                >
                  {t("cta")}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </button>
              </form>

              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                <ShieldCheck
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  strokeWidth={1.75}
                />
                {t("privacyNote")}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
