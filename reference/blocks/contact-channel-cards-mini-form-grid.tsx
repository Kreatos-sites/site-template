import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import {
  RiMailLine,
  RiFileTextLine,
  RiWhatsappLine,
  RiCustomerService2Line,
  RiPhoneLine,
  RiMapPin2Line,
  type RemixiconComponentType,
} from "@remixicon/react";

type Channel = {
  icon: string;
  title: string;
  description: string;
  value: string;
  href: string;
};

type Field = { name: string; label: string; type: string; placeholder: string };

const ICONS: Record<string, RemixiconComponentType> = {
  mail: RiMailLine,
  docs: RiFileTextLine,
  whatsapp: RiWhatsappLine,
  support: RiCustomerService2Line,
  phone: RiPhoneLine,
  location: RiMapPin2Line,
};

export function ContactChannelCardsMiniFormGrid({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const channels = t.raw("channels") as Channel[];
  const fields = t.raw("fields") as Field[];

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
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Izquierda: tarjetas de canales de contacto */}
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {channels.map((channel, index) => {
              const Icon = ICONS[channel.icon] ?? RiMailLine;
              return (
                <li key={channel.title} className="contents">
                  <Reveal delay={index * 60}>
                    <a
                      href={channel.href}
                      className="group flex h-full flex-col gap-4 rounded-sm border border-border bg-card p-6 transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <span
                        aria-hidden="true"
                        className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                      >
                        <Icon className="size-5" />
                      </span>
                      <div className="flex flex-col gap-2">
                        <h3 className="font-display text-lg tracking-tight text-foreground">
                          {channel.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {channel.description}
                        </p>
                      </div>
                      <span className="mt-auto text-sm font-medium text-primary">
                        {channel.value}
                      </span>
                    </a>
                  </Reveal>
                </li>
              );
            })}
          </ul>

          {/* Derecha: mini formulario inline */}
          <div className="lg:col-span-5">
            <Reveal delay={120}>
              <form className="flex flex-col gap-5 rounded-sm border border-border bg-card p-8">
                <h3 className="font-display text-lg tracking-tight text-foreground">
                  {t("formTitle")}
                </h3>
                {fields.map((field) => (
                  <div key={field.name} className="flex flex-col gap-2">
                    <label
                      htmlFor={field.name}
                      className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase"
                    >
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        rows={4}
                        className="resize-none rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    ) : (
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center rounded-sm bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {t("submitLabel")}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
