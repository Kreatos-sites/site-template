import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { ContactForm } from "@/components/sections/contact-form";
import { MapEmbed } from "@/components/shared/map-embed";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import type { SectionOf } from "@/lib/config";
import config from "@/site.config";

export function Contact({ showMap = true, ns }: SectionOf<"contact">) {
  const nsBase = ns ?? "contact";
  const t = useTranslations(nsBase);
  const tCommon = useTranslations("common");
  const { business, flags } = config;

  return (
    <section id="contacto" className="py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <dl className="space-y-8">
                <div className="flex gap-4">
                  <MapPin className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                      {t("addressLabel")}
                    </dt>
                    <dd className="mt-1.5 text-[0.95rem] leading-relaxed">
                      {business.address.street}
                      <br />
                      {tCommon("coloniaPrefix")} {business.address.colonia}, {business.address.zip}
                      <br />
                      {business.address.city}, {business.address.state}
                    </dd>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                      {t("phoneLabel")}
                    </dt>
                    <dd className="mt-1.5">
                      <a
                        href={`tel:${business.phone.replace(/\s/g, "")}`}
                        className="text-[0.95rem] underline-offset-4 hover:underline"
                      >
                        {business.phone}
                      </a>
                    </dd>
                  </div>
                </div>

                {business.email && (
                  <div className="flex gap-4">
                    <Mail className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                        {t("emailLabel")}
                      </dt>
                      <dd className="mt-1.5">
                        <a
                          href={`mailto:${business.email}`}
                          className="text-[0.95rem] underline-offset-4 hover:underline"
                        >
                          {business.email}
                        </a>
                      </dd>
                    </div>
                  </div>
                )}

                {business.hours.length > 0 && (
                  <div className="flex gap-4">
                    <Clock className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                        {t("hoursLabel")}
                      </dt>
                      <dd className="mt-1.5 space-y-0.5 text-[0.95rem]">
                        {business.hours.map((h) => (
                          <p key={h.days}>
                            {h.days}: {h.open}–{h.close}
                          </p>
                        ))}
                      </dd>
                    </div>
                  </div>
                )}
              </dl>
            </Reveal>

            {flags.contactForm && (
              <Reveal delay={100}>
                <div className="mt-12 border-t border-border pt-10">
                  <h3 className="font-display text-xl tracking-tight">
                    {t("form.title")}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t("form.intro")}</p>
                  <ContactForm ns={`${nsBase}.form`} />
                </div>
              </Reveal>
            )}
          </div>

          {showMap && (
            <div className="lg:col-span-7">
              <Reveal delay={120} className="h-full">
                <MapEmbed
                  business={business}
                  title={t("mapTitle")}
                  className="map-embed h-full min-h-96 w-full border border-border lg:min-h-[560px]"
                />
              </Reveal>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
