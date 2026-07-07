import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import {
  PhoneIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
  ChatCircleTextIcon,
  ClockIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as Icon } from "@phosphor-icons/react";

type Channel = {
  icon: string;
  label: string;
  value: string;
};

type Field = { name: string; label: string; type: string; placeholder: string };

const ICONS: Record<string, Icon> = {
  phone: PhoneIcon,
  email: EnvelopeSimpleIcon,
  address: MapPinIcon,
  whatsapp: ChatCircleTextIcon,
  hours: ClockIcon,
};

export function ContactChannelListSplitForm({ ns }: { ns: string }) {
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

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left: lista de canales de contacto */}
          <div className="lg:col-span-4">
            <ul className="flex flex-col gap-3">
              {channels.map((channel, index) => {
                const ChannelIcon = ICONS[channel.icon] ?? PhoneIcon;
                return (
                  <li key={channel.label}>
                    <Reveal delay={index * 60}>
                      <article className="flex items-start gap-4 rounded-sm border border-border bg-card p-6">
                        <span
                          aria-hidden="true"
                          className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"
                        >
                          <ChannelIcon className="size-5" weight="regular" />
                        </span>
                        <div className="flex flex-col gap-1">
                          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                            {channel.label}
                          </p>
                          <p className="text-sm leading-relaxed text-foreground">
                            {channel.value}
                          </p>
                        </div>
                      </article>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: formulario completo */}
          <div className="lg:col-span-8">
            <Reveal delay={80}>
              <form className="flex flex-col gap-6 rounded-sm border border-border bg-card p-8 sm:p-10">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {fields.map((field, index) => (
                    <Reveal key={field.name} delay={index * 60}>
                      <div
                        className={
                          field.type === "textarea"
                            ? "flex flex-col gap-2 sm:col-span-2"
                            : "flex flex-col gap-2"
                        }
                      >
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
                            rows={5}
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
                    </Reveal>
                  ))}
                </div>

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
