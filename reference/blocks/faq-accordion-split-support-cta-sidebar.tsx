import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { RiAddLine, RiCustomerService2Line, RiMailLine, RiPhoneLine } from "@remixicon/react";

/**
 * BLOQUE: faq-accordion-split-support-cta-sidebar — diseño de dos columnas
 * con panel de soporte/contacto fijo a la izquierda y acordeón de preguntas
 * frecuentes en una sola columna a la derecha. Distinto de
 * accordion-faq-single-column (centrado sin sidebar): aquí el panel de CTA
 * da una salida directa a contacto para quien no encuentra su respuesta.
 *
 * ns esperado:
 *   { eyebrow: string, title: string,
 *     support: { title: string, description: string,
 *       contacts: [{ icon: string, label: string, value: string }],
 *       ctaLabel: string, ctaHref: string },
 *     items: [{ question: string, answer: string }] }
 */
type Contact = { icon: string; label: string; value: string };
type Item = { question: string; answer: string };
type Support = {
  title: string;
  description: string;
  contacts: Contact[];
  ctaLabel: string;
  ctaHref: string;
};

const CONTACT_ICONS: Record<string, typeof RiPhoneLine> = {
  phone: RiPhoneLine,
  mail: RiMailLine,
  support: RiCustomerService2Line,
};

export function FaqAccordionSplitSupportCtaSidebar({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const support = t.raw("support") as Support;
  const items = t.raw("items") as Item[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
          <Reveal>
            <aside className="flex flex-col gap-6 rounded-lg border border-border bg-card p-8 lg:sticky lg:top-24">
              <h3 className="font-display text-xl text-foreground">{support.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {support.description}
              </p>

              <ul className="flex flex-col gap-4 border-t border-border pt-6">
                {support.contacts.map((contact, index) => {
                  const Icon = CONTACT_ICONS[contact.icon] ?? RiCustomerService2Line;
                  return (
                    <li key={index} className="flex items-start gap-3">
                      <span className="grid size-9 shrink-0 place-items-center rounded-sm bg-secondary text-secondary-foreground">
                        <Icon className="size-4" />
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">{contact.label}</span>
                        <span className="text-sm font-medium text-foreground">
                          {contact.value}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <a
                href={support.ctaHref}
                className="mt-2 inline-flex items-center justify-center rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {support.ctaLabel}
              </a>
            </aside>
          </Reveal>

          <div>
            {items.map((item, index) => (
              <Reveal key={index} delay={index * 60}>
                <details className="group border-b border-border first:border-t [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <h3 className="font-display text-lg leading-snug tracking-tight text-balance text-foreground sm:text-xl">
                      {item.question}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground transition-transform duration-300 group-open:rotate-45"
                    >
                      <RiAddLine className="size-4" />
                    </span>
                  </summary>
                  <div className="max-w-2xl pb-7 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.answer}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
