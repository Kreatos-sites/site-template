"use client";

import { useTranslations } from "next-intl";

import { MapEmbed } from "@/components/shared/map-embed";
import { Reveal } from "@/components/shared/reveal";
import { useContactForm } from "@/components/shared/use-contact-form";
import { whatsappDigits } from "@/lib/config";
import config from "@/site.config";

/**
 * Sección CUSTOM de contacto (split editorial). Tres piezas cohesionadas por el
 * gesto del sitio (reglas finas, ver credentials-band): a la izquierda un
 * LEDGER de datos del negocio (dl con reglas), a la derecha el FORMULARIO en
 * tarjeta, y debajo una banda de MAPA enmarcada con cabecera hairline.
 *
 * El archivo es "use client" únicamente porque el formulario exige el hook
 * headless useContactForm (react-hook-form + zodResolver + submit compartido);
 * la sección jamás reimplementa fetch("/api/contact") ni el schema. Todo el
 * copy sale de next-intl con el `ns` que llega por props (el form usa
 * `${ns}.form`); labels comunes vienen de "common". Solo tokens semánticos.
 */
export function ContactSplit({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const tCommon = useTranslations("common");
  const {
    register,
    onSubmit,
    isSubmitting,
    errorText,
    errorId,
    ariaProps,
    t: tForm,
  } = useContactForm(`${ns}.form`);

  const { business } = config;
  const { address } = business;
  const telHref = `tel:${business.phone.replace(/\s+/g, "")}`;
  const waHref = `https://wa.me/${whatsappDigits(business)}?text=${encodeURIComponent(
    tCommon("whatsappMessage"),
  )}`;

  const rowClass =
    "grid grid-cols-1 gap-1.5 border-t border-border py-6 first:border-t-0 sm:grid-cols-[6.5rem_1fr] sm:gap-6 sm:py-7";
  const dtClass =
    "text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase";
  const linkClass =
    "text-sm text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline";

  const labelClass =
    "mb-2 block text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase";
  const frameClass =
    "border-b border-border transition-colors focus-within:border-primary has-[[aria-invalid=true]]:border-primary";
  const controlClass =
    "w-full border-0 bg-transparent pt-1 pb-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-0 focus:outline-none";
  const errorClass = "mt-2 text-xs leading-snug text-primary";

  return (
    <section
      id="contacto"
      className="scroll-mt-24 border-t border-border bg-background py-(--section-gap)"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        {/* Encabezado asimétrico */}
        <div className="grid gap-x-8 gap-y-6 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,1.3rem+2.6vw,3.25rem)] leading-[1.05] tracking-tight text-balance">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-4 lg:col-start-9">
            <p className="border-t border-border pt-5 text-[0.95rem] leading-relaxed text-muted-foreground text-pretty">
              {t("intro")}
            </p>
          </Reveal>
        </div>

        {/* Cuerpo: ledger de datos (izq) + formulario en tarjeta (der) */}
        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          {/* Columna INFO */}
          <div className="lg:col-span-5">
            <Reveal>
              <dl>
                <div className={rowClass}>
                  <dt className={dtClass}>{t("addressLabel")}</dt>
                  <dd className="text-sm leading-relaxed text-foreground">
                    <span className="block">{address.street}</span>
                    <span className="block">
                      {tCommon("coloniaPrefix")} {address.colonia}
                    </span>
                    <span className="block">
                      {address.zip} {address.city}, {address.state}
                    </span>
                  </dd>
                </div>

                <div className={rowClass}>
                  <dt className={dtClass}>{t("phoneLabel")}</dt>
                  <dd>
                    <a href={telHref} className={`${linkClass} tabular-nums`}>
                      {business.phone}
                    </a>
                  </dd>
                </div>

                <div className={rowClass}>
                  <dt className={dtClass}>{t("whatsappLabel")}</dt>
                  <dd>
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={tCommon("whatsappLabel")}
                      className={`${linkClass} tabular-nums`}
                    >
                      {business.whatsapp ?? business.phone}
                    </a>
                  </dd>
                </div>

                {business.email && (
                  <div className={rowClass}>
                    <dt className={dtClass}>{t("emailLabel")}</dt>
                    <dd>
                      <a href={`mailto:${business.email}`} className={linkClass}>
                        {business.email}
                      </a>
                    </dd>
                  </div>
                )}

                <div className={rowClass}>
                  <dt className={dtClass}>{t("hoursLabel")}</dt>
                  <dd>
                    <ul className="space-y-1.5">
                      {business.hours.map((h) => (
                        <li
                          key={h.days}
                          className="flex flex-wrap items-baseline justify-between gap-x-6 text-sm"
                        >
                          <span className="text-foreground">{h.days}</span>
                          <span className="text-muted-foreground tabular-nums">
                            {h.open}&ndash;{h.close}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* Columna FORM */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={80}>
              <div className="border border-border bg-card p-6 sm:p-8">
                <h3 className="font-display text-xl tracking-tight">
                  {tForm("title")}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {tForm("intro")}
                </p>

                <form onSubmit={onSubmit} noValidate className="mt-8">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cs-name" className={labelClass}>
                        {tForm("name")}
                      </label>
                      <div className={frameClass}>
                        <input
                          id="cs-name"
                          type="text"
                          autoComplete="name"
                          placeholder={tForm("namePlaceholder")}
                          className={controlClass}
                          {...register("name")}
                          {...ariaProps("name")}
                        />
                      </div>
                      {errorText("name") && (
                        <p
                          id={errorId("name")}
                          aria-live="polite"
                          className={errorClass}
                        >
                          {errorText("name")}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="cs-phone" className={labelClass}>
                        {tForm("phone")}
                      </label>
                      <div className={frameClass}>
                        <input
                          id="cs-phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder={tForm("phonePlaceholder")}
                          className={controlClass}
                          {...register("phone")}
                          {...ariaProps("phone")}
                        />
                      </div>
                      {errorText("phone") && (
                        <p
                          id={errorId("phone")}
                          aria-live="polite"
                          className={errorClass}
                        >
                          {errorText("phone")}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="cs-email" className={labelClass}>
                      {tForm("email")}
                    </label>
                    <div className={frameClass}>
                      <input
                        id="cs-email"
                        type="email"
                        autoComplete="email"
                        placeholder={tForm("emailPlaceholder")}
                        className={controlClass}
                        {...register("email")}
                        {...ariaProps("email")}
                      />
                    </div>
                    {errorText("email") && (
                      <p
                        id={errorId("email")}
                        aria-live="polite"
                        className={errorClass}
                      >
                        {errorText("email")}
                      </p>
                    )}
                  </div>

                  <div className="mt-6">
                    <label htmlFor="cs-message" className={labelClass}>
                      {tForm("message")}
                    </label>
                    <div className={frameClass}>
                      <textarea
                        id="cs-message"
                        rows={4}
                        placeholder={tForm("messagePlaceholder")}
                        className={`${controlClass} min-h-28 resize-y`}
                        {...register("message")}
                        {...ariaProps("message")}
                      />
                    </div>
                    {errorText("message") && (
                      <p
                        id={errorId("message")}
                        aria-live="polite"
                        className={errorClass}
                      >
                        {errorText("message")}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-8 inline-flex w-full items-center justify-center bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
                  >
                    {isSubmitting ? tForm("sending") : tForm("submit")}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Banda de MAPA enmarcada (cabecera hairline + enlace a la ficha) */}
        <Reveal delay={120} className="mt-14 lg:mt-20">
          <div className="border border-border">
            <div className="flex items-center justify-between gap-4 border-b border-border bg-card px-5 py-3">
              <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                {t("mapLabel")}
              </span>
              {business.maps?.uri && (
                <a
                  href={business.maps.uri}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium text-primary underline-offset-4 hover:underline"
                >
                  {tCommon("viewOnGoogle")}
                </a>
              )}
            </div>
            <MapEmbed
              business={business}
              title={t("mapTitle")}
              className="block h-[340px] w-full border-0 sm:h-[440px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
