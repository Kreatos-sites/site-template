import { useTranslations } from "next-intl";
import { CalendarCheck, PhoneCall } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";

export function ClinicAppointmentGradientCtaDark({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-t border-border bg-foreground py-(--section-gap)">
      <div className="bg-gradient-to-br from-primary to-foreground">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary-foreground/70 uppercase">
                {t("eyebrow")}
              </p>
            </Reveal>

            <Reveal delay={60}>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-primary-foreground">
                {t("title")}
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-5 text-base leading-relaxed text-primary-foreground/80">
                {t("description")}
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={t("primaryCta.href")}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-8 py-4 text-sm font-medium text-secondary-foreground transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:outline-none"
                >
                  <CalendarCheck className="size-4" strokeWidth={1.75} />
                  {t("primaryCta.label")}
                </a>
                <a
                  href={t("secondaryCta.href")}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-primary-foreground/30 px-8 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10 focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:outline-none"
                >
                  <PhoneCall className="size-4" strokeWidth={1.75} />
                  {t("secondaryCta.label")}
                </a>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <p className="mt-8 text-xs font-medium tracking-[0.15em] text-primary-foreground/60 uppercase">
                {t("note")}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
