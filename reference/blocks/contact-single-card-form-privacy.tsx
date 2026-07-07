import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { RiShieldCheckLine } from "@remixicon/react";

export function ContactSingleCardFormPrivacy({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-2xl px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground text-pretty">
              {t("subtitle")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <form className="mt-12 flex flex-col gap-6 rounded-sm border border-border bg-card p-8 sm:p-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="firstName"
                  className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase"
                >
                  {t("fields.firstName.label")}
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder={t("fields.firstName.placeholder")}
                  className="rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="lastName"
                  className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase"
                >
                  {t("fields.lastName.label")}
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder={t("fields.lastName.placeholder")}
                  className="rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase"
                >
                  {t("fields.email.label")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("fields.email.placeholder")}
                  className="rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="phone"
                  className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase"
                >
                  {t("fields.phone.label")}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder={t("fields.phone.placeholder")}
                  className="rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2 sm:col-span-2">
                <label
                  htmlFor="message"
                  className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase"
                >
                  {t("fields.message.label")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder={t("fields.message.placeholder")}
                  className="resize-none rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            <label
              htmlFor="consent"
              className="flex items-start gap-3 text-xs leading-relaxed text-muted-foreground"
            >
              <input
                id="consent"
                name="consent"
                type="checkbox"
                aria-label={t("consentLabel")}
                className="mt-0.5 size-4 shrink-0 rounded-sm border border-border bg-background text-primary focus:ring-2 focus:ring-primary focus:outline-none"
              />
              {t("consentLabel")}
            </label>

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-sm bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t("submitLabel")}
            </button>

            <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <RiShieldCheckLine
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-primary"
              />
              {t("privacyNote")}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
