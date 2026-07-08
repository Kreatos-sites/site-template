import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { HeartHandshake } from "lucide-react";

export function ContactCenteredWarmPhotoTeamBand({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-t border-border bg-background">
      <Reveal>
        <SmartImage
          src={t("image")}
          alt={t("imageAlt")}
          className="aspect-[21/9] w-full sm:aspect-[3/1]"
        />
      </Reveal>

      <div className="mx-auto w-full max-w-2xl px-6 py-(--section-gap) lg:px-8">
        <Reveal delay={60}>
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

        <Reveal delay={120}>
          <form className="mt-12 flex flex-col gap-6 rounded-sm border border-border bg-card p-8 sm:p-10">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase"
              >
                {t("fields.name.label")}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder={t("fields.name.placeholder")}
                className="rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact"
                className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase"
              >
                {t("fields.contact.label")}
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                placeholder={t("fields.contact.placeholder")}
                className="rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase"
              >
                {t("fields.message.label")}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder={t("fields.message.placeholder")}
                className="resize-none rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <HeartHandshake
                aria-hidden="true"
                className="size-4"
                strokeWidth={1.75}
              />
              {t("submitLabel")}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
