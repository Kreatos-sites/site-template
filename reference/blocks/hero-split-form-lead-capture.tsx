import { useTranslations } from "next-intl";
import { BadgeCheck, CircleCheck, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";

type Bullet = { title: string; text: string };

/**
 * Bloque compuesto tipo "hero de captura" orientado a conversión B2B: dos
 * columnas, texto y bullets de valor sobre fondo neutro a la izquierda,
 * formulario de contacto/cotización en tarjeta con borde a la derecha (en
 * vez de imagen). Úsalo como primer bloque de una landing donde el
 * objetivo principal es que el visitante deje sus datos.
 */
export function HeroSplitFormLeadCapture({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  const bullets = t.raw("bullets") as Bullet[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h1 className="mt-5 font-display text-[clamp(2.2rem,1.4rem+3.6vw,3.75rem)] leading-[1.03] tracking-tight text-balance text-foreground">
                {t("title")}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
                {t("description")}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <ul className="mt-10 flex flex-col gap-5 border-t border-border pt-8">
                {bullets.map((bullet, index) => (
                  <li key={bullet.title} className="flex gap-4">
                    <CircleCheck
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-primary"
                      strokeWidth={1.75}
                    />
                    <div>
                      <p className="font-display text-base text-foreground">
                        {bullet.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {bullet.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-10 flex items-center gap-2 text-xs leading-relaxed text-muted-foreground">
                <BadgeCheck
                  aria-hidden="true"
                  className="size-4 shrink-0 text-primary"
                />
                {t("trustNote")}
              </p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="rounded-sm border border-border bg-card p-8 sm:p-10">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("formEyebrow")}
              </p>
              <h2 className="mt-3 font-display text-xl text-foreground">
                {t("formTitle")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t("formDescription")}
              </p>

              <form
                action={t("formAction")}
                method="post"
                className="mt-8 flex flex-col gap-5"
              >
                <div>
                  <label
                    htmlFor="hero-lead-capture-name"
                    className="text-sm font-medium text-foreground"
                  >
                    {t("nameLabel")}
                  </label>
                  <input
                    id="hero-lead-capture-name"
                    type="text"
                    name="name"
                    required
                    placeholder={t("namePlaceholder")}
                    className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="hero-lead-capture-email"
                    className="text-sm font-medium text-foreground"
                  >
                    {t("emailLabel")}
                  </label>
                  <input
                    id="hero-lead-capture-email"
                    type="email"
                    name="email"
                    required
                    placeholder={t("emailPlaceholder")}
                    className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="hero-lead-capture-message"
                    className="text-sm font-medium text-foreground"
                  >
                    {t("messageLabel")}
                  </label>
                  <textarea
                    id="hero-lead-capture-message"
                    name="message"
                    rows={4}
                    required
                    placeholder={t("messagePlaceholder")}
                    className="mt-2 w-full resize-none rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex w-full items-center justify-center rounded-sm bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                >
                  {t("submitCta")}
                </button>

                <p className="flex items-center gap-2 text-xs leading-relaxed text-muted-foreground">
                  <ShieldCheck
                    aria-hidden="true"
                    className="size-4 shrink-0 text-primary"
                  />
                  {t("formLegal")}
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
